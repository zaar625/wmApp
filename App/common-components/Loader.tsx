import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useIsFetching, useIsMutating } from '@tanstack/react-query';
import LottieView from 'lottie-react-native';
import { deviceWidth, deviceheight } from '../theme';

const Loader = () => {
  const isFetching = useIsFetching({
    queryKey: ['myStoreList']
  });

  const isMutating = useIsMutating({
    mutationKey: ['addLog']
  });

  // console.log('isMutating', isMutating);
  return (
    <>
      {(isFetching > 0 || isMutating > 0) && (
        <View style={[styles.container, StyleSheet.absoluteFillObject]}>
          <LottieView
            source={require('../assets/loader.json')}
            autoPlay
            loop
            style={{ width: 30, height: 30 }}
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
