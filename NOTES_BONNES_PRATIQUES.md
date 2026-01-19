# Bonnes Pratiques et Organisation du Code - TP2

## 📋 Organisation du Code

### Structure de `script.js` (index.html)

```
1. IMPORTS
   - import { localCarsdata } from "./mock-data.js"

2. CONFIGURATION API
   - API_CONFIG avec baseURL et endpoints
   - Variables de configuration centralisées

3. FONCTIONS DE RÉCUPÉRATION (Fetch)
   - fetchAllCars()
   - Gestion d'erreurs avec try/catch
   - Fallback sur données locales

4. FONCTIONS DE MANIPULATION DOM
   - createCarCard(car)    // Crée un élément <article>
   - displayCars(cars)     // Affiche toutes les voitures
   - showLoading(container) // Affiche un spinner
   - showError(container, message) // Affiche une erreur

5. FONCTION D'INITIALISATION
   - init()              // Lance le chargement
   - DOMContentLoaded    // Point d'entrée

6. COMMENTAIRES ET LOGS
   - Console.log() pour déboguer
```

### Structure de `car.js` (car.html)

```
1. IMPORTS
   - import { localCarsdata } from "./mock-data.js"

2. CONFIGURATION API
   - API_CONFIG (identique à script.js)

3. FONCTIONS DE RÉCUPÉRATION
   - fetchCarById(id)     // Récupère une voiture

4. FONCTIONS DE MANIPULATION DOM
   - getCarIdFromURL()    // Extrait l'ID de l'URL
   - formatNumber(num)    // Formate les nombres
   - displayCarDetails(car) // Affiche les détails
   - showError(message)   // Affiche une erreur
   - showLoading()        // Affiche un spinner

5. FONCTION D'INITIALISATION
   - initCarPage()       // Lance le chargement
   - DOMContentLoaded    // Point d'entrée

6. COMMENTAIRES ET LOGS
   - Console.log() pour déboguer
```

---

## 🎯 Principes Appliqués

### 1. DRY (Don't Repeat Yourself)
**Concept** : Ne pas répéter le code, le réutiliser au maximum.

**Exemples dans notre code** :
- `createCarCard()` est réutilisée pour chaque voiture
- `API_CONFIG` centralisée évite de dupliquer l'URL
- `formatNumber()` réutilisable pour tous les nombres

**À ÉVITER** ❌ :
```javascript
// Mauvais - répétition
const title1 = document.createElement('h5');
const title2 = document.createElement('h5');
const title3 = document.createElement('h5');
```

**À FAIRE** ✅ :
```javascript
function createTitle(text) {
  const title = document.createElement('h5');
  title.textContent = text;
  return title;
}
```

### 2. Séparation des Préoccupations
**Concept** : Une fonction = une responsabilité unique

**Exemples** :
- `fetchAllCars()` : UNIQUEMENT la récupération
- `displayCars()` : UNIQUEMENT l'affichage
- `showLoading()` : UNIQUEMENT l'état de chargement

**À ÉVITER** ❌ :
```javascript
// Mauvais - mélange logique métier + affichage
async function loadAndDisplayCars() {
  const response = await fetch(url);
  const data = await response.json();
  const container = document.querySelector('.card-cont');
  data.forEach(car => {
    container.innerHTML += `<div>...${car.name}...</div>`;
  });
}
```

**À FAIRE** ✅ :
```javascript
// Séparation claire
async function fetchAllCars() { /* ... */ }
function displayCars(cars) { /* ... */ }
async function init() {
  const cars = await fetchAllCars();
  displayCars(cars);
}
```

### 3. Nommage Clair et Cohérent
**Convention camelCase** pour JavaScript :
- Fonctions : `fetchAllCars`, `displayCars`, `createCarCard`
- Variables : `container`, `imageUrl`, `carId`
- Constantes : `API_CONFIG`, `MAX_WIDTH`

**Noms verbeux et descriptifs** :
- ❌ `show()` → ✅ `showLoading()`
- ❌ `data` → ✅ `cars` ou `carDetails`
- ❌ `h` → ✅ `heading` ou `title`

### 4. Documentation et Commentaires
**JSDoc** pour documenter les fonctions :

```javascript
/**
 * Crée une carte de voiture
 * @param {Object} car - L'objet voiture avec id, year, brand, model, imageUrl
 * @returns {HTMLElement} L'élément article complet
 */
function createCarCard(car) {
  // ...
}
```

**Commentaires pour la structure** :
```javascript
// ==================== CONFIGURATION ====================
// ==================== FETCH FUNCTIONS ====================
// ==================== DOM MANIPULATION ====================
// ==================== INITIALISATION ====================
```

### 5. Gestion d'Erreurs Robuste
**Try/Catch autour des appels async** :

```javascript
async function fetchAllCars() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Erreur:", error);
    return []; // Fallback
  }
}
```

**Gestion des erreurs côté utilisateur** :
```javascript
async function init() {
  try {
    showLoading(container);
    const cars = await fetchAllCars();
    displayCars(cars);
  } catch (error) {
    showError(container, "Erreur lors du chargement");
  }
}
```

### 6. Performance du DOM
**DocumentFragment** pour minimiser les reflows :

```javascript
// ❌ Mauvais - 10 reflows (1 pour chaque ajout)
cars.forEach(car => {
  container.appendChild(createCarCard(car));
});

// ✅ Bon - 1 seul reflow
const fragment = document.createDocumentFragment();
cars.forEach(car => {
  fragment.appendChild(createCarCard(car));
});
container.appendChild(fragment);
```

### 7. Accessibilité (a11y)
**Attributs alt pour les images** :
```javascript
img.alt = `${car.year} ${car.brand} ${car.model}`;
```

**Texte descriptif des liens** :
```javascript
button.textContent = 'See more'; // ✅ Descriptif
// button.textContent = 'Click here'; // ❌ Vague
```

**Attributs ARIA** :
```javascript
div.className = 'spinner-border';
div.role = 'status';
span.className = 'visually-hidden';
```

### 8. Sécurité
**Éviter innerHTML avec données non validées** :

```javascript
// ❌ Risque XSS si car.title vient d'une source non fiable
title.innerHTML = car.title;

// ✅ Sûr avec createElement + textContent
const title = document.createElement('h5');
title.textContent = car.title; // Automatiquement échappé
```

---

## 🔄 Flux de Données

### Pour index.html

```
Page Charge
    ↓
DOMContentLoaded
    ↓
init()
    ↓
showLoading() → Affiche spinner
    ↓
fetchAllCars() → Appelle API
    ↓
displayCars() → Crée et affiche cartes
    ↓
Page Prête ✅
```

### Pour car.html

```
Page Charge
    ↓
DOMContentLoaded
    ↓
initCarPage()
    ↓
getCarIdFromURL() → Extrait ID
    ↓
showLoading() → Affiche spinner
    ↓
fetchCarById(id) → Appelle API
    ↓
displayCarDetails() → Remplit tableau
    ↓
Page Prête ✅
```

---

## 🧪 Debugging et Tests

### Console.log() Stratégique

```javascript
// Au démarrage
console.log("✅ script.js chargé");

// Dans les fonctions critiques
console.log("Fetching cars from:", url);
console.log("✅ Voitures récupérées:", data);
console.log("❌ Erreur:", error);
```

### Vérifier dans les DevTools (F12)

1. **Console** : Vérifier les logs et erreurs
2. **Network** : Vérifier les appels API
3. **Elements** : Vérifier le DOM généré
4. **Application** : Vérifier localStorage/sessionStorage si utilisé

---

## 🚀 Checklist de Qualité

Avant de considérer le TP comme terminé :

- [ ] Les voitures s'affichent sur index.html
- [ ] Les détails s'affichent sur car.html
- [ ] Les états de chargement (spinner) s'affichent
- [ ] Les erreurs sont bien gérées et affichées à l'utilisateur
- [ ] Aucune erreur console (F12)
- [ ] Les images ont des attributs `alt` descriptifs
- [ ] Le code est bien organisé par sections
- [ ] Les fonctions ont des commentaires JSDoc
- [ ] Les noms de variables sont clairs
- [ ] Pas de code dupliqué (DRY)
- [ ] L'API_CONFIG est centralisée
- [ ] Responsive design fonctionne (Bootstrap)

---

## 📚 Ressources et Références

### API Fetch
- `fetch(url)` retourne une Promise
- `response.ok` vérifie si le statut est 200-299
- `response.json()` parse le JSON
- `.catch()` gère les erreurs réseau

### DOM API
- `document.querySelector()` : sélectionner un élément
- `document.createElement()` : créer un élément
- `element.appendChild()` : ajouter un enfant
- `element.className` ou `classList.add()` : ajouter des classes
- `element.textContent` : insérer du texte (sécurisé)

### URLSearchParams
- `new URLSearchParams(window.location.search)`
- `.get('paramName')` : récupérer la valeur d'un paramètre

### Bootstrap Classes
- `.card`, `.card-body`, `.card-title`, `.card-text`
- `.btn`, `.btn-primary`
- `.spinner-border`
- `.alert`, `.alert-danger`

---

## 💡 Prochaines Améliorations Possibles

1. **Modal d'ajout de voiture** : Implémenter un formulaire fonctionnel
2. **Pagination** : Afficher 12 voitures par page
3. **Filtres** : Filtrer par marque, année, etc.
4. **Recherche** : Barre de recherche
5. **Favoris** : Sauvegarder en localStorage
6. **Animations** : Transitions au chargement
7. **PWA** : Service Workers et offline support
8. **Déploiement** : Héberger sur Netlify/Vercel
