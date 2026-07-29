WeatherNow

WeatherNow is a responsive weather application built with HTML, CSS, and JavaScript. It allows users to search for a city, country, postcode, or coordinates and view the current weather conditions using the WeatherAPI service.

Features

Search weather by city, country, postcode, or coordinates

Display current temperature in Celsius and Fahrenheit

Show weather condition and weather icon

Display feels-like temperature

Show humidity, wind speed, UV index, and atmospheric pressure

Display air-quality information

Use the browser's current location

Automatic day and night theme

Loading and error handling

Responsive design for desktop, tablet, and mobile devices

Technologies Used

HTML5

CSS3

JavaScript

WeatherAPI

Browser Geolocation API

Project Structure

weather-app/
├── index.html
├── style.css
├── script.js
└── README.md

How to Run the Project

1. Clone the repository

git clone https://github.com/YOUR_USERNAME/weather-app.git

Replace YOUR_USERNAME with your GitHub username.

2. Open the project folder

cd weather-app

3. Start a local server

If Node.js is installed, run:

npx http-server . -p 8000 -c-1

On Windows PowerShell, you can use:

npx.cmd http-server . -p 8000 -c-1

4. Open the application

Visit:

http://localhost:8000/index.html

You can also run the project using the Live Server extension in Visual Studio Code.

How to Use

Enter a city, country, or postcode in the search box.

Click Search weather.

View the current weather details for the entered location.

Click the location button to use your current device location.

Example searches:

Mumbai
Delhi
London
Pune
400001

API Used

This project uses the current-weather endpoint provided by WeatherAPI:

https://api.weatherapi.com/v1/current.json

API Key Security

The API key should not be committed directly to a public GitHub repository.

For a production application:

Store the API key on a backend server.

Keep the key in an environment variable.

Call WeatherAPI through your backend.

Regenerate the key if it has already been exposed publicly.

A frontend .env file does not fully hide an API key because browser-delivered JavaScript can still be inspected.

Future Improvements

Add hourly weather forecasts

Add seven-day forecasts

Save recent searches

Add favourite locations

Add weather charts

Add sunrise and sunset information

Add precipitation forecasts

Author

Akanksha Sukale

License

This project is created for educational and portfolio purposes.
