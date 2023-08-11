import { launchImageLibrary, ImagePickerResponse } from 'react-native-image-picker';

export async function onLaunchImageLibrary() {
  const pickImage = (res: ImagePickerResponse) => {
    if (res.didCancel || !res) {
      return;
    }
  };

  const imagesData = await launchImageLibrary(
    {
      mediaType: 'photo',
      selectionLimit: 3,
      presentationStyle: 'pageSheet'
    },
    pickImage
  );
  const { assets } = imagesData;
  return assets;
}
