import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import SvgIcon from './SvgIcon';
import { useNavigation } from '@react-navigation/native';
import themeChange from '../util/theme';

const NavigationHeader = ({ header }: { header: string }) => {
  const themeMode = themeChange();
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Pressable style={styles.icon} onPress={() => navigation.goBack()} hitSlop={100}>
        <SvgIcon name="arrow_left" width={18} height={18} color={themeMode.pressIcon} />
      </Pressable>
      <Text style={[styles.headerText, { color: themeMode.tint }]}>{header}</Text>
    </View>
  );
};

export default NavigationHeader;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 13,
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    position: 'absolute',
    marginLeft: 10
  },
  headerText: {
    textAlign: 'center',
    flex: 1,
    fontSize: 16,

    fontWeight: '600'
  }
});
