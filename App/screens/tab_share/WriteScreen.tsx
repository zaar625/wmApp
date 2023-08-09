import {
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  KeyboardAvoidingView
} from 'react-native';
import React, { useEffect, useRef } from 'react';
import themeChange from '../../util/theme';
import NavigationHeader from '../../common-components/NavigationHeader';
import ImageSelect from './components/ImageSelect';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../common-components/buttons/Button';
import { RouteProp, useRoute } from '@react-navigation/native';
import { NavigationScreenProps, RootStackParamList } from '../../type';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';
//

import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
type WriteScreenRouteProp = RouteProp<RootStackParamList, 'writeScreen'>;

const WriteScreen = ({ navigation }: NavigationScreenProps) => {
  const themeMode = themeChange();
  const { params } = useRoute<WriteScreenRouteProp>();
  const { uris, content } = useSelector((state: RootState) => state.share);
  console.log(uris);

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

  const onSubmit = async () => {
    const reference = storage().ref(`/photo/DMWrTCluLrhJMrI01BVhJK6byFs1/test`);
    await reference.putFile(uris[0]);

    const photoURL = await reference.getDownloadURL();
    console.log(photoURL);
    // 파이어베이스 저장
    const shareLogCollection = firestore()
      .collection('users')
      .doc('DMWrTCluLrhJMrI01BVhJK6byFs1')
      .collection('shareLog');

    await shareLogCollection.add({
      user: 'DMWrTCluLrhJMrI01BVhJK6byFs1',
      photoURL,
      content,
      storeName: 'lFddsTVznYG9ZNstQYo9',
      createAt: firestore.FieldValue.serverTimestamp()
    });

    navigation.pop();
  };

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
        <Button name="완료" onPress={onSubmit} />
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
