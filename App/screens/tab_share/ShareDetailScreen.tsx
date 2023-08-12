import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import NavigationHeader from '../../common-components/NavigationHeader';
import themeChange from '../../util/theme';
import type { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../type';
import format from 'date-fns/format';

import { deviceWidth } from '../../theme';
import Button from '../../common-components/buttons/Button';

type ShareDetailScreenRouteProp = RouteProp<RootStackParamList, 'shareDetailScreen'>;

const ShareDetailScreen = () => {
  const themeMode = themeChange();
  const { params } = useRoute<ShareDetailScreenRouteProp>();

  const { content, title, photosURL, createAt } = params.data;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeMode.primary }]}>
      <NavigationHeader header={params.header} />
      <View style={styles.layout}>
        <View style={styles.contentContainer}>
          <Text style={[styles.contentStore, { color: themeMode.tint }]}>카페이루</Text>
          <Text style={[{ color: themeMode.subTint, fontSize: 12 }]}>@ 이상윤</Text>

          {photosURL.length > 0 ? (
            <View style={styles.imageContainer}>
              <Image source={{ uri: photosURL[0] }} style={styles.mainImage} />
              <View style={{ justifyContent: 'space-between' }}>
                <Image source={{ uri: photosURL[1] }} style={styles.subImage} />
                <Image source={{ uri: photosURL[2] }} style={styles.subImage} />
              </View>
            </View>
          ) : (
            <View style={styles.nonImageContainer}>
              <Text style={{ color: themeMode.subTint }}>공유된 이미지가 없습니다.</Text>
            </View>
          )}

          <Text style={[styles.contentTitle, { color: themeMode.tint }]}>{title}</Text>
          <Text style={[styles.content, { color: themeMode.tint }]}>{content}</Text>
          <Text style={[styles.date, { color: themeMode.subTint }]}>
            {format(createAt.toDate(), 'yyyy.MM.dd')}
          </Text>
        </View>

        <Button name="확인" onPress={() => {}} />
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
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 10
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
    fontSize: 12,
    textAlign: 'right'
  },
  mainImage: {
    width: deviceWidth * 0.583,
    height: deviceWidth * 0.583,
    borderRadius: 15
  },
  subImage: {
    width: deviceWidth * 0.277,
    height: deviceWidth * 0.277,
    borderRadius: 15
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 30
  },
  nonImageContainer: {
    height: deviceWidth * 0.583,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30
  }
});
