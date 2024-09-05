document.addEventListener('DOMContentLoaded', function() {
    const weatherAPIkey = 'fbb0702d04e54943826133310240308';
    const cityButtonsName = document.querySelectorAll('.city-button-name');

    const refreshButton = document.getElementById('refresh-button');

    refreshButton.addEventListener('click', function() {
        changeCityNamesStatus();
    })

    function changeCityNamesStatus(){
        cityButtonsName.forEach(button => {
            let cityName = button.children[1].innerHTML;
            
            fetch(`https://api.weatherapi.com/v1/current.json?key=${weatherAPIkey}&q=${cityName}&aqi=no&alerts=no`)
                .then(response => response.json())
                .then(data => {
                    let time = data.location.localtime.split(' ')[1];
                    let hour = parseInt(time.split(':')[0], 10);
                    const img = button.children[0];
                    if(hour >= 19 || hour < 6){
                        img.setAttribute('src', '../../images/day-night/night.png');
                        img.setAttribute('alt', 'Moon Image / Night')
                    } else{
                        img.setAttribute('src', '../../images/day-night/day.png');
                        img.setAttribute('alt', 'Sun Image / day');
                    }
                })
        })
    }

    changeCityNamesStatus();
})
