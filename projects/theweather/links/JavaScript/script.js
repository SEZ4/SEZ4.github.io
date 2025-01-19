document.addEventListener('DOMContentLoaded', function() {
    // You can steal the API key I don't mind (it's Free) :)
    const weatherAPIkey = 'fbb0702d04e54943826133310240308';
    // Defining Buttons and Inputs for citis Names
    const searchCityInput = document.getElementById('search-city-input');
    const searchCityButton = document.getElementById('search-city-button');
    const cityButtonsName = document.querySelectorAll('.city-button-name');;
    // Defining Error Handelrs
    const ErrorText = document.getElementById('search-error');
    // Defining Ctity Info header
    const cityDayStatus = document.getElementById('day-status');
    const cityName = document.getElementById('city-name');
    const countryName = document.getElementById('country-name');
    const cityTime = document.getElementById('city-time');
    const cityDate = document.getElementById('city-date');
    // Tools Button 
    const mapButton = document.getElementById('map-button');
    const mapButton2 = document.getElementById('map-button2');
    const refreshButton = document.getElementById('refresh-button');
    const refreshButton2 = document.getElementById('refresh-button2');
    // Defining Current temp info
    const currentTemp = document.getElementById('current-temp');
    const weatherStatusImg = document.getElementById('weather-status-img');
    const weatherStatus = document.getElementById('weather-status');
    // Defining Wind info
    const windDirImg = document.getElementById('wind-dir-img');
    const windDir = document.getElementById('wind-dir');
    const windSpeed = document.getElementById('wind-speed');
    // Defining Misc info
    const humidity = document.getElementById('humidity');
    const uvLight = document.getElementById('uv-light');
    // Defining Map buttons
    const map = document.getElementById('popup-menu');
    const closeMapButton = document.getElementById('popup-close-button');
    // Defining Buttons menu var's
    const cityButtonsButton = document.getElementById('cityButtons-menu-button');
    const cityButtonsMenu = document.querySelector('.cityButton');
    // Defining Settings buttons

    let cityValueName = 'Amman';
    let time12;
    let windDirName;


    // excuting the fetch data function

    cityButtonsName.forEach(function(button) {
        button.addEventListener('click', function() {
            cityValueName = button.children[1].innerHTML;
            dataFetchCurrent();
            dataFectchForecast();
            searchCityInput.value = '';
        })
    })
    searchCityButton.addEventListener('click', function() {
        if(searchCityInput.value === ''){
            return;
        } else {
            cityValueName = searchCityInput.value;
            dataFetchCurrent();
            dataFectchForecast();
        }
    })
    searchCityInput.addEventListener('keydown', function(button) {
        if(button.key === 'Enter'){
            if(searchCityInput.value === ''){
                return;
            } else {
                cityValueName = searchCityInput.value;
                dataFetchCurrent();
                dataFectchForecast();
            }
        } else {
            return;
        }
    })
    refreshButton.addEventListener('click', function(){
        dataFetchCurrent();
        dataFectchForecast();
    })
    refreshButton2.addEventListener('click', function(){
        dataFetchCurrent();
        dataFectchForecast();
    })
    dataFetchCurrent();
    dataFectchForecast();

    // fetch data from the API

    function dataFetchCurrent(){
        fetch(`https://api.weatherapi.com/v1/current.json?key=${weatherAPIkey}&q=${cityValueName}&aqi=no&alerts=no`)
            .then((response) => response.json())
            .then((data) => currentDataOutput(data))
            .catch(() => errorMessage());
    }
    function dataFectchForecast(){
        fetch(`https://api.weatherapi.com/v1/forecast.json?key=${weatherAPIkey}&q=${cityValueName}&days=3&aqi=no&alerts=no`)
            .then((response) => response.json())
            .then((data) => forecastDataHandelr(data));
    }


    //  Output data to HTML

    function currentDataOutput(data){
        ErrorText.innerHTML = ''

        cityName.innerHTML = data.location.name;
        document.getElementById('site-title').innerHTML = `The Weather | ${data.location.name}`;
        countryName.innerHTML = data.location.country;

        let [date, time] = data.location.localtime.split(' ');
        convertTime(time);
        cityTime.innerHTML = time12;
        date = date.replace(/-/g, '/');
        date = date.replace(/\b0/g, '');
        cityDate.innerHTML = date;

        let condition = data.current.condition.text;
        currentTemp.innerHTML = `${data.current.temp_c} C`;
        weatherStatus.innerHTML = condition;

        let windDataDir = data.current.wind_dir;
        windDiraction(windDataDir);
        windDir.innerHTML = windDirName;
        windSpeed.innerHTML = `${data.current.wind_kph} Km/h`;

        humidity.innerHTML = `Humidity: ${data.current.humidity}`;
        uvLight.innerHTML = `UV Light: ${data.current.uv}`;
        // Images
        dayNightIdentifier(time);
        statusImgHandler(condition);

        setTimeout(() => {
            cityButtonsMenu.style.removeProperty('transform');
            cityButtonsMenu.style.removeProperty('opacity');
            cityButtonsMenu.style.removeProperty('pointer-events');
        }, 300)
    }

    function forecastDataHandelr(data){
        let condition = [undefined, undefined, undefined];
        let windArrow = [undefined, undefined, undefined];
        for(let i = 0; i < 3; i++){           
            let [date, Time] = data.forecast.forecastday[i].hour[12].time.split(' ');
            document.getElementById(`forecast-status-${i}`).innerHTML = data.forecast.forecastday[i].hour[12].condition.text;
            document.getElementById(`forecast-temp-${i}`).innerHTML = `${data.forecast.forecastday[i].hour[12].temp_c} C`;
            document.getElementById(`forecast-wind-speed-${i}`).innerHTML = `${data.forecast.forecastday[i].hour[12].wind_kph} Km/h`;

            date = date.replace(/-/g, '/');
            date = date.replace(/\b0/g, '');
            document.getElementById(`forecast-date-${i}`).innerHTML = date;
            //Images
            condition[i] = data.forecast.forecastday[i].hour[12].condition.text;     
            windArrow[i] = data.forecast.forecastday[i].hour[12].wind_dir;
        }
        forecastStatusImgHandler(condition);
        forecastWindDiraction(windArrow);
    }

    function errorMessage(){
        ErrorText.innerHTML = 'City Not Found!'
    }

    // The Map 
    mapButton.addEventListener('click', function(event) {
        event.stopPropagation();
        map.classList.add('open-map');
    })
    mapButton2.addEventListener('click', function(event) {
        event.stopPropagation();
        map.classList.add('open-map');
    })
    closeMapButton.addEventListener('click', function(event) {
        event.stopPropagation();
        map.classList.remove('open-map');
    })
    document.addEventListener('click', function() {
        map.classList.remove('open-map');
    })
    map.children[0].addEventListener('click', function(event) {
        event.stopPropagation();
    })
    // buttons menu
    cityButtonsButton.addEventListener('click', function(event) {
        event.stopPropagation();
        cityButtonsMenu.style.transform = 'translate(8px, -83px)';
        cityButtonsMenu.style.opacity = '1';
        cityButtonsMenu.style.pointerEvents = 'auto';
    })
    document.addEventListener('click', function() {
        cityButtonsMenu.style.removeProperty('transform');
        cityButtonsMenu.style.removeProperty('opacity');
        cityButtonsMenu.style.removeProperty('pointer-events');
    })
    cityButtonsMenu.addEventListener('click', function(event) {
        event.stopPropagation();
    })

    // Objects

    const arrowDirObject = {
        'N': { name: 'North', rotate: '0deg' },
        'NNE': { name: 'North North East', rotate: '22deg' },
        'NE': { name: 'North East', rotate: '45deg' },
        'ENE': { name: 'East North East', rotate: '67deg' },
        'E': { name: 'East', rotate: '90deg' },
        'ESE': { name: 'East South East', rotate: '112deg' },
        'SE': { name: 'South East', rotate: '135deg' },
        'SSE': { name: 'South South East', rotate: '157deg' },
        'S': { name: 'South', rotate: '180deg' },
        'SSW': { name: 'South South West', rotate: '202deg' },
        'SW': { name: 'South West', rotate: '225deg' },
        'WSW': { name: 'West South West', rotate: '247deg' },
        'W': { name: 'West', rotate: '270deg' },
        'WNW': { name: 'West North West', rotate: '292deg' },
        'NW': { name: 'North West', rotate: '315deg' },
        'NNW': { name: 'North North West', rotate: '337deg' }
    };
    const statusImgObject = { // add 'shorter' to the object to short HTML element text
        'Clear': { path: 'theweather/images/status/clear.png', alt: 'Clear Wehter Icon'},
        'Sunny': { path: 'theweather/images/status/sunny.png', alt: 'Sunny Icon'},
        'Overcast': { path: 'theweather/images/status/overcast.png', alt: 'Overcast icon'},
        'Overcast ': { path: 'theweather/images/status/overcast.png', alt: 'Overcast icon'},
        'Patchy rain nearby' : { path: 'theweather/images/status/Patchy rain nearby.png', alt: 'Patchy rain nearby icon'},
        'Patchy light rain' : { path: 'theweather/images/status/Patchy rain nearby.png', alt: 'Patchy Light rain icon'},
        'Light rain': { path: 'theweather/images/status/light-rain.png', alt: 'Light Rain icon'},
        'Light drizzle': { path: 'theweather/images/status/light-rain.png', alt: 'Light Dizzle icon'},
        'Light rain shower': { path: 'theweather/images/status/light rain shower.png', alt: 'light rain shower icon'},
        'Cloudy': { path: 'theweather/images/status/cloudy.png', alt: 'Cloudy Icon'},
        'Cloudy ': { path: 'theweather/images/status/cloudy.png', alt: 'Cloudy Icon'},
        'Partly cloudy': {path: 'theweather/images/status/partly-cloudy.png', alt: 'partly Cloudy Icon'},
        'Partly Cloudy': {path: 'theweather/images/status/partly-cloudy.png', alt: 'partly Cloudy Icon'},
        'Partly Cloudy ': {path: 'theweather/images/status/partly-cloudy.png', alt: 'partly Cloudy Icon'},
        'Mist': { path: 'theweather/images/status/mist.png', alt: 'Mist icon'},
        'Fog': { path: 'theweather/images/status/fog.png', alt: 'Fog icon'},
        'Thundery outbreaks in nearby': { path: 'theweather/images/status/thunder.png', alt: 'thunder icon'},
        'Moderate or heavy rain shower': { path: 'theweather/images/status/light rain shower.png', alt: 'light rain shower icon', shorter: 'Moderate rain shower'},
        'Moderate or heavy rain with thunder': { path: 'theweather/images/status/thunder.png', alt: 'thunder icon', shorter: 'Moderate rain with thunder'},
        'Patchy light drizzle': { path: 'theweather/images/status/light-rain.png', alt: 'Light rain icon'},
        'Light sleet': { path: 'theweather/images/status/light-rain.png', alt: 'Light sleet icon'},
        'Heavy snow': { path: 'theweather/images/status/heavy snow.png', alt: 'Heavy Snow Icon'},
        'Light freezing rain': { path: 'theweather/images/status/freezing-rain', alt: 'Light Freezing Rain'}
    };

    // Logical Operations

    function dayNightIdentifier(time){
        let numTime = time.slice(0, 2);
        numTime = parseInt(numTime, 10);
        if (numTime >= 19 || numTime < 6){
            cityDayStatus.setAttribute('src', 'theweather/images/day-night/night.png')
        } else if (numTime >= 6){
            cityDayStatus.setAttribute('src', 'theweather/images/day-night/day.png')
        }
    }
    function convertTime(time){
        let [hour, minutes] = time.split(':')
        hour = parseInt(hour);
        let period = hour >= 12 ? 'PM' : 'AM';
        hour = hour % 12 || 12;
        time12 = `${hour}:${minutes} ${period}`;
    }
    function windDiraction(dir){
        let info = arrowDirObject[dir];
        if (info) {
            windDirName = info.name;
            windDirImg.style.rotate = info.rotate;
        } else{
            console.log('Error With Wind Directions')
        }
    }
    function forecastWindDiraction(dir){
        for (let i = 0; i < 3; i++){
            let info = arrowDirObject[dir[i]];
            if (info){
                document.getElementById(`forecast-wind-dir-img-${i}`).style.rotate = info.rotate;
            } else{
                console.log('Error With Forecast wind Directions');
            }
        }
    }
    function statusImgHandler(condition){
        let info = statusImgObject[condition];
        if (info){
            weatherStatusImg.setAttribute('src', info.path);
            weatherStatusImg.setAttribute('alt', info.alt);
            document.getElementById('site-icon').setAttribute('href', info.path);
            if (info.shorter){
                weatherStatus.innerHTML = info.shorter;
            } else{
                return;
            }
        } else {
            weatherStatusImg.setAttribute('src', statusImgObject.Clear.path);
            weatherStatusImg.setAttribute('alt', 'Status Icon Not Found!');
            document.getElementById('site-icon').setAttribute('href', statusImgObject.Cloudy.path);
        }
    }
    function forecastStatusImgHandler(condition){
        for (let i = 0; i < 3; i++){
            let info = statusImgObject[condition[i]];
            if (info){
                document.getElementById(`forecast-status-img-${i}`).setAttribute('src', info.path);
                document.getElementById(`forecast-status-img-${i}`).setAttribute('alt', info.alt);
                if(info.shorter){
                    document.getElementById(`forecast-status-${i}`).innerHTML = info.shorter;
                }
            } else {
                document.getElementById(`forecast-status-img-${i}`).setAttribute('src', statusImgObject.Cloudy.path);
                document.getElementById(`forecast-status-img-${i}`).setAttribute('alt', 'Status Icon Not Found');
            }
        }               
    }
})
