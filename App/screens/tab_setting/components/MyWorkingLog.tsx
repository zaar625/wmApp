import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import themeChange from '../../../util/theme';
import { SmallTitle } from '../../../common-components/Title';
import SvgIcon from '../../../common-components/SvgIcon';
import { useDispatch } from 'react-redux';
import { openModal, closeModal } from '../../../state/slice/modal';

const MyWorkingLog = () => {
  const themeMode = themeChange();
  const dispatch = useDispatch();

  const onPress = () => {
    dispatch(
      openModal({
        modalType: 'OneBtnModal',
        isOpen: true,
        contents: {
          title: '앗!, 서비스 준비중입니다.',
          content: `유용한 정보를 제공하기 위해 준비 중입니다.${`\n`}조금만 기다려 주세요.`,
          onPress() {
            dispatch(closeModal());
          }
        }
      })
    );
  };
  return (
    <View style={[styles.container, { backgroundColor: themeMode.secondary }]}>
      <View style={styles.headerTitle}>
        <View style={{ flexDirection: 'row', flex: 1 }}>
          <Image source={require('../../../assets/img/calendar.png')} style={styles.image} />
          <View style={{ flex: 1 }}>
            <SmallTitle title="근무 이력" style={{ marginBottom: 5 }} />
            <Text style={[styles.subDesc, { color: themeMode.subTint }]}>
              매장별 근무이력을 달력에 한눈에 볼 수 있어요.
            </Text>
          </View>
        </View>
        <Pressable hitSlop={50} onPress={onPress}>
          <SvgIcon name="arrow_right" color={themeMode.pressIcon} />
        </Pressable>
      </View>
    </View>
  );
};

export default MyWorkingLog;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 20,
    borderRadius: 10
  },
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 10
  },
  subDesc: {
    fontSize: 12
  }
});
