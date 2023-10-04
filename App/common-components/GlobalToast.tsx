import { StyleSheet, Text, View, Animated } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { closeToast } from '../state/slice/toast';
import { RootState } from '../state/store';
import SvgIcon from './SvgIcon';
import themeChange from '../util/theme';
import { useDispatch } from 'react-redux';

const GlobalToast = () => {
  const themeMode = themeChange();
  const dispatch = useDispatch();
  const toastInfo = useSelector((state: RootState) => state.toast);

  const animationValueRef = useRef(new Animated.Value(0));

  useEffect(() => {
    if (toastInfo.isOpen) {
      Animated.timing(animationValueRef.current, {
        toValue: 120,
        duration: 500,
        useNativeDriver: false
      }).start(() => {
        setTimeout(() => {
          dispatch(closeToast());
        }, 1000);
      });

      return;
    }

    Animated.timing(animationValueRef.current, {
      toValue: -100,
      duration: 300,
      useNativeDriver: false
    }).start();
  }, [toastInfo]);

  const opacityAnimation = animationValueRef.current.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1]
  });

  return (
    <>
      <Animated.View
        style={[
          styles.container,
          {
            backgroundColor: themeMode.card,
            bottom: opacityAnimation
          }
        ]}
      >
        <View style={styles.TextContainer}>
          <SvgIcon
            name="check_round"
            style={styles.icon}
            width={20}
            height={20}
            color={'#00B712'}
          />
          <Text style={{ color: themeMode.tint }}>{toastInfo.message}</Text>
        </View>
      </Animated.View>
    </>
  );
};

export default GlobalToast;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: 'center'
  },
  TextContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    marginRight: 8
  }
});
