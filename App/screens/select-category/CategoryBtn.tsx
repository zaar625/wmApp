import { Dimensions, Pressable, StyleSheet, Text } from 'react-native';
import React from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing
} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../type';

const { width, height } = Dimensions.get('window');

export default function CategoryBtn({ title }: { title: string }) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const scaleAni = useSharedValue(1);
  const opacityAni = useSharedValue(1);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      opacity: opacityAni.value,
      transform: [
        {
          scale: withTiming(
            scaleAni.value,
            {
              duration: 200,
              easing: Easing.bezier(0.25, 0.1, 0.25, 1)
            },
            finished => {
              if (finished) {
                scaleAni.value = 1;
                opacityAni.value = 1;
              }
            }
          )
        }
      ]
    };
  });

  return (
    <Pressable
      onPress={() => ((scaleAni.value = 0.95), (opacityAni.value = 0.7))}
      onPressOut={() => navigation.navigate('employeeLoginPage')}
    >
      <Animated.View style={[styles.btn, animatedStyles]}>
        <Text style={styles.btnText}>{title}</Text>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    width: width * 0.403,
    height: height * 0.153,
    opacity: 1,
    backgroundColor: '#202632',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnText: {
    textAlign: 'center',
    lineHeight: 30,
    fontWeight: '700',
    fontSize: 20,
    color: '#fff'
  }
});
