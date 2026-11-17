-- Activation d'un abonnement : atomique, idempotente, réservée au serveur (service_role).
create sequence if not exists seq_recu;
create function activer_paiement(p_id uuid, p_ref text) returns void language plpgsql security definer set search_path = public as $$
declare v paiements; d int;
begin
  select * into v from paiements where id = p_id for update;
  if not found then raise exception 'paiement introuvable'; end if;
  if v.statut = 'confirme' then return; end if;            -- anti-doublon : un paiement n'active qu'une fois
  select duree_jours into d from offres where id = v.offre_id;
  update paiements set statut = 'confirme', reference_fournisseur = coalesce(reference_fournisseur, p_ref),
    recu_numero = 'CR-' || to_char(now(), 'YYYY') || '-' || lpad(nextval('seq_recu')::text, 6, '0') where id = p_id;
  insert into abonnements (profil_id, offre_id, paiement_id, fin) values (v.profil_id, v.offre_id, p_id, now() + make_interval(days => d));
end $$;
revoke all on function activer_paiement(uuid, text) from public, anon, authenticated;
grant execute on function activer_paiement(uuid, text) to service_role;
-- Aucune politique d'écriture sur paiements/abonnements pour les utilisateurs : seul le serveur écrit.
