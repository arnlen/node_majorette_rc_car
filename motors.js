// Config
var motor1EnablePin = 33;   // pwm
var motor1Input1Pin = 12;
var motor1Input2Pin = 16;

var motor2EnablePin = 35;   // pwm
var motor2Input1Pin = 18;
var motor2Input2Pin = 22;

// Store motors' speed
var motor1Speed = 0;
var motor2Speed = 0;

// RPIO Setup and pin init
var rpio = require('rpio');

// --- --- PUBLIC METHODS --- ---

exports.initMotorsPins = function() {
  // PWM
  rpio.open(motor1EnablePin, rpio.PWM);
  rpio.pwmSetClockDivider(8);
  rpio.pwmSetRange(motor1EnablePin, 128);
  rpio.open(motor2EnablePin, rpio.PWM);
  rpio.pwmSetClockDivider(8);
  rpio.pwmSetRange(motor2EnablePin, 128);

  // rpio.open(motor1EnablePin, rpio.OUTPUT, rpio.LOW);       // Enable 1
  // rpio.open(motor2EnablePin, rpio.OUTPUT, rpio.LOW);       // Enable 2

  rpio.open(motor1Input1Pin, rpio.OUTPUT, rpio.LOW);       // Motor 1, Input 1
  rpio.open(motor1Input2Pin, rpio.OUTPUT, rpio.LOW);       // Motor 1, Input 2
  rpio.open(motor2Input1Pin, rpio.OUTPUT, rpio.LOW);       // Motor 2, Input 1
  rpio.open(motor2Input2Pin, rpio.OUTPUT, rpio.LOW);       // Motor 2, Input 2
};

exports.runMotor = function(motorId, speed) {
  setMotorSpeed(motorId, speed);

  if (speed > 0) {
    runForward(motorId, Math.abs(speed));
  } else if (speed < 0) {
    runBackward(motorId, Math.abs(speed));
  }
}

exports.getMotorSpeed = function(motorId) {
  switch (motorId) {
    case 1:
      return motor1Speed;
      break;
    case 2:
      return motor2Speed;
      break;
  }
}

// --- --- PRIVATE METHODS --- ---

var setMotorSpeed = function(motorId, speed) {
  switch (motorId) {
    case 1:
      motor1Speed = speed;
      console.log("Motor 1 set to " + speed);
      break;
    case 2:
      motor2Speed = speed;
      console.log("Motor 2 set to " + speed);
      break;
  }
}

var runForward = function(motorId, absoluteSpeed) {
  switch (motorId) {
    case 1:
      rpio.pwmSetData(motor1EnablePin, absoluteSpeed);
      rpio.write(motor1Input1Pin, rpio.HIGH);
      rpio.write(motor1Input2Pin, rpio.LOW);
      break;
    case 2:
      rpio.pwmSetData(motor2EnablePin, absoluteSpeed);
      rpio.write(motor2Input1Pin, rpio.HIGH);
      rpio.write(motor2Input2Pin, rpio.LOW);
      break;
  }
}

var runBackward = function(motorId, absoluteSpeed) {
  switch (motorId) {
    case 1:
      rpio.pwmSetData(motor1EnablePin, absoluteSpeed);
      rpio.write(motor1Input1Pin, rpio.LOW);
      rpio.write(motor1Input2Pin, rpio.HIGH);
      break;
    case 2:
      rpio.pwmSetData(motor2EnablePin, absoluteSpeed);
      rpio.write(motor2Input1Pin, rpio.LOW);
      rpio.write(motor2Input2Pin, rpio.HIGH);
      break;
  }
}