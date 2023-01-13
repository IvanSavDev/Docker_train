import React, { useEffect, useLayoutEffect, useState } from 'react';

import useAccount from '../../hooks/useAccount';
import useForm from '../../hooks/useForm';
import Header from '../../components/Header/Header';
import StandardButton from '../../components/Buttons/StandardButton';
import Input from '../../components/Inputs/Input';
import {
  isMatchPassword,
  isValidCompanyName,
  isValidEmail,
  isValidFullName,
  isValidPassword,
} from '../../utils/validation';
import {
  checkNewEmailOnValidation,
  haveErrors,
  isDifferencesWithOldAccount,
} from '../../utils/utils';
import { Errors } from '../../consts/consts';

import styles from './PersonalCabinet.module.css';

const initialStateForm = {
  name: '',
  surname: '',
  companyName: '',
  email: '',
  password: '',
  newPassword: '',
  address: '',
};

const initialStateErrors = {
  name: null,
  surname: null,
  companyName: null,
  email: null,
  password: null,
  newPassword: null,
};

const PersonalCabinet = () => {
  const [form, setForm] = useForm({ ...initialStateForm });
  const [errors, setErrors] = useState({ ...initialStateErrors });
  const { account, updateAccount } = useAccount();
  const [disabledButton, setDisabledButton] = useState(true);

  useLayoutEffect(() => {
    if (account) {
      setForm({
        name: account.name,
        surname: account.surname,
        companyName: account.companyName,
        email: account.email,
        address: account.address,
      });
    }
  }, [setForm, account]);

  useEffect(() => {
    if (account) {
      setDisabledButton(
        isDifferencesWithOldAccount(
          {
            name: account.name,
            surname: account.surname,
            companyName: account.companyName,
            email: account.email,
            address: account.address,
            password: '',
            newPassword: '',
          },
          {
            name: form.name,
            surname: form.surname,
            companyName: form.companyName,
            email: form.email,
            address: form.address,
            password: form.password,
            newPassword: form.newPassword,
          },
        ),
      );
    }
  }, [form, account]);

  const handleChange = ({ target }) => {
    setErrors((prevState) => ({ ...prevState, [target.name]: null }));
    setForm({ [target.name]: target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { name, surname, companyName, email, password, newPassword } = form;

    const isExistsAccount = checkNewEmailOnValidation(account.email, email);

    const checkOldPasswordErrors = () => {
      if (password.length === 0) {
        return newPassword.length === 0 ? null : Errors.oldPassword;
      }
      return isMatchPassword(password, account.password)
        ? null
        : Errors.matchOldPassword;
    };

    const checkNewPasswordErrors = () => {
      if (newPassword.length === 0) {
        return password.length === 0 ? null : Errors.newPassword;
      }
      return isValidPassword(newPassword) ? null : Errors.password;
    };

    const checkedErrors = {
      name: isValidFullName(name) ? null : Errors.fullname,
      surname: isValidFullName(surname) ? null : Errors.fullname,
      companyName: isValidCompanyName(companyName) ? null : Errors.companyName,
      email: isValidEmail(email)
        ? !isExistsAccount
          ? null
          : Errors.accountExists
        : Errors.email,
      password: checkOldPasswordErrors(),
      newPassword: checkNewPasswordErrors(),
    };

    const isNotErrors = haveErrors(checkedErrors);

    if (isNotErrors) {
      const updatedAccount = {
        id: account.id,
        name: form.name,
        surname: form.surname,
        companyName: form.companyName,
        email: form.email,
        password: form.newPassword ? form.newPassword : account.password,
        address: form.address,
      };
      setForm({
        password: '',
        newPassword: '',
      });
      updateAccount(updatedAccount);
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
          name="password"
          label="Enter old password"
          error={Boolean(errors.password)}
          helperText={errors.password}
          onChange={handleChange}
          value={form.password}
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
