import { trigger } from 'react-native-haptic-feedback';

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false
};

export default function haptic(type: string) {
  return trigger(type, options);
}
