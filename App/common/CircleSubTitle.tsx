import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import themeChange from '../util/theme';

const CircleSubTitle = ({ title }: { title: string }) => {
  const themeMode = themeChange();
  return (
    <View style={styles.container}>
      <View style={[styles.circle, { backgroundColor: themeMode.subTint }]} />
      <Text style={{ color: themeMode.subTint }}>{title}</Text>
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
  }
});
