import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import { Errors } from '../../consts/consts';

import { StyledModalInput } from './DateInput.styled';

const DateInput = ({ error, ...rest }) => (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <DesktopDatePicker
      {...rest}
      renderInput={(params) => (
        <StyledModalInput
          {...params}
          variant="outlined"
          error={error}
          helperText={Errors.INVALID_DATE}
        />
      )}
    />
  </LocalizationProvider>
);

export default DateInput;
