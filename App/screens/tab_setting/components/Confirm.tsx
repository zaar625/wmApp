import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const Confirm = ({ confirm }: { confirm: boolean }) => {
  return (
    <View style={[styles.btnState, { backgroundColor: confirm ? '#52C648' : '#D9D9D9' }]}>
      {confirm ? (
        <Text style={styles.btnStateText}>수정완료</Text>
      ) : (
        <Text style={styles.btnStateText}>확인중</Text>
      )}
    </View>
  );
};

export default Confirm;

const styles = StyleSheet.create({
  btnState: {
    backgroundColor: '#D9D9D9',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10
  },
  btnStateText: {
    fontSize: 10
  }
});
