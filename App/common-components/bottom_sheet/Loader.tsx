import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useIsFetching, useIsMutating } from '@tanstack/react-query';

const Loader = () => {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();

  console.log('isFetching', isFetching);
  return (
    <>
      {isFetching > 0 && (
        <View style={[styles.container, StyleSheet.absoluteFillObject]}>
          <Text style={{ color: '#fff' }}>Loader</Text>
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
