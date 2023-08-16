import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import React from 'react';
import CautionIcon from '../assets/icon/caution.svg';

type TProps = {
  message: string;
  style?: ViewStyle;
};

const ErrorGuide = ({ message, style }: TProps) => {
  return (
    <View style={[styles.errorWrapper, { ...style }]}>
      <CautionIcon width={14} height={14} style={{ marginRight: 5 }} color={'#FB6464'} />
      <Text style={styles.errorMessage}>{message}</Text>
    </View>
  );
};

export default ErrorGuide;

const styles = StyleSheet.create({
  errorWrapper: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center'
  },
  errorMessage: {
    fontSize: 13,
    color: '#FB6464'
  }
});
