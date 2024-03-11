// Définir une fonction pour demander la position de l'utilisateur
function getGeolocation() {
    // Vérifier si l'API Geolocation est disponible
    if (navigator.geolocation) {
        // Demander la position actuelle de l'utilisateur
        navigator.geolocation.getCurrentPosition(
            // Fonction de rappel de succès
            function (position) {
                // Obtenir les coordonnées de la position
                var coords = position.coords;
                // Créer un marqueur avec les coordonnées
                var marker = L.marker([coords.latitude, coords.longitude]);
                // Ajouter le marqueur à la carte
                marker.addTo(map);
                // Centrer la carte sur le marqueur
                map.panTo([coords.latitude, coords.longitude]);

                var urlapi = "https://cweather.vercel.app/" + coords.latitude + "," + coords.longitude;
                openPopupMarker(marker, urlapi);

            },
            // Fonction de rappel d'erreur
            function (error) {
                // Vérifier si l'erreur est due au refus de l'utilisateur
                if (error.code === error.PERMISSION_DENIED) {
                    // Demander à l'utilisateur d'entrer sa ville
                    var ville = prompt("Veuillez entrer votre ville :");
                    // Vérifier si l'utilisateur a entré une valeur
                    if (ville) {
                        // Utiliser un service de géocodage pour obtenir les coordonnées de la ville
                        var url = "https://nominatim.openstreetmap.org/search?format=json&q=" + ville;
                        fetch(url)
                            .then(response => response.json())
                            .then(data => {
                                // Vérifier si le service a renvoyé des résultats
                                if (data.length > 0) {
                                    // Prendre le premier résultat
                                    var result = data[0];
                                    // Obtenir les coordonnées du résultat
                                    var lat = parseFloat(result.lat);
                                    var lon = parseFloat(result.lon);
                                    // Créer un marqueur avec les coordonnées
                                    var marker = L.marker([lat, lon]);
                                    // Ajouter le marqueur à la carte
                                    marker.addTo(map);
                                    // Centrer la carte sur le marqueur
                                    map.panTo([lat, lon]);
                                    //Afficher le popup
                                    openPopupMarker(marker);
                                } else {
                                    // Afficher un message d'erreur si le service n'a pas renvoyé de résultats
                                    alert("Aucun résultat trouvé pour la ville : " + ville);
                                }
                            })
                            .catch(error => {
                                // Afficher un message d'erreur si la requête a échoué
                                console.error(error);
                                alert("Une erreur est survenue. Veuillez réessayer.");
                            });
                    } else {
                        // Afficher un message d'erreur si l'utilisateur n'a pas entré de valeur
                        console.error("Vous n'avez pas entré de ville.");
                    }
                } else {
                    // Afficher le code et le message d'erreur dans la console
                    console.error("Code: " + error.code);
                    console.error("Message: " + error.message);
                }
            });
    } else {
        // Afficher un message d'erreur si l'API Geolocation n'est pas disponible
        console.error("L'API Geolocation n'est pas disponible dans votre navigateur.");
    }
}

// Appeler la fonction getGeolocation() au chargement de la page
window.onload = function () {
    getGeolocation();
};

// Créer une carte centrée sur l'Afrique
let map = L.map('map').setView([7.3697, 12.3547], 6);
// Ajouter une couche de tuiles OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Localisation approximative',
    maxZoom: 20
}).addTo(map);

function openPopupMarker(marker, urlapi) {
    fetch(urlapi)
        .then(response => response.json())
        .then(data => {
            // Traiter les données reçues de l'api
            let ville = data.lieu.nom;
            let tempC = data.actuel.temp_c;
            let tempF = data.actuel.temp_f;
            let weather = data.meteo.principal;
            let icon = "https:" + data.meteo.icone;

            // Créez le popup et liez-le au marqueur
            marker.bindPopup("Contenu du popup").openPopup();

            // Créer un popup et définir son contenu
            let popup = L.popup()
                .setContent(`
                <h3>${ville}</h3>
                <p>Température : <b> ${tempC} °C / ${tempF} °F</b></p>
                <p>Météo : ${weather}</p>
                <img src='${icon}' alt='Sunny'>
                `);

            // Associer le popup au marqueur
            marker.bindPopup(popup);

            // Ajouter le marqueur à la carte et ouvrir le popup
            marker.addTo(map).openPopup();
        }
        );
}