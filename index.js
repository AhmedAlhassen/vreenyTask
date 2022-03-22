const Server = require("./server");

const PORT = 5000;
const app = new Server(PORT);
app.start();
