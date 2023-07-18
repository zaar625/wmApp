import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { colors, fontSizes, fontWeight } from '../theme';
import { useContext } from 'react';
import { ThemeContext } from '../theme/themeContext';

const ScreenTitle = ({ title }: { title: string }) => {
  const { theme } = useContext(ThemeContext);
  let activeColor = theme.mode && colors[theme.mode];

  return (
    <Text
      style={[
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

export default ScreenTitle;

const styles = StyleSheet.create({
  title: {
    fontSize: fontSizes.title,
    fontWeight: '700',
    lineHeight: 36,
    marginVertical: 30,
    paddingHorizontal: 20
  }
});
