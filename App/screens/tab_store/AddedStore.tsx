import { StyleSheet, Text, View, Pressable } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../type';
import themeChange from '../../util/theme';
import { SemiTitle } from '../../components/Title';
import PlusIcon from '../../assets/icon/plus_round.svg';
import DeleteIcon from '../../assets/icon/delete.svg';

const AddedStore = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const themeMode = themeChange();

  return (
    <View style={[styles.container, { backgroundColor: themeMode.secondary }]}>
      <SemiTitle title="매장 등록하기" />
      <Text style={{ color: themeMode.subTint }}>
        매장 내에 비치된 QR 코드 또는 바코드를 찍어주세요.
      </Text>
      <Pressable style={styles.plusIcon} onPress={() => navigation.navigate('scannerScreen')}>
        <PlusIcon style={{ alignSelf: 'center' }} color={themeMode.tint} />
      </Pressable>
      <Text style={[styles.cardText, { color: themeMode.tint }]}>현재 등록된 근무지입니다.</Text>
      <StoreCardContainer />
    </View>
  );
};

const StoreCardContainer = () => {
  const themeMode = themeChange();
  return (
    <View style={[styles.cardWrapper, { backgroundColor: themeMode.primary }]}>
      <Text style={[styles.storeName, { color: themeMode.tint }]}>카페이루</Text>
      <Pressable style={styles.deleteIcon}>
        <DeleteIcon width={30} color={themeMode.tint} />
      </Pressable>
    </View>

    // <Text style={styles.noneText}>현재 등록된 근무지가 없습니다.</Text>
  );
};

export default AddedStore;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginBottom: 20
  },
  plusIcon: {
    marginVertical: 10
  },
  cardText: {
    fontSize: 16,
    marginBottom: 15,
    fontWeight: '600'
  },
  cardWrapper: {
    paddingVertical: 20,
    backgroundColor: '#30394B',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  storeName: {
    color: '#fff',
    fontSize: 16
  },
  deleteIcon: {
    position: 'absolute',
    right: 0,
    marginRight: 10
  },
  noneText: {
    color: '#6B6F78',
    alignSelf: 'center'
  }
});
