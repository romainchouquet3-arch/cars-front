# Configuration API - TP2 Cars Frontend

## 🔧 Configuration Requise

Pour que l'application fonctionne correctement, vous devez configurer l'URL de votre API.

### Étapes de Configuration

#### 1. Identifier l'URL de votre API Backend

Votre API backend est déployée sur Render. Trouvez son URL :
- Exemple : `https://voitures-api.onrender.com`
- Elle était probablement fournie lors du déploiement

#### 2. Mettre à Jour script.js

Fichier : `front/js/script.js`

Trouvez cette section :
```javascript
const API_CONFIG = {
  baseURL: "http://localhost:3000",  // ← CHANGER CET URL
  endpoints: {
    cars: "/api/cars",
    carById: (id) => `/api/cars/${id}`
  }
};
```

Remplacez par :
```javascript
const API_CONFIG = {
  baseURL: "https://voitures-api.onrender.com",  // Votre URL Render
  endpoints: {
    cars: "/api/cars",
    carById: (id) => `/api/cars/${id}`
  }
};
```

#### 3. Mettre à Jour car.js

Fichier : `front/js/car.js`

Même processus - cherchez `API_CONFIG` et remplacez l'URL.

#### 4. Vérifier les Endpoints de l'API

Assurez-vous que votre backend a ces endpoints :
- `GET /api/cars` → Retourne un tableau de voitures
- `GET /api/cars/:id` → Retourne les détails d'une voiture

Si vos endpoints sont différents (ex: `/cars` au lieu de `/api/cars`), modifiez les chemins dans `endpoints`.

### ✅ Vérifier la Configuration

1. Ouvrez `index.html` dans un navigateur
2. Appuyez sur `F12` pour ouvrir DevTools
3. Allez à la Console
4. Vous devriez voir :
   ```
   ✅ script.js chargé - Page d'accueil initialisée
   Fetching cars from: https://voitures-api.onrender.com/api/cars
   ```

5. Si l'API répond, vous verrez aussi :
   ```
   ✅ Voitures récupérées: [Array(5)]
   ```

### ⚠️ Problèmes Courants

#### CORS Error

**Message d'erreur:**
```
Access to fetch at 'https://...' has been blocked by CORS policy
```

**Solution:**
- Configurez CORS côté backend pour accepter les requêtes du frontend
- Exemple Node.js :
  ```javascript
  app.use(cors({
    origin: ['http://localhost:8000', 'https://votre-frontend.netlify.app']
  }));
  ```

#### 404 Not Found

**Message d'erreur:**
```
Erreur HTTP: 404 Not Found
```

**Vérifications:**
- L'API est-elle déployée et en ligne ?
- L'endpoint `/api/cars` existe-t-il ?
- L'URL est-elle correcte (pas de typo) ?

#### Pas de données

**Si vous voyez un message "Aucune voiture disponible":**
- L'API retourne un tableau vide
- Allez vérifier votre base de données backend
- Assurez-vous que les voitures sont bien enregistrées

### 🔄 Configuration pour le Développement Local

Si vous testez en local :

```javascript
const API_CONFIG = {
  baseURL: "http://localhost:3000",  // Backend local
  endpoints: {
    cars: "/api/cars",
    carById: (id) => `/api/cars/${id}`
  }
};
```

Assurez-vous que :
1. Le backend Node.js est démarré : `npm start`
2. Il écoute sur le port `3000`
3. CORS est configuré pour `http://localhost:8000` (frontend)

### 🚀 Configuration pour la Production

Quand vous déployez sur Netlify/Vercel :

```javascript
const API_CONFIG = {
  baseURL: "https://votre-api.onrender.com",  // Backend en production
  endpoints: {
    cars: "/api/cars",
    carById: (id) => `/api/cars/${id}`
  }
};
```

Assurez-vous que :
1. L'URL de votre API est publique et accessible
2. CORS autorise les requêtes depuis votre domaine Netlify/Vercel
3. Les données sont persistées côté backend

### 📝 Variables d'Environnement (Avancé)

Pour gérer plusieurs environnements (dev, staging, prod), vous pouvez :

**Option 1 : Utiliser des fichiers de configuration**

```javascript
// config.js
const ENV = process.env.NODE_ENV || 'development';

const CONFIG = {
  development: {
    baseURL: 'http://localhost:3000'
  },
  production: {
    baseURL: 'https://voiture-api.onrender.com'
  }
};

export default CONFIG[ENV];
```

**Option 2 : Variables d'environnement Netlify**

1. Dans Netlify, aller à Settings → Build & deploy → Environment
2. Ajouter une variable : `VITE_API_URL=https://voiture-api.onrender.com`
3. Dans le code : `const apiUrl = import.meta.env.VITE_API_URL`

### 💡 Tips Utiles

**Tester rapidement différentes URLs :**
```javascript
// Dans la console du navigateur
API_CONFIG.baseURL = 'https://autre-url.onrender.com';
// Puis recharger la page
```

**Afficher la configuration actuelle :**
```javascript
console.log(API_CONFIG);
```

**Vérifier la réponse de l'API :**
```javascript
fetch(`${API_CONFIG.baseURL}${API_CONFIG.endpoints.cars}`)
  .then(r => r.json())
  .then(data => console.log(data));
```

### 📞 Besoin d'Aide ?

Si les données ne s'affichent pas :
1. Vérifier que `API_CONFIG.baseURL` est correct
2. Vérifier que les `endpoints` correspondent à votre API
3. Ouvrir DevTools (F12) → Network pour voir les erreurs
4. Vérifier que l'API backend répond correctement
