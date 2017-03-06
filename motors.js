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
  // rpio.pwmSetClockDivider(64);
  // rpio.open(motor1EnablePin, rpio.PWM);
  // rpio.pwmSetRange(motor1EnablePin, 1024);
  // rpio.open(motor2EnablePin, rpio.PWM);
  // rpio.pwmSetRange(motor2EnablePin, 1024);

  rpio.open(motor1EnablePin, rpio.OUTPUT, rpio.LOW);       // Enable 1
  rpio.open(motor2EnablePin, rpio.OUTPUT, rpio.LOW);       // Enable 2

  rpio.open(motor1Input1Pin, rpio.OUTPUT, rpio.LOW);       // Motor 1, Input 1
  rpio.open(motor1Input2Pin, rpio.OUTPUT, rpio.LOW);       // Motor 1, Input 2
  rpio.open(motor2Input1Pin, rpio.OUTPUT, rpio.LOW);       // Motor 2, Input 1
  rpio.open(motor2Input2Pin, rpio.OUTPUT, rpio.LOW);       // Motor 2, Input 2
};

exports.runMotor = function(motorId, speed) {
  activateMotor(motorId);
  setMotorSpeed(motorId, speed);

  if (speed > 0) {
    runForward(motorId, Math.abs(speed));
  } else if (speed < 0) {
    runBackward(motorId, Math.abs(speed));
  } else {
    deactivateMotor(motorId);
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

// USELESS with PWM ?
var activateMotor = function(motorId) {
  switch (motorId) {
    case 1:
      rpio.write(motor1EnablePin, rpio.HIGH);
      break;
    case 2:
      rpio.write(motor2EnablePin, rpio.HIGH);
      break;
  }
}

// USELESS with PWM ?
var deactivateMotor = function(motorId) {
  switch (motorId) {
    case 1:
      rpio.write(motor1EnablePin, rpio.LOW);
      break;
    case 2:
      rpio.write(motor2EnablePin, rpio.LOW);
      break;
  }
}

var setMotorSpeed = function(motorId, speed) {
  switch (motorId) {
    case 1:
      motor1Speed = speed;
      break;
    case 2:
      motor2Speed = speed;
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
      rpio.pwmSetData(motor1EnablePin, absoluteSpeed);
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
      rpio.pwmSetData(motor1EnablePin, absoluteSpeed);
      rpio.write(motor2Input1Pin, rpio.LOW);
      rpio.write(motor2Input2Pin, rpio.HIGH);
      break;
  }
}