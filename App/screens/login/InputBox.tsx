import { StyleSheet, Text, View, TextInput } from 'react-native';
import React, { useState } from 'react';

interface Props {
  onSubmitEditing?: () => void;
  placeholder: string;
  label: string;
}

export default React.forwardRef(function InputBox({ ...args }: Props, ref: any) {
  const [focusActive, setFocusActive] = useState(false);

  const inputFocused = () => {
    setFocusActive(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{args.label}</Text>
      <TextInput
        ref={ref}
        // placeholder={placeholder}
        {...args}
        style={[styles.input, focusActive && styles.focusedInput]}
        // onSubmitEditing={onSubmitEditing}
        onFocus={inputFocused}
        onBlur={() => setFocusActive(false)}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    marginBottom: 20
  },
  label: {
    marginBottom: 20,
    color: '#fff'
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#202632',
    paddingBottom: 10,
    color: '#fff',
    fontSize: 16
  },
  focusedInput: {
    borderBottomWidth: 2,
    borderBottomColor: '#326273'
  }
});
