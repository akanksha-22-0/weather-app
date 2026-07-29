const API_KEY = "3b48e667d2e74cb49b9161546262907";
const API_URL = "https://api.weatherapi.com/v1/current.json";

const weatherForm = document.getElementById("weatherForm");
const locationInput = document.getElementById("locationInput");
const currentLocationButton = document.getElementById(
  "currentLocationButton"
);

const loadingState = document.getElementById("loadingState");
const errorState = document.getElementById("errorState");
const weatherCard = document.getElementById("weatherCard");
const errorMessage = document.getElementById("errorMessage");

const locationName = document.getElementById("locationName");
const locationDetails = document.getElementById("locationDetails");
const localTime = document.getElementById("localTime");
const weatherIcon = document.getElementById("weatherIcon");
const conditionText = document.getElementById("conditionText");
const temperature = document.getElementById("temperature");
const feelsLike = document.getElementById("feelsLike");
const fahrenheit = document.getElementById("fahrenheit");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");
const uvIndex = document.getElementById("uvIndex");
const pressure = document.getElementById("pressure");
const airQualityLabel = document.getElementById("airQualityLabel");
const airQualityDescription = document.getElementById(
  "airQualityDescription"
);
const airQualityIndex = document.getElementById("airQualityIndex");
const lastUpdated = document.getElementById("lastUpdated");

const airQualityLevels = {
  1: {
    label: "Good",
    description: "Air quality is satisfactory.",
  },
  2: {
    label: "Moderate",
    description: "Air quality is acceptable for most people.",
  },
  3: {
    label: "Unhealthy for sensitive groups",
    description: "Sensitive people should reduce prolonged outdoor activity.",
  },
  4: {
    label: "Unhealthy",
    description: "Consider limiting prolonged outdoor activity.",
  },
  5: {
    label: "Very unhealthy",
    description: "Avoid prolonged outdoor activity where possible.",
  },
  6: {
    label: "Hazardous",
    description: "Remain indoors and avoid outdoor exertion.",
  },
};

function setView(view) {
  loadingState.classList.toggle("hidden", view !== "loading");
  errorState.classList.toggle("hidden", view !== "error");
  weatherCard.classList.toggle("hidden", view !== "weather");
}

function showError(message) {
  errorMessage.textContent = message;
  setView("error");
}

function formatWeatherIcon(iconUrl) {
  if (!iconUrl) {
    return "";
  }

  return iconUrl.startsWith("//") ? `https:${iconUrl}` : iconUrl;
}

function updateTheme(isDay) {
  document.body.classList.toggle("day-theme", Boolean(isDay));
  document.body.classList.toggle("night-theme", !Boolean(isDay));
}

function updateAirQuality(airQuality) {
  const epaIndex = airQuality?.["us-epa-index"];
  const level = airQualityLevels[epaIndex];

  if (!level) {
    airQualityLabel.textContent = "Unavailable";
    airQualityDescription.textContent =
      "Air-quality information is not available for this location.";
    airQualityIndex.textContent = "--";
    return;
  }

  airQualityLabel.textContent = level.label;
  airQualityDescription.textContent = level.description;
  airQualityIndex.textContent = epaIndex;
}

function displayWeather(data) {
  const { location, current } = data;

  locationName.textContent = location.name;

  const regionText = location.region ? `${location.region}, ` : "";
  locationDetails.textContent = `${regionText}${location.country}`;
  localTime.textContent = `Local time: ${location.localtime}`;

  weatherIcon.src = formatWeatherIcon(current.condition.icon);
  weatherIcon.alt = current.condition.text;
  conditionText.textContent = current.condition.text;

  temperature.textContent = Math.round(current.temp_c);
  feelsLike.textContent = `${Math.round(current.feelslike_c)}°C`;
  fahrenheit.textContent = `${Math.round(current.temp_f)}°F`;

  humidity.textContent = `${current.humidity}%`;
  windSpeed.textContent = `${Math.round(current.wind_kph)} km/h`;
  uvIndex.textContent = current.uv;
  pressure.textContent = `${Math.round(current.pressure_mb)} mb`;

  lastUpdated.textContent = `Last updated: ${current.last_updated}`;

  updateAirQuality(current.air_quality);
  updateTheme(current.is_day);
  setView("weather");
}

async function fetchWeather(query) {
  const trimmedQuery = query.trim();

  if (!trimmedQuery) {
    showError("Please enter a city, postcode, or country.");
    return;
  }

  setView("loading");

  try {
    const params = new URLSearchParams({
      key: API_KEY,
      q: trimmedQuery,
      aqi: "yes",
    });

    const response = await fetch(`${API_URL}?${params.toString()}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data?.error?.message || "Weather information could not be loaded."
      );
    }

    displayWeather(data);
  } catch (error) {
    console.error("Weather request failed:", error);

    const message =
      error instanceof TypeError
        ? "Network error. Check your internet connection and try again."
        : error.message;

    showError(message);
  }
}

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();
  fetchWeather(locationInput.value);
});

currentLocationButton.addEventListener("click", () => {
  if (!navigator.geolocation) {
    showError("Location access is not supported by this browser.");
    return;
  }

  setView("loading");

  navigator.geolocation.getCurrentPosition(
    ({ coords }) => {
      const coordinates = `${coords.latitude},${coords.longitude}`;
      fetchWeather(coordinates);
    },
    (error) => {
      const messages = {
        1: "Location permission was denied. Please search for your city manually.",
        2: "Your current location could not be determined.",
        3: "Location request timed out. Please try again.",
      };

      showError(messages[error.code] || "Unable to access your location.");
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 300000,
    }
  );
});

// Load a default city when the website opens.
fetchWeather("London");
