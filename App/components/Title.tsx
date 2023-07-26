import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import React from 'react';
import { colors, fontSizes, fontWeight } from '../theme';
import { useContext } from 'react';
import { ThemeContext } from '../theme/themeContext';

type TProps = {
  title: string;
  style?: ViewStyle;
};

const ScreenTitle = ({ title, style }: TProps) => {
  const { theme } = useContext(ThemeContext);
  let activeColor = theme.mode && colors[theme.mode];

  return (
    <Text
      style={[
        { ...style },
        styles.title,

        {
          color: activeColor.tint
        }
      ]}
    >
      {title}
    </Text>
  );
};

const SemiTitle = ({ title, style }: TProps) => {
  const { theme } = useContext(ThemeContext);
  let activeColor = theme.mode && colors[theme.mode];

  return (
    <Text
      style={[
        { ...style },
        styles.semiTitle,
        {
          color: activeColor.tint
        }
      ]}
    >
      {title}
    </Text>
  );
};

export { ScreenTitle, SemiTitle };

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 36,
    marginVertical: 30,
    paddingHorizontal: 20
  },
  semiTitle: {
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 36
  }
});
