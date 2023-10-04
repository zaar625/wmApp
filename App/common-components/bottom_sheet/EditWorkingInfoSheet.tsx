import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import SvgIcon from '../SvgIcon';
import themeChange from '../../util/theme';
import Confirm from '../../screens/tab_setting/components/Confirm';
import format from 'date-fns/format';
import NomalButton from '../buttons/NomarButton';
import { useDispatch } from 'react-redux';
import { closeBottomSheet } from '../../state/slice/bottomSheet';
import { useDeletRequirement } from '../../api/store/hooks/useDeletTimeRequirement';
import { openModal, closeModal } from '../../state/slice/modal';

import { openToast } from '../../state/slice/toast';

const EditWorkingInfoSheet = ({ data }: any) => {
  const { after, before } = data;

  const { mutate } = useDeletRequirement();

  const dispatch = useDispatch();
  const themeMode = themeChange();

  const deleteRequirement = () => {
    dispatch(
      openModal({
        type: 'TwoBtnModal',
        contents: {
          title: '근태수정을 취소하시겠습니까?',
          content: `근태수정을 취소하면 ${`\n`}관리자에게 다시 요청을 작성해야합니다.`,
          buttons: {
            취소: () => dispatch(closeModal()),
            삭제: () => {
              mutate(
                { requireId: data.id },
                {
                  onSuccess: () => {
                    dispatch(closeModal());
                    dispatch(closeBottomSheet());
                    dispatch(openToast({ message: `해당 근태 수정 요청을 취소하였습니다.` }));
                  }
                }
              );
            }
          }
        }
      })
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: themeMode.tint }]}>근태수정 상세</Text>
        <SvgIcon name="close" color={themeMode.pressIcon} />
      </View>

      <View style={[styles.storeWrapper, { borderBottomColor: themeMode.card }]}>
        <Text style={[styles.storeName, { color: themeMode.tint }]}>{after.storeInfo.name}</Text>
        <Confirm confirm={data.confirm} />
      </View>

      <View style={[styles.cardContainer]}>
        <View>
          {/* 수정 후 */}
          <Text style={[styles.bold, { color: '#00B712' }]}>수정 후</Text>
          <View style={styles.modifierWrapper}>
            <View style={styles.iconWrapper}>
              <SvgIcon
                name="calendar"
                color={themeMode.tint}
                width={20}
                height={20}
                style={styles.icon}
              />
              <Text style={[{ color: themeMode.tint }]}>
                {format(after.date.toDate(), 'yyyy년 MM월 dd일')}
              </Text>
            </View>
            <View style={styles.iconWrapper}>
              <SvgIcon
                name="clock_line"
                color={themeMode.tint}
                width={16}
                height={16}
                style={styles.icon}
              />
              <Text style={[{ color: themeMode.tint }]}>
                {format(after.start.toDate(), 'HH시 mm분')} ~{' '}
                {format(after.end.toDate(), 'HH시 mm분')}
              </Text>
            </View>
          </View>

          {/* 수정 전 */}
          <Text style={[styles.bold, { color: '#C65252' }]}>수정 전</Text>
          <View style={styles.modifierWrapper}>
            <View style={styles.iconWrapper}>
              <SvgIcon
                name="calendar"
                color={themeMode.subTint}
                width={20}
                height={20}
                style={styles.icon}
              />
              <Text style={[{ color: themeMode.subTint }]}>
                {format(before.date.toDate(), 'yyyy년 MM월 dd일')}
              </Text>
            </View>
            <View style={styles.iconWrapper}>
              <SvgIcon
                name="clock_line"
                color={themeMode.subTint}
                width={16}
                height={16}
                style={styles.icon}
              />
              <Text style={[{ color: themeMode.subTint }]}>
                {format(before.start.toDate(), 'HH시 mm분')} ~{' '}
                {format(before.end.toDate(), 'HH시 mm분')}
              </Text>
            </View>
          </View>
        </View>
        {/* 사유 */}

        <Text style={{ color: themeMode.tint }}>{data.reason}</Text>
      </View>

      <Pressable style={styles.cancelBtn} onPress={deleteRequirement}>
        <Text style={[styles.cancelBtnTxt, { color: themeMode.subTint }]}>요청취소</Text>
      </Pressable>
      <NomalButton name="확인" onPress={() => dispatch(closeBottomSheet())} />
    </View>
  );
};

export default EditWorkingInfoSheet;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    marginBottom: 15
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 20
  },
  title: {
    fontSize: 16,
    fontWeight: '600'
  },
  modifierWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  storeWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    paddingHorizontal: 20
  },
  storeName: {
    fontWeight: '500'
  },

  cardContainer: {
    paddingHorizontal: 20,

    marginVertical: 15
  },
  icon: {
    marginRight: 5
  },
  iconWrapper: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  bold: {
    fontWeight: '700',
    marginBottom: 10
  },
  cancelBtn: {
    alignSelf: 'flex-end',
    padding: 10,
    marginBottom: 20,
    marginRight: 10
  },
  cancelBtnTxt: {
    textDecorationLine: 'underline',
    fontWeight: '600',

    fontSize: 12
  }
});
