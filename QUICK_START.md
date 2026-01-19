# 🚀 QUICK START - TP2 Cars Frontend

## ⚡ 5 Minutos pour Démarrer

### 1️⃣ Cloner/Ouvrir le Projet

```bash
cd c:\Users\romai\OneDrive\Documents\Ecole\API\ 2\tp2\cars-front
```

### 2️⃣ Configurer l'API

**Ouvrir `front/js/script.js` et `front/js/car.js`**

Changer :
```javascript
baseURL: "http://localhost:3000"
```

En :
```javascript
baseURL: "https://votre-api.onrender.com"  // Votre URL réelle
```

### 3️⃣ Lancer un Serveur Local

```bash
cd front
python -m http.server 8000
```

Ou avec Node.js :
```bash
npx http-server
```

### 4️⃣ Ouvrir dans le Navigateur

```
http://localhost:8000
```

### 5️⃣ Tester

- ✅ Les voitures s'affichent ?
- ✅ Clicker sur une carte redirige vers car.html?id=X ?
- ✅ La page détail affiche les infos ?
- ✅ Pas d'erreurs en console (F12) ?

---

## 📁 Fichiers Clés

| Fichier | Rôle |
|---------|------|
| `front/js/script.js` | Affichage liste (index.html) |
| `front/js/car.js` | Affichage détail (car.html) |
| `front/index.html` | Page d'accueil |
| `front/car.html` | Page de détail |
| `GUIDE_UTILISATION.md` | Documentation complète |
| `CONFIG_API.md` | Configuration API |
| `CHECKLIST.md` | Vérification |

---

## 🔧 Configuration API

### Localiser votre URL API

L'URL ressemble à :
```
https://voitures-api.onrender.com
```

Elle vous a été fournie lors du déploiement du TP Backend.

### Mettre à Jour Partout

**Fichier 1 : script.js (ligne ~4)**
```javascript
const API_CONFIG = {
  baseURL: "https://voitures-api.onrender.com",  // ← VOTRE URL
```

**Fichier 2 : car.js (ligne ~4)**
```javascript
const API_CONFIG = {
  baseURL: "https://voitures-api.onrender.com",  // ← VOTRE URL
```

### Vérifier

Ouvrir DevTools (F12) → Console

Vous devriez voir :
```
✅ script.js chargé - Page d'accueil initialisée
Fetching cars from: https://voitures-api.onrender.com/api/cars
✅ Voitures récupérées: [Array(5)]
```

---

## 🎯 Résultats Attendus

### index.html
```
┌─────────────────────────────────┐
│        Classic Cars             │  ← Navbar
├─────────────────────────────────┤
│ 🚗 Card 1  │ 🚗 Card 2  │ ...   │  ← Cartes générées
│            │            │       │
├─────────────────────────────────┤
│                    [Add car]    │  ← Bouton fixe
└─────────────────────────────────┘
```

### car.html?id=1
```
┌─────────────────────────────────┐
│   1962 Ferrari 250 GTO          │  ← Titre
├─────────────────────────────────┤
│ [Image] │ Year:     1962         │
│         │ Make:     Ferrari      │
│         │ Model:    250 GTO      │
│         │ Color:    Red          │
│         │ Mileage:  12 000 km    │
│         │ Price:    45 000 000 € │
└─────────────────────────────────┘
```

---

## 🧪 Debugging

### Problème : Aucune voiture ne s'affiche

```javascript
// Console (F12)
console.log(API_CONFIG.baseURL);  // Vérifier l'URL
fetch(API_CONFIG.baseURL + '/api/cars')  // Tester directement
  .then(r => r.json())
  .then(d => console.log(d));
```

### Problème : CORS Error

**Message:**
```
Access to fetch at '...' has been blocked by CORS policy
```

**Solution:** Configurer CORS côté backend pour autoriser votre domaine.

### Problème : Images ne s'affichent pas

Vérifier que `car.imageUrl` n'est pas `null`:
```javascript
fetch('https://voiture-api.onrender.com/api/cars')
  .then(r => r.json())
  .then(cars => {
    cars.forEach(car => {
      console.log(car.imageUrl);  // Doit avoir une URL
    });
  });
```

---

## 📱 Tester le Responsive

**F12 → Ctrl+Shift+M** (Toggle device toolbar)

- Mobile : 1 colonne
- Tablet : 2 colonnes
- Desktop : 3 colonnes

---

## 🚀 Déployer

### Sur Netlify

1. Créer un compte : https://netlify.com
2. Connecter votre repo GitHub
3. Déployer automatiquement

### Sur Vercel

1. Créer un compte : https://vercel.com
2. Importer le repo GitHub
3. Déployer

**IMPORTANT:** Avant de déployer, vérifier que `API_CONFIG.baseURL` est l'URL Render publique.

---

## 📚 Documentation Complète

- **[GUIDE_UTILISATION.md](GUIDE_UTILISATION.md)** - Comment utiliser l'app
- **[CONFIG_API.md](CONFIG_API.md)** - Configuration détaillée
- **[NOTES_BONNES_PRATIQUES.md](NOTES_BONNES_PRATIQUES.md)** - Principes appliqués
- **[RÉSUMÉ_COMPLET.md](RÉSUMÉ_COMPLET.md)** - Vue d'ensemble
- **[CHECKLIST.md](CHECKLIST.md)** - Vérification complète
- **[AVANT_APRÈS.md](AVANT_APRÈS.md)** - Comparaison

---

## ✅ Checklist Rapide

- [ ] URL API configurée dans `script.js`
- [ ] URL API configurée dans `car.js`
- [ ] Serveur local lancé (`python -m http.server 8000`)
- [ ] Navigateur ouvert sur `http://localhost:8000`
- [ ] Voitures s'affichent
- [ ] Pas d'erreurs en console (F12)
- [ ] Navigation vers car.html?id=X fonctionne
- [ ] Page détail affiche les infos
- [ ] Responsive design fonctionne

---

## 💡 Tips Utiles

**Relancer le serveur après changement d'URL:**
```bash
Ctrl+C      # Arrêter
python -m http.server 8000  # Relancer
```

**Vider le cache du navigateur:**
```
Ctrl+Shift+Delete
```

**Voir les vraies requêtes API:**
```
F12 → Network → Recharger la page (F5)
```

**Tester rapidement:**
```javascript
// Console
fetchAllCars().then(cars => console.table(cars));
```

---

## 🎓 Concepts Utilisés

- ✅ Fetch API pour les requêtes HTTP
- ✅ async/await pour le code lisible
- ✅ try/catch pour la gestion d'erreurs
- ✅ createElement() pour créer du HTML
- ✅ addEventListener() pour l'initialisation
- ✅ DocumentFragment pour la performance
- ✅ URLSearchParams pour les query params
- ✅ Bootstrap 5 pour le design

---

## 🤔 Questions Fréquentes

**Q: L'API est en local, dois-je changer l'URL ?**
```javascript
baseURL: "http://localhost:3000"  // API locale
```

**Q: Pourquoi aucune donnée ne s'affiche ?**
1. Vérifier `API_CONFIG.baseURL` est correct
2. Vérifier l'API backend est en ligne
3. Vérifier CORS est configuré
4. Voir console (F12) pour les erreurs

**Q: Comment ajouter une nouvelle voiture ?**
Implémenter le formulaire du modal (prochaine étape)

**Q: Comment modifier le nombre de colonnes ?**
Éditer `front/index.html` et les classes Bootstrap

---

## 📞 Aide

En cas de blocage :

1. **Vérifier la console** (F12 → Console)
2. **Vérifier le Network** (F12 → Network)
3. **Vérifier l'URL API** (dans les deux JS)
4. **Relancer le serveur** (Ctrl+C + relancer)
5. **Vider le cache** (Ctrl+Shift+Delete)

---

**Bon coding ! 🎉**

Vous êtes prêt(e) à utiliser cette application !
