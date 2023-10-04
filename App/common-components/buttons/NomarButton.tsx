import { StyleSheet, Text, View, Pressable } from 'react-native';
import React from 'react';
import Loader from '../Loader';

type Props = {
  name: string;
  onPress: () => void;
  isActive?: boolean;
};

//모달이나 바텀시트에 들어가는 버튼입니다.
const NomalButton = ({ name, onPress, isActive }: Props) => {
  return (
    <Pressable
      disabled={isActive}
      onPress={onPress}
      style={({ pressed }) => [styles.btn, { opacity: pressed ? 0.5 : 1 }]}
    >
      {isActive && <Loader />}
      <Text style={styles.btnText}>{name}</Text>
    </Pressable>
  );
};

export default NomalButton;

const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#326273',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    marginHorizontal: 20,
    marginTop: 15,
    borderRadius: 10
  },
  btnText: {
    color: '#fff',
    alignSelf: 'center',
    fontSize: 14,
    fontWeight: '500'
  }
});
