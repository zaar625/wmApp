import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import themeChange from '../../../util/theme';
import format from 'date-fns/format';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../type';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const ShareListItem = ({ item }: any) => {
  const logInfo = item.data();
  const themeMode = themeChange();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const FIRSTIMAGE = 0;

  const hasInfoImage = logInfo.photosURL.length > 0;
  return (
    <Pressable
      onPress={() =>
        navigation.navigate('shareDetailScreen', { header: '공유 내용 상세', data: logInfo })
      }
      style={[styles.constainer, { borderBottomWidth: 1, borderBottomColor: themeMode.secondary }]}
    >
      <View style={styles.contentContainer}>
        {hasInfoImage ? (
          <Image source={{ uri: logInfo.photosURL[FIRSTIMAGE] }} style={styles.image} />
        ) : (
          <Image source={require('../../../assets/img/noneImage.png')} style={styles.image} />
        )}

        <View
          style={{
            flex: 1,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        >
          <View>
            <Text style={[styles.title, { color: themeMode.tint }]}>{logInfo.title}</Text>
            <Text style={[styles.store, { color: themeMode.subTint }]}>{logInfo.store.name}</Text>
          </View>
          <Text style={[styles.store, { color: themeMode.subTint }]}>
            {format(logInfo.createAt.toDate(), 'M월 dd일')}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ShareListItem;

const styles = StyleSheet.create({
  constainer: {
    paddingVertical: 15,
    borderBottomWidth: 1
  },
  contentContainer: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  image: {
    width: 55,
    height: 55,
    borderRadius: 15,
    marginRight: 15
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 10
  },
  store: {
    fontSize: 12
  }
});
