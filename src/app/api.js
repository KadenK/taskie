import { weatherCodeMap } from "../util/util";

const sendRequest = (url, method, data) => {
  return fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: data ? JSON.stringify(data) : undefined,
  }).then((response) => {
    if (!response.ok) {
      throw new Error("API Call Error: " + response.statusText);
    }
    return response.status === 204 ? {} : response.json();
  });
};

const getWeatherConditions = async () => {
  const { latitude, longitude } = await (
    await fetch("https://ipapi.co/json/")
  ).json();
  const weatherResponse = await fetch(
    `https://api.open-meteo.com/v1/forecast?longitude=${longitude}&latitude=${latitude}&current=temperature_2m,weather_code&temperature_unit=fahrenheit&daily=temperature_2m_min,temperature_2m_max,weather_code&temperature_unit=fahrenheit`
  );
  const weatherData = await weatherResponse.json();
  return {
    today: {
      condition: weatherCodeMap[weatherData.current.weather_code],
      temperature: weatherData.current.temperature_2m,
    },
    tomorrow: {
      condition: weatherCodeMap[weatherData.daily.weather_code[1]],
      temperature:
        Math.floor(weatherData.daily.temperature_2m_max[1]) +
        " / " +
        Math.floor(weatherData.daily.temperature_2m_min[1]),
    },
  };
};

const api = {
  getTasks: () => sendRequest("/api/tasks", "GET"),
  addTask: (task) => sendRequest("/api/tasks", "POST", task),
  updateTask: (task) => sendRequest(`/api/tasks/${task.id}`, "PUT", task),
  deleteTask: (taskId) => sendRequest(`/api/tasks/${taskId}`, "DELETE"),
  getTask: (taskId) => sendRequest(`/api/tasks/${taskId}`, "GET"),
  login: (username, password) =>
    sendRequest("/api/auth/login", "POST", { username, password }),
  logout: () => sendRequest("/api/auth/logout", "DELETE"),
  createUser: (username, password) =>
    sendRequest("/api/auth/create", "POST", { username, password }),
  joinList: (listName) => sendRequest("/api/lists/join", "POST", { listName }),
  getWeatherConditions,
};

export default api;
