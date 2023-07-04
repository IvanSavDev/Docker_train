import React from 'react';
import { Skeleton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { FetchErrors, Statuses } from '../../consts/consts';
import { loadAvatar } from '../../store/slices/userSlice';

import styles from './Avatar.module.css';
import { StyledFab } from './Avatar.styled';

import { ReactComponent as UserImg } from '../../assets/img/user.svg';

const Avatar = () => {
  const dispatch = useDispatch();
  const { user, statusAvatar } = useSelector((state) => state.user);

  const handleLoadImg = async (event) => {
    try {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('image', file);
      await dispatch(loadAvatar(formData)).unwrap();
    } catch (error) {
      if (error.status === 401) {
        toast.error(FetchErrors.AUTHORIZATION);
      } else {
        toast.error(FetchErrors.UPLOAD_IMAGE);
      }
    }
  };

  return (
    <div className={styles.containerImg}>
      {statusAvatar === Statuses.PENDING && (
        <Skeleton variant="circular" width={100} height={100} />
      )}
      {statusAvatar !== Statuses.PENDING && user.urlImg && (
        <img src={`${user.urlImg}`} alt="user" className={styles.img} />
      )}
      {statusAvatar !== Statuses.PENDING && !user.urlImg && (
        <UserImg className={styles.emptyImg} />
      )}
      {statusAvatar !== Statuses.PENDING && (
        <StyledFab color="primary" aria-label="add" component="label">
          <AddIcon />
          <input type="file" accept="image/*" hidden onChange={handleLoadImg} />
        </StyledFab>
      )}
    </div>
  );
};

export default Avatar;
