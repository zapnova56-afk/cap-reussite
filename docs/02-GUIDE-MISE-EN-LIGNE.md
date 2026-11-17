# Guide de mise en ligne — CAP RÉUSSITE (sans programmer)

> Important : le code n'a jamais été exécuté. La première mise en ligne fera apparaître des erreurs de compilation à corriger. C'est normal : copiez le message d'erreur et envoyez-le à Claude, qui le corrige.

## Étape 1 — Base de données (Supabase, gratuit pour démarrer)
1. Créez un compte sur supabase.com, puis « New project » (région proche, ex. Paris ou Londres). Notez le mot de passe de la base.
2. Menu **SQL Editor** : collez et exécutez, **dans l'ordre**, les fichiers du dossier `supabase/migrations` : 0001, 0002, 0003, 0004.
3. Menu **Project Settings > API** : repérez *Project URL*, la clé *anon* et la clé *service_role* (celle-ci est SECRÈTE : ne la partagez jamais, pas même avec Claude).
4. Menu **Authentication > Providers > Email** : gardez la confirmation d'e-mail activée.

## Étape 2 — Le code (GitHub)
1. Créez un compte sur github.com, puis un nouveau dépôt **privé** nommé `cap-reussite`.
2. « Add file > Upload files » : glissez le contenu du dossier `cap-reussite` (sans `node_modules`). Validez (« Commit »).

## Étape 3 — Hébergement (Vercel, gratuit pour démarrer)
1. Sur vercel.com, connectez-vous avec GitHub, « Add New > Project », choisissez `cap-reussite`.
2. Avant de déployer, ouvrez **Environment Variables** et saisissez les valeurs du fichier `.env.example` : `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `NEXT_PUBLIC_SITE_URL` (l'adresse Vercel, puis votre domaine), `NEXT_PUBLIC_WHATSAPP_NUMBER` (ex. 221771234567).
3. Cliquez **Deploy**. En cas d'erreur : copiez le texte du journal rouge et envoyez-le à Claude.

## Étape 4 — Votre compte administrateur
1. Sur le site, créez un compte normalement et confirmez votre e-mail.
2. Dans Supabase > SQL Editor : `update profils set role = 'admin' where id = (select id from auth.users where email = 'VOTRE_EMAIL');`
3. Reconnectez-vous : le bouton « Espace administrateur » apparaît.

## Étape 5 — Ajouter des documents
Admin > Documents : choisissez le chapitre, le type, le titre, le PDF. Cochez « Publier ». Les chapitres de Maths 6e sont déjà créés.

## Étape 6 — Wave (quand votre compte marchand est prêt)
1. Compte Wave Business, puis clé API et secret de notification.
2. Ajoutez `WAVE_API_KEY` et `WAVE_WEBHOOK_SECRET` dans Vercel. Adresse de notification à déclarer chez Wave : `https://VOTRE-SITE/api/paiements/webhook`.
3. **Testez avec 1 000 FCFA réels** et vérifiez que l'abonnement s'active. Deux détails (format de signature, nom du statut « payé ») sont à confirmer à ce moment-là.

## Avant d'ouvrir au public — liste de contrôle
- [ ] CGU et confidentialité relues par un juriste.
- [ ] Matières et chapitres validés par un enseignant sénégalais.
- [ ] Contenus : uniquement des documents dont vous détenez les droits.
- [ ] Test complet sur un vrai téléphone : inscription, e-mail, paiement, lecture de PDF.
- [ ] Sauvegardes : l'offre gratuite de Supabase n'inclut PAS de sauvegarde automatique. Prévoyez l'offre payante avant d'encaisser de vrais paiements.
- [ ] Un élève ne doit jamais voir /admin (testez avec un compte élève).
