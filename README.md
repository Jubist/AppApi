# AppApi
Application Android gestion des recettes
Application de Recettes

Cette application mobile multiplateforme a été développée avec NativeScript et Vue.js. Elle vous permet de gérer une collection de recettes de cuisine, avec la possibilité de créer, lire, modifier et supprimer des recettes (CRUD).

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les éléments suivants sur votre système :

- [Node.js](https://nodejs.org/) (v14 ou supérieur)
- [NativeScript CLI](https://docs.nativescript.org/environment-setup.html)
- Configuré le SDK Android et/ou Xcode pour iOS

Pour vérifier votre installation NativeScript :
```bash
ns doctor
```

## Installation

1. Clonez ce dépôt :
```bash
git clone https://github.com/Jubist/AppApi
cd TP3-ProgMultiPlatform
```

2. Installez les dépendances du projet :
```bash
npm install
```

## Configuration

### API Backend

L'application est configurée pour communiquer avec une API REST locale sur `http://10.0.2.2:5000/recipes` pour les émulateurs Android (équivalent à localhost:5000 sur votre machine).

Si vous avez besoin de modifier l'URL de l'API, vous pouvez le faire dans le fichier `app/services/api.js`.

### Autorisations Android

L'application nécessite les autorisations suivantes, qui sont déjà configurées dans le fichier `App_Resources/Android/AndroidManifest.xml` :
- `INTERNET` - Pour les appels API
- `ACCESS_NETWORK_STATE` - Pour vérifier la connectivité
- `READ_EXTERNAL_STORAGE` et `WRITE_EXTERNAL_STORAGE` - Pour l'accès aux fichiers

## Lancement de l'application

### Sur un émulateur Android

Assurez-vous que l'émulateur Android est lancé, puis exécutez :
```bash
ns run android
```

### Sur un appareil Android réel

Connectez votre appareil Android via USB avec le débogage USB activé, puis exécutez :
```bash
ns run android
```

### Sur un simulateur iOS (uniquement sur macOS)

```bash
ns run ios
```

### Sur un appareil iOS réel (uniquement sur macOS)

Connectez votre iPhone et exécutez :
```bash
ns run ios
```

## Structure du projet

```
TP3-ProgMultiPlatform/
├── app/
│   ├── components/
│   │   ├── App.vue              # Composant principal
│   │   ├── Login.vue            # Page de connexion
│   │   ├── RecipeDetail.vue     # Détails d'une recette
│   │   ├── RecipeDetailsPage.vue # Page de détails alternative
│   │   ├── RecipeForm.vue       # Formulaire d'ajout/modification
│   │   ├── RecipeList.vue       # Liste des recettes
│   │   └── Register.vue         # Page d'inscription
│   ├── services/
│   │   └── api.js               # Service d'API pour les requêtes
│   └── main.js                  # Point d'entrée de l'application
├── App_Resources/               # Ressources spécifiques à la plateforme
├── package.json                 # Dépendances
└── webpack.config.js            # Configuration de Webpack
```

## Fonctionnalités

### 1. Gestion des recettes
- **Affichage des recettes** : Vue en liste de toutes les recettes disponibles
- **Détails des recettes** : Consultation des ingrédients et instructions
- **Ajout de recettes** : Formulaire pour créer de nouvelles recettes
- **Modification** : Mise à jour des recettes existantes
- **Suppression** : Possibilité de supprimer des recettes avec confirmation

### 2. Authentification des utilisateurs
- **Inscription** : Création d'un nouveau compte utilisateur
- **Connexion** : Authentification avec email et mot de passe
- **Stockage sécurisé** : Gestion du token d'authentification

### 3. Interface utilisateur
- **Navigation fluide** : Transition entre les différentes vues
- **Formulaires intuitifs** : Saisie des données avec validation
- **Notifications** : Alertes pour confirmer les actions importantes
- **Indicateurs de chargement** : Feedback visuel lors des opérations

## Dépannage

### Problèmes de connexion à l'API
- Vérifiez que votre API est bien en cours d'exécution sur le port 5000
- Pour les émulateurs Android, l'adresse `10.0.2.2` redirige vers localhost de votre machine
- Pour les appareils physiques, vous devrez peut-être utiliser l'adresse IP de votre machine sur le réseau local

### Problèmes de build
Si vous rencontrez des problèmes lors de la compilation :
```bash
# Nettoyez les fichiers temporaires
ns clean

# Puis reconstruisez
ns run android
# ou
ns run ios
```

## Ressources additionnelles

- [Documentation NativeScript](https://docs.nativescript.org/)
- [Documentation NativeScript-Vue](https://nativescript-vue.org/)
- [Style Guide Vue.js](https://vuejs.org/style-guide/)

## Licence

Ce projet est sous licence MIT.
