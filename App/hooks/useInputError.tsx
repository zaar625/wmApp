import React, { useState } from 'react';

type TInitalValue = {
  error: boolean;
  errorMessage: string;
};

export default function useInputError(initialValue: TInitalValue) {
  const [inputError, setInputError] = useState(initialValue);

  return { inputError, setInputError };
}
