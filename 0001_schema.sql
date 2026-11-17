-- CAP RÉUSSITE : schéma + sécurité (RLS). À exécuter dans Supabase > SQL Editor.
create type role_utilisateur as enum ('eleve','admin');
create type statut_paiement as enum ('en_attente','confirme','echoue','rembourse');

create table niveaux (id serial primary key, slug text unique not null, nom text not null, ordre int not null);
create table matieres (id serial primary key, niveau_id int not null references niveaux, nom text not null, serie text, valide_programme boolean not null default false);
create table chapitres (id serial primary key, matiere_id int not null references matieres on delete cascade, titre text not null, ordre int not null default 0);

create table profils (
  id uuid primary key references auth.users on delete cascade,
  role role_utilisateur not null default 'eleve',
  prenom text, nom text, niveau_id int references niveaux, telephone_parent text,
  created_at timestamptz not null default now());

create table ressources (
  id uuid primary key default gen_random_uuid(),
  chapitre_id int not null references chapitres on delete cascade,
  type text not null check (type in ('cours','fiche_revision','resume','definitions','exemples','exercices_application','exercices_approfondissement','corrige','evaluation','sujet_entrainement','quiz')),
  titre text not null, fichier_path text, publie boolean not null default false,
  telechargeable boolean not null default true, created_at timestamptz not null default now());

create table offres (
  id serial primary key, code text unique not null, nom text not null,
  prix_fcfa int not null check (prix_fcfa >= 0), duree_jours int not null default 30,
  telechargement boolean not null default false, actif boolean not null default true);
insert into offres (code, nom, prix_fcfa, duree_jours) values
 ('decouverte','Découverte',1000,7),('essentiel','Essentiel',3000,30),
 ('premium','Premium',5000,90),('integrale','Intégrale',12000,365);

create table paiements (
  id uuid primary key default gen_random_uuid(),
  profil_id uuid not null references profils, offre_id int not null references offres,
  montant_fcfa int not null, fournisseur text not null,
  reference_fournisseur text unique, statut statut_paiement not null default 'en_attente',
  recu_numero text unique, created_at timestamptz not null default now());

create table abonnements (
  id uuid primary key default gen_random_uuid(),
  profil_id uuid not null references profils, offre_id int not null references offres,
  paiement_id uuid unique references paiements,
  debut timestamptz not null default now(), fin timestamptz not null);

create table favoris (profil_id uuid references profils on delete cascade, ressource_id uuid references ressources on delete cascade, primary key (profil_id, ressource_id));
create table historique (id bigserial primary key, profil_id uuid references profils on delete cascade, ressource_id uuid references ressources on delete cascade, vu_le timestamptz default now());
create table codes_promo (code text primary key, reduction_pct int check (reduction_pct between 1 and 100), expire_le date, actif boolean default true);
create table messages_contact (id bigserial primary key, nom text, email text, message text not null, created_at timestamptz default now());

-- Fonctions de contrôle d'accès (exécutées côté base, impossibles à contourner depuis le navigateur)
create function est_admin() returns boolean language sql stable security definer set search_path = public
as $$ select exists (select 1 from profils where id = auth.uid() and role = 'admin') $$;

create function abonnement_actif() returns boolean language sql stable security definer set search_path = public
as $$ select exists (select 1 from abonnements where profil_id = auth.uid() and fin > now()) $$;

create function peut_lire_ressource(rid uuid) returns boolean language sql stable security definer set search_path = public
as $$ select est_admin() or exists (
  select 1 from ressources r join chapitres c on c.id = r.chapitre_id join matieres m on m.id = c.matiere_id
  join profils p on p.id = auth.uid()
  where r.id = rid and r.publie and m.niveau_id = p.niveau_id and abonnement_actif()) $$;

-- Un élève ne peut JAMAIS se donner le rôle admin ni changer de rôle
create function bloquer_changement_role() returns trigger language plpgsql as $$
begin if new.role <> old.role and not est_admin() then new.role := old.role; end if; return new; end $$;
create trigger t_profils_role before update on profils for each row execute function bloquer_changement_role();

-- RLS : tout activé, refus par défaut
alter table niveaux enable row level security;       alter table matieres enable row level security;
alter table chapitres enable row level security;     alter table profils enable row level security;
alter table ressources enable row level security;    alter table offres enable row level security;
alter table paiements enable row level security;     alter table abonnements enable row level security;
alter table favoris enable row level security;       alter table historique enable row level security;
alter table codes_promo enable row level security;   alter table messages_contact enable row level security;

create policy "catalogue lisible" on niveaux for select using (true);
create policy "matieres lisibles" on matieres for select using (true);
create policy "chapitres lisibles" on chapitres for select using (true);
create policy "offres actives lisibles" on offres for select using (actif or est_admin());
create policy "profil: lecture" on profils for select using (id = auth.uid() or est_admin());
create policy "profil: maj" on profils for update using (id = auth.uid() or est_admin());
create policy "ressources: lecture autorisée" on ressources for select using (peut_lire_ressource(id));
create policy "paiements: les miens" on paiements for select using (profil_id = auth.uid() or est_admin());
create policy "abonnements: les miens" on abonnements for select using (profil_id = auth.uid() or est_admin());
create policy "favoris: les miens" on favoris for all using (profil_id = auth.uid()) with check (profil_id = auth.uid());
create policy "historique: le mien" on historique for all using (profil_id = auth.uid()) with check (profil_id = auth.uid());
create policy "contact: envoi public" on messages_contact for insert with check (true);
create policy "contact: admin lit" on messages_contact for select using (est_admin());
-- Écritures catalogue / paiements / abonnements / promos : admin ou serveur (service_role) uniquement
create policy "admin écrit niveaux" on niveaux for all using (est_admin()) with check (est_admin());
create policy "admin écrit matieres" on matieres for all using (est_admin()) with check (est_admin());
create policy "admin écrit chapitres" on chapitres for all using (est_admin()) with check (est_admin());
create policy "admin écrit ressources" on ressources for all using (est_admin()) with check (est_admin());
create policy "admin écrit offres" on offres for all using (est_admin()) with check (est_admin());
create policy "admin gère promos" on codes_promo for all using (est_admin()) with check (est_admin());

-- Stockage PDF : bucket PRIVÉ, aucune politique de lecture publique
insert into storage.buckets (id, name, public) values ('documents','documents', false) on conflict do nothing;
