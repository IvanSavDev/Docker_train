import React, { useState } from "react";

import { useForm } from "../../hooks/useForm";
import useAuth from "../../hooks/useAuth";
import useAccount from "../../hooks/useAccount";
import ContainerSignInAndSignUp from "../../components/ContainerSignInAndSignUp";
import Input from "../../components/Inputs/Input";
import Form from "../../components/Form/Form";
import RouteLink from "../../components/RouteLink/RouteLink";
import StandardButton from "../../components/Buttons/StandardButton";
import {
  isMatchPassword,
  isValidCompanyName,
  isValidEmail,
  isValidFullName,
  isValidPassword,
} from "../../utils/validation";
import { checkExistsAccountByEmail, haveErrors } from "../../utils/utils";
import { Errors, Paths } from "../../consts/consts";

import styles from "./SignUp.module.css";

const SignUp = () => {
  const [errors, setErrors] = useState({
    name: null,
    surname: null,
    companyName: null,
    email: null,
    password: null,
    repeatPassword: null,
    accountExists: null,
  });
  const [form, setForm] = useForm({
    name: "",
    surname: "",
    companyName: "",
    email: "",
    password: "",
    repeatPassword: "",
  });
  const { addAccount } = useAccount();
  const { logIn } = useAuth();

  const handleChange = ({ target }) => {
    setForm({ [target.name]: target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { name, surname, companyName, email, password, repeatPassword } =
      form;

    const isExistsAccount = checkExistsAccountByEmail(email);

    const checkedErrors = {
      name: isValidFullName(name) ? null : Errors.fullname,
      surname: isValidFullName(surname) ? null : Errors.fullname,
      companyName: isValidCompanyName(companyName) ? null : Errors.companyName,
      email: isValidEmail(email) ? null : Errors.email,
      password: isValidPassword(password) ? null : Errors.password,
      repeatPassword: isMatchPassword(password, repeatPassword)
        ? null
        : Errors.matchPassword,
      accountExists: !isExistsAccount ? null : Errors.accountExists,
    };

    const isNotErrors = haveErrors(checkedErrors);

    if (isNotErrors) {
      addAccount({
        name: form.name,
        surname: form.surname,
        companyName: form.companyName,
        email: form.email,
        password: form.password,
        address: "",
      });
      logIn();
    } else {
      setErrors(checkedErrors);
    }
  };

  return (
    <ContainerSignInAndSignUp>
      <Form formName="Create an account" onSubmit={handleSubmit}>
        <div className={styles.containerFullName}>
          <Input
            type="text"
            name="name"
            placeholder="First name"
            titleName="First name"
            error={errors.name}
            onChange={handleChange}
          />
          <Input
            type="text"
            name="surname"
            placeholder="Last name"
            titleName="Last name"
            error={errors.surname}
            onChange={handleChange}
          />
        </div>
        <div className={styles.containerInput}>
          <Input
            type="text"
            name="companyName"
            placeholder="Company name"
            titleName="Company name"
            error={errors.companyName}
            onChange={handleChange}
          />
        </div>
        <div className={styles.containerInput}>
          <Input
            type="text"
            name="email"
            placeholder="Email"
            titleName="Email"
            error={errors.email}
            onChange={handleChange}
          />
        </div>
        <div className={styles.containerInput}>
          <Input
            type="password"
            name="password"
            placeholder="Enter password"
            titleName="Password"
            error={errors.password}
            onChange={handleChange}
          />
        </div>
        <div className={styles.containerPassword}>
          <Input
            type="password"
            name="repeatPassword"
            placeholder="Repeat password"
            titleName="Repeat password"
            error={errors.repeatPassword}
            onChange={handleChange}
          />
        </div>
        <div className={styles.containerError}>
          {errors.accountExists && (
            <p className={styles.accountExists}>Account already exist</p>
          )}
        </div>
        <StandardButton type="submit" sx={{ marginBottom: "32px" }} fullWidth>
          Create account
        </StandardButton>
      </Form>
      <div>
        <span className={styles.alreadyHaveAccount}>
          Already have an account?{" "}
        </span>
        <RouteLink to={Paths.signIn}>Log in</RouteLink>
      </div>
    </ContainerSignInAndSignUp>
  );
};

export default SignUp;
