document.addEventListener('DOMContentLoaded', function() { 

    let educationCards = document.querySelectorAll('.eduction-card');
    
    educationCards.forEach(function(card) {
        card.addEventListener('click', function(event) {
            event.stopPropagation();
            educationCards.forEach(function(x) {
                x.classList.remove('eduction-card-give')
            });
            card.classList.toggle('eduction-card-give');
        });
    });
    document.addEventListener('click', function() {
        educationCards.forEach(function(card){ 
            card.classList.remove('eduction-card-give')
        });
    });
})