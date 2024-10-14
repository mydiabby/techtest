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

## How-to ?

Les commandes documentées nécessitent [Blaze](https://blaze-monorepo.dev/docs/guides/get-started).

Attention, le workspace n'est pas configuré pour fonctionner sur Windows.

### Dev en mode local

Lancer l'application en mode de développement local : 

```sh
blaze run docker:database-up
```

```sh
blaze run api:serve
```

```sh
blaze run frontend:serve
```

L'application sera disponible sur `http://127.0.0.1:4000`.

### Tests E2E en mode local

1) [Installer Playwright et ses dépendences système](https://playwright.dev/docs/intro)
2) [Lancer l'application en mode dev local](#mode-dev-local)
3) Lancer les tests avec `blaze run e2e:run`

Attention, l'API devra être lancée en mode de connexion avec la base de données prévues pour les tests E2E :

```sh
blaze --str-var 'api.configPath=configurations/e2e-local.json' run api:serve
```

### Dev en mode Docker

Lancer l'application en mode de développement via Docker Compose :

```sh
blaze run docker:dev-up
```

L'application sera disponible sur `http://127.0.0.1:4000`.

Lancer les tests E2E via Docker Compose :

```sh
blaze run docker:e2e-up
```

### Nettoyage

Tout nettoyer (dépendances, caches, volumes...) :

```sh
blaze run -t clean -a
```

