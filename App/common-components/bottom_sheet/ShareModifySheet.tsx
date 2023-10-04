import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import SvgIcon from '../SvgIcon';
import themeChange from '../../util/theme';
import { useDeletShare } from '../../api/store/hooks/useDeleteShare';
import { closeBottomSheet } from '../../state/slice/bottomSheet';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../type';
import { openModal, closeModal } from '../../state/slice/modal';
import { openToast } from '../../state/slice/toast';

const ShareModifySheet = ({ data }: any) => {
  const themeMode = themeChange();

  const { store } = data;

  const queryClient = useQueryClient();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();
  const { mutate } = useDeletShare();

  const onDelete = () => {
    dispatch(
      openModal({
        type: 'TwoBtnModal',
        contents: {
          title: '전달사항을 삭제하시겠습니까?',
          content: `삭제하면 해당 전달사항 내용은 공유되지 않습니다.`,
          buttons: {
            취소: () => dispatch(closeModal()),
            삭제: () =>
              mutate(
                { storeId: store.id, logId: data.id },
                {
                  onSuccess: () => {
                    dispatch(closeBottomSheet());
                    dispatch(closeModal());
                    queryClient.invalidateQueries({ queryKey: ['total-logs'] }).then(() => {
                      navigation.goBack();
                      setTimeout(() => {
                        dispatch(openToast({ message: '공유된 게시물이 삭제되었습니다.' }));
                      }, 500);
                    });
                  }
                }
              )
          }
        }
      })
    );
  };

  const onEdit = () => {
    navigation.navigate('shareEditScreen', { data });
    dispatch(closeBottomSheet());
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.btnContainer} onPress={onEdit}>
        <SvgIcon name="pen" style={[styles.icon]} width={25} height={25} />
        <Text style={[styles.btnText, { color: themeMode.tint }]}>수정하기</Text>
      </Pressable>
      <Pressable style={styles.btnContainer} onPress={onDelete}>
        <SvgIcon name="delete" color={'#FFF'} style={[styles.icon]} width={25} height={25} />
        <Text style={[styles.btnText, { color: themeMode.tint }]}>삭제하기</Text>
      </Pressable>
    </View>
  );
};

export default ShareModifySheet;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20
  },
  btnContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center'
  },
  btnText: {
    fontWeight: '600'
  },
  icon: {
    marginRight: 10
  }
});
