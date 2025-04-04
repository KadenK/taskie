const { WebSocketServer, WebSocket } = require("ws");

const CollabEventType = {
  Add: "Added a Task",
  Update: "Updated a Task",
  Delete: "Deleted a Task",
  Join: "Joined the list",
  Leave: "Left the list",
  ListStatus: "List Status",
};

function peerProxy(httpServer) {
  // Create a websocket object
  const socketServer = new WebSocketServer({ server: httpServer });

  const listCollaborators = {};
  const clientList = {};

  socketServer.on("connection", (socket) => {
    socket.isAlive = true;
    console.log("New client connected");

    // Forward messages to everyone except the sender
    socket.on("message", function message(data) {
      const msg = JSON.parse(data);

      // Handle join and leave events
      if (msg.type === CollabEventType.Join) {
        const listName = msg.listName;
        if (!listCollaborators[listName]) {
          listCollaborators[listName] = new Set();
        }
        const response = {
          from: "server",
          type: CollabEventType.ListStatus,
          listName: listName,
          collaborators: Array.from(listCollaborators[listName]),
        };
        socket.send(JSON.stringify(response));
        listCollaborators[listName].add(msg.from);
        clientList[socket] = msg.from;
      } else if (msg.type === CollabEventType.Leave) {
        const listName = msg.listName;
        if (listCollaborators[listName]) {
          listCollaborators[listName].delete(msg.from);
        }
      }

      socketServer.clients.forEach((client) => {
        if (client !== socket && client.readyState === WebSocket.OPEN) {
          client.send(data);
        }
      });
    });

    // Respond to pong messages by marking the connection alive
    socket.on("pong", () => {
      socket.isAlive = true;
    });
  });

  // Periodically send out a ping message to make sure clients are alive
  setInterval(() => {
    socketServer.clients.forEach(function each(client) {
      if (client.isAlive === false) return client.terminate();

      client.isAlive = false;
      client.ping();
    });
  }, 10000);
}

module.exports = { peerProxy };
