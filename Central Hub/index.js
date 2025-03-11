const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mqtt = require('mqtt');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173", // Allow your frontend origins
    methods: ["GET", "POST"]
  }
});

app.use(cors());

// Configuration
const SMOKE_THRESHOLD = 3000; // Adjust based on sensor calibration
const mqttClient = mqtt.connect('mqtt://192.168.119.181:1883'); // Connect to MQTT broker

// MQTT Topics
const smokeTopic = 'home/sensors/smoke';
const humidityTopic = 'home/sensors/humidity';
const temperatureTopic = 'home/sensors/temperature';
const ledControlTopic = 'home/lights';

// Subscribe to relevant MQTT topics
mqttClient.on('connect', () => {
  console.log('Connected to MQTT broker');
  mqttClient.subscribe([smokeTopic, humidityTopic, temperatureTopic]);
});

mqttClient.on('message', (topic, message) => {
  const sensorValue = parseInt(message.toString());

  switch (topic) {
    case smokeTopic:
      console.log(Smoke Value: ${sensorValue});
      io.emit('smokeData', sensorValue); // Emit real-time smoke data

      // Check smoke level threshold and emit an alert if exceeded
      if (sensorValue > SMOKE_THRESHOLD) {
        io.emit('smokeAlert', {
          message: 'High smoke levels detected!',
          value: sensorValue
        });
      }
      break;

    case humidityTopic:
      console.log(Humidity Value: ${sensorValue});
      io.emit('humidityData', sensorValue); // Emit real-time humidity data
      break;

    case temperatureTopic:
      console.log(Temperature Value: ${sensorValue});
      io.emit('temperatureData', sensorValue); // Emit real-time temperature data
      break;

    default:
      break;
  }
});

// Handle socket connections for real-time communication with the frontend
io.on('connection', (socket) => {
  console.log('Client connected');

  // Listen for LED control events from the frontend
  socket.on('controlLed', (data) => {
    const ledStatus = data.action === 'on' ? 'ON' : 'OFF';
    mqttClient.publish('home/lights', ledStatus);
    console.log(LED control command sent: ${ledStatus});
  });

  // Clean up when client disconnects
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(Server running on http://localhost:${PORT});
});