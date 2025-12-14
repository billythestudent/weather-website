
const API_KEY = '';

// Activity suggestions map
const activitySuggestions = {
    'clear': [
        '☀️ Great weather outside! Go for a picnic or take a walk in the park.',
        '🚴 Perfect day for cycling!',
        '⛱️ Visit the beach or enjoy outdoor activities.',
        '📷 Ideal for outdoor photography!',
        '🏃 Great opportunity for running or sports activities!'
    ],
    'clouds': [
        '☁️ Cloudy day. Good for light activities.',
        '📚 Comfortable weather for outdoor reading.',
        '🎒 You can take a short nature walk or exploration trip.',
        '🏞️ Good soft light for photography.',
        '🎾 Light sports or outdoor games are a good option.'
    ],
    'rain': [
        '🌧️ Rainy day. Prefer to watch a movie at home!',
        '📚 Perfect time to finish reading that book.',
        '🎮 Video games or watching series is a good option.',
        '☕ You can spend time inside with a hot tea/coffee.',
        '🎨 Ideal for creative indoor activities (drawing, writing)!'
    ],
    'thunderstorm': [
        '⛈️ Thunderstorm! Please stay indoors.',
        '🏠 Staying safely at home is the best option.',
        '🎬 Perfect time for watching long movies or mini series.',
        '🧩 You can do puzzle or board game activities.',
        '💤 The sound of this weather is perfect for sleeping, consider resting!'
    ],
    'snow': [
        '❄️ Snow is falling! Go snow sports.',
        '⛸️ Great conditions for skating and skiing.',
        '⛄ Building a snowman and snowball fights are so fun!',
        '📸 Beautiful to photograph snowy landscapes!',
        '☕ Relaxing with a warm drink by the fireplace watching snow fall.'
    ],
    'mist': [
        '🌫️ Misty day. Be careful outdoors.',
        '🥾 Short and nearby walks are safe.',
        '📷 You can capture atmospheric images for mist photography.',
        '🏔️ Quiet nature observation and meditation is a good option.',
        '🎧 Listening to music or podcasts can be relaxing.'
    ],
    'smoke': [
        '💨 Air quality is low. Prefer indoor activities.',
        '🏠 Spending time indoors is safer.',
        '📚 Reading books or watching educational content is a good option.',
        '🎮 You can play video games or participate in online activities.',
        '💆 You can do yoga or exercise at home to stay healthy.'
    ],
    'dust': [
        '🌪️ Dust storm! Avoid going out.',
        '🏠 Stay indoors and keep windows closed.',
        '🧹 You can clean your house.',
        '🎵 Listening to music or playing an instrument is a good activity.',
        '💻 You can do online work or learning activities.'
    ],
    'fog': [
        '🌫️ Dense fog. Be careful when going out.',
        '🏞️ Nearby walks may be safe.',
        '📚 Indoor reading or research is a good option.',
        '🎨 You may want to do artistic activities at home.',
        '🍽️ Cooking and eating with family or friends is a nice activity.'
    ],
    'default': [
        '🌍 Plan activities according to the weather!',
        '😊 Choose an activity that suits you and enjoy!',
        '🎯 You can have fun regardless of the weather!',
        '⏰ You can do your planned activities.',
        '🌟 What would you like to do today?'
    ]
};;

// Türkçe hava tavsiyesi almak için
function getActivitySuggestions(weatherMain) {
    const mainWeather = weatherMain.toLowerCase();
    const suggestions = [];

    if (mainWeather.includes('clear') || mainWeather.includes('sunny')) {
        suggestions.push(...activitySuggestions.clear);
    } else if (mainWeather.includes('cloud')) {
        suggestions.push(...activitySuggestions.clouds);
    } else if (mainWeather.includes('rain')) {
        suggestions.push(...activitySuggestions.rain);
    } else if (mainWeather.includes('thunder') || mainWeather.includes('storm')) {
        suggestions.push(...activitySuggestions.thunderstorm);
    } else if (mainWeather.includes('snow')) {
        suggestions.push(...activitySuggestions.snow);
    } else if (mainWeather.includes('mist') || mainWeather.includes('mist')) {
        suggestions.push(...activitySuggestions.mist);
    } else if (mainWeather.includes('smoke')) {
        suggestions.push(...activitySuggestions.smoke);
    } else if (mainWeather.includes('dust')) {
        suggestions.push(...activitySuggestions.dust);
    } else if (mainWeather.includes('fog')) {
        suggestions.push(...activitySuggestions.fog);
    } else {
        suggestions.push(...activitySuggestions.default);
    }

    // Rastgele şekilde 5 aktivite seçin
    return suggestions.sort(() => Math.random() - 0.5).slice(0, 5);
}

// Hava durumu verisi alma
function getWeather(latitude, longitude) {
    const loadingSpinner = document.getElementById('loadingSpinner');
    const weatherCard = document.getElementById('weatherCard');
    const locationError = document.getElementById('locationError');

    // Check API key
    if (API_KEY === '' || API_KEY === 'YOUR_API_KEY_HERE') {
        locationError.textContent = '⚠️ Please set your OpenWeatherMap API key in script.js!';
        locationError.classList.add('show');
        return;
    }

    loadingSpinner.style.display = 'flex';
    weatherCard.style.display = 'none';
    locationError.classList.remove('show');

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=tr`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=tr&cnt=40`;

    Promise.all([
        fetch(url).then(r => {
            if (!r.ok) throw new Error('Hava durumu verisi alınamadı. Lütfen API anahtarınızı kontrol edin.');
            return r.json();
        }),
        fetch(forecastUrl).then(r => {
            if (!r.ok) throw new Error('Tahmin verisi alınamadı.');
            return r.json();
        })
    ])
        .then(([currentData, forecastData]) => {
            displayWeather(currentData, forecastData);
            loadingSpinner.style.display = 'none';
            weatherCard.style.display = 'block';
        })
        .catch(error => {
            loadingSpinner.style.display = 'none';
            locationError.textContent = '❌ ' + error.message;
            locationError.classList.add('show');
            console.error('Hata:', error);
        });
}

// Hava durumunu göster
function displayWeather(data, forecastData) {
    const tempCelsius = Math.round(data.main.temp);
    const feelsLike = Math.round(data.main.feels_like);
    const humidity = data.main.humidity;
    const pressure = data.main.pressure;
    const visibility = (data.visibility / 1000).toFixed(1);
    const windSpeed = data.wind.speed;
    const clouds = data.clouds.all;
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;
    const main = data.weather[0].main;
    const city = data.name;
    const country = data.sys.country;

    // HTML güncellemeleri
    document.getElementById('cityName').textContent = `${city}, ${country}`;
    document.getElementById('temperature').textContent = tempCelsius;
    document.getElementById('feelsLike').textContent = `${feelsLike}°C`;
    document.getElementById('humidity').textContent = `${humidity}%`;
    document.getElementById('windSpeed').textContent = `${windSpeed} m/s`;
    document.getElementById('pressure').textContent = `${pressure} mb`;
    document.getElementById('visibility').textContent = `${visibility} km`;
    document.getElementById('clouds').textContent = `${clouds}%`;
    document.getElementById('description').textContent = description.charAt(0).toUpperCase() + description.slice(1);

    // Icon URL
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`;
    document.getElementById('weatherIcon').src = iconUrl;

    // 5-Day Forecast - Select best daily forecast
    const dailyForecasts = {};
    forecastData.list.forEach(item => {
        const date = new Date(item.dt * 1000);
        const dateKey = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
        const dayKey = date.toLocaleDateString('en-US');
        
        if (!dailyForecasts[dayKey]) {
            dailyForecasts[dayKey] = {
                date: dateKey,
                icon: getWeatherEmoji(item.weather[0].main),
                temp: Math.round(item.main.temp)
            };
        }
    });

    const forecastList = document.getElementById('forecastList');
    forecastList.innerHTML = '';
    Object.values(dailyForecasts).slice(1, 6).forEach((forecast, index) => {
        const forecastDiv = document.createElement('div');
        forecastDiv.className = 'forecast-item';
        forecastDiv.innerHTML = `
            <div class="forecast-day">${forecast.date}</div>
            <div class="forecast-icon">${forecast.icon}</div>
            <div class="forecast-temp">${forecast.temp}°</div>
        `;
        forecastList.appendChild(forecastDiv);
    });

    // Activity suggestions
    const suggestions = getActivitySuggestions(main);
    const activityList = document.getElementById('activityList');
    activityList.innerHTML = '';

    suggestions.forEach(activity => {
        const activityDiv = document.createElement('div');
        activityDiv.className = 'activity-item';
        activityDiv.textContent = activity;
        activityList.appendChild(activityDiv);
    });
}

// Return emoji based on weather type
function getWeatherEmoji(weatherType) {
    const weatherMap = {
        'Clear': '☀️',
        'Clouds': '☁️',
        'Rain': '🌧️',
        'Drizzle': '🌦️',
        'Thunderstorm': '⛈️',
        'Snow': '❄️',
        'Mist': '🌫️',
        'Smoke': '💨',
        'Haze': '🌫️',
        'Dust': '🌪️',
        'Fog': '🌫️',
        'Sand': '🌪️',
        'Ash': '💨',
        'Squall': '🌪️',
        'Tornado': '🌪️'
    };
    return weatherMap[weatherType] || '🌤️';
}

// Get location and display weather
document.getElementById('getLocationBtn').addEventListener('click', () => {
    const locationError = document.getElementById('locationError');
    const getWeatherBtn = document.getElementById('getLocationBtn');
    locationError.classList.remove('show');

    if ('geolocation' in navigator) {
        getWeatherBtn.disabled = true;
        getWeatherBtn.textContent = 'Konum alınıyor...';

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                getWeather(latitude, longitude);
                getWeatherBtn.disabled = false;
                getWeatherBtn.textContent = '📍 Konumumu Bul';
            },
            (error) => {
                let errorMessage = '❌ ';
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage += 'Konum izni reddedildi. Tarayıcı ayarlarında izin verin.';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMessage += 'Konum bilgisi şu anda kullanılamıyor.';
                        break;
                    case error.TIMEOUT:
                        errorMessage += 'Konum alma isteği zaman aşımına uğradı.';
                        break;
                    default:
                        errorMessage += 'Konum alınırken bir hata oluştu.';
                }
                locationError.textContent = errorMessage;
                locationError.classList.add('show');
                getWeatherBtn.disabled = false;
                getWeatherBtn.textContent = '📍 Find My Location';
            }
        );
    } else {
        locationError.textContent = '❌ Your browser does not support Geolocation API.';
        locationError.classList.add('show');
    }
});

// Button reference
const getWeatherButton = document.getElementById('getLocationBtn');

// =====================================================
// TODO (FUTURE IMPROVEMENTS)
// =====================================================
// TODO: Add localStorage implementation for favorite locations
// TODO: Develop hourly forecast section
// TODO: Add dark mode CSS classes and toggle function
// TODO: Add weather quality index (AQI) API call
// TODO: Add push notification support
// TODO: Implement caching mechanism (Service Worker)
// TODO: Create weather graphs using chart library
// TODO: Integrate maps (Leaflet etc.)
// =====================================================
