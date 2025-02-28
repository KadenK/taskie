const sendRequest = (url, method, data) => {
  // return fetch(url, {
  //   method,
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(data),
  // }).then((response) => {
  //   if (!response.ok) {
  //     throw new Error("API Call failed: " + response.statusText);
  //   }
  //   return response.json();
  // });
  return Promise.resolve(null);
};

const api = {
  getTasks: () => sendRequest("/api/tasks", "GET"),
  addTask: (task) => sendRequest("/api/tasks", "POST", task),
  updateTask: (task) => sendRequest(`/api/tasks/${task.id}`, "PUT", task),
  deleteTask: (taskId) => sendRequest(`/api/tasks/${taskId}`, "DELETE"),
  getTask: (taskId) => sendRequest(`/api/tasks/${taskId}`, "GET"),
};

export default api;
