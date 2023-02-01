import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { FetchErrors, Statuses } from '../../consts/consts';
import { deleteProduct } from '../../store/slices/productsSlice';

import styles from './DeleteButton.module.css';
import { StyledSnackbar } from './DeleteButton.styled';

import { ReactComponent as Delete } from '../../assets/img/delete.svg';

const DeleteButton = ({ id }) => {
  const [open, setOpen] = useState(false);
  const { status } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    if (status !== Statuses.PENDING) {
      setOpen(false);
    }
  };

  const handleClick = async () => {
    try {
      await dispatch(deleteProduct(id)).unwrap();
      handleClose();
    } catch (error) {
      if (error.status === 401) {
        toast.error(FetchErrors.AUTHORIZATION);
      } else {
        toast.error(FetchErrors.UNEXPECTED);
      }
    }
  };

  const action = (
    <>
      <Button
        size="small"
        color="error"
        onClick={handleClick}
        disabled={Boolean(status === Statuses.PENDING)}
      >
        Delete
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
        disabled={Boolean(status === Statuses.PENDING)}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <div className={styles.container}>
      <Button
        sx={{
          minWidth: '28px',
          minHeight: '28xp',
          width: '100%',
          height: '100%',
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
