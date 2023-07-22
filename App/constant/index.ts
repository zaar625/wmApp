type TFirebaseErrorType = { [key: string]: any };

export const ERROR_MESSEGE: TFirebaseErrorType = {
  'auth/wrong-password': '비밀번호를 잘못입력하셨습니다!',
  'auth/user-not-found': '등록된 계정이 없습니다!',
  'auth/invalid-email': '유효한 이메일이 아닙니다!'
};
