import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import React from 'react';

import themeChange from '../../../util/theme';
import { SemiTitle } from '../../../common-components/Title';
import SvgIcon from '../../../common-components/SvgIcon';
import { useMyStoreList } from '../../../api/store/hooks/useMyStoreList';
import { useDeletStore } from '../../../api/store/hooks/useDeleteStoreList';
import { useDispatch } from 'react-redux';
import { openModal, closeModal } from '../../../state/slice/modal';

const WorkingStore = () => {
  const themeMode = themeChange();

  const { data: stores = [] } = useMyStoreList();

  return (
    <View style={[styles.container, { backgroundColor: themeMode.secondary }]}>
      <SemiTitle title="현재 근무지" style={{ marginBottom: 10 }} />
      <View style={styles.header}>
        <Image
          source={require('../../../assets/img/store.png')}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={{ color: themeMode.subTint, fontSize: 12 }}>
          이상윤님이 근무중인 매장입니다.
        </Text>
      </View>
      {stores.length > 0 ? (
        stores.map((store: any, index: number) => <StoreCardContainer key={index} store={store} />)
      ) : (
        <Text style={styles.noneText}>현재 등록된 근무지가 없습니다.</Text>
      )}
    </View>
  );
};

const StoreCardContainer = ({ store }: any) => {
  const themeMode = themeChange();
  const dispatch = useDispatch();
  const { mutate } = useDeletStore();

  const removeStore = (id: string) => {
    console.log('click');
    dispatch(
      openModal({
        type: 'TwoBtnModal',
        contents: {
          title: '등록된 근무지를 삭제하시겠습니까?',
          content: `근무지를 삭제 할 경우${`\n`}일부 데이터가 유실됩니다.`,
          buttons: {
            취소: () => dispatch(closeModal()),
            삭제: () => mutate({ storeId: id }, { onSuccess: () => dispatch(closeModal()) })
          }
        }
      })
    );
    // mutate({ storeId: id });
  };

  return (
    <View style={[styles.cardWrapper, { backgroundColor: themeMode.card }]}>
      <Text style={[styles.storeName, { color: themeMode.tint }]}>{store.name}</Text>
      <Pressable style={styles.deleteIcon} onPress={() => removeStore(store.id)}>
        <SvgIcon name="delete" width={30} color={themeMode.tint} />
      </Pressable>
    </View>
  );
};

export default WorkingStore;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 5,
    marginBottom: 20,
    borderRadius: 15
  },
  header: {
    flexDirection: 'row',
    marginBottom: 15
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 10
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
    alignItems: 'center',
    marginBottom: 10
  },
  storeName: {
    fontWeight: '600'
  },
  deleteIcon: {
    position: 'absolute',
    right: 0,
    marginRight: 10
  },
  noneText: {
    color: '#6B6F78',
    alignSelf: 'center',
    marginBottom: 10
  }
});
