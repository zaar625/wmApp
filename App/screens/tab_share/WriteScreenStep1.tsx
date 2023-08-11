import { Pressable, StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import themeChange from '../../util/theme';
import NavigationHeader from '../../common-components/NavigationHeader';
import { SemiTitle } from '../../common-components/Title';
import { useMyStoreList } from '../../api/store/hooks/useMyStoreList';
import SvgIcon from '../../common-components/SvgIcon';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../type';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing
} from 'react-native-reanimated';

const WriteScreenStep1 = () => {
  const themeMode = themeChange();
  const { data } = useMyStoreList();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeMode.primary }]}>
      <NavigationHeader header="매장 선택하기" />
      <View style={styles.contentsContainer}>
        <SemiTitle title="공유할 매장을 선택해주세요" style={{ marginBottom: 20 }} />
        <View style={styles.imageWrapper}>
          <Image
            source={require('../../assets/img/share_user.png')}
            style={styles.image}
            resizeMode="contain"
          />
          <View>
            <Text style={{ color: themeMode.subTint }}>이상윤님이 등록하신 매장입니다. </Text>
            <Text style={{ color: themeMode.subTint }}>
              희망하는 매장이 없다면, 매장 등록을 먼저 해주세요!{' '}
            </Text>
          </View>
        </View>
        {data && data.map(store => <StoreItem store={store} key={store.id} />)}
      </View>
    </SafeAreaView>
  );
};

const StoreItem = ({ store }) => {
  const themeMode = themeChange();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const scaleAni = useSharedValue(1);

  const animatedStyles = useAnimatedStyle(() => {
    return {
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
      onPress={() => navigation.navigate('writeScreenStep2', { storeName: store.name })}
      onPressIn={() => {
        scaleAni.value = 0.95;
      }}
      onPressOut={() => (scaleAni.value = 1)}
    >
      <Animated.View
        style={[
          styles.storeItemContainer,
          { backgroundColor: themeMode.secondary },
          animatedStyles
        ]}
      >
        <Text style={[{ color: themeMode.tint }, styles.storeText]}>{store.name}</Text>
        <SvgIcon name="arrow_right" color={themeMode.subTint} />
      </Animated.View>
    </Pressable>
  );
};

export default WriteScreenStep1;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  contentsContainer: {
    paddingHorizontal: 20
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 10
  },
  imageWrapper: {
    flexDirection: 'row',
    marginBottom: 30
  },
  storeItemContainer: {
    paddingHorizontal: 20,
    paddingVertical: 25,
    borderRadius: 10,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  storeText: {
    fontWeight: '600',
    fontSize: 16
  }
});
