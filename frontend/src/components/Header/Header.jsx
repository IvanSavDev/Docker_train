import React, { useState } from 'react';
import { Modal } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useDispatch } from 'react-redux';

import { closeModal, openModal } from '../../slices/modalSlice';
import StandardButton from '../Buttons/StandardButton';
import CreateProduct from '../Modals/CreateProduct';
import { ReactComponent as CreateProductImg } from '../../assets/img/createProduct.svg';

import styles from './Header.module.css';

const StyledStandardButton = styled(StandardButton)(({ theme }) => ({
  gridArea: 'addProduct',
  justifySelf: 'end',
  gap: '8px',
  paddingTop: '16px',
  paddingBottom: '16px',

  [theme.breakpoints.down('middle')]: {
    justifySelf: 'start',
  },
}));

const Header = ({ title, description, addProductPage = false }) => {
  // const [open, setOpen] = useState(false);
  // const openModal = () => setOpen(true);
  // const closeModal = () => setOpen(false);
  const dispatch = useDispatch();

  const handleOpen = () => dispatch(openModal({ type: 'createProduct' }));

  return (
    <header
      className={addProductPage ? styles.containerWithButton : styles.container}
    >
      <h1 className={styles.title}>{title}</h1>
      {addProductPage && (
        <StyledStandardButton onClick={handleOpen}>
          <CreateProductImg />
          Create a product
        </StyledStandardButton>
      )}
      <p className={styles.text}>{description}</p>
    </header>
  );
};

export default Header;
