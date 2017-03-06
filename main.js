// Node server setup
express = require('express');  //web server
app = express();
server = require('http').createServer(app);
io = require('socket.io').listen(server);    //web socket server

// Node server start
server.listen(8080); //start the webserver on port 8080
app.use(express.static('public')); //tell the server that ./public/ contains the static webpages
console.log("Server running");

var motors = require("./motors.js");
motors.initMotorsPins();
console.log("Motors pins initialized");

// --- --- --- ---

io.sockets.on('connection', function (socket) {
    console.log("New client connected!");

    // Send to the new client the current speed of motors
    socket.emit('motor1', { value: motors.getMotorSpeed(1) });
    socket.emit('motor2', { value: motors.getMotorSpeed(2) });

    socket.on('motor1', function (data) {
      var motorId = 1;
      motors.runMotor(motorId, data.value);
      // Send the new speed to all connected clients
      io.sockets.emit('motor' + motorId, { value: motors.getMotorSpeed(motorId) });
    });

    socket.on('motor2', function (data) {
      var motorId = 2;
      motors.runMotor(motorId, data.value);
      // Send the new speed to all connected clients
      io.sockets.emit('motor' + motorId, { value: motors.getMotorSpeed(motorId) });
    });
});
