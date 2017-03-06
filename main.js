// Node server setup
express = require('express');  //web server
app = express();
server = require('http').createServer(app);
io = require('socket.io').listen(server);    //web socket server

// Node server start
server.listen(8080); //start the webserver on port 8080
app.use(express.static('public')); //tell the server that ./public/ contains the static webpages
console.log("running");

// RPIO Setup and pin init
var rpio = require('rpio');

// rpio.open(33, rpio.PWM);                    // Enable 1
// rpio.open(32, rpio.PWM);                    // Enable 2
rpio.open(33, rpio.OUTPUT, rpio.LOW);          // Enable 1
rpio.open(32, rpio.OUTPUT, rpio.LOW);          // Enable 2

rpio.open(12, rpio.OUTPUT, rpio.LOW);       // Motor 1, Input 1
rpio.open(16, rpio.OUTPUT, rpio.LOW);       // Motor 1, Input 2
rpio.open(18, rpio.OUTPUT, rpio.LOW);       // Motor 2, Input 1
rpio.open(22, rpio.OUTPUT, rpio.LOW);       // Motor 2, Input 2

// TEST RUN

rpio.write(32, rpio.HIGH);
rpio.write(33, rpio.HIGH);

rpio.write(12, rpio.HIGH);
rpio.write(16, rpio.LOW);

rpio.write(18, rpio.HIGH);
rpio.write(22, rpio.LOW);


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
