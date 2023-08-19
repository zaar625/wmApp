import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useIsFetching, useIsMutating } from '@tanstack/react-query';
import LottieView from 'lottie-react-native';
import { deviceWidth, deviceheight } from '../../theme';

const Loader = () => {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();

  return (
    <>
      {(isFetching > 0 || isMutating > 0) && (
        <View style={[styles.container, StyleSheet.absoluteFillObject]}>
          <LottieView
            source={require('../../assets/loader.json')}
            autoPlay
            loop
            style={{ width: deviceWidth * 0.5, height: deviceheight }}
          />
        </View>
      )}
    </>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
    zIndex: 1
  }
});