import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { deviceWidth } from '../../../theme';
import themeChange from '../../../util/theme';

const ScannerHeader = () => {
  const navigation = useNavigation();
  const themeMode = themeChange();
  return (
    <View>
      <View
        style={{
          width: 50,
          height: 3,
          borderRadius: 100,
          backgroundColor: themeMode.subTint,
          marginVertical: 10,
          alignSelf: 'center'
        }}
      />
      <View style={styles.container}>
        <View style={styles.titleWrapper}>
          <Image
            source={require('../../../assets/img/qrcode.png')}
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={[styles.titleText, { color: themeMode.tint }]}>QR 코드를 스캔하세요.</Text>
        </View>
        <Pressable onPress={navigation.goBack}>
          <Text style={[styles.closeBtn, { color: themeMode.subTint }]}>닫기</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ScannerHeader;

const styles = StyleSheet.create({
  container: {
    width: deviceWidth,
    paddingHorizontal: 20,
    paddingBottom: 30,
    paddingTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 20
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 15
  },
  closeBtn: {
    fontWeight: '600'
  }
});
