import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { CircularProgress } from '@mui/material';

import useForm from '../../hooks/useForm';
import Header from '../../components/Header/Header';
import StandardButton from '../../components/Buttons/StandardButton';
import CenteringContainer from '../../components/Containers/CenteringContainer';
import Input from '../../components/Inputs/Input';

import {
  isValidCompanyName,
  isValidEmail,
  isValidFullName,
  isValidPassword,
} from '../../utils/validation';
import {
  formattingErrorsFromBackend,
  getChangedFields,
  haveErrors,
  isDifferentFields,
  isEmptyObject,
  trimObjectValues,
} from '../../utils/utils';
import { notifyPageErrors } from '../../utils/notifyErrors';
import {
  Errors,
  FetchErrors,
  PasswordErrors,
  Statuses,
} from '../../consts/consts';
import { getUser, updateUser } from '../../store/slices/userSlice';

import styles from './PersonalCabinet.module.css';

const initialStateForm = {
  name: '',
  surname: '',
  companyName: '',
  email: '',
  oldPassword: '',
  newPassword: '',
  address: '',
};

const initialStateErrors = {
  name: null,
  surname: null,
  companyName: null,
  email: null,
  oldPassword: null,
  newPassword: null,
};

const checkErrors = (form) => {
  const { name, surname, companyName, email, oldPassword, newPassword } = form;
  const checkOldPasswordErrors = () => {
    if (oldPassword.length === 0) {
      return newPassword.length === 0 ? null : PasswordErrors.OLD_PASSWORD;
    }
    if (isValidPassword(oldPassword)) {
      return newPassword !== oldPassword ? null : PasswordErrors.SAME_PASSWORD;
    }
    return isValidPassword(oldPassword)
      ? null
      : PasswordErrors.INVALID_PASSWORD;
  };

  const checkNewPasswordErrors = () => {
    if (newPassword.length === 0) {
      return oldPassword.length === 0 ? null : PasswordErrors.NEW_PASSWORD;
    }
    if (isValidPassword(oldPassword)) {
      return newPassword !== oldPassword ? null : PasswordErrors.SAME_PASSWORD;
    }
    return isValidPassword(newPassword)
      ? null
      : PasswordErrors.INVALID_PASSWORD;
  };

  return {
    name: isValidFullName(name) ? null : Errors.FULL_NAME,
    surname: isValidFullName(surname) ? null : Errors.FULL_NAME,
    companyName: isValidCompanyName(companyName) ? null : Errors.COMPANY_NAME,
    email: isValidEmail(email) ? null : Errors.EMAIL,
    oldPassword: checkOldPasswordErrors(),
    newPassword: checkNewPasswordErrors(),
  };
};

const PersonalCabinet = () => {
  const { user, status } = useSelector((state) => state.user);
  const [form, setForm] = useForm({ ...initialStateForm });
  const [errors, setErrors] = useState({ ...initialStateErrors });
  const [oldUser, setOldUser] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      if (!isEmptyObject(user)) {
        const userData = {
          name: user.name,
          surname: user.surname,
          companyName: user.companyName,
          email: user.email,
          address: user.address,
        };
        setOldUser({ ...userData, oldPassword: '', newPassword: '' });
        setForm(userData);
      } else {
        try {
          await dispatch(getUser()).unwrap();
        } catch (error) {
          notifyPageErrors(error);
        }
      }
    };
    fetchData();
  }, [setForm, user]);

  const handleChange = ({ target }) => {
    setErrors((prevState) => ({ ...prevState, [target.name]: null }));
    setForm({ [target.name]: target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const checkedErrors = checkErrors(form);
    const isNotErrors = haveErrors(checkedErrors);

    if (isNotErrors) {
      try {
        setErrors({ ...initialStateErrors });
        const updatedForm = trimObjectValues(form);
        const changedFields = getChangedFields(oldUser, updatedForm);
        await dispatch(updateUser(changedFields)).unwrap();
        setForm({
          oldPassword: '',
          newPassword: '',
        });
        setErrors({ ...initialStateErrors });
      } catch (error) {
        if (error.status === 401) {
          toast.error(FetchErrors.AUTHORIZATION);
        }
        if (error.status === 400) {
          const formattedErrors = formattingErrorsFromBackend(error.errors);
          setErrors((prevState) => ({
            ...prevState,
            ...formattedErrors,
          }));
        } else {
          toast.error(FetchErrors.UNEXPECTED);
        }
      }
    } else {
      setErrors(checkedErrors);
    }
  };

  return (
    <>
      <Header
        title="Personal Cabinet"
        description="Information about your account"
        addImg
      />
      {status === Statuses.PENDING && isEmptyObject(user) ? (
        <CenteringContainer>
          <CircularProgress />
        </CenteringContainer>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className={styles.container}>
            <Input
              sx={{
                gridArea: 'name',
              }}
              name="name"
              label="First name"
              error={Boolean(errors.name)}
              helperText={errors.name}
              onChange={handleChange}
              value={form.name}
              disabled={status === Statuses.PENDING}
            />
            <Input
              sx={{
                gridArea: 'surname',
              }}
              name="surname"
              label="Last name"
              error={Boolean(errors.surname)}
              helperText={errors.surname}
              onChange={handleChange}
              value={form.surname}
              disabled={status === Statuses.PENDING}
            />
            <Input
              sx={{
                gridArea: 'companyName',
              }}
              name="companyName"
              label="Company name"
              error={Boolean(errors.companyName)}
              helperText={errors.companyName}
              onChange={handleChange}
              value={form.companyName}
              disabled={status === Statuses.PENDING}
            />
            <Input
              sx={{
                gridArea: 'email',
              }}
              name="email"
              label="Email"
              error={Boolean(errors.email)}
              helperText={errors.email}
              onChange={handleChange}
              value={form.email}
              disabled={status === Statuses.PENDING}
            />
            <Input
              sx={{
                gridArea: 'address',
              }}
              name="address"
              label="Enter your address"
              error={Boolean(errors.address)}
              helperText={errors.address}
              onChange={handleChange}
              value={form.address}
              disabled={status === Statuses.PENDING}
            />
            <Input
              sx={{
                gridArea: 'oldPassword',
              }}
              type="password"
              name="oldPassword"
              label="Enter old password"
              error={Boolean(errors.oldPassword)}
              helperText={errors.oldPassword}
              onChange={handleChange}
              value={form.oldPassword}
              disabled={status === Statuses.PENDING}
            />
            <Input
              sx={{
                gridArea: 'newPassword',
              }}
              type="password"
              name="newPassword"
              label="Enter a new password"
              error={Boolean(errors.newPassword)}
              helperText={errors.newPassword}
              onChange={handleChange}
              value={form.newPassword}
              disabled={status === Statuses.PENDING}
            />
          </div>
          <StandardButton
            type="submit"
            disabled={
              status === Statuses.PENDING || !isDifferentFields(oldUser, form)
            }
          >
            Save changes
          </StandardButton>
        </form>
      )}
    </>
  );
};

export default PersonalCabinet;
