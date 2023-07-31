import { StyleSheet, Text, View, Pressable } from 'react-native';
import React, { useEffect } from 'react';
import { SemiTitle } from '../../components/Title';
import themeChange from '../../util/theme';
import SvgIcon from '../../components/SvgIcon';
import { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';
import Animated from 'react-native-reanimated';

const Request = () => {
  const themeMode = themeChange();
  return (
    <View style={[styles.container, { backgroundColor: themeMode.secondary }]}>
      <View style={styles.header}>
        <SemiTitle title="수정요청 건" />
        <View style={styles.btnWrapper}>
          <Text style={styles.btnText}>더보기</Text>
          <SvgIcon name="arrow_right" color={'#BAC0CE'} />
        </View>
      </View>
      <Text style={styles.subDesc}>해당 월에 대한 요청 건만 보여드려요.</Text>
      <View style={styles.cardsContainer}>
        <RequestDetailCard />
        <RequestDetailCard />
        <RequestDetailCard />
      </View>
    </View>
  );
};

const RequestDetailCard = () => {
  const themeMode = themeChange();

  const scaleAni = useSharedValue(1);
  const backgound = useSharedValue(themeMode.secondary);

  useEffect(() => {
    //테마변경이 될 때마다 기본값 변경해줘야합니다.
    backgound.value = themeMode.secondary;
  }, [themeMode]);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      backgroundColor: backgound.value,
      transform: [
        {
          scale: withTiming(scaleAni.value, {
            duration: 200,
            easing: Easing.bezier(0.25, 0.1, 0.25, 1)
          })
        }
      ]
    };
  }, []);
  return (
    <Pressable
      onPressIn={() => {
        (scaleAni.value = 0.95), (backgound.value = themeMode.primary);
      }}
      onPressOut={() => ((scaleAni.value = 1), (backgound.value = themeMode.secondary))}
    >
      <Animated.View style={[styles.cardWrapper, animatedStyles]}>
        <Text style={{ color: themeMode.tint }}>2023.7.04</Text>
        <View style={styles.storeInfo}>
          <Text style={[styles.storeName, { color: themeMode.tint }]}>카페이루</Text>
          <View style={styles.btnState}>
            <Text style={styles.btnStateText}>확인중</Text>
          </View>
          <SvgIcon name="arrow_right" color={'#BAC0CE'} />
        </View>
      </Animated.View>
    </Pressable>
  );
};

export default Request;

const styles = StyleSheet.create({
  container: {
    // padding: 20
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10
  },
  btnWrapper: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  btnText: {
    color: '#BAC0CE',
    marginRight: 10
  },
  subDesc: {
    color: '#D9D9D9',
    fontSize: 12,
    paddingHorizontal: 20
  },
  cardsContainer: {
    marginVertical: 10
  },
  cardWrapper: {
    flexDirection: 'row',
    paddingVertical: 20,
    justifyContent: 'space-between',
    borderRadius: 10,
    paddingHorizontal: 20
  },
  storeInfo: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  storeName: {
    marginRight: 10
  },
  btnState: {
    backgroundColor: '#D9D9D9',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
    marginRight: 10
  },
  btnStateText: {
    fontSize: 12
  }
});
