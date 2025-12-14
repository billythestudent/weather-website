# Weather App

A modern, responsive weather application that shows real-time weather data and recommends activities based on current conditions.

## Features

- 📍 **Geolocation**: Automatically detects user location
- 🌤️ **Real-time Weather**: Displays current weather conditions
- 📊 **Detailed Info**: Shows temperature, humidity, wind speed, pressure, visibility, and cloud percentage
- 💡 **Smart Suggestions**: Recommends activities based on weather conditions
- 🎨 **Responsive Design**: Works on all devices
- 📅 **5-Day Forecast**: Shows weather prediction for the next 5 days

## Quick Start

### Requirements
- Modern web browser (Chrome 51+, Firefox 55+, Safari 10.1+, Edge 79+)
- Internet connection
- OpenWeatherMap API key

### Setup

1. Clone or download the repository
2. Get a free API key from [OpenWeatherMap](https://openweathermap.org/api)
3. Open `script.js` and replace the API_KEY with your own
4. Open `index.html` in your browser or run: `python -m http.server 8000`

## File Structure

```
├── index.html       # HTML structure
├── style.css        # Styling and layout
├── script.js        # JavaScript functionality
├── package.json     # Project metadata
├── .gitignore       # Git ignore rules
└── README.md        # This file
```

## Technologies

- HTML5
- CSS3 (Flexbox, Animations)
- JavaScript ES6+
- OpenWeatherMap API
- Geolocation API
- Fetch API

## Activity Recommendations

The app suggests activities for different weather conditions:
- **Clear**: Outdoor activities, hiking, cycling
- **Cloudy**: Light activities, reading
- **Rainy**: Indoor activities, movies, reading
- **Thunderstorm**: Stay indoors, watch movies
- **Snow**: Winter sports, snow activities
- **Fog/Mist**: Careful outdoor activities, photography

## Browser Support

- Chrome 51+
- Firefox 55+
- Safari 10.1+
- Edge 79+

## License

MIT License - See LICENSE file for details

## Contributing

Pull requests and issues are welcome!

---

**Version**: 1.0.0  
**Last Updated**: December 14, 2025
