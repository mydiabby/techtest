# Test technique myDiabby

## Introduction

Dans ce repo, tu trouveras une application Angular et une application NestJS.

Les deux applications sont configurées pour fonctionner avec Docker via le `docker-compose.yml` et le fichier `.env` à créer à partir du `.env.dist`.

Le but est d'évaluer globalement tes connaissances sur les deux frameworks.

## Instructions

À partir du code actuel, je souhaite que :

- L'application Angular ait deux nouvelles routes :
  - `/users` qui affiche la liste des utilisateurs récupérée depuis l'API NestJS, triée par ordre alphabétique. Cette route devra comporter un bouton "Ajouter un utilisateur" qui redirigera vers la seconde route.
  - `/users/add` qui affiche un formulaire permettant d'ajouter un utilisateur. Ce formulaire devra comporter les champs "Nom" et "Prénom".

- L'application NestJS soit adaptée en conséquence pour permettre l'ajout d'un utilisateur via une requête POST sur la route `/users`.

- Le résultat final ne doit pas permettre de créer un utilisateur avec les mêmes npm et prénom qu'un utilisateur déjà existant.

N'hésite pas à ajouter toute autre fonctionnalité que tu juges pertinente (tests, validation des formulaires, etc.).

## Rendu

Le rendu devra être effectué sous forme de pull request sur ce repo.

Bon courage !

---

## Lancer le projet

```bash
cp .env.dist .env
npm run start
```

- Front : http://localhost:4200
- API : http://localhost:3000

Pour reset complètement la BDD :

```bash
docker compose down -v
```

## Scripts (à la racine)

```bash
npm run install:all    # installe les deps des deux apps
npm test               # lance tous les tests (back + front)
npm run test:nest      # tests NestJS uniquement
npm run test:angular   # tests Angular uniquement (Headless Chrome)
npm run format         # prettier sur les deux apps
```

## Routes

**Front Angular**

- `/` — page d'accueil
- `/users` — liste triable par nom/prénom, ASC/DESC
- `/users/add` — formulaire d'ajout

**API NestJS**

- `GET /healthcheck`
- `GET /users` — liste les utilisateurs (params optionnels : `sortBy=firstName|lastName`, `sortDir=asc|desc`)
- `POST /users` — crée un utilisateur (body : `{ firstName, lastName }`)

## Ajouts notables

- DTO de validation (`CreateUserDto`, `GetUsersQueryDto`) avec trim, min/max length
- Code d'erreur métier `USER_ALREADY_EXISTS` (le front matche dessus, pas sur le status HTTP)
- DTO de réponse (`UserResponseDto.fromEntity`) pour ne pas exposer l'entité domaine
- Check d'unicité case-insensitive en SQL (`LOWER()`)
- Tri serveur (`?sortBy=...&sortDir=...`)
- CORS configuré via `FRONT_URL` avec fail-fast au démarrage
- Reactive Forms côté front avec validation alignée sur le back, trim au submit
- Pipe `controlError` réutilisable pour les messages d'erreur
- `MatSnackBar` au succès + redirection sur `/users`
- Tri interactif `MatSort` qui refetch côté serveur
- Tailwind ajouté sans `preflight` pour cohabiter avec Angular Material
- Layout responsive (mobile / desktop), header avec logo myDiabby, favicon, titres de page dynamiques

## Tests

- Backend (Jest) : `CreateUser` use-case, `CreateUserDto`, `GetUsersQueryDto`
- Frontend (Karma + Jasmine) : `UserService` (HTTP + tri), `AddUserComponent` (validation, trim, submit, erreurs, redirection)

## Pour aller plus loin

- Pagination serveur + `MatPaginator` côté front
- Tests e2e
- Ajout des users seulement par un admin connecté
- Internationalisation (i18n)
- Healthcheck enrichi (connectivité BDD)
