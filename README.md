# Aura Smart Home System

## Project Overview
Aura is a comprehensive IoT-based smart home automation system consisting of multiple interconnected components that work together to provide home monitoring, security, and device control capabilities.

## System Architecture
The project is organized into four main components:

1. **Mobile App** - React Native frontend for user interface.
2. **Server** - Node.js/Express backend with MongoDB for data persistence.
3. **MQTT End Device** - ESP32-based IoT device for sensor data collection and device control.
4. **Central Hub** - Bridge between MQTT devices and client applications.

## Key Features

### 1. User Authentication System
- User registration and login via phone number and password.
- JWT-based authentication for secure API access.
- Profile management functionality.

### 2. IoT Device Integration
- Support for multiple sensors:
  - Temperature and humidity monitoring (DHT11).
  - Smoke/air quality detection.
  - LED control for lighting.
  - Smart lock control for security.

### 3. Real-time Communication
- MQTT protocol implementation for efficient IoT device communication.
- WebSocket integration for real-time data updates to frontend.
- Event-based notification system for alerts.

### 4. Security Features
- Secure authentication with JWT token validation.
- Password hashing using bcrypt.
- Smart lock control for physical security.
- Smoke detection alerts for safety monitoring.

### 5. Mobile Application
- Cross-platform mobile app built with React Native.
- Redux-based state management.
- React Query for efficient API data fetching.
- Responsive UI with navigation system.
- Push notification capabilities.

### 6. Data Processing & Analysis
- Sensor data collection and processing.
- Threshold-based alert system (e.g., smoke detection).
- Real-time data visualization.

### 7. Central Hub Functionality
- Acts as middleware between IoT devices and user applications.
- MQTT broker integration.
- Socket.IO server for real-time client communication.
- Environment monitoring and threshold-based alerts.

### 8. Scalable Architecture
- MongoDB database for flexible data storage.
- TypeScript implementation for type safety and code quality.
- Modular design patterns for maintainability.
- Environment-based configuration management.

## Technical Implementation
The system demonstrates modern development practices including:
- TypeScript for type safety.
- React Hook Form with Yup validation.
- API error handling with custom response classes.
- Asynchronous programming patterns.
- Middleware implementation for authentication.
- Environmental configuration management.
- Comprehensive project organization and structure.

The Aura Smart Home System provides a complete solution for home automation, combining hardware sensors with mobile and server applications to create an integrated ecosystem for monitoring, controlling, and securing residential spaces.

## Prerequisites
Before setting up the Aura Smart Home System, ensure you have the following installed:
- Node.js (v16+)
- npm or yarn
- MongoDB
- Arduino IDE (for ESP32 programming)
- React Native development environment
- MQTT broker (e.g., Mosquitto)

## Server Setup

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/aura.git
cd aura/Server

# 2. Install dependencies
yarn install

# 3. Set up environment variables
touch .env
```

Add the following content to `.env` file:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/aura
JWT_SECRET=your_jwt_secret_key
MQTT_BROKER=mqtt://localhost:1883
```

```bash
# 4. Start the server
yarn run dev
```

## Mobile App Setup

```bash
# 1. Navigate to the mobile app directory
cd ../App

# 2. Install dependencies
yarn install

# 3. Set up environment variables
touch .env
```

Add the following content to `.env` file:
```env
API_URL=http://your_server_ip:3000
SOCKET_URL=http://your_server_ip:3000
```

```bash
# 4. Start the development server
yarn start

# 5. Run on device/emulator
# For Android
yarn run android
# For iOS
yarn run ios
```

## Central Hub Setup

```bash
# 1. Navigate to the hub directory
cd ../"Central Hub"

# 2. Install dependencies
yarn install
```

Edit `config.js` to match your environment:
```javascript
module.exports = {
  mqttBroker: 'mqtt://localhost:1883',
  serverUrl: 'http://localhost:3000',
  deviceTopics: ['aura/temperature', 'aura/humidity', 'aura/smoke', 'aura/led', 'aura/lock']
};
```

```bash
# 4. Start the hub
yarn start
```

## ESP32 Device Setup

### 1. Open Arduino IDE
### 2. Install Required Libraries
- ESP32 board support
- WiFi library

### 3. Load the Device Firmware
- Open `device/aura_device.ino` in Arduino IDE.
- Update WiFi credentials and MQTT broker address.
- Connect your ESP32 via USB.
- Select the correct board and port.
- Upload the sketch.

### 4. Hardware Connections
- Connect DHT11 sensor to pin D4.
- Connect MQ-2 smoke sensor to pin A0.
- Connect LED to pin D2.
- Connect relay for smart lock to pin D5.

## Testing the System

### 1. Ensure All Components Are Running
- MongoDB server.
- MQTT broker.
- Backend server.
- Central hub.
- ESP32 device(s).
- Mobile app.

### 2. Register a New User
- Open the mobile app and create a new account.

### 3. Add Devices
- Navigate to the device management section and add your ESP32 device.

### 4. Monitor Readings
- Check the dashboard to ensure sensor data is being received.

### 5. Test Controls
- Try controlling the LED and smart lock from the mobile application.
