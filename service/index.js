const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const express = require("express");
const uuid = require("uuid");
const authCookieName = "token";

// Local memory databases
// Example: [{ username: "user1", password: "hashedpassword", token: "sometoken", subscribedList: "list1" }]
let users = [];
// Example: [{ name: "list1", tasks: [{ id: "1", name: "Task 1", checked: false, parentId: null }]}]
let lists = [];

const app = express();
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

// Serve up the front-end static content hosting
app.use(express.static("public"));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// CreateAuth a new user
apiRouter.post("/auth/create", async (req, res) => {
  if (await findUser("username", req.body.username)) {
    res.status(409).send({ msg: "Existing user" });
  } else {
    const username = req.body.username;
    // Create a default list for the new user
    const defaultList = {
      name: username + "'s List",
      tasks: [],
    };
    lists.push(defaultList);

    const user = await createUser(
      username,
      req.body.password,
      defaultList.name
    );

    setAuthCookie(res, user.token);
    res.send({ username: user.username, subscribedList: user.subscribedList });
  }
});

// GetAuth login an existing user
apiRouter.post("/auth/login", async (req, res) => {
  const user = await findUser("username", req.body.username);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      user.token = uuid.v4();
      setAuthCookie(res, user.token);
      res.send({
        username: user.username,
        subscribedList: user.subscribedList,
      });
      return;
    }
  }
  res.status(401).send({ msg: "Unauthorized" });
});

// DeleteAuth logout a user
apiRouter.delete("/auth/logout", async (req, res) => {
  const user = await findUser("token", req.cookies[authCookieName]);
  if (user) {
    delete user.token;
  }
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// Middleware to verify that the user is authorized to call an endpoint
const verifyAuth = async (req, res, next) => {
  const user = await findUser("token", req.cookies[authCookieName]);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: "Unauthorized" });
  }
};

// Get all tasks
apiRouter.get("/tasks", verifyAuth, async (req, res) => {
  const user = await findUser("token", req.cookies[authCookieName]);
  const list = lists.find((l) => l.name === user.subscribedList);

  if (list) {
    res.send(list.tasks || []);
  } else {
    res.send([]);
  }
});

// Get a specific task by ID
apiRouter.get("/tasks/:id", verifyAuth, async (req, res) => {
  const taskId = req.params.id;
  const user = await findUser("token", req.cookies[authCookieName]);
  const list = lists.find((l) => l.name === user.subscribedList);

  if (!list) {
    res.status(404).send({ msg: "List not found or unauthorized" });
    return;
  }

  const task = list.tasks?.find((t) => t.id.toString() === taskId);
  if (task) {
    res.send(task);
  } else {
    res.status(404).send({ msg: "Task not found" });
  }
});

// Create a new task
apiRouter.post("/tasks", verifyAuth, async (req, res) => {
  const user = await findUser("token", req.cookies[authCookieName]);
  const list = lists.find((l) => l.name === user.subscribedList);

  if (!list) {
    res.status(404).send({ msg: "List not found or unauthorized" });
    return;
  }

  const task = {
    id: uuid.v4(),
    ...req.body,
    createdDate: new Date().toISOString(),
  };

  if (!list.tasks) {
    list.tasks = [];
  }

  list.tasks.push(task);
  res.status(201).send(task);
});

// Update a task
apiRouter.put("/tasks/:id", verifyAuth, async (req, res) => {
  const taskId = req.params.id;
  const user = await findUser("token", req.cookies[authCookieName]);
  const list = lists.find((l) => l.name === user.subscribedList);

  if (!list) {
    res.status(404).send({ msg: "List not found or unauthorized" });
    return;
  }

  const taskIndex = list.tasks?.findIndex((t) => t.id.toString() === taskId);
  if (taskIndex !== -1) {
    const updatedTask = {
      ...list.tasks[taskIndex],
      ...req.body,
      id: list.tasks[taskIndex].id,
      modifiedDate: new Date().toISOString(),
    };

    list.tasks[taskIndex] = updatedTask;
    res.send(updatedTask);
  } else {
    res.status(404).send({ msg: "Task not found" });
  }
});

// Delete a task
apiRouter.delete("/tasks/:id", verifyAuth, async (req, res) => {
  const taskId = req.params.id;
  const user = await findUser("token", req.cookies[authCookieName]);
  const list = lists.find((l) => l.name === user.subscribedList);

  if (!list) {
    res.status(404).send({ msg: "List not found or unauthorized" });
    return;
  }

  const taskIndex = list.tasks?.findIndex((t) => t.id.toString() === taskId);
  if (taskIndex !== -1) {
    list.tasks.splice(taskIndex, 1);
    res.status(204).end();
  } else {
    res.status(404).send({ msg: "Task not found" });
  }
});

// Join a list
apiRouter.post("/lists/join", verifyAuth, async (req, res) => {
  const user = await findUser("token", req.cookies[authCookieName]);
  const { listName } = req.body;

  let list = lists.find((l) => l.name === listName);
  if (!list) {
    list = {
      name: listName,
      tasks: [],
    };
    lists.push(list);
  }

  user.subscribedList = list.name;
  res.send(list);
});

// Default error handler
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

/**  Begin helper functions  **/
async function createUser(username, password, subscribedList) {
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    username: username,
    password: passwordHash,
    token: uuid.v4(),
    subscribedList,
  };
  users.push(user);

  return user;
}

async function findUser(field, value) {
  if (!value) return null;

  return users.find((u) => u[field] === value);
}

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: "strict",
  });
}

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
