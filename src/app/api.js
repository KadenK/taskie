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
  const { lat, lon } = await (await fetch("http://ip-api.com/json/")).json();
  console.log(`Latitude: ${lat}, Longitude: ${lon}`);
  const weatherResponse = await fetch(
    `https://api.open-meteo.com/v1/forecast?longitude=${lon}&latitude=${lat}&current=temperature_2m,weather_code&temperature_unit=fahrenheit&daily=temperature_2m_min,temperature_2m_max,weather_code&temperature_unit=fahrenheit`
  );
  const weatherData = await weatherResponse.json();
  console.log(weatherData);
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
