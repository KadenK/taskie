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
};

export default api;
