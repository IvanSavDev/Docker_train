import React, { useState } from 'react';

import useProducts from '../../hooks/useProducts';
import useSales from '../../hooks/useSales';
import useForm from '../../hooks/useForm';
import useAuth from '../../hooks/useAuth';
import useAccount from '../../hooks/useAccount';
import ContainerSignInAndSignUp from '../../components/Containers/ContainerSignInAndSignUp';
import Form from '../../components/Form/Form';
import RouteLink from '../../components/RouteLink/RouteLink';
import Input from '../../components/Inputs/Input';
import StandardButton from '../../components/Buttons/StandardButton';
import {
  isMatchPassword,
  isValidCompanyName,
  isValidEmail,
  isValidFullName,
  isValidPassword,
} from '../../utils/validation';
import { checkExistsAccountByEmail, haveErrors } from '../../utils/utils';
import { Errors, Paths } from '../../consts/consts';

import styles from './SignUp.module.css';

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
    name: '',
    surname: '',
    companyName: '',
    email: '',
    password: '',
    repeatPassword: '',
  });
  const { addAccount } = useAccount();
  const { updateProducts } = useProducts();
  const { updateSales } = useSales();
  const { loadAccountFromLocalStorage } = useAccount();
  const { logIn } = useAuth();

  const handleChange = ({ target }) => {
    setErrors((prevState) => ({ ...prevState, [target.name]: null }));
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
        address: '',
      });
      updateProducts();
      updateSales();
      loadAccountFromLocalStorage();
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
            name="name"
            label="First name"
            error={Boolean(errors.name)}
            helperText={errors.name}
            onChange={handleChange}
            value={form.name}
          />
          <Input
            name="surname"
            label="Second name"
            error={Boolean(errors.surname)}
            helperText={errors.surname}
            onChange={handleChange}
            value={form.surname}
          />
        </div>
        <Input
          name="companyName"
          label="Company name"
          error={Boolean(errors.companyName)}
          helperText={errors.companyName}
          onChange={handleChange}
          value={form.companyName}
        />
        <Input
          name="email"
          label="Email"
          error={Boolean(errors.email)}
          helperText={errors.email}
          onChange={handleChange}
          value={form.email}
        />
        <Input
          type="password"
          name="password"
          label="Enter password"
          error={Boolean(errors.password)}
          helperText={errors.password}
          onChange={handleChange}
          value={form.password}
        />
        <Input
          type="password"
          name="repeatPassword"
          label="Repeat password"
          error={Boolean(errors.repeatPassword)}
          helperText={errors.repeatPassword}
          onChange={handleChange}
          value={form.repeatPassword}
        />
        <div className={styles.containerError}>
          {errors.accountExists && (
            <p className={styles.accountExists}>Account already exist</p>
          )}
        </div>
        <StandardButton type="submit" sx={{ marginBottom: '32px' }} fullWidth>
          Create account
        </StandardButton>
      </Form>
      <div>
        <span className={styles.alreadyHaveAccount}>
          Already have an account?{' '}
        </span>
        <RouteLink to={Paths.signIn}>Log in</RouteLink>
      </div>
    </ContainerSignInAndSignUp>
  );
};

export default SignUp;
