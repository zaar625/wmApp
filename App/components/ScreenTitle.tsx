import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { colors, fontSizes, fontWeight } from '../theme';

const ScreenTitle = ({ title }: { title: string }) => {
  return <Text style={styles.title}>{title}</Text>;
};

export default ScreenTitle;

const styles = StyleSheet.create({
  title: {
    color: colors.dark.tint,
    fontSize: fontSizes.title,
    fontWeight: '700',
    lineHeight: 36,
    marginVertical: 30,
    paddingHorizontal: 20
  }
});
