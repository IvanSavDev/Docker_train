import React, { useEffect, useRef } from 'react';

import { StyledTextField } from './Input.styled';

const ModalInput = ({ error, autoFocus, ...rest }) => {
  const ref = useRef();

  useEffect(() => {
    if (autoFocus && ref.current) {
      ref.current.focus();
    }
  }, [autoFocus]);

  return <StyledTextField inputRef={ref} {...rest} error={error} />;
};

export default ModalInput;
