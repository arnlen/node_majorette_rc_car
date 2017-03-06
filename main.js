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
rpio.write(motor1EnablePin, rpio.HIGH);
console.read("Motor 1 Enable: " + rpio.read(motor1EnablePin);
rpio.write(motor2EnablePin, rpio.HIGH);
console.read("Motor 2 Enable: " + rpio.read(motor2EnablePin);

rpio.write(motor1Input1Pin, rpio.HIGH);
console.read("Motor 1 Input 1: " + rpio.read(motor1Input1Pin);
rpio.write(motor1Input2Pin, rpio.LOW);
console.read("Motor 1 Input 2: " + rpio.read(motor1Input2Pin);

rpio.write(motor2Input1Pin, rpio.HIGH);
console.read("Motor 2 Input 1: " + rpio.read(motor2Input1Pin);
rpio.write(motor2Input2Pin, rpio.LOW);
console.read("Motor 2 Input 2: " + rpio.read(motor2Input2Pin);


// var brightness = 0; //static variable to hold the current brightness
// io.sockets.on('connection', function (socket) { //gets called whenever a client connects
//     socket.emit('led', {value: brightness}); //send the new client the current brightness
//     console.log("connected");

//     socket.on('led', function (data) { //makes the socket react to 'led' packets by calling this function
//         brightness = data.value;  //updates brightness from the data object
//         var buf = new Buffer(1); //creates a new 1-byte buffer
//         buf.writeUInt8(brightness, 0); //writes the pwm value to the buffer
//         serialPort.write(buf); //transmits the buffer to the arduino

//         io.sockets.emit('led', {value: brightness}); //sends the updated brightness to all connected clients
//     });
// });
