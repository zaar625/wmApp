import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useRef, forwardRef } from 'react';
import { Modalize } from 'react-native-modalize';

const TimeModifySheet = (_props: any, ref: any) => {
  return (
    <Modalize ref={ref}>
      <Text>...your content</Text>
    </Modalize>
  );
};

export default forwardRef(TimeModifySheet);

const styles = StyleSheet.create({});
