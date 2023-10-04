import { StyleSheet, Text, View, Modal, Pressable } from 'react-native';
import React, { useState } from 'react';
import NomalButton from '../buttons/NomarButton';

import { deviceWidth, deviceheight } from '../../theme';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../state/slice/modal';
import themeChange from '../../util/theme';

const OneBtnModal = ({ props }: any) => {
  const dispatch = useDispatch();
  const themeMode = themeChange();
  return (
    <View style={styles.background}>
      <View style={[styles.contentsContainer, { backgroundColor: themeMode.card }]}>
        <View>
          <Text style={[styles.title, { color: themeMode.tint }]}>{props.title}</Text>
          <Text style={[styles.content, { color: themeMode.tint }]}>{props.content}</Text>
        </View>
        <View style={{ width: '100%' }}>
          <NomalButton
            name="확인"
            onPress={() => {
              props.onPress();
              dispatch(closeModal());
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default OneBtnModal;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(16,16,16,0.8)'
  },
  contentsContainer: {
    width: deviceWidth * 0.888,
    // height: deviceheight * 0.23,
    paddingVertical: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center'
  },
  content: {
    textAlign: 'center',
    fontSize: 14
  }
});
