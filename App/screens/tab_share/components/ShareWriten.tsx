import { Image, Pressable, StyleSheet, View, Text } from 'react-native';
import React from 'react';
import themeChange from '../../../util/theme';
import { SmallTitle } from '../../../common-components/Title';
import SvgIcon from '../../../common-components/SvgIcon';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../type';

const ShareWriten = () => {
  const themeMode = themeChange();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <Pressable
      onPress={() => navigation.navigate('writeScreenStep1')}
      style={[styles.container, { backgroundColor: themeMode.secondary }]}
    >
      <View style={styles.headerTitle}>
        <Image
          source={require('../../../assets/img/pen.png')}
          style={styles.image}
          resizeMode="contain"
        />
        <View>
          <SmallTitle title="전달사항 작성하기" style={{ marginBottom: 5 }} />
          <Text style={[styles.subText, { color: themeMode.subTint }]}>
            사진까지 첨부하여 매장내 공유해보아요.
          </Text>
        </View>
      </View>
      <SvgIcon name="arrow_right" width={15} height={15} color={themeMode.pressIcon} />
    </Pressable>
  );
};

export default ShareWriten;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginBottom: 20,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 10
  },
  subText: {
    fontSize: 12
  }
});
