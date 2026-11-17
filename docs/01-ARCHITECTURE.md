# CAP RÉUSSITE — Architecture (Phase 1)

## 1. Choix techniques et raisons
| Besoin | Choix | Pourquoi |
|---|---|---|
| Site + application | Next.js (App Router) + TypeScript | Pages rapides, référencement Google, un seul projet pour site, espace élève et admin |
| Design | Tailwind CSS | Interface légère, cohérente, adaptée mobile |
| Base de données + comptes | Supabase (PostgreSQL) | Authentification, règles de sécurité par ligne (RLS), stockage privé, offre gratuite pour démarrer |
| Fichiers PDF | Supabase Storage, bucket **privé** | Jamais d'URL publique : accès par lien signé de courte durée |
| Hébergement | Vercel (site) + Supabase (données) | Déploiement simple, coût de départ très faible |
| Paiements | Couche « fournisseur » (Wave, Orange Money, autres) | Un fournisseur peut être ajouté sans réécrire le site |

Amélioration retenue : validation des données avec **Zod** sur chaque entrée serveur.

## 2. Les trois rôles
- **Visiteur** : pages publiques uniquement.
- **Élève** (compte lié à un parent payeur) : lit uniquement les contenus de SA classe, dans la limite de SON offre.
- **Administrateur** : gère tout. Le rôle est stocké en base et vérifié côté serveur, jamais côté navigateur.

## 3. Modèle de données (tables)
- `profils` : id (= compte), rôle, prénom, nom, niveau_id, téléphone parent.
- `niveaux` (6e, 5e, 4e, 3e, Seconde) · `series` (Seconde) · `matieres` (niveau, série, nom).
- `chapitres` (matière, titre, ordre).
- `ressources` : chapitre, **type** (11 types), titre, fichier_path (privé), statut brouillon/publié, téléchargeable.
- `quiz`, `questions`, `reponses_quiz`.
- `offres` : code, nom, prix_fcfa, durée_jours, portée (quels niveaux/types), actif — **tarifs modifiables en admin**.
- `abonnements` : profil, offre, début, fin, statut.
- `paiements` : profil, offre, montant, fournisseur, référence_fournisseur (unique), statut (en_attente / confirmé / échoué / remboursé), reçu_numéro.
- `codes_promo`, `messages_contact`.
- `favoris`, `historique_consultations`, `telechargements`, `progression`.

## 4. Règles de sécurité essentielles
1. RLS activée sur **toutes** les tables ; refus par défaut.
2. Un élève ne lit une ressource que si : niveau = sien ET abonnement actif couvrant ce type.
3. PDF : bucket privé ; le serveur vérifie les droits puis génère un lien signé (60 s).
4. Paiement : activation de l'abonnement **uniquement** par le webhook du prestataire, signature vérifiée, référence unique (anti-doublon). Le navigateur ne peut jamais « déclarer » un paiement réussi.
5. Clé `SERVICE_ROLE` et clés des prestataires : variables serveur, jamais dans le code ni côté navigateur.
6. Mineurs : données minimales collectées, politique de confidentialité claire, consentement du parent à l'inscription.

## 5. Plan des routes
- Public : `/`, `/presentation`, `/classes`, `/matieres`, `/ressources`, `/tarifs`, `/contact`, `/faq`, `/inscription`, `/connexion`, `/cgu`, `/confidentialite`
- Élève : `/eleve` (tableau de bord), `/eleve/matieres`, `/eleve/favoris`, `/eleve/telechargements`, `/eleve/progression`, `/eleve/historique`, `/eleve/profil`
- Admin : `/admin` + élèves, classes, matières, chapitres, documents, quiz, offres, paiements, promos, messages, statistiques
- API : `/api/paiements/webhook`, `/api/documents/[id]`

## 6. Programmes sénégalais — point de vigilance
Aucun contenu ne sera présenté comme « officiel » sans vérification sur les référentiels du ministère de l'Éducation nationale du Sénégal (INEADE / curricula). Les matières et chapitres de départ seront saisis comme **structure à valider** par un enseignant sénégalais avant publication.

## 7. Ce qui nécessitera votre intervention (plus tard)
Compte Supabase, compte Vercel, nom de domaine, comptes marchands Wave / Orange Money, numéro WhatsApp, contenus PDF réels, validation pédagogique des programmes.
