import { StyleSheet, Text, Pressable, View, Image } from 'react-native';
import themeChange from '../../../util/theme';

import React from 'react';
import { imagePath } from '../../../assets/img/imagePath';
import SvgIcon from '../../../common-components/SvgIcon';

type TProps = {
  label: string;
  img: string;
  isActive: boolean;
  onPress: () => void;
};

const ThemeTypeBtn = ({ label, img, onPress, isActive }: TProps) => {
  const themeMode = themeChange();

  return (
    <Pressable hitSlop={10} onPress={onPress}>
      <View style={styles.container}>
        <Image source={imagePath[img]} style={{ width: 50, height: 50 }} />
        <View style={[styles.themeBtnWrapper]}>
          <Text style={[styles.themeText, { color: themeMode.tint }]}>{label}</Text>
          {isActive && <SvgIcon name="check" color={themeMode.pressIcon} width={15} height={15} />}
        </View>
      </View>
    </Pressable>
  );
};

export default ThemeTypeBtn;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 10
  },
  themeBtnWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderRadius: 10,
    flex: 1
  },
  themeText: {
    fontWeight: '600'
  }
});
