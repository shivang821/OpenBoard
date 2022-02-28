const express = require("express");
const socket = require("socket.io");

let app = express();
app.use(express.static("public"));
let port = process.env.Port || 5000;
let server = app.listen(port, () => {
    console.log("lisning to prot" + port);
});
let io = socket(server);
io.on("connection", (socket) => {
    console.log("made socket connection");
    // received data
    socket.on("beginPath", (data) => {
        //transfer fata to all connected data
        io.sockets.emit("beginPath", data);
    });
    socket.on("drawStroke", (data) => {
        io.sockets.emit("drawStroke", data);
    });
    socket.on("redoUndo", (data) => {
        io.sockets.emit("redoUndo", data);
    });
});