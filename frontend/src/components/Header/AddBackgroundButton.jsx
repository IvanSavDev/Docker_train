import React from 'react';
import { styled } from '@mui/material/styles';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

import StandardButton from '../Buttons/StandardButton';

import { FetchErrors } from '../../consts/consts';
import { loadBackgroundImg } from '../../store/slices/userSlice';

const BackgroundButton = styled(StandardButton)(() => ({
  gridArea: 'background',
  justifySelf: 'start',
  padding: '10px 10px',
}));

const AddBackgroundButton = () => {
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
    <BackgroundButton component="label">
      add background
      <input type="file" accept="image/*" hidden onChange={handleLoadImg} />
    </BackgroundButton>
  );
};

export default AddBackgroundButton;
