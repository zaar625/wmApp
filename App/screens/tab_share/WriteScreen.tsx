import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React, { useState } from 'react';
import themeChange from '../../util/theme';
import NavigationHeader from '../../common-components/NavigationHeader';
import ImageSelect from './components/ImageSelect';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../common-components/buttons/Button';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../type';

type WriteScreenRouteProp = RouteProp<RootStackParamList, 'writeScreen'>;

const WriteScreen = () => {
  const themeMode = themeChange();
  const { params } = useRoute<WriteScreenRouteProp>();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={[styles.container, { backgroundColor: themeMode.primary }]}>
        <View>
          <NavigationHeader header={params.header} />
          <ImageSelect />
        </View>
        <Button name="완료" onPress={() => {}} />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default WriteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  }
});
