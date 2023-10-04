import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import React from 'react';
import { SmallTitle } from '../../../common-components/Title';
import themeChange from '../../../util/theme';
import SvgIcon from '../../../common-components/SvgIcon';
import format from 'date-fns/format';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../type';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import RequestDetailCard from './RequestDetailCard';
import { useGetPersonalWorkHistoryEditList } from '../../../api/store/hooks/useGetPersonalWorkHistoryEditList';

const Request = () => {
  const themeMode = themeChange();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const today = format(new Date(), 'yyyy-MM');
  const { data } = useGetPersonalWorkHistoryEditList();
  const filterTodayData = data?.filter(item => format(item.createAt.toDate(), 'yyyy-MM') === today);

  const goToList = () => {
    navigation.navigate('timeEdittingListScreen', { data });
  };

  return (
    <View style={[styles.container, { backgroundColor: themeMode.secondary }]}>
      <View style={styles.header}>
        <View style={styles.headerTitle}>
          <Image
            source={require('../../../assets/img/eraser.png')}
            style={styles.image}
            resizeMode="contain"
          />
          <View>
            <SmallTitle title="근태 수정" style={{ marginBottom: 5 }} />
            <Text style={[styles.subDesc, { color: themeMode.subTint }]}>
              해당 월에 대한 요청 건만 보여드려요.
            </Text>
          </View>
        </View>
        <Pressable style={styles.btnWrapper} onPress={goToList} hitSlop={70}>
          <SvgIcon name="arrow_right" color={themeMode.pressIcon} />
        </Pressable>
      </View>

      <View style={styles.cardsContainer}>
        {filterTodayData
          ? filterTodayData.map((item, index) => <RequestDetailCard data={item} key={index} />)
          : null}
      </View>
    </View>
  );
};

export default Request;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    borderRadius: 15
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10
  },
  headerTitle: {
    flexDirection: 'row'
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 10
  },

  btnWrapper: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  btnText: {
    color: '#BAC0CE',
    fontSize: 12,
    marginRight: 10
  },
  subDesc: {
    fontSize: 12
  },
  cardsContainer: {
    marginTop: 10
  }
});
