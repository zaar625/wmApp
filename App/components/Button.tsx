import { StyleSheet, Text, View, Pressable } from 'react-native';
import React from 'react';

type Props = {
  name: string;
  onPress: () => void;
};

const Button = ({ name, onPress }: Props) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.btn, { opacity: pressed ? 0.5 : 1 }]}
    >
      <Text
        style={{
          color: '#fff',
          alignSelf: 'center',
          fontSize: 16,
          fontWeight: '700'
        }}
      >
        {name}
      </Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#326273',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 21,
    // marginHorizontal: 20,
    borderRadius: 10
  }
});
