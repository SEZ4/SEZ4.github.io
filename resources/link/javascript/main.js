document.addEventListener('DOMContentLoaded', function() {

    //Education
    const educationButtons = [
        document.getElementById('education-button-iamit'), 
        document.getElementById('education-button-codecademy')]

    const education_cardWrapper = document.querySelector('.education-cardWraper');
    const education_cards = document.querySelectorAll('.education-cardWraper-card');
    function education_cardSwiper(index) {
        education_cardWrapper.scrollLeft  = education_cards[0].clientWidth * index;
        educationButtons[index].classList.add('education-button-active');
        let removed_elements = educationButtons.filter((_, number) => number !== index);
        for (let i = 0; i < removed_elements.length; i++){
            removed_elements[i].classList.remove('education-button-active');
        }
    }
    educationButtons[0].addEventListener('click', function() {
        education_cardSwiper(0);
    });
    educationButtons[1].addEventListener('click', function() {
        education_cardSwiper(1);
    });
    
    // Portfoliy
    
    const portfolioNavButtons = document.querySelectorAll('.portfolio-nav-buttons');
    const portfolioNavHighLight = document.getElementById('background-highlight');
    const portfolioButtonWraper = document.querySelector('.portfolio-nav');

    const portfolioCards = [document.getElementById('portfolio-cakesite-card'), document.getElementById('portfolio-qaisnews-card'),];
    const portfolioFilterClasses = ['PoF-CSSGrid', 'PoF-EShop', 'PoF-MultiPage', 'PoF-JavaScript', 'PoF-RegisterPage',
        'PoF-Responsive', 'PoF-UserInteraction', 'PoF-ApiIntegration']
    
    let portfolioButtonNumber;
    let portfolioOneTimeButton = portfolioNavButtons[0];
    function portfolio_highLight_align(buttonSize, buttonWraperSize) {
        portfolioNavHighLight.style.width = `${buttonSize.width}px`;
        portfolioNavHighLight.style.height = `${buttonSize.height}px`;
        portfolioNavHighLight.style.left = `${buttonSize.left - buttonWraperSize.left}px`;
        portfolioNavHighLight.style.top = `${buttonSize.top - buttonWraperSize.top}px`;
    }
    function portfolio_cards_filter(buttonNum){
        let className = buttonNum - 1;
        if (buttonNum === 0){
            for(let i = 0; i < portfolioCards.length; i++){
                portfolioCards[i].style.display = 'flex';
            }
        } else{                 
            for(let i = 0; i < portfolioCards.length; i++){
                if (portfolioCards[i].classList.contains(portfolioFilterClasses[className])){
                    portfolioCards[i].style.display = 'flex';
                } else{
                    portfolioCards[i].style.display = 'none';
                }
            }
        }
    }
    portfolioNavButtons.forEach( function(button) {
        button.addEventListener('click', function() {
            portfolioOneTimeButton = button;
            for(let i = 0; i < portfolioNavButtons.length; i++){
                if (portfolioNavButtons.item(i) !== button){
                    portfolioNavButtons.item(i).style.color = '#192f49'
                }
                if (button === portfolioNavButtons.item(i)){
                    portfolioButtonNumber = i;
                }
            }
            portfolio_cards_filter(portfolioButtonNumber);
            let buttonSize = button.getBoundingClientRect();
            let buttonWraperSize = portfolioButtonWraper.getBoundingClientRect();
            portfolio_highLight_align(buttonSize, buttonWraperSize);
            button.style.color = '#FFF'
        })
    })
    if (portfolioNavButtons.length > 0) {
        const firstButton = portfolioNavButtons[0];
        const rect = firstButton.getBoundingClientRect();
        const navRect = portfolioButtonWraper.getBoundingClientRect();
        firstButton.style.color = '#FFF'
        portfolio_highLight_align(rect, navRect);
        portfolio_cards_filter(0);
    }
    window.addEventListener('resize', function() {
        let buttonSize = portfolioOneTimeButton.getBoundingClientRect();
        let buttonWraperSize = portfolioButtonWraper.getBoundingClientRect();
        portfolio_highLight_align(buttonSize, buttonWraperSize);
    })
    
    // certificate

    const certificateUpButton = document.getElementById('certificate-button-up');
    const certificateDownButton = document.getElementById('certificate-button-down');
    const certificateCardWraper = document.querySelector('.certificate-wraper-cardWraper');

    certificateUpButton.addEventListener('click', function() {
            certificateCardWraper.scrollTop -= certificateCardWraper.clientHeight;
    })
    certificateDownButton.addEventListener('click', function() {   
        certificateCardWraper.scrollTop += certificateCardWraper.clientHeight;
    })

    // Hidden menu handler

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
