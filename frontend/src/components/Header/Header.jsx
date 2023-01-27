import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import { CreateProductButton } from './CreateProductButton';
import AddBackgroundButton from './AddBackgroundButton';
import Avatar from './Avatar';

import { ModalsTypes } from '../../consts/consts';
import { openModal } from '../../store/slices/modalSlice';

import styles from './Header.module.css';

import { ReactComponent as CreateProductImg } from '../../assets/img/createProduct.svg';

const Header = ({
  title,
  description,
  addProductPage = false,
  addImg = false,
}) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const handleOpen = () =>
    dispatch(openModal({ type: ModalsTypes.CREATE_PRODUCT }));

  const stylesHeader = classNames({
    [styles.header]: true,
    [styles.containerWithButton]: addProductPage,
    [styles.containerWithImg]: addImg,
    [styles.container]: !addProductPage && !addImg,
  });

  return (
    <header className={stylesHeader}>
      {user.urlBackgroundImg && (
        <img
          className={styles.backgroundImg}
          src={user.urlBackgroundImg}
          alt="background"
        />
      )}
      <h1 className={styles.title}>{title}</h1>
      {addProductPage && (
        <CreateProductButton
          onClick={handleOpen}
          startIcon={<CreateProductImg />}
        >
          Create a product
        </CreateProductButton>
      )}
      {addImg && <Avatar />}
      {addImg && <AddBackgroundButton />}
      <p className={styles.text}>{description}</p>
    </header>
  );
};

export default React.memo(Header);
