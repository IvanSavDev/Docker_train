import React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { useDispatch } from 'react-redux';

import { openModal } from '../../store/slices/modalSlice';

const StyledButton = styled(Button)(() => ({
  minWidth: '53px',
  minHeight: '28px',
  backgroundColor: 'rgba(83,130,231,0.1)',
  textTransform: 'none',
  fontSize: '12px',
  lineHeight: '12px',
  fontWeight: 500,
}));

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
