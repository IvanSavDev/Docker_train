import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useForm from '../../hooks/useForm';
import Header from '../../components/Header/Header';
import StandardButton from '../../components/Buttons/StandardButton';
import Input from '../../components/Inputs/Input';
import {
  isValidCompanyName,
  isValidEmail,
  isValidFullName,
  isValidPassword,
} from '../../utils/validation';
import {
  getChangedFields,
  haveErrors,
  isDifferencesWithOldAccount,
  isEmptyObject,
} from '../../utils/utils';
import { Errors, PasswordErrors } from '../../consts/consts';

import styles from './PersonalCabinet.module.css';
import { getUser, updateUser } from '../../slices/userSlice';

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

const PersonalCabinet = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [form, setForm] = useForm({ ...initialStateForm });
  const [errors, setErrors] = useState({ ...initialStateErrors });
  const [disabledButton, setDisabledButton] = useState(true);

  useLayoutEffect(() => {
    if (!isEmptyObject(user)) {
      setForm({
        name: user.name,
        surname: user.surname,
        companyName: user.companyName,
        email: user.email,
        address: user.address,
      });
    } else {
      dispatch(getUser());
    }
  }, [setForm, user]);

  useEffect(() => {
    if (form) {
      setDisabledButton(
        isDifferencesWithOldAccount(
          {
            name: user.name,
            surname: user.surname,
            companyName: user.companyName,
            email: user.email,
            address: user.address,
            oldPassword: '',
            newPassword: '',
          },
          {
            name: form.name,
            surname: form.surname,
            companyName: form.companyName,
            email: form.email,
            address: form.address,
            oldPassword: form.oldPassword,
            newPassword: form.newPassword,
          },
        ),
      );
    }
  }, [form, user]);

  const handleChange = ({ target }) => {
    setErrors((prevState) => ({ ...prevState, [target.name]: null }));
    setForm({ [target.name]: target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { name, surname, companyName, email, oldPassword, newPassword } =
      form;

    const checkOldPasswordErrors = () => {
      if (oldPassword.length === 0) {
        return newPassword.length === 0 ? null : PasswordErrors.OLD_PASSWORD;
      }
      if (isValidPassword(oldPassword)) {
        return newPassword !== oldPassword
          ? null
          : PasswordErrors.SAME_PASSWORD;
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
        return newPassword !== oldPassword
          ? null
          : PasswordErrors.SAME_PASSWORD;
      }
      return isValidPassword(newPassword)
        ? null
        : PasswordErrors.INVALID_PASSWORD;
    };

    const checkedErrors = {
      name: isValidFullName(name) ? null : Errors.FULL_NAME,
      surname: isValidFullName(surname) ? null : Errors.FULL_NAME,
      companyName: isValidCompanyName(companyName) ? null : Errors.COMPANY_NAME,
      email: isValidEmail(email) ? null : Errors.EMAIL,
      oldPassword: checkOldPasswordErrors(),
      newPassword: checkNewPasswordErrors(),
    };

    const isNotErrors = haveErrors(checkedErrors);

    if (isNotErrors) {
      const changedFields = getChangedFields(
        {
          name: user.name,
          surname: user.surname,
          companyName: user.companyName,
          email: user.email,
          address: user.address,
          oldPassword: '',
          newPassword: '',
        },
        {
          name: form.name,
          surname: form.surname,
          companyName: form.companyName,
          email: form.email,
          address: form.address,
          oldPassword: form.oldPassword,
          newPassword: form.newPassword,
        },
      );
      try {
        await dispatch(updateUser(changedFields)).unwrap();
        setForm({
          oldPassword: '',
          newPassword: '',
        });
        setErrors(initialStateErrors);
      } catch (err) {
        const formattedErrors = err.reduce((acc, error) => {
          return {
            ...acc,
            [error.parameter]: error.message,
          };
        }, {});
        setErrors((prevState) => ({
          ...prevState,
          ...formattedErrors,
        }));
      }
    } else {
      setErrors(checkedErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Header
        title="Personal Cabinet"
        description="Information about your account"
      />
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
        />
      </div>
      <StandardButton type="submit" disabled={disabledButton}>
        Save changes
      </StandardButton>
    </form>
  );
};

export default PersonalCabinet;
