# 📌 Quick Reference - TP2 Cars Frontend

Aide-mémoire rapide pour les développeurs.

---

## 🚀 Démarrage Rapide

```bash
# 1. Cloner le repo
git clone <url>
cd cars-front

# 2. Lancer serveur local
python -m http.server 8000

# 3. Ouvrir navigateur
http://localhost:8000/front/

# 4. Vérifier console (F12)
# Aucune erreur? Parfait!
```

---

## 📁 Structure Fichiers

```
front/
├── index.html          ← Page accueil
├── car.html            ← Page détails
├── css/style.css       ← Styles
└── js/
    ├── config.js       ← Config API
    ├── api.js          ← Requêtes Fetch
    ├── validation.js   ← Validation
    ├── dom.js          ← DOM functions
    ├── home.js         ← Logic page 1
    └── car-details.js  ← Logic page 2
```

---

## 🔧 API Endpoints

| Méthode | URL | Fonction |
|---------|-----|----------|
| GET | `/api/cars` | Récupérer toutes les voitures |
| GET | `/api/cars/:id` | Récupérer une voiture |
| POST | `/cars` | Créer une voiture |
| DELETE | `/cars/:id` | Supprimer une voiture |

**Base URL:** `http://localhost:3000`

**Header requis pour POST/DELETE:**
```
x-api-key: ma-super-cle-api-2025
```

---

## 📝 Formulaire (index.html)

### Champs Requis
- `brand` (text) - Marque
- `model` (text) - Modèle
- `year` (number) - Année (1900-actuel)
- `color` (text) - Couleur
- `price` (number) - Prix (≥ 0)
- `mileage` (number) - Kilométrage (≥ 0)

### Champs Optionnels
- `description` (textarea)
- `imageUrl` (url)

---

## 🎨 Bootstrap Classes Utilisées

| Classe | Usage |
|--------|-------|
| `card` | Conteneur voiture |
| `card-img-top` | Image top |
| `card-body` | Contenu carte |
| `btn btn-primary` | Bouton voir détails |
| `btn btn-danger` | Bouton supprimer |
| `alert alert-success` | Message succès |
| `alert alert-danger` | Message erreur |
| `d-none` | Masquer élément |
| `spinner-border` | Loader |

---

## 💻 Fonctions Principales

### Fetch

```javascript
import { fetchAllCars, fetchCarById, createCar, deleteCar } from './api.js';

// Récupérer toutes les voitures
const cars = await fetchAllCars();

// Récupérer une voiture
const car = await fetchCarById(1);

// Créer une voiture
const newCar = await createCar({
  brand: "Ferrari",
  model: "250 GTO",
  year: 1962,
  color: "Red",
  price: 10000000,
  mileage: 50000,
  description: "Classic",
  imageUrl: "https://..."
});

// Supprimer une voiture
await deleteCar(1);
```

### Validation

```javascript
import { validateCarData } from './validation.js';

const { isValid, errors } = validateCarData(data);
if (!isValid) {
  console.log(errors); // Array d'erreurs
}
```

### DOM

```javascript
import { displayCars, showLoading, showError, showSuccess } from './dom.js';

displayCars(cars);           // Affiche liste
showLoading(container);      // Spinner
showError(container, "Msg"); // Erreur
showSuccess(container, "Msg"); // Succès
```

---

## 🧪 Tests Rapides

### Test Affichage
1. Ouvrir http://localhost:8000/front/
2. Voir 3+ voitures ✅

### Test Création
1. Cliquer "Ajouter une voiture"
2. Remplir formulaire
3. Cliquer "Ajouter"
4. Voir nouvelle voiture ✅

### Test Suppression
1. Cliquer trash sur une voiture
2. Confirmer
3. Voiture disparaît ✅

### Test Détails
1. Cliquer "See more"
2. Voir car.html?id=X
3. Détails affichés ✅

---

## 🐛 Déboguer

### Console (F12 → Console)
Checker pour erreurs JavaScript

### Network (F12 → Network)
Vérifier requêtes API:
- Status 200 = Succès
- Status 404 = Pas trouvé
- Status 500 = Erreur serveur
- CORS error = Configuration backend

### Sources (F12 → Sources)
Mettre des breakpoints:
```javascript
debugger; // S'arrête ici quand console ouverte
```

---

## 📦 Import/Export

### Exporter une fonction
```javascript
// api.js
export const fetchAllCars = async () => { ... }
```

### Importer une fonction
```javascript
// home.js
import { fetchAllCars } from './api.js';
const cars = await fetchAllCars();
```

### Import/Export multiples
```javascript
// Exporter
export { func1, func2, func3 };

// Importer
import { func1, func2, func3 } from './file.js';
```

---

## 🔐 Sécurité

### API Key
```javascript
headers: {
  "x-api-key": "ma-super-cle-api-2025"
}
```

### Validation Données
Toujours valider côté client:
```javascript
const { isValid, errors } = validateCarData(data);
if (!isValid) return; // Ne pas envoyer à l'API
```

### CORS
L'API doit avoir:
```javascript
app.use(cors({
  origin: ['http://localhost:3000']
}));
```

---

## 📱 Responsive

Bootstrap gère le responsive:
- ✅ Mobile (< 576px)
- ✅ Tablet (576px - 992px)
- ✅ Desktop (> 992px)

Flexbox pour layouts:
```html
<div class="d-flex gap-2">
  <button class="btn btn-primary flex-grow-1">See more</button>
  <button class="btn btn-danger">Delete</button>
</div>
```

---

## 🎯 Checklist Avant Déployer

- [ ] npm run build (si applicable)
- [ ] Tests réussis
- [ ] Pas d'erreurs console
- [ ] Mobile responsive OK
- [ ] API key sécurisée (variables d'env)
- [ ] CORS configuré
- [ ] Documentation à jour
- [ ] git commit + push

---

## 🚀 Déploiement

### GitHub Pages
```bash
git push origin main
# Va à Settings → Pages
# Build: Deploy from branch
# Branch: main
# URL: username.github.io/cars-front
```

### Netlify
1. Connecter repo
2. Build: `npm run build` (ou rien pour static)
3. Publish: `front/`
4. Déployer

### Vercel
1. Importer repo
2. Root: `front/`
3. Déployer

---

## 📚 Documentation

| Fichier | Contenu |
|---------|---------|
| INDEX.md | Guide complet |
| STEP5-6-FORM-DELETE.md | Étapes 5-6 |
| STEP7-REFACTORING.md | Modules |
| STEP8-DEPLOYMENT.md | Déploiement |
| COMPLETE_SUMMARY.md | Résumé final |
| FICHIERS_CREES.md | Fichiers modifiés |

---

## 🆘 Problèmes Courants

### "404 Not Found"
```
→ Vérifier baseURL dans config.js
→ Vérifier que l'API est lancée
→ Vérifier les endpoints
```

### "CORS error"
```
→ Backend doit avoir app.use(cors())
→ Vérifier origin en configuration
```

### "Module not found"
```
→ Vérifier chemins: './api.js' pas 'api.js'
→ Vérifier type="module" sur script
```

### "Formulaire ne s'envoie pas"
```
→ Vérifier que tous champs requis sont remplis
→ Vérifier validation: année, prix, mileage
→ Vérifier id="carForm" sur form
→ Vérifier form="carForm" sur submit button
```

---

## 💡 Tips & Tricks

### Voir les données envoyées
```javascript
console.log(JSON.stringify(payload, null, 2));
// Affiche JSON formaté
```

### Tester l'API directement
```bash
# Dans le navigateur (onglet Network)
# Ou avec curl:
curl http://localhost:3000/api/cars

# Ou avec Postman
```

### Récupérer data du formulaire
```javascript
const formData = new FormData(form);
const data = {
  brand: formData.get('brand'),
  model: formData.get('model'),
  // ...
};
```

### Ajouter un spinner au bouton
```javascript
button.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Loading...';
button.disabled = true;
```

---

## 🔄 Workflow Dev

```
1. Faire changement dans VS Code
2. Save (Ctrl+S)
3. Navigateur rafraîchit (Live Server)
4. F12 pour vérifier console
5. Tester la feature
6. git add . && git commit -m "Message"
7. git push
```

---

## 📊 Métrique de Succès

- [x] Page charge < 3s
- [x] Aucune erreur console
- [x] Toutes les features fonctionnent
- [x] Responsive sur mobile
- [x] Code lisible et commenté
- [x] Documentation complète

---

## 🎓 Prochaines Étapes

1. Tests automatisés (Jest)
2. CI/CD (GitHub Actions)
3. Édition (PUT)
4. Recherche/Filtrage
5. PWA (Service Workers)

---

**Quick Reference v1.0 - TP2 Cars Frontend**

*Mise à jour: 2024*

