// ========================
// js/script.js
// ========================
import { API_CONFIG } from "./config.js";

// --- 1. FONCTIONS API ---

async function fetchAllCars() {
    try {
        const response = await fetch(`${API_CONFIG.baseURL}${API_CONFIG.endpoints.cars}`);
        if (!response.ok) throw new Error("Erreur HTTP");
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}

async function fetchCarById(id) {
    try {
        const response = await fetch(`${API_CONFIG.baseURL}${API_CONFIG.endpoints.carById(id)}`);
        if (response.status === 404) return null;
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}

// Fonction pour ajouter une voiture (POST)
async function createCar(carData) {
    try {
        const url = `${API_CONFIG.baseURL}${API_CONFIG.endpoints.cars}`;
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(carData)
        });
        if (!response.ok) throw new Error("Erreur lors de l'ajout");
        return await response.json();
    } catch (error) {
        console.error("Erreur createCar:", error);
        alert("Erreur lors de l'ajout. Vérifiez que le serveur est bien lancé.");
        return null;
    }
}

// --- 2. FONCTIONS DOM ---

function showLoading(container) {
    if(container) container.innerHTML = '<div class="text-center my-5"><div class="spinner-border text-primary"></div><p class="mt-2">Chargement...</p></div>';
}

function createCarCard(car) {
    const article = document.createElement('article');
    article.className = 'card shadow-sm'; // Classes correspondant à votre CSS
    
    // Gestion de l'image
    const imageUrl = (car.imageUrl && car.imageUrl.startsWith('http')) ? car.imageUrl : 'https://via.placeholder.com/300x200?text=No+Image';

    article.innerHTML = `
        <a href="car.html?id=${car.id}">
            <img src="${imageUrl}" class="card-img-top object-fit-fill" alt="${car.brand} ${car.model}">
        </a>
        <div class="card-body">
            <h5 class="card-title">${car.brand} ${car.model}</h5>
            <p class="card-text text-truncate">${car.description || 'Pas de description'}</p>
            <div class="d-flex justify-content-between align-items-center">
                <span class="fw-bold text-primary">${car.price} €</span>
                <a href="car.html?id=${car.id}" class="btn btn-primary">See more</a>
            </div>
        </div>
    `;
    return article;
}

function displayCars(cars) {
    const container = document.querySelector('.card-cont');
    if (!container) return;
    
    container.innerHTML = ''; 
    
    if (!cars || cars.length === 0) {
        container.innerHTML = '<div class="alert alert-warning w-100 text-center">Aucune voiture disponible.</div>';
        return;
    }
    
    const fragment = document.createDocumentFragment();
    cars.forEach(car => fragment.appendChild(createCarCard(car)));
    container.appendChild(fragment);
}

function displayCarDetails(car, container) {
    if (!container) return;
    const imageUrl = (car.imageUrl && car.imageUrl.startsWith('http')) ? car.imageUrl : 'https://via.placeholder.com/600x400?text=No+Image';
    
    // On remplace le contenu de l'article existant ou on l'injecte dans le conteneur
    container.innerHTML = `
        <article class="p-5 text-center bg-body-tertiary rounded-3">
            <h2 class="text-body-emphasis mb-5">${car.year} ${car.brand} ${car.model}</h2>
            <div class="row">
                <div class="col-12 col-lg-6">
                    <img src="${imageUrl}" class="img-fluid rounded shadow-sm" alt="${car.model}">
                </div>
                <div class="col-12 col-lg-6 p-2 text-start">
                    <h3 class="mb-3">Spécifications</h3>
                    <table class="table table-striped">
                        <tbody>
                            <tr><th scope="row">Marque</th><td>${car.brand}</td></tr>
                            <tr><th scope="row">Modèle</th><td>${car.model}</td></tr>
                            <tr><th scope="row">Année</th><td>${car.year}</td></tr>
                            <tr><th scope="row">Couleur</th><td>${car.color}</td></tr>
                            <tr><th scope="row">Kilométrage</th><td>${car.mileage} km</td></tr>
                            <tr><th scope="row">Prix</th><td class="fw-bold">${car.price} €</td></tr>
                            <tr><th scope="row">Description</th><td>${car.description || '-'}</td></tr>
                        </tbody>
                    </table>
                    <div class="mt-4 text-center">
                         <a class="btn btn-secondary" href="./index.html">Retour à l'accueil</a>
                    </div>
                </div>
            </div>
        </article>
    `;
}

// --- 3. INITIALISATION ---

async function init() {
    const isDetailsPage = window.location.pathname.includes('car.html');
    // On cherche le conteneur principal (.card-cont pour l'accueil, .container pour le détail)
    const listContainer = document.querySelector('.card-cont');
    const detailContainer = document.querySelector('main .container');

    if (isDetailsPage) {
        // === PAGE DÉTAIL ===
        if(detailContainer) showLoading(detailContainer);
        
        const params = new URLSearchParams(window.location.search);
        const id = params.get('id');
        
        if (id) {
            const car = await fetchCarById(id);
            if(car) {
                displayCarDetails(car, detailContainer);
            } else {
                detailContainer.innerHTML = '<div class="alert alert-danger">Voiture introuvable.</div>';
            }
        }
    } else {
        // === PAGE ACCUEIL ===
        if (listContainer) {
            showLoading(listContainer);
            const cars = await fetchAllCars();
            displayCars(cars);

            // === GESTION DU FORMULAIRE D'AJOUT ===
            // ⚠️ CORRECTION ICI : Utilisation du bon ID 'carForm'
            const form = document.getElementById('carForm'); 
            
            if (form) {
                form.addEventListener('submit', async (event) => {
                    event.preventDefault(); // Empêche le rechargement de la page
                    event.stopPropagation();

                    // Validation Bootstrap basique
                    if (!form.checkValidity()) {
                        form.classList.add('was-validated');
                        return;
                    }

                    // 1. Récupération de TOUS les champs
                    const carData = {
                        brand: document.getElementById('brand').value,
                        model: document.getElementById('model').value,
                        year: parseInt(document.getElementById('year').value),
                        color: document.getElementById('color').value,
                        price: parseFloat(document.getElementById('price').value),
                        mileage: parseInt(document.getElementById('mileage').value),
                        description: document.getElementById('description').value,
                        imageUrl: document.getElementById('imageUrl').value
                    };

                    console.log("Envoi des données :", carData);

                    // Désactiver le bouton pour éviter le double clic
                    const submitBtn = document.getElementById('submitCarBtn');
                    const originalBtnText = submitBtn.innerText;
                    submitBtn.disabled = true;
                    submitBtn.innerText = "Ajout en cours...";

                    // 2. Appel API
                    const newCar = await createCar(carData);

                    // 3. Gestion du résultat
                    if (newCar) {
                        alert("Voiture ajoutée avec succès !");
                        
                        // Fermer le modal
                        const modalEl = document.getElementById('exampleModal');
                        const modal = bootstrap.Modal.getInstance(modalEl);
                        if(modal) modal.hide();

                        form.reset(); 
                        form.classList.remove('was-validated');
                        
                        // Rafraîchir la liste
                        const updatedCars = await fetchAllCars();
                        displayCars(updatedCars);
                    }
                    
                    // Réactiver le bouton
                    submitBtn.disabled = false;
                    submitBtn.innerText = originalBtnText;
                });
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', init);