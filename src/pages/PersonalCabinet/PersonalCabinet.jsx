import React, { useEffect, useLayoutEffect, useState } from "react";

import Header from "../../components/Header/Header";
import Input from "../../components/Inputs/Input";
import Button from "../../components/Buttons/Button";

import {
  getDataFromLocalStorage,
  setDataInLocalStorage,
} from "../../utils/localStorage";
import { Errors, KeysLocalStorage } from "../../consts/consts";
import { useForm } from "../../hooks/useForm";
import {
  isMatchPassword,
  isValidCompanyName,
  isValidEmail,
  isValidFullName,
  isValidPassword,
} from "../../utils/validation";
import {
  checkNewEmailOnValidation,
  haveErrors,
  isDifferencesWithOldAccount,
} from "../../utils/utils";

import styles from "./PersonalCabinet.module.css";
import useAccounts from "../../hooks/useAccounts";
import useAccount from "../../hooks/useAccount";

const initialStateForm = {
  name: "",
  surname: "",
  companyName: "",
  email: "",
  password: "",
  newPassword: "",
  address: "",
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
  }, [setForm]);

  useEffect(() => {
    setDisabledButton(
      isDifferencesWithOldAccount(
        {
          name: account.name,
          surname: account.surname,
          companyName: account.companyName,
          email: account.email,
          address: account.address,
          password: "",
          newPassword: "",
        },
        {
          name: form.name,
          surname: form.surname,
          companyName: form.companyName,
          email: form.email,
          address: form.address,
          password: form.password,
          newPassword: form.newPassword,
        }
      )
    );
  }, [form, account]);

  const handleChange = ({ target }) => setForm({ [target.name]: target.value });

  const handleSubmit = (event) => {
    event.preventDefault();
    const { name, surname, companyName, email, password, newPassword } = form;

    const isExistsAccount = checkNewEmailOnValidation(account.email, email);

    const checkedErrors = {
      name: isValidFullName(name) ? null : Errors.fullname,
      surname: isValidFullName(surname) ? null : Errors.fullname,
      companyName: isValidCompanyName(companyName) ? null : Errors.companyName,
      email: isValidEmail(email)
        ? !isExistsAccount
          ? null
          : Errors.accountExists
        : Errors.email,
      password:
        isMatchPassword(password, account.password) || password.length === 0
          ? null
          : Errors.matchOldPassword,
      newPassword:
        isValidPassword(newPassword) || password.length === 0
          ? null
          : Errors.password,
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
        password: "",
        newPassword: "",
      });
      updateAccount(updatedAccount);
    }

    setErrors(checkedErrors);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Header
        title="Personal Cabinet"
        description="Information about your account"
      />
      <div className={styles.container}>
        <Input
          name="name"
          type="text"
          titleName="First name"
          placeholder="First name"
          containerStyles={styles.name}
          value={form.name}
          error={errors.name}
          onChange={handleChange}
        />
        <Input
          name="surname"
          type="text"
          titleName="Last name"
          placeholder="Last name"
          containerStyles={styles.surname}
          value={form.surname}
          error={errors.surname}
          onChange={handleChange}
        />
        <Input
          name="companyName"
          type="text"
          titleName="Company name"
          placeholder="Company name"
          containerStyles={styles.companyName}
          value={form.companyName}
          error={errors.companyName}
          onChange={handleChange}
        />
        <Input
          name="email"
          type="text"
          titleName="Email"
          placeholder="Email"
          containerStyles={styles.email}
          value={form.email}
          error={errors.email}
          onChange={handleChange}
        />
        <Input
          name="address"
          type="text"
          titleName="Address"
          placeholder="Enter your address"
          containerStyles={styles.address}
          value={form.address}
          onChange={handleChange}
        />
        <Input
          name="password"
          type="password"
          titleName="Enter old password"
          placeholder="Enter old password"
          containerStyles={styles.oldPassword}
          value={form.password}
          error={errors.password}
          onChange={handleChange}
        />
        <Input
          name="newPassword"
          type="password"
          titleName="Enter a new password"
          placeholder="Enter a new password"
          containerStyles={styles.newPassword}
          value={form.newPassword}
          error={errors.newPassword}
          onChange={handleChange}
        />
      </div>
      <Button type="submit" disabled={disabledButton}>
        Save changes
      </Button>
    </form>
  );
};

export default PersonalCabinet;
