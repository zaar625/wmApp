import auth from '@react-native-firebase/auth';

type Tsign = {
  email: string;
  password: string;
};

type TUserProfileInfo = {
  email: string;
  displayName: string;
  photoURL: string;
  phoneNumber: string;
};

export function signIn({ email, password }: Tsign) {
  return auth().signInWithEmailAndPassword(email, password);
}

export function signUp({ email, password }: Tsign) {
  return auth().createUserWithEmailAndPassword(email, password);
}

export function subscribeAuth(callback: () => void) {
  return auth().onAuthStateChanged(callback);
}

export function updateProfile(userInfo: TUserProfileInfo) {
  return auth().currentUser?.updateProfile(userInfo);
}

export function logOut() {
  return auth().signOut();
}
