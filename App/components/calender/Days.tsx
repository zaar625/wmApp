import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const Days = () => {
  const days = ['일', '월', '화', '수', '목', '금', '토'];

  return (
    <View style={styles.container}>
      {days.map(day => (
        <View key={day} style={styles.dayWrapper}>
          <Text style={styles.day}>{day}</Text>
        </View>
      ))}
    </View>
  );
};

export default Days;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  dayWrapper: {
    flex: 1,
    marginVertical: 20,
    paddingHorizontal: 10
  },
  day: {
    textAlign: 'center',
    color: '#6B6F78',
    fontWeight: '600'
  }
});
