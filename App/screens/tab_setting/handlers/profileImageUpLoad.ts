import storage from '@react-native-firebase/storage';
import type { Response } from '@bam.tech/react-native-image-resizer';

export async function profileImageUpLoad(uri: string) {
  const reference = storage().ref(`/photo/DMWrTCluLrhJMrI01BVhJK6byFs1/profile`);

  if (uri.startsWith('file')) {
    const imageRef = reference.child(`${uri}`);
    await imageRef.putFile(uri);
    const photoURL = await imageRef.getDownloadURL(); // 여기서 imageRef를 사용합니다

    return photoURL;
  }

  return uri;
}
