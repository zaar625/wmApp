type TFirebaseErrorType = { [key: string]: any };

export const ERROR_MESSEGE: TFirebaseErrorType = {
  'auth/wrong-password': '비밀번호를 잘못입력하셨습니다!',
  'auth/user-not-found': '등록된 계정이 없습니다!',
  'auth/invalid-email': '유효한 이메일이 아닙니다!',
  'auth/email-already-in-use': '이미 가입된 회원입니다.'
};

export const ADDSTORE_MODAL_SUCCESS = {
  title: '매장 등록이 완료되었어요.',
  content: `지금부터 간편하게 QR 코드로${`\n`}출퇴근 등록을 해보세요.`
};
export const ADDSTORE_MODAL_FAIL = {
  title: '등록된 매장이 없어요.',
  content: `QR 코드를 다시한번 촬영해주세요.${`\n`}지속적으로 문제발생 시 관리자에세 문의하세요.`
};

export const OPENSOURE_URL = [
  {
    name: 'react-native-async-storage',
    url: 'https://github.com/react-native-async-storage/async-storage'
  },
  {
    name: 'react-native-netinfo',
    url: 'https://github.com/react-native-netinfo/react-native-netinfo'
  },
  {
    name: 'react-native-firebase',
    url: 'https://rnfirebase.io/'
  },
  {
    name: 'react-navigation',
    url: 'https://reactnavigation.org/'
  },
  {
    name: 'reduxjs/toolkit',
    url: 'https://tanstack.com/query/latest'
  },
  {
    name: 'date-fns',
    url: 'https://date-fns.org/'
  },
  {
    name: 'lottie',
    url: 'https://github.com/lottie-react-native/lottie-react-native/'
  },
  {
    name: 'react-native-gesture-handler',
    url: 'https://docs.swmansion.com/react-native-gesture-handler/'
  },
  {
    name: 'react-native-haptic-feedback',
    url: 'https://github.com/mkuczera/react-native-haptic-feedback'
  },
  {
    name: 'react-native-bootsplash',
    url: 'https://github.com/zoontek/react-native-bootsplash'
  },
  {
    name: 'react-native-date-picker',
    url: 'https://github.com/henninghall/react-native-date-picker'
  },
  {
    name: 'react-native-image-picker',
    url: 'https://github.com/react-native-image-picker/react-native-image-picker'
  },
  {
    name: 'react-native-permissions',
    url: 'https://github.com/zoontek/react-native-permissions'
  },
  {
    name: 'react-native-qrcode-scanner',
    url: 'https://github.com/moaazsidat/react-native-qrcode-scanner'
  },
  {
    name: 'react-native-reanimated',
    url: 'https://docs.swmansion.com/react-native-reanimated/'
  }
];
