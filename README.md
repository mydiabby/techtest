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

-----

# Test Mathieu

## Angular :
- L'application peut tourner avec des données en in memory, pour cela il suffit de changer la valeur `production` à false dans le fichier `env.ts`
- En remettant la valeur à `true`, l'application va chercher les données via l'API NestJS et la DB

Des tests unitaires ont été ajoutés sur les uses cases

## NestJS :
- Copier le .env.template à la racine de /nest et le renommer en .env

Des tests e2e ont été ajoutés pour les différentes routes

## Setup bdd : 
- RDV dans le container nest, ouvrir un terminal et lancer la commande `npm run migration:up`
- Dans le même terminal, lancer la commande `npm run db:seed` pour ajouter de la data dans la bdd
