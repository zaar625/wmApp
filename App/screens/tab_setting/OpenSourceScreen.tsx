import { StyleSheet, Text, View, SafeAreaView, Pressable, Linking } from 'react-native';
import React from 'react';
import themeChange from '../../util/theme';
import NavigationHeader from '../../common-components/NavigationHeader';
import { OPENSOURE_URL } from '../../constant';
import { FlatList } from 'react-native-gesture-handler';

const OpenSourceScreen = () => {
  const themeMode = themeChange();
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeMode.primary }]}>
      <NavigationHeader header="오픈소스 라이브러리" />
      <FlatList
        contentContainerStyle={{ paddingHorizontal: 20 }}
        data={OPENSOURE_URL}
        renderItem={({ item }) => (
          <Pressable onPress={() => Linking.openURL(item.url)} style={styles.btn}>
            <Text style={[styles.linkText]}>* {item.name}</Text>
          </Pressable>
        )}
        keyExtractor={item => item.name}
      />
    </SafeAreaView>
  );
};

export default OpenSourceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  btn: {
    marginBottom: 10
  },
  linkText: {
    textDecorationLine: 'underline',
    color: '#265be2'
  }
});
