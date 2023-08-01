import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import SvgIcon from '../components/SvgIcon';
import { useNavigation } from '@react-navigation/native';

const ScreenHeader = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Pressable style={styles.icon} onPress={() => navigation.goBack()} hitSlop={50}>
        <SvgIcon name="arrow_left" width={18} height={18} color={'#BAC0CE'} />
      </Pressable>
      <Text style={styles.headerText}>공유 내용 작성하기</Text>
    </View>
  );
};

export default ScreenHeader;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 13,
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    position: 'absolute',
    marginLeft: 10
  },
  headerText: {
    textAlign: 'center',
    flex: 1,
    fontSize: 16,
    color: '#FFF',
    fontWeight: '500'
  }
});
