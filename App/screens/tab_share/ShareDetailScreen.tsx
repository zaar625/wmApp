import {
  StyleSheet,
  Text,
  View,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Pressable
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import NavigationHeader from '../../common-components/NavigationHeader';
import themeChange from '../../util/theme';
import type { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../type';
import format from 'date-fns/format';
import ImageCarousel from './components/ImageCarousel';

import { deviceWidth } from '../../theme';
import Button from '../../common-components/buttons/Button';
import { NavigationScreenProps } from '../../type';
import { ScrollView } from 'react-native-gesture-handler';
import SvgIcon from '../../common-components/SvgIcon';
import { openBottomSheet } from '../../state/slice/bottomSheet';
import { useDispatch } from 'react-redux';

type ShareDetailScreenRouteProp = RouteProp<RootStackParamList, 'shareDetailScreen'>;

const ShareDetailScreen = ({ navigation }: NavigationScreenProps) => {
  const themeMode = themeChange();
  const dispatch = useDispatch();
  const { params } = useRoute<ShareDetailScreenRouteProp>();
  console.log('params', params);

  const { content, title, photosURL, createAt } = params.data;

  const [imageHeigt, setImageHeigt] = useState(0);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const yOffset = event.nativeEvent.contentOffset.y;
    setImageHeigt(yOffset);
  };

  const onPressMenu = () => {
    dispatch(openBottomSheet({ route: 'shareDetailScreen', data: params.data }));
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeMode.primary }]}>
      <View>
        <NavigationHeader header={params.header}>
          <Pressable hitSlop={100} onPress={onPressMenu}>
            <SvgIcon name="menu" />
          </Pressable>
        </NavigationHeader>
      </View>

      <View style={styles.layout}>
        <ScrollView onScroll={handleScroll} bounces={false} scrollEventThrottle={16}>
          {photosURL.length > 0 ? (
            <ImageCarousel photosURL={photosURL} imageHeigt={imageHeigt} />
          ) : (
            <View style={styles.nonImageContainer}>
              <Text style={{ color: themeMode.subTint }}>공유된 이미지가 없습니다.</Text>
            </View>
          )}

          <View style={{ paddingHorizontal: 20 }}>
            <Text style={[styles.contentStore, { color: themeMode.tint }]}>카페이루</Text>
            <Text style={[styles.contentTitle, { color: themeMode.tint }]}>{title}</Text>
            <Text style={[styles.content, { color: themeMode.tint }]}>{content}</Text>

            <View style={styles.authContainer}>
              <Text style={[{ color: themeMode.subTint }, styles.auth]}>@ 이상윤</Text>
              <Text style={[styles.date, { color: themeMode.subTint }]}>
                {format(createAt.toDate(), 'yyyy.MM.dd')}
              </Text>
            </View>
          </View>
        </ScrollView>
        <Button name="확인" onPress={navigation.goBack} />
      </View>
    </SafeAreaView>
  );
};

export default ShareDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  layout: {
    flex: 1,
    justifyContent: 'space-between'
  },

  contentContainer: {
    paddingHorizontal: 20
  },
  contentStore: {
    fontWeight: '700',
    fontSize: 18,
    marginBottom: 40
  },
  contentTitle: {
    fontWeight: '700',
    fontSize: 15,
    marginBottom: 20
  },
  content: {
    marginBottom: 20
  },
  date: {
    fontSize: 12
  },
  nonImageContainer: {
    height: deviceWidth * 0.583,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30
  },
  authContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end'
  },
  auth: {
    marginRight: 10,
    fontSize: 12
  }
});
