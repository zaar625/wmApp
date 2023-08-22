import { StyleSheet, Text, View, Pressable } from 'react-native';
import React, { useEffect } from 'react';
import themeChange from '../../../util/theme';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing
} from 'react-native-reanimated';
import { openBottomSheet } from '../../../state/slice/bottomSheet';
import format from 'date-fns/format';
import { useDispatch } from 'react-redux';
import Confirm from './Confirm';

const RequestDetailCard = ({ data }: any) => {
  const themeMode = themeChange();
  const dispatch = useDispatch();
  const { confirm, after } = data;

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

  const onPressOut = () => {
    scaleAni.value = 1;
    backgound.value = themeMode.secondary;
    dispatch(openBottomSheet({ route: 'settingScreen', data }));
  };
  return (
    <Pressable
      onPressIn={() => {
        (scaleAni.value = 0.95), (backgound.value = themeMode.card);
      }}
      onPressOut={onPressOut}
    >
      <Animated.View style={[styles.cardWrapper, animatedStyles]}>
        <Text style={{ color: themeMode.tint }}>
          {format(data.createAt.toDate(), 'yyyy-MM-dd')}
        </Text>
        <View style={styles.storeInfo}>
          <Text style={[styles.storeName, { color: themeMode.tint }]}>{after.storeInfo.name}</Text>
          <Confirm confirm={confirm} />
        </View>
      </Animated.View>
    </Pressable>
  );
};

export default RequestDetailCard;

const styles = StyleSheet.create({
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
  }
});
