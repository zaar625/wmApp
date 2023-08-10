import {
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Text,
  View,
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
type WriteScreenRouteProp = RouteProp<RootStackParamList, 'writeStep2'>;

const WriteStep2 = ({ navigation }: NavigationScreenProps) => {
  const themeMode = themeChange();
  const { params } = useRoute<WriteScreenRouteProp>();
  const { uris, content, title } = useSelector((state: RootState) => state.share);
  const photoURLs: string[] = [];
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
    const reference = storage().ref();

    if (uris.length > 0) {
      for (let i = 0; i < uris.length; i++) {
        const uri = uris[i];
        const imageName = `image_${i}.jpg`; // Customize the naming of your images
        const imageRef = reference.child(`/photo/DMWrTCluLrhJMrI01BVhJK6byFs1/${imageName}`);

        try {
          await imageRef.putFile(uri);
          console.log(`Image ${i + 1} uploaded successfully`);

          const downloadURL = await imageRef.getDownloadURL();
          photoURLs.push(downloadURL);
        } catch (error) {
          // console.error(`Error uploading image ${i + 1}:`, error);
        }
      }
    }

    // 파이어베이스 저장
    const shareLogCollection = firestore()
      .collection('users')
      .doc('DMWrTCluLrhJMrI01BVhJK6byFs1')
      .collection('shareLog');

    await shareLogCollection.add({
      user: 'DMWrTCluLrhJMrI01BVhJK6byFs1',
      photoURLs,
      content,
      storeName: 'lFddsTVznYG9ZNstQYo9',
      createAt: firestore.FieldValue.serverTimestamp()
    });

    navigation.pop();
  };

  const onBackHandler = () => {
    console.log('a');
    navigation.goBack();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={[styles.container, { backgroundColor: themeMode.primary }]}>
        <NavigationHeader header="공유 내용 작성하기" onPress={onBackHandler} />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <ScrollView ref={scrollRef}>
            <View style={styles.title}>
              <Text style={[styles.titleText, { color: themeMode.tint }]}>
                현재 공유할 매장은{' '}
                <Text style={[styles.titleBold, { color: themeMode.tint }]}>
                  {params.storeName}
                </Text>
                입니다.
              </Text>
            </View>
            <ImageSelect />
          </ScrollView>
        </KeyboardAvoidingView>
        <Button name="완료" onPress={onSubmit} />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default WriteStep2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginVertical: 20
  },
  titleText: {
    fontSize: 16,
    fontWeight: '500'
  },
  titleBold: {
    fontSize: 20,
    fontWeight: '700',
    textDecorationLine: 'underline'
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 20
  }
});
