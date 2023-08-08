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
