import React, { useState } from 'react';

export default function useInputError() {
  const [inputError, setInputError] = useState({
    error: false,
    errorMessage: '올바른 이메일 형식이 아닙니다.'
  });

  return { inputError, setInputError };
}
