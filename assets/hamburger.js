/* Ajouter un écouteur d'événement au clic sur le bouton hamburger */
document.querySelector("#hamburger").addEventListener("click", function () {
    // Basculer la classe active sur le bouton hamburger et le menu de navigation
    this.classList.toggle("active");
    document.querySelector("nav ul").classList.toggle("active");
    // Modifier la hauteur du menu de navigation selon son état
    if (document.querySelector("nav ul").classList.contains("active")) {
        document.querySelector("nav ul").style.height = "calc(100vh - 50px)";
    } else {
        document.querySelector("nav ul").style.height = "0";
    }
});