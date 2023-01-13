import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import { Snackbar } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';

import { ReactComponent as Delete } from '../../assets/img/delete.svg';

import styles from './DeleteButton.module.css';

const StyledSnackbar = styled(Snackbar)(() => ({
  position: 'absolute',
  left: -410,
  top: 10,
  maxWidth: 300,

  '& .MuiPaper-root': {
    flexWrap: 'nowrap',
    backgroundColor: '#2B3844',
  },
}));

const DeleteButton = ({ handleClick, ...props }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const action = (
    <>
      <Button
        size="small"
        color="error"
        onClick={() => {
          handleClick();
          handleClose();
        }}
      >
        Delete
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <div className={styles.container}>
      <Button
        {...props}
        size="small"
        sx={{
          minWidth: '28px',
        }}
        onClick={handleOpen}
      >
        <Delete />
      </Button>
      <StyledSnackbar
        open={open}
        onClose={handleClose}
        message="Are you sure you want to uninstall this product?"
        action={action}
      />
    </div>
  );
};

export default DeleteButton;
