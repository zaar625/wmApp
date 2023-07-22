import { StyleSheet, Text, View, Modal, Pressable } from 'react-native';
import React, { useState } from 'react';
import NomalButton from '../buttons/NomarButton';

import { deviceWidth, deviceheight } from '../../theme';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../state/slice/modal';

const OneBtnModal = ({ props }: any) => {
  const dispatch = useDispatch();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(48,57,75,0.7)'
      }}
    >
      <View
        style={{
          backgroundColor: '#202632',
          width: deviceWidth * 0.888,
          height: deviceheight * 0.23,
          paddingVertical: 20,
          borderRadius: 10,
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <View>
          <Text
            style={{
              color: '#fff',
              fontSize: 16,
              fontWeight: '600',
              marginBottom: 12,
              textAlign: 'center'
            }}
          >
            {props.title}
          </Text>
          <Text style={{ textAlign: 'center', fontSize: 14, color: '#fff' }}>{props.content}</Text>
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

const styles = StyleSheet.create({});
