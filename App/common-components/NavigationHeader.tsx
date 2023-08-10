import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { ReactElement } from 'react';
import SvgIcon from './SvgIcon';
import { useNavigation } from '@react-navigation/native';
import themeChange from '../util/theme';

type TProps = {
  header: string;
  children?: ReactElement;
  onPress?: () => void;
};

const NavigationHeader = ({ header, children, onPress }: TProps) => {
  const themeMode = themeChange();
  const navigation = useNavigation();

  const onBackHandler = () => {
    if (onPress) return onPress();

    return navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <Pressable style={styles.icon} onPress={onBackHandler} hitSlop={100}>
          <SvgIcon name="arrow_left" width={12} height={20} color={themeMode.pressIcon} />
        </Pressable>
        <Text style={[styles.headerText, { color: themeMode.tint }]}>{header}</Text>
      </View>
      {children}
    </View>
  );
};

export default NavigationHeader;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    flexDirection: 'row',
    alignItems: 'center'
  },
  headerWrapper: {
    flexDirection: 'row',
    flex: 1
  },
  icon: {
    marginRight: 20
  },
  headerText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600'
  }
});
