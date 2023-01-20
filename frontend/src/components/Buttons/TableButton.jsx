import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

import Modal from '../Modals/Modal';
import { useDispatch } from 'react-redux';
import { openModal } from '../../slices/modalSlice';

const StyledButton = styled(Button)(() => ({
  backgroundColor: 'rgba(83,130,231,0.1)',
  textTransform: 'none',
  fontWeight: 500,
  fontSize: '12px',
  lineHeight: '12px',
  minWidth: '53px',
  minHeight: '28px',
}));

const TableButton = ({ productId, children, type, ...rest }) => {
  // const [open, setOpen] = useState(false);
  // const handleClickOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);
  const dispatch = useDispatch();

  return (
    <>
      <StyledButton
        {...rest}
        size="small"
        onClick={() => {
          dispatch(openModal({ type, id: productId }));
        }}
      >
        {children}
      </StyledButton>
      {/*<Modal open={open}>*/}
      {/*  <div>{render(open, handleClose, productId)}</div>*/}
      {/*</Modal>*/}
    </>
  );
};

export default TableButton;
