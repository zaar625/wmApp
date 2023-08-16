import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const ScannerMarker = () => {
  return (
    <View style={styles.container}>
      <View style={styles.leftTop} />
      <View style={styles.rigthTop} />
      <View style={styles.leftBottom} />
      <View style={styles.rightBottom} />
    </View>
  );
};

export default ScannerMarker;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: 300,
    height: 300
  },
  leftTop: {
    width: 50,
    height: 50,
    position: 'absolute',
    left: 0,
    top: 0,
    borderTopWidth: 5,
    borderLeftWidth: 5,
    borderColor: '#FEE500'
  },
  rigthTop: {
    width: 50,
    height: 50,
    position: 'absolute',
    right: 0,
    top: 0,
    borderTopWidth: 5,
    borderRightWidth: 5,
    borderColor: '#FEE500'
  },
  leftBottom: {
    width: 50,
    height: 50,
    position: 'absolute',
    left: 0,
    bottom: 0,
    borderBottomWidth: 5,
    borderLeftWidth: 5,
    borderColor: '#FEE500'
  },
  rightBottom: {
    width: 50,
    height: 50,
    position: 'absolute',
    right: 0,
    bottom: 0,
    borderBottomWidth: 5,
    borderRightWidth: 5,
    borderColor: '#FEE500'
  }
});
