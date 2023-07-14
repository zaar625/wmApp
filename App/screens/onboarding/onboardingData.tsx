import { Text, View, ImageRequireSource, Image, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const onBoadingDATA = [
  {
    id: 1,
    title: (
      <Text>
        매장에서{'\n'}일하든, 운영하든{'\n'}앱 하나로
      </Text>
    ),
    img: require('../../assets/img/onboarding01.png')
  },
  {
    id: 2,
    title: (
      <Text>
        매장에서{'\n'}출/퇴근 등록{'\n'}QR코드 하나로
      </Text>
    ),
    img: require('../../assets/img/onboarding02.png')
  },
  {
    id: 3,
    title: (
      <Text>
        공유할 내용은{'\n'}받고 쓰고{'\n'}디테일한 사진까지
      </Text>
    ),
    img: require('../../assets/img/onboarding03.png')
  },
  {
    id: 4,
    title: (
      <Text>
        메인화면에서{'\n'}업무와 지출을{'\n'}한 눈에
      </Text>
    ),
    img: require('../../assets/img/onboarding04.png')
  }
];

type onBoardingList = {
  id: number;
  img: ImageRequireSource;
  title: JSX.Element;
};

function OnBoadingSlideItem({ data }: { data: onBoardingList }): JSX.Element {
  return (
    <View
      style={{
        width,
        paddingHorizontal: 20
      }}
    >
      <Text style={styles.titleText}>{data.title}</Text>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Image
          source={data.img}
          resizeMode="contain"
          style={{
            width: width * 0.527,
            height: height * 0.5
          }}
        />
      </View>
    </View>
  );
}

export { onBoadingDATA, OnBoadingSlideItem };

const styles = StyleSheet.create({
  titleText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 36,
    marginBottom: 40
  }
});
