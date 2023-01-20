import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

import useForm from '../../hooks/useForm';
import useAuth from '../../hooks/useAuth';
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
import { formatErrors, haveErrors } from '../../utils/utils';
import {
  Errors,
  FetchErrors,
  KeysLocalStorage,
  PasswordErrors,
  Paths,
  Routes,
} from '../../consts/consts';

import styles from './SignUp.module.css';

const checkErrors = (form) => {
  const { name, surname, companyName, email, password, confirmPassword } = form;

  return {
    name: isValidFullName(name) ? null : Errors.FULL_NAME,
    surname: isValidFullName(surname) ? null : Errors.FULL_NAME,
    companyName: isValidCompanyName(companyName) ? null : Errors.COMPANY_NAME,
    email: isValidEmail(email) ? null : Errors.EMAIL,
    password: isValidPassword(password)
      ? null
      : PasswordErrors.INVALID_PASSWORD,
    confirmPassword: isMatchPassword(password, confirmPassword)
      ? null
      : PasswordErrors.MATCH_PASSWORD,
  };
};

const initialStateErrors = {
  name: null,
  surname: null,
  companyName: null,
  email: null,
  password: null,
  confirmPassword: null,
};

const initialStateForm = {
  name: '',
  surname: '',
  companyName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUp = () => {
  const [errors, setErrors] = useState(initialStateErrors);
  const [form, setForm] = useForm(initialStateForm);
  const { logIn } = useAuth();

  const handleChange = ({ target }) => {
    setErrors((prevState) => ({ ...prevState, [target.name]: null }));
    setForm({ [target.name]: target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { name, surname, companyName, email, password, confirmPassword } =
      form;
    const checkedErrors = checkErrors(form);
    const isNotErrors = haveErrors(checkedErrors);

    if (isNotErrors) {
      try {
        setErrors(initialStateErrors);
        const response = await axios.post(
          `http://localhost:4000/${Routes.REGISTRATION}`,
          {
            name,
            surname,
            companyName,
            email,
            password,
            confirmPassword,
          },
        );
        localStorage.setItem(KeysLocalStorage.TOKEN, response.data.token);
        logIn();
      } catch (error) {
        const errorsInfo = error.response.data.errors;
        if (
          error.name === 'AxiosError' &&
          error.response.status === 400 &&
          errorsInfo
        ) {
          const formattedErrors = formatErrors(errorsInfo);
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
