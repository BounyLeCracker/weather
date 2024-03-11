
// Définir une fonction pour afficher la météo dans la div #weather
function showWeather() {
    // Vérifier si l'API Geolocation est disponible
    if (navigator.geolocation) {
        // Demander la position actuelle de l'utilisateur
        navigator.geolocation.getCurrentPosition(
            // Fonction de rappel de succès
            function (position) {
                // Obtenir les coordonnées de la position
                var coords = position.coords;
                let urlapi = "https://cweather.vercel.app/" + coords.latitude + "," + coords.longitude;
                rechercher(urlapi);
            },
            // Fonction de rappel d'erreur
            function (error) {
                // Vérifier si l'erreur est due au refus de l'utilisateur
                if (error.code === error.PERMISSION_DENIED) {
                    // Demander à l'utilisateur d'entrer sa ville
                    var ville = prompt("Veuillez entrer votre ville :");
                    // Vérifier si l'utilisateur a entré une valeur
                    if (ville) {
                        let urlapi = "https://cweather.vercel.app/" + ville;
                        rechercher(urlapi);
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

function showWeatherForOther() {
    var submit = document.getElementById("submit");
    /* Ajouter un écouteur d'événement au clic sur le bouton Rechercher */
    submit.addEventListener("click", function() {
        var  input = document.getElementById("ville")
        var ville = input.value;
        let urlapi = "https://cweather.vercel.app/" + ville;
        rechercher(urlapi);
    });
    popup.style.display = 'none';
}

function rechercher(urlapi) {
    fetch(urlapi)
        .then(response => response.json())
        .then(data => {
            // Traiter les données reçues de l'api
            let country = data.lieu.pays;
            let name = data.lieu.nom;
            let tempC = data.actuel.temp_c;
            let tempF = data.actuel.temp_f;
            let weather = data.meteo.principal;
            let lat = data.lat;
            let lon = data.lon;
            let icon = "https:" + data.meteo.icone;
            let estJour = data.actuel.est_jour;
            let ventKph = data.actuel.vitesse_vent_kph;
            let directionVent = data.actuel.direction_vent;
            let pressionMb = data.actuel.pression_mb;
            let precipMm = data.actuel.precip_mm;
            let humidite = data.actuel.humidite;
            let nuage = data.actuel.nuage;
            let indiceUv = data.actuel.indice_uv;

            // Les éléments du DOM
            let contrySpan = document.getElementById("countrySpan");
            let citySpan = document.getElementById("citySpan");
            let tempSpan = document.getElementById("tempSpan");
            let weatherSpan = document.getElementById("weatherSpan");
            let imgWeather = document.getElementById("imgWeather");

            contrySpan.textContent = `${country}`;
            citySpan.textContent = `${name}`;
            tempSpan.textContent = `${tempC} °C / ${tempF} °F`;
            weatherSpan.textContent = `${weather}`;
            imgWeather.src = `${icon}`

            let latitude = document.getElementById("lat");
            latitude.textContent = `${lat}°`;

            let longitude = document.getElementById("lon");
            longitude.textContent = `${lon}°`;

            let isDay = document.getElementById("isDay");
            isDay.textContent = `${estJour ? "Oui" : "Non"}`;

            let windSpeed = document.getElementById("windSpeed");
            windSpeed.textContent = `${ventKph} km/h`;

            let windDir = document.getElementById("windDir");
            windDir.textContent = `${directionVent}`;

            let pressure = document.getElementById("pressure");
            pressure.textContent = `${pressionMb} mb`;

            let precip = document.getElementById("precip");
            precip.textContent = `${precipMm} mm`;

            let humidity = document.getElementById("humidity");
            humidity.textContent = `${humidite} %`;

            let cloud = document.getElementById("cloud");
            cloud.textContent = `${nuage} %`;

            let uv = document.getElementById("uv");
            uv.textContent = `${indiceUv}`;
        });
}

// Appeler la fonction showWeather() au chargement de la page
window.onload = function () {
    showWeather();
};

const openPopupBtn = document.getElementById('open-popup');
const closePopupBtn = document.getElementById('close-popup');
const popupContainer = document.getElementById('popup');
const submitBtn = document.getElementById('submit');
const villeInput = document.getElementById('ville');

openPopupBtn.addEventListener('click', () => {
  popupContainer.classList.add('active');
  popupContainer.style.display = 'block';
});

closePopupBtn.addEventListener('click', () => {
  popupContainer.classList.remove('active');
  popupContainer.style.display = 'none';
});

submitBtn.addEventListener('click', () => {
  const ville = villeInput.value;
  popupContainer.classList.remove('active');
});
