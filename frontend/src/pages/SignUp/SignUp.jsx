import React, { useState } from 'react';
import axios from 'axios';

import ContainerSignInAndSignUp from '../../components/Containers/ContainerSignInAndSignUp';
import Form from '../../components/Form/Form';
import RouteLink from '../../components/RouteLink/RouteLink';
import Input from '../../components/Inputs/Input';
import StandardButton from '../../components/Buttons/StandardButton';

import { haveErrors, trimObjectValues } from '../../utils/utils';
import { notifyRegistrationErrors } from '../../utils/notifyErrors';
import { registrationValidation } from '../../validations/registrationValidation';
import useForm from '../../hooks/useForm';
import useAuth from '../../hooks/useAuth';
import {
  KeysLocalStorage,
  Paths,
  Routes,
  SERVER_ROUTE,
} from '../../consts/consts';

import styles from './SignUp.module.css';

const initialStateErrors = {
  name: null,
  surname: null,
  companyName: null,
  email: null,
  password: null,
  confirmPassword: null,
};

const SignUp = () => {
  const [errors, setErrors] = useState({ ...initialStateErrors });
  const [form, setForm] = useForm({
    name: '',
    surname: '',
    companyName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const { logIn } = useAuth();

  const handleChange = ({ target }) => {
    setErrors((prevState) => ({ ...prevState, [target.name]: null }));
    setForm({ [target.name]: target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedForm = trimObjectValues(form);
    const validationResult = registrationValidation(updatedForm);
    const isNotErrors = haveErrors(validationResult);

    if (isNotErrors) {
      try {
        setErrors({ ...initialStateErrors });
        const response = await axios.post(
          `${SERVER_ROUTE}${Routes.REGISTRATION}`,
          updatedForm,
        );
        localStorage.setItem(KeysLocalStorage.TOKEN, response.data.token);
        logIn();
      } catch (error) {
        notifyRegistrationErrors(error, setErrors);
      }
    } else {
      setErrors(validationResult);
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
          name="confirmPassword"
          label="Repeat password"
          error={Boolean(errors.confirmPassword)}
          helperText={errors.confirmPassword}
          onChange={handleChange}
          value={form.confirmPassword}
        />
        <StandardButton type="submit" sx={{ marginBottom: '32px' }} fullWidth>
          Create account
        </StandardButton>
      </Form>
      <div>
        <span className={styles.alreadyHaveAccount}>
          Already have an account?{' '}
        </span>
        <RouteLink to={Paths.SIGN_IN}>Log in</RouteLink>
      </div>
    </ContainerSignInAndSignUp>
  );
};

export default SignUp;
