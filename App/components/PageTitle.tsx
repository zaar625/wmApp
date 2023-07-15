import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const PageTitle = ({ title }: { title: string }) => {
  return <Text style={styles.title}>{title}</Text>;
};

export default PageTitle;

const styles = StyleSheet.create({
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 36,
    marginVertical: 30
  }
});
