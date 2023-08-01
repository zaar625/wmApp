import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const CircleSubTitle = ({ title }: { title: string }) => {
  return (
    <View style={styles.container}>
      <View style={styles.circle} />
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

export default CircleSubTitle;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  circle: {
    width: 5,
    height: 5,
    borderRadius: 100,
    backgroundColor: '#D9D9D9',
    marginRight: 10
  },
  text: {
    color: '#BAC0CE'
  }
});
