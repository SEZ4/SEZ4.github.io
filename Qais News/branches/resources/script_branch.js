document.addEventListener('DOMContentLoaded', function () {

function toggleMenu() {
    dropdownMenu.classList.toggle('open');
}
var dropdownButton = document.getElementById('dropdown-button');
var anotherButton = document.getElementById('dropdown-button2');
var dropdownMenu = document.getElementById('dropdown-menu');
  
    dropdownButton.addEventListener('click', function (event) {
        event.stopPropagation();
        toggleMenu();
    });

    anotherButton.addEventListener('click', function (event) {
        event.stopPropagation();
        toggleMenu();
    });

    document.addEventListener('click', function () {
        dropdownMenu.classList.remove('open');
    });

    dropdownMenu.addEventListener('click', function (event) {
        event.stopPropagation();
    });
});
