import { toast } from 'react-toastify';

import { formattingErrorsFromBackend } from './utils';
import { FetchErrors } from '../consts/consts';

export const notifyPageErrors = (error) => {
  if (error.status === 401) {
    toast.error(FetchErrors.AUTHORIZATION);
  } else if (error.status === 404) {
    toast.error(FetchErrors.UPLOAD_DATA);
  } else {
    toast.error(FetchErrors.UNEXPECTED);
  }
};

export const notifyFormsErrors = (error, setErrors) => {
  if (error.status === 401) {
    toast.error(FetchErrors.AUTHORIZATION);
  } else if (error.status === 400) {
    const formattedErrors = formattingErrorsFromBackend(error.errors);
    setErrors((prevState) => ({
      ...prevState,
      ...formattedErrors,
    }));
  } else {
    toast.error(FetchErrors.UNEXPECTED);
  }
};

export const notifyLoginErrors = (error, setErrors) => {
  if (error.response.status === 404 || error.response.status === 400) {
    const errorsInfo = error.response?.data?.errors;
    const formattedErrors = formattingErrorsFromBackend(errorsInfo);
    setErrors((prevState) => ({
      ...prevState,
      ...formattedErrors,
    }));
  } else {
    toast.error(FetchErrors.UNEXPECTED);
  }
};

export const notifyRegistrationErrors = (error, setErrors) => {
  if (error.response.status === 400) {
    const errorsInfo = error.response?.data?.errors;
    const formattedErrors = formattingErrorsFromBackend(errorsInfo);
    setErrors((prevState) => ({
      ...prevState,
      ...formattedErrors,
    }));
  } else {
    toast.error(FetchErrors.UNEXPECTED);
  }
};
