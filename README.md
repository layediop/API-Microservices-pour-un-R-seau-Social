#  API Microservices pour un Réseau Social

Ce projet est une API scalable et modulaire pour un réseau social, organisée autour d’une architecture **microservices**. Il comprend trois services indépendants : **authentification**, **gestion des posts** et **gestion des likes**, chacun connecté à sa propre base MongoDB.


##  Technologies utilisées

- Node.js
- Express
- MongoDB (via Mongoose)
- JSON Web Tokens (JWT)
- bcryptjs
- dotenv
- axios
- Architecture microservices REST


##  Lancement des services

### 1. Cloner le dépôt


git clone <url-du-repo>
cd Projet_API

#  Lancer chaque microservice

## Auth Service
- cd auth-service
- npm install
- npm start

## Posts Service
- cd posts-service
- npm install
- npm start

## Likes Service
- cd likes-service
- npm install
- npm start

# Fonctionnalités

## Auth-Service

    POST /register : Inscription d’un utilisateur

    POST /login : Connexion utilisateur

    POST /forgot-password : Génération d’un token de réinitialisation

## Posts-Service

    POST /api/posts : Créer un post

    GET /api/posts : Récupérer tous les posts

    GET /api/posts/:id : Récupérer un post par ID

    PUT /api/posts/:id : Mettre à jour le compteur de likes (utilisé par likes-service)

## Likes-Service

    POST /api/likes : Ajouter un like

    DELETE /api/likes : Supprimer un like

    GET /api/likes/:postId : Récupérer tous les likes d’un post