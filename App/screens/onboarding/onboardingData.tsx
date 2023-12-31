import { View, ImageRequireSource, Image, StyleSheet, Dimensions } from 'react-native';
import { ScreenTitle } from '../../common-components/Title';

import { deviceWidth, deviceheight } from '../../theme';
// `매장에서${'\n'}일하든, 운영하든${'\n'}앱 하나로`,
const onBoadingDATA = [
  {
    id: 1,
    title: `매장에서${'\n'}일하든, 운영하든${'\n'}앱 하나로`,
    img: require('../../assets/img/onboarding01.png')
  },
  {
    id: 2,
    title: `메인화면에서${'\n'}업무와 지출을${'\n'}한 눈에`,
    img: require('../../assets/img/onboarding02.png')
  },
  {
    id: 3,
    title: `공유할 내용은${'\n'}받고 쓰고${'\n'}디테일한 사진까지`,
    img: require('../../assets/img/onboarding03.png')
  },
  {
    id: 4,
    title: `메인화면에서${'\n'}업무와 지출을${'\n'}한 눈에`,
    img: require('../../assets/img/onboarding04.png')
  }
];

type TOnBoardingList = {
  id: number;
  img: ImageRequireSource;
  title: string;
};

function OnBoadingSlideItem({ data }: { data: TOnBoardingList }): JSX.Element {
  return (
    <View style={styles.slideItemWrapper}>
      <ScreenTitle title={data.title} style={{ paddingHorizontal: 20 }} />
      <View style={styles.imgWrap}>
        <Image source={data.img} resizeMode="contain" style={styles.img} />
      </View>
    </View>
  );
}

export { onBoadingDATA, OnBoadingSlideItem };

const styles = StyleSheet.create({
  slideItemWrapper: {
    width: deviceWidth
  },
  imgWrap: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  img: {
    width: deviceWidth * 0.527,
    height: deviceheight * 0.5
  }
});
