document.addEventListener('DOMContentLoaded', function() {

    const hiddenMenu = document.querySelector('.nav-hidden-menu');
    const hiddenMenuButton = document.getElementById('hidden-menu-button');
    const hiddenMenuButton2 = document.getElementById('hidden-menu-button-2');

    hiddenMenuButton.addEventListener('click', function(event) {
        event.stopPropagation();
        hiddenMenu.classList.add('nav-hidden-menu-JS-open-fun');
    })
    hiddenMenuButton2.addEventListener('click', function(event) {
        event.stopPropagation();
        hiddenMenu.classList.remove('nav-hidden-menu-JS-open-fun');
    })
    document.addEventListener('click', function() {
        hiddenMenu.classList.remove('nav-hidden-menu-JS-open-fun')
    })
    hiddenMenu.addEventListener('click', function(event) {
        event.stopPropagation();
    })
})
