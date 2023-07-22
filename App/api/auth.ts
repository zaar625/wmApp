import auth from '@react-native-firebase/auth';

type Tsign = {
  email: string;
  password: string;
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
