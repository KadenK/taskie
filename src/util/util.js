export const WeatherCondition = Object.freeze({
  Sunny: { name: "sunny", icon: "/weather/wi-day-sunny.svg" },
  Cloudy: { name: "cloudy", icon: "/weather/wi-cloudy.svg" },
  Rainy: { name: "rainy", icon: "/weather/wi-rain-mix.svg" },
  Snowy: { name: "snowy", icon: "/weather/wi-snow-wind.svg" },
  Thunderstorm: { name: "thunderstorm", icon: "/weather/wi-storm-showers.svg" },
  Windy: { name: "windy", icon: "/weather/wi-strong-wind.svg" },
});

export const weatherCodeMap = {
  0: WeatherCondition.Sunny, // Clear sky
  1: WeatherCondition.Sunny, // Mainly clear
  2: WeatherCondition.Cloudy, // Partly cloudy
  3: WeatherCondition.Cloudy, // Overcast
  45: WeatherCondition.Cloudy, // Foggy
  48: WeatherCondition.Cloudy, // Rime fog
  51: WeatherCondition.Rainy, // Light drizzle
  53: WeatherCondition.Rainy, // Moderate drizzle
  55: WeatherCondition.Rainy, // Dense drizzle
  56: WeatherCondition.Rainy, // Light freezing drizzle
  57: WeatherCondition.Rainy, // Dense freezing drizzle
  61: WeatherCondition.Rainy, // Slight rain
  63: WeatherCondition.Rainy, // Moderate rain
  65: WeatherCondition.Rainy, // Heavy rain
  66: WeatherCondition.Rainy, // Light freezing rain
  67: WeatherCondition.Rainy, // Heavy freezing rain
  71: WeatherCondition.Snowy, // Slight snow fall
  73: WeatherCondition.Snowy, // Moderate snow fall
  75: WeatherCondition.Snowy, // Heavy snow fall
  77: WeatherCondition.Snowy, // Snow grains
  80: WeatherCondition.Rainy, // Slight rain showers
  81: WeatherCondition.Rainy, // Moderate rain showers
  82: WeatherCondition.Rainy, // Violent rain showers
  85: WeatherCondition.Snowy, // Slight snow showers
  86: WeatherCondition.Snowy, // Heavy snow showers
  95: WeatherCondition.Thunderstorm, // Thunderstorm
  96: WeatherCondition.Thunderstorm, // Thunderstorm with slight hail
  99: WeatherCondition.Thunderstorm, // Thunderstorm with heavy hail
};
