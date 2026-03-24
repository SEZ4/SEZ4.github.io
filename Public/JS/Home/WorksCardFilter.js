document.addEventListener('DOMContentLoaded', function() { 
    const filterDropDownMenu = document.getElementById("filter-dropdown-menu");
    const worksCards = document.querySelectorAll('.works-card');
    const filterInput = document.getElementById("works-filter-input");
    
    function cardFiltering(){
        if(filterDropDownMenu.value === 'all'){
            for(let i = 0; i < worksCards.length; i++){
                worksCards[i].style.display = 'flex';
            }
        } else{
            for(let i = 0; i < worksCards.length; i++){
                if(worksCards[i].classList.contains(filterDropDownMenu.value)){
                    worksCards[i].style.display = 'flex'
                } else{
                    worksCards[i].style.display = 'none';
                }
            }
        }   
    }
    cardFiltering()

    filterDropDownMenu.addEventListener('change', function(){
        cardFiltering();
    })
    
    filterInput.addEventListener('input', function(){
        const inputValue = filterInput.value.toLowerCase();
        filterDropDownMenu.value = 'all';
        worksCards.forEach(function(card){
            let cardTitle = card.children[0].children[0].innerHTML.toLowerCase();
            if(cardTitle.includes(inputValue)){
                card.style.display = 'flex';
            } else{
                card.style.display = 'none';
            };
        })
    })

    worksCards.forEach(function(card){
        card.addEventListener('click', function(event){
            card.children[1].style.display = 'none';
            card.children[2].style.display = 'none';
            card.children[1].style.opacity = '0';
            card.children[2].style.opacity = '0';
            card.children[0].style.display = 'flex';
            card.style.padding = '0';
            setTimeout(() => {
                card.children[0].classList.add('works-card-description-transtion');
            }, 10)
            event.stopPropagation();
        })
        document.addEventListener('click', function(){
            card.children[1].style.removeProperty('display');
            card.children[2].style.removeProperty('display');
            card.children[0].style.removeProperty('display');
            card.style.removeProperty('padding');
            card.children[0].classList.remove('works-card-description-transtion');
            setTimeout(() => {
                card.children[1].style.removeProperty('opacity');
                card.children[2].style.removeProperty('opacity');
            }, 10)
        })
    })
})