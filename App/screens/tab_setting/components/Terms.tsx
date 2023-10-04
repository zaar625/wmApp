import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { SemiTitle, SmallTitle } from '../../../common-components/Title';
import themeChange from '../../../util/theme';
import SvgIcon from '../../../common-components/SvgIcon';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing
} from 'react-native-reanimated';

type TTerms = {
  name: string;
  route: string;
};

const Terms = () => {
  const themeMode = themeChange();

  const termsList = [
    {
      name: '버전 정보',
      route: ''
    },
    {
      name: '이용약관',
      route: ''
    },
    {
      name: '개인정보 처리 방침',
      route: ''
    }
  ];
  return (
    <View style={[styles.container, { backgroundColor: themeMode.secondary }]}>
      <View style={styles.title}>
        <Image
          source={require('../../../assets/img/term.png')}
          style={styles.image}
          resizeMode="contain"
        />
        <SmallTitle title="앱 정보 및 이용약관" />
      </View>
      <View>
        {termsList.map((list, index) => (
          <TermsList list={list} key={index} />
        ))}
      </View>
    </View>
  );
};

export default Terms;

const TermsList = ({ list }: { list: TTerms }) => {
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
        (scaleAni.value = 0.95), (backgound.value = themeMode.card);
      }}
      onPressOut={() => ((scaleAni.value = 1), (backgound.value = themeMode.secondary))}
    >
      <Animated.View style={[styles.btnWrapper, animatedStyles]}>
        <Text style={{ color: themeMode.tint }}>{list.name}</Text>
        <SvgIcon name="arrow_right" color={themeMode.pressIcon} />
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    paddingTop: 15,
    paddingBottom: 5
  },
  title: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    marginBottom: 10
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 10
  },
  btnWrapper: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10
  }
});
