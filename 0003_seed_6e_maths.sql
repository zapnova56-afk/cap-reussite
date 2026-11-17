-- Structure de départ : Mathématiques 6e (liste des chapitres fournie par le propriétaire).
-- STRUCTURE UNIQUEMENT : aucun contenu tiers copié. valide_programme = false tant qu'un enseignant n'a pas validé.
with m as (
  insert into matieres (niveau_id, nom, valide_programme)
  select id, 'Mathématiques', false from niveaux where slug = '6e' returning id)
insert into chapitres (matiere_id, titre, ordre)
select m.id, t.titre, t.ordre from m, (values
 (1,'Les nombres décimaux arithmétiques'),
 (2,'Addition et soustraction des nombres décimaux arithmétiques'),
 (3,'Introduction à la géométrie : le parallélépipède rectangle'),
 (4,'Rangement d''un nombre décimal arithmétique'),
 (5,'Le cercle'),
 (6,'Multiplication des nombres décimaux arithmétiques'),
 (7,'Droites perpendiculaires et droites parallèles'),
 (8,'Symétrie orthogonale par rapport à une droite donnée'),
 (9,'Division des nombres décimaux arithmétiques'),
 (10,'Les angles'),
 (11,'Organisation d''un calcul'),
 (12,'Les triangles'),
 (13,'Les quadrilatères'),
 (14,'Proportionnalité'),
 (15,'Les nombres décimaux'),
 (16,'Surface, aire et unité d''aire'),
 (17,'Géométrie dans l''espace'),
 (18,'Repérage sur la droite et le plan'),
 (19,'Repérage sur la sphère')) as t(ordre, titre);
-- À téléverser plus tard comme documents (pas comme chapitres) : séries d'exercices (numériques, géométriques) et révision du 1er semestre.
