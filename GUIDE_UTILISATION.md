# TP2 - Frontend Cars API

## 📋 Résumé du TP2 - Étapes Complétées

Ce travail pratique vous a permettra de développer une interface web moderne pour consommer l'API REST du backend.

### ✅ Étapes Réalisées

#### **Étape 1 : Structure HTML et Bootstrap**
- ✅ 1.1 : Analysé la structure HTML existante
- ✅ 1.2 : Compris le système de query parameters (`car.html?id=1`)
- ✅ 1.3 : Validé que le modal est prêt pour l'ajout de voitures

#### **Étape 2 : Récupération des Données avec Fetch API**
- ✅ 2.1 : Configuré `API_CONFIG` avec `baseURL` et `endpoints`
- ✅ 2.2 : Implémenté `fetchAllCars()` avec gestion d'erreurs
- ✅ 2.3 : Implémenté `fetchCarById(id)` avec gestion du cas 404
- ✅ 2.4 : Tests prêts (à décommenter après déploiement)

#### **Étape 3 : Manipulation du DOM et Création Dynamique**
- ✅ 3.1 : Créé `createCarCard()` pour générer les cartes dynamiquement
- ✅ 3.2 : Implémenté `displayCars()` pour afficher toutes les voitures
- ✅ 3.3 : Implémenté la page de détail (`car.html`) avec `displayCarDetails()`
- ✅ 3.4 : Ajouté les états de chargement et gestion d'erreurs

#### **Étape 4 : Bonnes Pratiques et Organisation**
- ✅ Appliqué le principe DRY (Don't Repeat Yourself)
- ✅ Séparé les préoccupations (fetch vs affichage)
- ✅ Nommage clair et cohérent
- ✅ Documentation avec JSDoc
- ✅ Gestion robuste des erreurs
- ✅ Performance du DOM optimisée
- ✅ Accessibilité (alt text, ARIA)

---

## 🚀 Comment Utiliser et Tester

### Prérequis

1. **API Backend déployée** sur Render (voir le TP Backend)
   - Exemple : `https://voitures-api.onrender.com`

2. **URL de l'API** à ajouter dans le code

### Étape 1 : Configurer l'URL de l'API

Ouvrez [front/js/script.js](front/js/script.js) et [front/js/car.js](front/js/car.js)

Recherchez :
```javascript
const API_CONFIG = {
  baseURL: "http://localhost:3000",  // À CHANGER
  // ...
};
```

Remplacez `http://localhost:3000` par l'URL de votre API Render :
```javascript
const API_CONFIG = {
  baseURL: "https://voitures-api.onrender.com",  // Votre URL
  // ...
};
```

### Étape 2 : Ouvrir la page HTML

#### Option A : Avec un serveur local (recommandé)

Si vous avez Python 3 installé :
```bash
cd cars-front/front
python -m http.server 8000
```

Puis allez à : `http://localhost:8000`

#### Option B : Ouvrir directement le fichier HTML

Double-cliquez sur `cars-front/front/index.html` 

⚠️ **Note** : Les requêtes Fetch peuvent ne pas fonctionner directement avec `file://`. Utilisez un serveur local si possible.

### Étape 3 : Tester dans le Navigateur

1. **Ouvrir les DevTools** : Appuyez sur `F12`
2. **Aller à la Console** : Tab "Console"
3. **Vérifier les logs** :
   - `✅ script.js chargé - Page d'accueil initialisée`
   - `Fetching cars from: https://...`
   - `✅ Voitures récupérées: [...]`

4. **Vérifier le Network** : Tab "Network"
   - Voir l'appel API vers `/api/cars`
   - Vérifier le statut 200

5. **Vérifier le DOM** : Tab "Elements"
   - Les cartes doivent être générées dynamiquement
   - Aucune Ferrari en dur dans le HTML

### Étape 4 : Tester les Différentes Pages

#### Page d'Accueil (index.html)
- [ ] Les voitures s'affichent en cartes (3 colonnes responsive)
- [ ] Chaque carte a une image, un titre, une description
- [ ] Le bouton "See more" pointe vers `car.html?id=X`
- [ ] Le spinner s'affiche pendant le chargement
- [ ] Un message d'erreur s'affiche si l'API est inaccessible

#### Page de Détail (car.html?id=1)
- [ ] Cliquer sur une carte redirige vers `car.html?id=X`
- [ ] Le titre s'affiche : "YYYY Brand Model"
- [ ] L'image s'affiche
- [ ] Le tableau des specs est rempli :
  - Year, Make, Model, Color, Mileage, Description, Price
- [ ] Les nombres sont formatés avec espaces (ex: "12 000 km")
- [ ] Le lien "Back Home" ramène à l'accueil

#### Bouton "Add car"
- [ ] Le bouton en bas à droite ouvre un modal
- [ ] Le modal peut se fermer avec la croix

---

## 🎯 Architecture de l'Application

### Structure des Fichiers

```
cars-front/
├── README.md
├── NOTES_BONNES_PRATIQUES.md
└── front/
    ├── index.html              # Page d'accueil
    ├── car.html                # Page de détail
    ├── styles.css              # (optionnel) styles personnalisés
    ├── imgs/
    │   ├── logo-180.png
    │   ├── favicon.ico
    │   └── cars/               # Images des voitures
    └── js/
        ├── script.js           # Index.html (affichage liste)
        ├── car.js              # Car.html (affichage détail)
        └── mock-data.js        # Données d'exemple (fallback)
```

### Flux de Données

**Index.html :**
```
Page charge
  ↓
DOMContentLoaded → init()
  ↓
showLoading()
  ↓
fetchAllCars() → API
  ↓
displayCars() → Crée cartes
  ↓
Page affichée ✅
```

**Car.html :**
```
Page charge avec car.html?id=1
  ↓
DOMContentLoaded → initCarPage()
  ↓
getCarIdFromURL() → ID = 1
  ↓
showLoading()
  ↓
fetchCarById(1) → API
  ↓
displayCarDetails() → Remplit tableau
  ↓
Page affichée ✅
```

---

## 🔧 Fichiers JavaScript Créés

### [front/js/script.js](front/js/script.js)

**Responsabilités** :
- Afficher la liste de toutes les voitures
- Gérer les états de chargement et erreurs
- Générer les cartes dynamiquement

**Fonctions principales** :
- `fetchAllCars()` : Récupère toutes les voitures
- `createCarCard(car)` : Crée une carte HTML
- `displayCars(cars)` : Affiche toutes les cartes
- `showLoading()` : Affiche un spinner
- `showError()` : Affiche une erreur
- `init()` : Initialise la page

### [front/js/car.js](front/js/car.js)

**Responsabilités** :
- Afficher les détails d'une voiture spécifique
- Gérer la navigation avec query params
- Remplir dynamiquement le tableau des specs

**Fonctions principales** :
- `fetchCarById(id)` : Récupère une voiture
- `getCarIdFromURL()` : Extrait l'ID de l'URL
- `displayCarDetails(car)` : Remplit les détails
- `initCarPage()` : Initialise la page

---

## 🧪 Debugging et Dépannage

### Problème : "Aucune voiture ne s'affiche"

1. **Vérifier la console (F12)** pour voir les erreurs
2. **Vérifier le Network (F12)** pour l'appel API
3. **Vérifier l'URL de l'API** dans `API_CONFIG`
4. **S'assurer que l'API est déployée** et accessible

### Problème : "CORS Error"

```
Access to fetch at 'https://...' from origin 'http://localhost:8000' 
has been blocked by CORS policy
```

**Solution** : 
- Vérifier la configuration CORS du backend
- Autoriser `http://localhost:8000` et votre domaine de déploiement
- En développement, utiliser une extension CORS Unblock temporairement

### Problème : "L'image ne s'affiche pas"

- Vérifier que `car.imageUrl` n'est pas `null` ou `undefined`
- Vérifier l'URL de l'image est valide
- Utiliser une image par défaut : `./imgs/placeholder.png`

### Problème : "Le tableau n'est pas rempli"

- Vérifier que les champs existent : `car.year`, `car.brand`, etc.
- Utiliser des valeurs par défaut : `car.year || '-'`
- Vérifier le sélecteur CSS : `document.querySelector('table tbody')`

---

## 📱 Responsive Design

L'application utilise Bootstrap 5 pour un design responsive :

- **Mobile** : 1 colonne (< 576px)
- **Tablet** : 2 colonnes (576px - 991px)
- **Desktop** : 3 colonnes (> 991px)

Testez en redimensionnant le navigateur ou en ouvrant DevTools > Toggle device toolbar (Ctrl+Shift+M).

---

## 🎨 Personnalisation

### Changer les couleurs

Dans `front/styles.css` ou `<style>` :
```css
.btn-primary {
  background-color: #your-color;
  border-color: #your-color;
}
```

### Changer le nombre de colonnes

Dans [front/index.html](front/index.html) :
```html
<section class="card-cont d-flex flex-wrap justify-content-center gap-3">
```

Modifier les classes Bootstrap :
- `flex-wrap` : autoriser le retour à la ligne
- `gap-3` : espacement entre les cartes
- `justify-content-center` : centrer les cartes

### Ajouter un tri/filtre

Dans `script.js`, ajouter une fonction :
```javascript
function filterCars(cars, brand) {
  return cars.filter(car => car.brand.toLowerCase() === brand.toLowerCase());
}
```

---

## 📚 Ressources

### Documentations Officielles
- [MDN - Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [MDN - DOM API](https://developer.mozilla.org/en-US/docs/Web/API/Document)
- [Bootstrap 5](https://getbootstrap.com/docs/5.0/)

### Concepts Clés
- [Promises et Async/Await](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous)
- [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)
- [DocumentFragment](https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment)

### Bonnes Pratiques
- Voir [NOTES_BONNES_PRATIQUES.md](NOTES_BONNES_PRATIQUES.md)

---

## 🚀 Déploiement (Prochaines Étapes)

### Option 1 : Netlify

1. Créer un compte sur [netlify.com](https://netlify.com)
2. Faire un push sur GitHub
3. Connecter votre repo à Netlify
4. Déployer automatiquement

### Option 2 : Vercel

1. Créer un compte sur [vercel.com](https://vercel.com)
2. Importer votre repo GitHub
3. Déployer

### Option 3 : GitHub Pages

1. Créer un repo `username.github.io`
2. Pousser le code
3. Accéder à `https://username.github.io`

### ⚠️ Important avant de déployer

- [ ] Remplacer `API_CONFIG.baseURL` par l'URL de votre API Render
- [ ] Tester en local avec un serveur
- [ ] Vérifier le CORS côté backend pour votre domaine

---

## 💡 Prochaines Améliorations

1. **Formulaire d'ajout** : Remplir le modal pour ajouter une voiture
2. **Pagination** : Afficher 12 voitures par page
3. **Filtres/Recherche** : Filtrer par marque, année, prix
4. **Favoris** : Sauvegarder en localStorage
5. **Tri** : Trier par prix, année, etc.
6. **Animations** : Transitions au chargement des cartes
7. **Critique de star** : Ajouter un système de notation
8. **Galerie d'images** : Afficher plusieurs images par voiture

---

## ✅ Checklist Finale

Avant de considérer le TP comme terminé :

- [ ] Les voitures s'affichent sur index.html
- [ ] Les détails s'affichent sur car.html avec query params
- [ ] Les états de chargement s'affichent (spinner)
- [ ] Les erreurs sont bien gérées
- [ ] Pas d'erreurs dans la console (F12)
- [ ] Tous les attributs `alt` sont présents
- [ ] Le code est bien organisé (sections claires)
- [ ] Les fonctions ont des JSDoc
- [ ] Les noms de variables sont clairs
- [ ] Pas de code dupliqué
- [ ] L'API_CONFIG est centralisée
- [ ] Responsive design fonctionne
- [ ] CORS n'empêche pas la communication

---

## 📞 Support

En cas de problème :

1. **Vérifier la console** (F12 → Console)
2. **Vérifier les logs** : chercher `✅` ou `❌`
3. **Vérifier le Network** (F12 → Network)
4. **Vérifier l'URL de l'API** dans les deux fichiers JS
5. **Relancer le serveur** si vous changez l'URL

Bon coding ! 🎉
