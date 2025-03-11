import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const MyWebBlock = () => {
  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: 'http://192.168.1.2:8080/browserfs.html' }}
        style={styles.webview}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 70,
  },
  webview: {
    width: 300,
    height: 200,
  },
});

export default MyWebBlock;
