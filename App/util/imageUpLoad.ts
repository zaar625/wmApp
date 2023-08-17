import storage from '@react-native-firebase/storage';
import type { Response } from '@bam.tech/react-native-image-resizer';

export async function imageUpLoad(images: Response[] | undefined) {
  const reference = storage().ref(`/photo/DMWrTCluLrhJMrI01BVhJK6byFs1/log`);
  const photosURL: string[] = [];

  if (images) {
    await Promise.all(
      images.map(async (image, index) => {
        const imageRef = reference.child(`${image.name}.jpg`);
        await imageRef.putFile(image.uri);
        const photoURL = await imageRef.getDownloadURL(); // 여기서 imageRef를 사용합니다

        photosURL.push(photoURL);
      })
    );

    return photosURL;
  }

  return photosURL;
}
