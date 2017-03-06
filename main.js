// Node server setup
express = require('express');  //web server
app = express();
server = require('http').createServer(app);
io = require('socket.io').listen(server);    //web socket server

// Node server start
server.listen(8080); //start the webserver on port 8080
app.use(express.static('public')); //tell the server that ./public/ contains the static webpages
console.log("running");

// Config
var motor1EnablePin = 33; //pwm
var motor1Input1Pin = 12;
var motor1Input2Pin = 16;

var motor2EnablePin = 35; //pwm
var motor2Input1Pin = 18;
var motor2Input2Pin = 22;

// RPIO Setup and pin init
var rpio = require('rpio');

rpio.open(motor1EnablePin, rpio.OUTPUT, rpio.LOW);          // Enable 1
rpio.open(motor2EnablePin, rpio.OUTPUT, rpio.LOW);          // Enable 2

rpio.open(motor1Input1Pin, rpio.OUTPUT, rpio.LOW);       // Motor 1, Input 1
rpio.open(motor1Input2Pin, rpio.OUTPUT, rpio.LOW);       // Motor 1, Input 2
rpio.open(motor2Input1Pin, rpio.OUTPUT, rpio.LOW);       // Motor 2, Input 1
rpio.open(motor2Input2Pin, rpio.OUTPUT, rpio.LOW);       // Motor 2, Input 2

// TEST RUN
// rpio.write(motor1EnablePin, rpio.HIGH);
// console.log("Motor 1 Enable: " + rpio.read(motor1EnablePin));
// rpio.write(motor2EnablePin, rpio.HIGH);
// console.log("Motor 2 Enable: " + rpio.read(motor2EnablePin));

// rpio.write(motor1Input1Pin, rpio.HIGH);
// console.log("Motor 1 Input 1: " + rpio.read(motor1Input1Pin));
// rpio.write(motor1Input2Pin, rpio.LOW);
// console.log("Motor 1 Input 2: " + rpio.read(motor1Input2Pin));

// rpio.write(motor2Input1Pin, rpio.HIGH);
// console.log("Motor 2 Input 1: " + rpio.read(motor2Input1Pin));
// rpio.write(motor2Input2Pin, rpio.LOW);
// console.log("Motor 2 Input 2: " + rpio.read(motor2Input2Pin));


var speed = 0; //static variable to hold the current speed
io.sockets.on('connection', function (socket) { //gets called whenever a client connects
    socket.emit('motor1', {value: speed}); //send the new client the current speed
    console.log("connected");

    socket.on('motor1', function (data) { //makes the socket react to 'motor1' packets by calling this function
        rpio.write(motor1EnablePin, rpio.HIGH);
        speed = data.value;  //updates speed from the data object

        if (speed > 0) {
          rpio.write(motor1Input1Pin, rpio.HIGH);
          rpio.write(motor1Input2Pin, rpio.LOW);
        } else if (speed < 0) {
          rpio.write(motor1Input1Pin, rpio.LOW);
          rpio.write(motor1Input2Pin, rpio.HIGH);
        } else {
          rpio.write(motor1EnablePin, rpio.LOW);
        }

        io.sockets.emit('motor1', {value: speed}); //sends the updated speed to all connected clients
    });

    socket.on('motor2', function (data) { //makes the socket react to 'motor1' packets by calling this function
        rpio.write(motor2EnablePin, rpio.HIGH);
        speed = data.value;  //updates speed from the data object

        if (speed > 0) {
          rpio.write(motor2Input1Pin, rpio.HIGH);
          rpio.write(motor2Input2Pin, rpio.LOW);
        } else if (speed < 0) {
          rpio.write(motor2Input1Pin, rpio.LOW);
          rpio.write(motor2Input2Pin, rpio.HIGH);
        } else {
          rpio.write(motor2EnablePin, rpio.LOW);
        }

        io.sockets.emit('motor2', {value: speed}); //sends the updated speed to all connected clients
    });
});
