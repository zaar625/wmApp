import { launchImageLibrary, ImagePickerResponse } from 'react-native-image-picker';
import { ImageLibraryOptions } from 'react-native-image-picker';

export async function onLaunchImageLibrary(option: ImageLibraryOptions) {
  const pickImage = (res: ImagePickerResponse) => {
    if (res.didCancel || !res) {
      return;
    }
  };

  const imagesData = await launchImageLibrary(option, pickImage);
  const { assets } = imagesData;
  return assets;
}
