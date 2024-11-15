import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';

const CameraStream = () => {
   const [frame, setFrame] = useState<string | null>(null);

   useEffect(() => {
      const ws = new WebSocket('ws://192.168.255.223:9999'); // replace with your server's IP and port

      ws.onmessage = (event) => {
         // Convert MJPEG frame to base64 and set as Image source
         setFrame(`data:image/jpeg;base64,${event.data}`);
      };

      ws.onerror = (error) => {
         console.error('WebSocket Error:', error);
      };

      return () => {
         ws.close();
      };
   }, []);

   return (
      <View style={styles.container}>
         {frame ? (
            <Image source={{ uri: frame }} style={styles.video} />
         ) : (
            <View style={styles.loading}><Text>Loading...</Text></View>
         )}
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#000',
      justifyContent: 'center',
      alignItems: 'center',
   },
   video: {
      width: '100%',
      height: 300,
   },
   loading: {
      justifyContent: 'center',
      alignItems: 'center',
   },
});

export default CameraStream;
