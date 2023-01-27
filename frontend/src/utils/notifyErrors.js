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
    console.log(formattedErrors);
    setErrors((prevState) => ({
      ...prevState,
      ...formattedErrors,
    }));
  } else {
    toast.error(FetchErrors.UNEXPECTED);
  }
};
