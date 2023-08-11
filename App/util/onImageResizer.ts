import { Asset } from 'react-native-image-picker';
import ImageResizer from '@bam.tech/react-native-image-resizer';
import type { ResizeMode, Response } from '@bam.tech/react-native-image-resizer';

export const onImageResizer = async (imagesData: Asset[]) => {
  if (!imagesData) return;
  const resizeImagesData = [];

  for (const image of imagesData) {
    // console.log(image);
    try {
      let result = await ImageResizer.createResizedImage(
        image.uri,
        600,
        600,
        'JPEG',
        100,
        0,
        undefined,
        false,
        {
          onlyScaleDown: true
        }
      );
      resizeImagesData.push(result);
    } catch (e) {
      console.log(e);
    }
  }

  return resizeImagesData;
};
