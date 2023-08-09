import {
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  KeyboardAvoidingView
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import themeChange from '../../util/theme';
import NavigationHeader from '../../common-components/NavigationHeader';
import ImageSelect from './components/ImageSelect';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../common-components/buttons/Button';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../type';
import { ScrollView } from 'react-native-gesture-handler';

type WriteScreenRouteProp = RouteProp<RootStackParamList, 'writeScreen'>;

const WriteScreen = () => {
  const themeMode = themeChange();
  const { params } = useRoute<WriteScreenRouteProp>();

  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', e => {
      const keyboardHeight = e.endCoordinates.height;

      scrollRef.current?.scrollTo({ y: keyboardHeight, animated: true });
    });

    return () => {
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={[styles.container, { backgroundColor: themeMode.primary }]}>
        <NavigationHeader header={params.header} />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <ScrollView ref={scrollRef}>
            <ImageSelect />
          </ScrollView>
        </KeyboardAvoidingView>
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
