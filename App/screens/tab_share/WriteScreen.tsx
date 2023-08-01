import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React from 'react';
import themeChange from '../../util/theme';
import ScreenHeader from '../../common/ScreenHeader';
import ImagePick from './components/ImagePick';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../components/buttons/Button';

const WriteScreen = () => {
  const themeMode = themeChange();
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={[styles.container, { backgroundColor: themeMode.primary }]}>
        <View>
          <ScreenHeader />
          <ImagePick />
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
