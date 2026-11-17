-- Crée automatiquement le profil à l'inscription. Le rôle est TOUJOURS 'eleve' (jamais lu depuis le formulaire).
create function creer_profil() returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into profils (id, role, prenom, nom, telephone_parent, niveau_id)
  values (new.id, 'eleve', left(new.raw_user_meta_data->>'prenom', 60), left(new.raw_user_meta_data->>'nom', 60),
          left(new.raw_user_meta_data->>'telephone_parent', 20),
          (select id from niveaux where slug = new.raw_user_meta_data->>'niveau'));
  return new;
end $$;
create trigger t_nouvel_utilisateur after insert on auth.users for each row execute function creer_profil();

insert into niveaux (slug, nom, ordre) values ('6e','6e',1),('5e','5e',2),('4e','4e',3),('3e','3e',4),('seconde','Seconde',5);
-- Pour créer votre compte administrateur : inscrivez-vous normalement, puis dans Supabase > SQL Editor :
-- update profils set role = 'admin' where id = (select id from auth.users where email = 'VOTRE_EMAIL');
