import { store } from "../app/store";

const CollabEventType = {
  Add: "Added a Task",
  Update: "Updated a Task",
  Join: "Joined the list",
  Leave: "Left the list",
  ListStatus: "List Status",
};

class EventMessage {
  constructor(from, type, listName) {
    this.from = from;
    this.type = type;
    this.listName = listName;
  }
}

class CollaboratorsEventNotifier {
  handlers = [];

  constructor() {
    let port = 4000; //window.location.port;
    const protocol = window.location.protocol === "https:" ? "wss" : "ws";
    this.socket = new WebSocket(
      `${protocol}://${window.location.hostname}:${port}/ws`
    );
    this.socket.onopen = () => {
      this.sendEvent(CollabEventType.Join);
    };
    this.socket.onclose = () => {
      this.sendEvent(CollabEventType.Leave);
    };
    this.socket.onmessage = async (msg) => {
      try {
        let event = msg.data;
        if (event instanceof Blob) {
          event = await event.text();
        }
        event = JSON.parse(event);
        this.receiveEvent(event);
      } catch {
        console.error("Error parsing message:", msg);
      }
    };
  }

  sendEvent(type, listName = null) {
    if (!listName) listName = store.getState().auth.subscribedList;
    const from = store.getState().auth.username || "Unknown user";
    const event = new EventMessage(from, type, listName);
    this.socket.send(JSON.stringify(event));
  }

  addHandler(handler) {
    this.handlers.push(handler);
  }

  removeHandler(handler) {
    this.handlers = this.handlers.filter((h) => h !== handler);
  }

  receiveEvent(event) {
    console.log("Received event:", event);

    this.handlers.forEach((handler) => {
      handler(event);
    });
  }
}

const CollaboratorsNotifier = new CollaboratorsEventNotifier();
export { CollaboratorsNotifier, CollabEventType };
