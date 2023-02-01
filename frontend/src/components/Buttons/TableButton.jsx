import React from 'react';
import { useDispatch } from 'react-redux';

import { openModal } from '../../store/slices/modalSlice';

import { StyledButton } from './TableButton.styled';

const TableButton = ({ productId, children, type, ...rest }) => {
  const dispatch = useDispatch();

  return (
    <StyledButton
      {...rest}
      onClick={() => {
        dispatch(openModal({ type, id: productId }));
      }}
    >
      {children}
    </StyledButton>
  );
};

export default TableButton;
