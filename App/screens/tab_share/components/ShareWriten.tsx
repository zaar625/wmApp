import { Pressable, StyleSheet } from 'react-native';
import React from 'react';
import themeChange from '../../../util/theme';
import { SemiTitle } from '../../../components/Title';
import SvgIcon from '../../../components/SvgIcon';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../type';

const ShareWriten = () => {
  const themeMode = themeChange();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <Pressable
      onPress={() => navigation.navigate('writeScreen', { header: '공유 내용 작성하기' })}
      style={[styles.container, { backgroundColor: themeMode.secondary }]}
    >
      <SemiTitle title="전달사항 작성하기" />
      <SvgIcon name="arrow_right" width={15} height={15} color={'#BAC0CE'} />
    </Pressable>
  );
};

export default ShareWriten;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});
