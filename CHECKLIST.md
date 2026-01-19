# ✅ CHECKLIST TP2 - Frontend Cars API

## 📋 Vérification de Complétude

Utilisez cette checklist pour vérifier que tout a été implémenté correctement.

---

## 1️⃣ STRUCTURE HTML

### index.html
- [ ] La carte Ferrari en dur a été **supprimée**
- [ ] La section `.card-cont` est vide (prête pour le contenu dynamique)
- [ ] Le bouton "Add car" est en position `position-fixed bottom-0 end-0`
- [ ] Le modal Bootstrap est présent et fonctionnel
- [ ] Bootstrap 5 CSS est importé
- [ ] Script `script.js` est importé avec `type="module"`

### car.html
- [ ] Les informations Ferrari en dur sont toujours là (pour l'exemple)
- [ ] La structure HTML ressemble à `<h2>`, `<img>`, `<table>`
- [ ] Bootstrap 5 CSS est importé
- [ ] Script `car.js` est importé avec `type="module"` ✅ **IMPORTANT**

---

## 2️⃣ FICHIERS JAVASCRIPT

### front/js/script.js
- [ ] `API_CONFIG` est défini avec `baseURL` et `endpoints`
- [ ] Fonction `fetchAllCars()` existe
- [ ] Fonction `fetchCarById()` existe (même si pas utilisée ici)
- [ ] Fonction `createCarCard(car)` existe
- [ ] Fonction `displayCars(cars)` existe
- [ ] Fonction `showLoading()` existe
- [ ] Fonction `showError()` existe
- [ ] Fonction `init()` existe
- [ ] `DOMContentLoaded` déclenche `init()`

**Lignes à chercher:**
```javascript
const API_CONFIG = {
async function fetchAllCars() {
function createCarCard(car) {
function displayCars(cars) {
function showLoading(container) {
function showError(container, message) {
async function init() {
document.addEventListener('DOMContentLoaded', init);
```

### front/js/car.js
- [ ] `API_CONFIG` est défini
- [ ] Fonction `fetchCarById(id)` existe
- [ ] Fonction `getCarIdFromURL()` existe
- [ ] Fonction `formatNumber(num)` existe
- [ ] Fonction `displayCarDetails(car)` existe
- [ ] Fonction `showLoading()` existe
- [ ] Fonction `showError()` existe
- [ ] Fonction `initCarPage()` existe
- [ ] `DOMContentLoaded` déclenche `initCarPage()`

**Lignes à chercher:**
```javascript
const API_CONFIG = {
async function fetchCarById(id) {
function getCarIdFromURL() {
function formatNumber(num) {
function displayCarDetails(car) {
async function initCarPage() {
document.addEventListener('DOMContentLoaded', initCarPage);
```

---

## 3️⃣ FONCTIONNALITÉS

### Récupération de Données
- [ ] Les appels API utilisent `async`/`await`
- [ ] Les erreurs sont catchées avec `try`/`catch`
- [ ] La réponse vérifie `response.ok`
- [ ] Le cas 404 est géré
- [ ] Il existe un fallback sur `localCarsdata`

### Affichage des Voitures (index.html)
- [ ] Les cartes sont générées avec `document.createElement()`
- [ ] Chaque carte a une image avec un `alt` descriptif
- [ ] Chaque carte a un lien `car.html?id=X` pour l'image
- [ ] Chaque carte a un bouton "See more" avec un lien
- [ ] Les cartes sont ajoutées au `.card-cont` en une seule opération (DocumentFragment)

### Affichage des Détails (car.html)
- [ ] L'ID est extrait de l'URL avec `URLSearchParams`
- [ ] Si pas d'ID, un message d'erreur s'affiche
- [ ] Les détails sont insérés dans le HTML existant
- [ ] Les nombres sont formatés avec espaces (ex: "12 000")

### États et Erreurs
- [ ] Un spinner s'affiche pendant le chargement
- [ ] Un message d'erreur s'affiche en cas de problème
- [ ] Les erreurs console sont explicites (émojis + message)

---

## 4️⃣ CODE QUALITY

### Organisation
- [ ] Le code est organisé par sections (CONFIG, FETCH, DOM, INIT)
- [ ] Chaque section est marquée avec un commentaire `// =====`
- [ ] Les fonctions de fetch sont séparées des fonctions d'affichage

### Nommage
- [ ] Les noms de fonctions sont verbeux : `fetchAllCars`, `createCarCard`
- [ ] Les noms de variables sont descriptifs : `container`, `imageUrl`, `carId`
- [ ] Les constantes sont en MAJUSCULES : `API_CONFIG`

### Documentation
- [ ] Chaque fonction a un commentaire JSDoc
- [ ] Les commentaires expliquent le `@param` et `@returns`
- [ ] Les sections sont bien délimitées

### Sécurité
- [ ] `textContent` est utilisé au lieu de `innerHTML` pour les données
- [ ] Les URLs sont construites avec des variables sûres

---

## 5️⃣ BOOTSTRAP INTEGRATION

- [ ] Les classes Bootstrap sont correctes : `.card`, `.btn-primary`, etc.
- [ ] Le système de grille fonctionne : les cartes sont responsive
- [ ] Le spinner Bootstrap `.spinner-border` est utilisé
- [ ] Les alertes Bootstrap `.alert` sont utilisées

---

## 6️⃣ FICHIERS CRÉÉS

### Documentation
- [ ] `GUIDE_UTILISATION.md` - Comment utiliser l'app
- [ ] `NOTES_BONNES_PRATIQUES.md` - Principes appliqués
- [ ] `CONFIG_API.md` - Comment configurer l'URL API
- [ ] `RÉSUMÉ_COMPLET.md` - Vue d'ensemble du TP
- [ ] `CHECKLIST.md` - Ce fichier

---

## 7️⃣ TESTING

### Avant de Lancer

**Pré-requis à vérifier:**
- [ ] L'API backend est déployée sur Render
- [ ] L'URL de l'API est connue
- [ ] L'URL de l'API est insérée dans `API_CONFIG.baseURL`

### Lancer l'App

**Sur votre machine:**
```bash
cd cars-front/front
python -m http.server 8000
```

Puis ouvrir : `http://localhost:8000`

### Vérifications

**Console (F12 → Console):**
- [ ] ✅ `script.js chargé` s'affiche
- [ ] ✅ `Fetching cars from: https://...` s'affiche
- [ ] ✅ `✅ Voitures récupérées: [Array(...)]` s'affiche
- [ ] ❌ Pas d'erreurs rouges

**Network (F12 → Network):**
- [ ] L'appel `/api/cars` retourne 200
- [ ] La réponse contient un tableau de voitures
- [ ] Aucune erreur CORS

**Visuel:**
- [ ] Les cartes s'affichent avec images
- [ ] Les titres sont au format "YYYY Brand Model"
- [ ] Les descriptions s'affichent
- [ ] Le responsive fonctionne (redimensionner le navigateur)

### Tests Interactifs

**Index.html:**
- [ ] Cliquer sur une image redirige vers `car.html?id=X`
- [ ] Cliquer sur "See more" redirige vers `car.html?id=X`
- [ ] Le bouton "Add car" ouvre le modal
- [ ] Fermer le modal fonctionne

**Car.html?id=1:**
- [ ] Le titre s'affiche correctement
- [ ] L'image s'affiche
- [ ] Le tableau est rempli avec les bonnes données
- [ ] Les nombres sont formatés (ex: "12 000 km")
- [ ] Le lien "Back Home" ramène à index.html
- [ ] Changer l'ID dans l'URL charge la bonne voiture

**Gestion d'Erreurs:**
- [ ] `car.html` sans paramètre affiche une erreur
- [ ] `car.html?id=999` affiche une erreur (voiture inexistante)
- [ ] Si l'API est arrêtée, un message d'erreur s'affiche

---

## 8️⃣ PERFORMANCE

- [ ] Pas de reflows multiples : utilisation de DocumentFragment
- [ ] Les fonctions sont réutilisables
- [ ] Pas de code dupliqué
- [ ] Les données sont fetchées une seule fois

---

## 9️⃣ ACCESSIBILITÉ

- [ ] Chaque image a un `alt` descriptif
- [ ] Les liens ont un texte significatif ("See more", pas "Cliquez ici")
- [ ] Les spinners ont `role="status"` et `class="visually-hidden"`
- [ ] Les contrastes de couleur sont suffisants

---

## 🔟 DÉPLOIEMENT READY

- [ ] `API_CONFIG.baseURL` est configurée avec l'URL Render
- [ ] Pas d'erreurs en console
- [ ] Le responsive design fonctionne sur mobile/tablet/desktop
- [ ] Les deux pages (index.html et car.html) fonctionnent
- [ ] Prêt pour Netlify/Vercel

---

## 📊 RÉSUMÉ VISUEL

```
┌─────────────────────────────────────────────────┐
│            TP2 IMPLÉMENTATION                   │
├─────────────────────────────────────────────────┤
│ ✅ ÉTAPE 1 : Structure HTML                     │
│ ✅ ÉTAPE 2 : Fetch API                         │
│ ✅ ÉTAPE 3 : DOM Manipulation                  │
│ ✅ ÉTAPE 4 : Bonnes Pratiques                  │
├─────────────────────────────────────────────────┤
│ 📁 Fichiers modifiés:    3                      │
│ 📝 Fichiers créés:       5                      │
│ 🔧 Fonctions:            12+                    │
│ 📖 Documentation:        400+ lignes            │
├─────────────────────────────────────────────────┤
│              STATUS: ✅ COMPLET                  │
└─────────────────────────────────────────────────┘
```

---

## 🎯 Points d'Attention Finaux

### CRUCIAL ⚠️
1. **URL API**: Assurez-vous d'avoir changé l'URL dans les deux fichiers JS
2. **Script car.js**: Vérifiez que `car.html` a bien `<script type="module">`
3. **CORS**: Si vous avez une erreur CORS, configurez-le côté backend

### À Vérifier dans DevTools
- Console: pas d'erreurs rouges
- Network: appels API OK (200)
- Elements: DOM généré correctement

### Avant de Rendre
- [ ] Tout fonctionne en local
- [ ] API_CONFIG.baseURL est correcte
- [ ] Aucune erreur console
- [ ] Les deux pages fonctionnent
- [ ] Responsive design OK

---

## 📞 Si Ça Ne Marche Pas

1. **Vérifier la console** (F12 → Console)
2. **Vérifier le Network** (F12 → Network)
3. **Vérifier l'URL API** (dans les deux JS)
4. **Relancer le serveur** (`Ctrl+C` puis relancer)
5. **Vider le cache** (Ctrl+Shift+Delete)
6. **Tester avec `fetch()` en console:**
   ```javascript
   fetch('https://votre-api.onrender.com/api/cars')
     .then(r => r.json())
     .then(d => console.log(d))
   ```

---

**Bon courage ! 🚀 Vous êtes prêt(e) à soumettre votre TP2 ! ✨**
