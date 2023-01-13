import React, { useState } from 'react';
import { Modal } from '@mui/material';
import { styled } from '@mui/material/styles';

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
  const [open, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  return (
    <header
      className={addProductPage ? styles.containerWithButton : styles.container}
    >
      <h1 className={styles.title}>{title}</h1>
      {addProductPage && (
        <>
          <StyledStandardButton onClick={openModal}>
            <CreateProductImg />
            Create a product
          </StyledStandardButton>
          <Modal open={open}>
            <div>
              <CreateProduct open={open} closeModal={closeModal} />
            </div>
          </Modal>
        </>
      )}
      <p className={styles.text}>{description}</p>
    </header>
  );
};

export default Header;
