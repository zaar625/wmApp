import { StyleSheet, Text, View, Pressable } from 'react-native';
import React from 'react';
import PlusIcon from '../../assets/icon/plus_round.svg';
import DeleteIcon from '../../assets/icon/delete.svg';

import { colors } from '../../theme';

import { SemiTitle } from '../../components/Title';

const AddedStore = () => {
  return (
    <View style={styles.container}>
      <SemiTitle title="매장 등록하기" />
      <Text style={styles.titleDesc}>매장 내에 비치된 QR 코드 또는 바코드를 찍어주세요.</Text>
      <Pressable style={styles.plusIcon}>
        <PlusIcon style={{ alignSelf: 'center' }} />
      </Pressable>
      <StoreCardContainer />
    </View>
  );
};

const StoreCardContainer = () => {
  return (
    <View>
      <Text style={styles.cardText}>현재 등록된 근무지입니다.</Text>
      <View style={styles.cardWrapper}>
        <Text style={styles.storeName}>카페이루</Text>
        <Pressable style={styles.deleteIcon}>
          <DeleteIcon width={30} />
        </Pressable>
      </View>
    </View>

    // <Text style={styles.noneText}>현재 등록된 근무지가 없습니다.</Text>
  );
};

export default AddedStore;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: colors.dark.secondary
  },
  titleDesc: {
    color: '#D9D9D9'
  },
  plusIcon: {
    marginVertical: 10
  },
  cardText: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10
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
