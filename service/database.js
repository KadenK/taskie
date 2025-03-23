const { MongoClient } = require("mongodb");
const config = require("./dbConfig.json");

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db("simon");
// Structure: [{ username: "user1", password: "hashedpassword", token: "sometoken", subscribedList: "list1" }]
const userCollection = db.collection("user");
// Structure: [{ name: "list1", tasks: [{ id: "1", name: "Task 1", checked: false, parentId: null }]}]
const listCollection = db.collection("list");

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  try {
    await db.command({ ping: 1 });
    console.log(`Connect to database`);
  } catch (ex) {
    console.log(
      `Unable to connect to database with ${url} because ${ex.message}`
    );
    process.exit(1);
  }
})();

function getUser(username) {
  return userCollection.findOne({ username: username });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function addUser(user) {
  await userCollection.insertOne(user);
}

async function updateUser(user) {
  await userCollection.updateOne({ username: user.username }, { $set: user });
}

async function getList(name) {
  return listCollection.findOne({ name: name });
}

async function addTask(listName, task) {
  await listCollection.updateOne(
    { name: listName },
    { $push: { tasks: task } },
    { upsert: true }
  );
}

async function deleteTask(listName, taskId) {
  await listCollection.updateOne(
    { name: listName },
    { $pull: { tasks: { id: taskId } } }
  );
}

async function updateTask(listName, task) {
  await listCollection.updateOne(
    { name: listName, "tasks.id": task.id },
    { $set: { "tasks.$": task } }
  );
}

module.exports = {
  getUser,
  getUserByToken,
  addUser,
  updateUser,
  addTask,
  getList,
  deleteTask,
  updateTask,
};
