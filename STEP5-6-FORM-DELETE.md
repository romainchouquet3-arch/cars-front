# Steps 5-6: Formulaire & Suppression de Voitures

## 📝 Étape 5: Gestion des Formulaires et Création de Voitures

### 5.1 - Formulaire dans le Modal
Le modal contient maintenant un formulaire HTML5 complet avec 8 champs :

**Champs Requis:**
- **Marque** (brand) - Text input
- **Modèle** (model) - Text input
- **Année** (year) - Number input (1900-2099)
- **Couleur** (color) - Text input
- **Prix** (price) - Number input (≥ 0, step 100)
- **Kilométrage** (mileage) - Number input (≥ 0, step 1000)

**Champs Optionnels:**
- **Description** - Textarea
- **URL Image** - URL input

### 5.2 - Validation des Données
Fonction `validateCarData(data)` qui valide:
- ✅ Les 6 champs requis ne sont pas vides
- ✅ L'année est entre 1900 et l'année actuelle
- ✅ Prix et kilométrage sont positifs
- ✅ L'URL image (si fournie) est valide

Retourne: `{ isValid: boolean, errors: string[] }`

### 5.3 - Fonction createCar()
```javascript
const createCar = async (carData) => {
  // Validation automatique
  // Headers: Content-Type: application/json, x-api-key: ma-super-cle-api-2025
  // POST /cars avec payload JSON
  // Gestion des erreurs avec messages détaillés
}
```

### 5.4 - Soumission du Formulaire
`handleFormSubmit(event)` gère:
- Récupération des données avec FormData API
- Validation et création via `createCar()`
- Messages d'erreur affichés dans `.formError`
- Loading state du bouton pendant la requête

### 5.5 - Après Création
- ✅ Modal fermé automatiquement
- ✅ Formulaire réinitialisé
- ✅ Message de succès affiché
- ✅ Liste des voitures rafraîchie

---

## 🗑️ Étape 6: Suppression de Voitures

### 6.1 - Bouton de Suppression
Chaque carte contient maintenant un bouton "Delete" (icône trash):
```html
<button class="btn btn-danger delete-btn" title="Supprimer cette voiture">
  <i class="bi bi-trash"></i>
</button>
```

### 6.2 - Fonction deleteCar()
```javascript
const deleteCar = async (carId) => {
  // DELETE /cars/:id
  // Header: x-api-key: ma-super-cle-api-2025
  // Gestion des erreurs
}
```

### 6.3 - Event Delegation
```javascript
container.addEventListener('click', (e) => {
  if (e.target.closest('.delete-btn')) {
    const carId = e.target.closest('article').dataset.carId;
    handleDeleteCar(carId, cardElement);
  }
});
```

**Avantages:**
- ✅ Un seul event listener au lieu de N listeners
- ✅ Fonctionne même si les cartes sont ajoutées dynamiquement
- ✅ Meilleure performance

### 6.4 - Confirmation Utilisateur
```javascript
if (!confirm("Êtes-vous sûr de vouloir supprimer cette voiture ?")) {
  return; // Annuler
}
```

### 6.5 - Animation de Suppression
```javascript
cardElement.style.opacity = "0";
cardElement.style.transform = "scale(0.95)";
setTimeout(() => cardElement.remove(), 300);
```

---

## 🔒 Authentification

Toutes les requêtes POST/DELETE incluent l'en-tête:
```javascript
headers: {
  "x-api-key": "ma-super-cle-api-2025"
}
```

---

## 📊 Structure du Formulaire

```
Modal (id="exampleModal")
├── Modal Header
│   └── Titre: "Ajouter une nouvelle voiture"
├── Modal Body
│   └── Form (id="carForm")
│       ├── Brand (text, required)
│       ├── Model (text, required)
│       ├── Year (number, required, 1900-2099)
│       ├── Color (text, required)
│       ├── Price (number, required, ≥ 0)
│       ├── Mileage (number, required, ≥ 0)
│       ├── Description (textarea, optional)
│       ├── ImageUrl (url, optional)
│       └── Error Alert (d-none by default)
└── Modal Footer
    ├── Bouton "Annuler" (data-bs-dismiss="modal")
    └── Bouton "Ajouter la voiture" (submit, id="submitCarBtn")
```

---

## 🎯 Flux d'Utilisation

### Pour ajouter une voiture:
1. Utilisateur clique sur "Ajouter une voiture" (bouton dans navbar)
2. Modal s'ouvre avec formulaire vierge
3. Utilisateur remplit les champs requis
4. Utilisateur clique "Ajouter la voiture"
5. Validation automatique
6. Requête POST à l'API
7. Modal fermé, liste rafraîchie, message de succès

### Pour supprimer une voiture:
1. Utilisateur clique sur l'icône trash dans une carte
2. Confirmation: "Êtes-vous sûr ?"
3. Requête DELETE à l'API
4. Carte supprimée avec animation
5. Message de succès

---

## 🚀 Fonctionnalités Implémentées

✅ Formulaire complet avec 8 champs  
✅ Validation côté client  
✅ Création de voitures (POST)  
✅ Suppression de voitures (DELETE)  
✅ Event delegation pour efficacité  
✅ Animations de suppression  
✅ Messages d'erreur détaillés  
✅ Messages de succès avec dismiss automatique  
✅ Loading states des boutons  
✅ Authentification API key  

---

## 📝 Prochaines Étapes

- **Étape 7**: Refactorisation du code en modules (config.js, api.js, dom.js, utils.js)
- **Étape 8**: Déploiement (GitHub Pages, Netlify, Vercel)

