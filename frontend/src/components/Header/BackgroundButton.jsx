import React from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

import { FetchErrors } from '../../consts/consts';
import { loadBackgroundImg } from '../../store/slices/userSlice';

import { StyledBackgroundButton } from './BackgroundButton.styled';

const BackgroundButton = () => {
  const dispatch = useDispatch();
  const handleLoadImg = async (event) => {
    try {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = async () => {
        const result = {
          file: reader.result,
        };
        await dispatch(loadBackgroundImg(result)).unwrap();
      };
      reader.readAsDataURL(file);
    } catch {
      toast.error(FetchErrors.UPLOAD_IMAGE);
    }
  };

  return (
    <StyledBackgroundButton component="label">
      add background
      <input type="file" accept="image/*" hidden onChange={handleLoadImg} />
    </StyledBackgroundButton>
  );
};

export default BackgroundButton;
