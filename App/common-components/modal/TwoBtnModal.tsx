import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { deviceWidth, deviceheight } from '../../theme';
import themeChange from '../../util/theme';
import ShortButton from '../buttons/ShortButton';

const TwoBtnModal = ({ props }: any) => {
  const { buttons, content, title } = props;
  console.log(buttons);
  const buttonType = Object.keys(buttons);
  console.log(Object.keys(buttons));
  const themeMode = themeChange();
  return (
    <View style={styles.container}>
      <View style={[styles.card, { backgroundColor: themeMode.card }]}>
        <View>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardContent}>{content}</Text>
        </View>

        <View style={styles.btnContainer}>
          {buttonType.map(btn => (
            <ShortButton name={btn} onPress={buttons[btn]} />
          ))}
        </View>
      </View>
    </View>
  );
};

export default TwoBtnModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(16,16,16,0.8)'
  },
  card: {
    width: deviceWidth * 0.888,
    height: deviceheight * 0.23,
    paddingVertical: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  cardTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center'
  },
  cardContent: {
    textAlign: 'center',
    fontSize: 14,
    color: '#fff'
  },
  btnContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    gap: 10
  }
});
