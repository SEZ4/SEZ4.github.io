document.addEventListener('DOMContentLoaded', function() { 

    const navBar = document.getElementById('navBar');
    const sideMenuWraper = document.querySelector('.sideMenuWraper');
    const sideMenu = sideMenuWraper.children[0];
    const sideMenuButton = document.getElementById('sideMenuButton');

    window.addEventListener('scroll', function(){
        if(window.scrollY > 70){
            navBar.classList.add('nav-transtion')
            navBar.style.animation = 'navTrans 250ms';
            navBar.style.position = 'fixed';
        } else{
            navBar.style.removeProperty('animation');
        }
        if(window.scrollY < 70){
            navBar.style.animation = 'navTrans 250ms'
            navBar.style.position = 'static'
            navBar.classList.remove('nav-transtion');
            sideMenuWraper.classList.remove('sideMenu-open');
        }
    })

    sideMenuButton.addEventListener('click', function(event){
        event.stopPropagation();
        sideMenuWraper.classList.add('sideMenu-open');
    })
    document.addEventListener('click', function(){
        sideMenuWraper.classList.remove('sideMenu-open');
    })
    sideMenu.addEventListener('click', function(event){
        event.stopPropagation();
    })

})