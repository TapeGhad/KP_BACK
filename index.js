const mongoose = require("mongoose");
require('dotenv').config()
const db = require("./context")(mongoose);
const server = require("./server")(db);
const sockets = require("./global-controllers/socket");

const app = server.listen(4000, () => {
  console.log("Running")
  sockets.sockets(app);
});



  




