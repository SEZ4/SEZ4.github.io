document.addEventListener('DOMContentLoaded', function() { 
    
    const certificateWraper = document.querySelector('.certificate-content-wraper');
    const upArrow = document.getElementById('certificateUpArrow');
    const downArrow = document.getElementById('certificateDownArrow');

    upArrow.addEventListener('click', function(){
        certificateWraper.scrollTop -= certificateWraper.clientHeight;
    })
    downArrow.addEventListener('click', function(){
        certificateWraper.scrollTop += certificateWraper.clientHeight;
    })
})