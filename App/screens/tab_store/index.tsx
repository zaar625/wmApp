import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { colors } from '../../theme';
import { SafeAreaView } from 'react-native-safe-area-context';

const StoreTabScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>StoreTabScreen</Text>
    </SafeAreaView>
  );
};

export default StoreTabScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark.primary
  }
});
