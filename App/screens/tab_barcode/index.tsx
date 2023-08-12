import { Image, StyleSheet, Text, View, Pressable } from 'react-native';
import React from 'react';
import themeChange from '../../util/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenTitle } from '../../common-components/Title';
import SvgIcon from '../../common-components/SvgIcon';
import { NavigationScreenProps } from '../../type';

const BarcodeTabScreen = ({ navigation }: NavigationScreenProps) => {
  const themeMode = themeChange();

  const onQrButtonPress = () => {
    navigation.navigate('attendanceScreen');
  };
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeMode.primary }]}>
      <ScreenTitle title={`매장에 비치된${`\n`}QR 코드를 찍어주세요.`} />
      <View style={styles.btnLayout}>
        <Pressable
          onPress={onQrButtonPress}
          style={[styles.btn, { backgroundColor: themeMode.secondary }]}
        >
          <Image
            source={require('../../assets/img/scanner.png')}
            style={styles.qrImage}
            resizeMode="contain"
          />

          <Text style={[styles.btnText, { color: themeMode.pressIcon }]}>QR 코드 찍기</Text>
        </Pressable>
        <View style={styles.subTextWrapper}>
          <SvgIcon
            name="caution"
            width={13}
            height={13}
            style={{ marginRight: 5 }}
            color={themeMode.subTint}
          />
          <Text style={[styles.subtext, { color: themeMode.subTint }]}>
            휴대폰을 흔들면 바로 스캔할 수도 있어요!
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BarcodeTabScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20
  },
  qrImage: {
    width: 30,
    height: 30,
    marginRight: 10
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    borderRadius: 100,
    justifyContent: 'center'
  },
  btnText: {
    fontWeight: 'bold',
    fontSize: 16
  },
  btnLayout: {
    justifyContent: 'center',
    flex: 1
  },
  subtext: {
    fontSize: 12
  },
  subTextWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10
  }
});
