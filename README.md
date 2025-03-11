# Aura Smart Home System

## Project Overview
Aura is a comprehensive IoT-based smart home automation system consisting of multiple interconnected components that work together to provide home monitoring, security, and device control capabilities.

## System Architecture

The project is organized into four main components:

1. **Mobile App** - React Native frontend for user interface
2. **Server** - Node.js/Express backend with MongoDB for data persistence
3. **MQTT End Device** - ESP32-based IoT device for sensor data collection and device control
4. **Central Hub** - Bridge between MQTT devices and client applications

## Key Features

### 1. User Authentication System
- User registration and login via phone number and password
- JWT-based authentication for secure API access
- Profile management functionality

### 2. IoT Device Integration
- Support for multiple sensors:
  - Temperature and humidity monitoring (DHT11)
  - Smoke/air quality detection
  - LED control for lighting
  - Smart lock control for security

### 3. Real-time Communication
- MQTT protocol implementation for efficient IoT device communication
- WebSocket integration for real-time data updates to frontend
- Event-based notification system for alerts

### 4. Security Features
- Secure authentication with JWT token validation
- Password hashing using bcrypt
- Smart lock control for physical security
- Smoke detection alerts for safety monitoring

### 5. Mobile Application
- Cross-platform mobile app built with React Native
- Redux-based state management
- React Query for efficient API data fetching
- Responsive UI with navigation system
- Push notification capabilities

### 6. Data Processing & Analysis
- Sensor data collection and processing
- Threshold-based alert system (e.g., smoke detection)
- Real-time data visualization

### 7. Central Hub Functionality
- Acts as middleware between IoT devices and user applications
- MQTT broker integration
- Socket.IO server for real-time client communication
- Environment monitoring and threshold-based alerts

### 8. Scalable Architecture
- MongoDB database for flexible data storage
- TypeScript implementation for type safety and code quality
- Modular design patterns for maintainability
- Environment-based configuration management

## Technical Implementation

The system demonstrates modern development practices including:
- TypeScript for type safety
- React Hook Form with Yup validation
- API error handling with custom response classes
- Asynchronous programming patterns
- Middleware implementation for authentication
- Environmental configuration management
- Comprehensive project organization and structure

The Aura Smart Home System provides a complete solution for home automation, combining hardware sensors with mobile and server applications to create an integrated ecosystem for monitoring, controlling, and securing residential spaces.

## Prerequisites

- Before setting up the Aura Smart Home System, ensure you have the following installed:
- Node.js (v16+)
- npm or yarn
- MongoDB
- Arduino IDE (for ESP32 programming)
- React Native development environment
- MQTT broker (e.g., Mosquitto)

## Server Setup

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/aura.git
cd aura/Server

### 2. Install dependencies
```bash
yarn install

### 3. Set up environment variables Create a .env file in the server directory:
```bash
PORT=3000
MONGODB_URI=mongodb://localhost:27017/aura
JWT_SECRET=your_jwt_secret_key
MQTT_BROKER=mqtt://localhost:1883

### 4. Start the server
```bash
yarn run dev

## Mobile App Setup

### 1. Navigate to the mobile app directory
```bash
cd ../App

### 2. Install dependencies
```bash
yarn install

### 3. Set up environment variables Create a .env file in the mobile directory:
```bash
API_URL=http://your_server_ip:3000
SOCKET_URL=http://your_server_ip:3000

### 4. Start the development server
```bash 
yarn start

### 5. Run on device/emulator
```bash
# For Android
yarn run android
# For iOS
yarn run ios

## Central Hub Setup
### 1. Navigate to the hub directory
```bash
cd ../"Central Hub"

### 2. Install dependencies
```bash
yarn install

### 3. Configure the hub Edit the config.js file to match your environment:
```bash
module.exports = {
  mqttBroker: 'mqtt://localhost:1883',
  serverUrl: 'http://localhost:3000',
  deviceTopics: ['aura/temperature', 'aura/humidity', 'aura/smoke', 'aura/led', 'aura/lock']
};

### 4. Start the hub
```bash
yarn start

## ESP32 Device Setup
### 1. Open Arduino IDE
### 2. Install required libraries
- ESP32 board support
- wifi library
### 3. Load the device firmware
- Open device/aura_device.ino in Arduino IDE
- Update WiFi credentials and MQTT broker address
- Connect your ESP32 via USB
- Select the correct board and port
- Upload the sketch
### 4. Hardware connections
- Connect DHT11 sensor to pin D4
- Connect MQ-2 smoke sensor to pin A0
- Connect LED to pin D2
- Connect relay for smart lock to pin D5

## Testing the System
### 1. Ensure all components are running
- MongoDB server
- MQTT broker
- Backend server
- Central hub
- ESP32 device(s)
- Mobile app
### 2. Register a new user #### Open the mobile app and create a new account.
### 3. Add devices #### Navigate to the device management section and add your ESP32 device.
### 4. Monitor readings #### Check the dashboard to ensure sensor data is being received.
### 5. Test controls #### Try controlling the LED and smart lock from the mobile application.