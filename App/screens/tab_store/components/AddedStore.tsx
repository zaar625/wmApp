import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../type';
import themeChange from '../../../util/theme';
import { SemiTitle } from '../../../common-components/Title';
import SvgIcon from '../../../common-components/SvgIcon';

const AddedStore = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const themeMode = themeChange();

  return (
    <View style={[styles.container, { backgroundColor: themeMode.secondary }]}>
      <View style={styles.addStoreHeader}>
        <SemiTitle title="매장 등록하기" />
        <Pressable onPress={() => navigation.navigate('scannerScreen')}>
          <SvgIcon name="plus_round" color={themeMode.tint} />
        </Pressable>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Image
          source={require('../../../assets/img/scanner.png')}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={{ color: themeMode.subTint, fontSize: 12 }}>
          매장 내에 비치된 QR 코드 또는 바코드를 찍어주세요.
        </Text>
      </View>
    </View>
  );
};

export default AddedStore;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginBottom: 20,
    borderRadius: 15
  },
  addStoreHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 10
  }
});
