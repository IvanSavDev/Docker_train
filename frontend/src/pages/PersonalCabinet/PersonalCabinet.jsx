import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';

import Header from '../../components/Header/Header';
import StandardButton from '../../components/Buttons/StandardButton';
import CenteringContainer from '../../components/Containers/CenteringContainer';
import Input from '../../components/Inputs/Input';

import {
  getChangedFields,
  haveErrors,
  isDifferentFields,
  isEmptyObject,
  trimObjectValues,
} from '../../utils/utils';
import { notifyFormsErrors, notifyPageErrors } from '../../utils/notifyErrors';
import { userValidation } from '../../validations/userValidation';
import useForm from '../../hooks/useForm';
import { Statuses } from '../../consts/consts';
import { getUser, updateUser } from '../../store/slices/userSlice';

import styles from './PersonalCabinet.module.css';

const initialStateErrors = {
  name: null,
  surname: null,
  companyName: null,
  email: null,
  oldPassword: null,
  newPassword: null,
};

const PersonalCabinet = () => {
  const { user, status } = useSelector((state) => state.user);
  const [form, setForm] = useForm({
    name: '',
    surname: '',
    companyName: '',
    email: '',
    oldPassword: '',
    newPassword: '',
    address: '',
  });
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
    const validationResult = userValidation(form);
    const isNotErrors = haveErrors(validationResult);

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
        notifyFormsErrors(error, setErrors);
      }
    } else {
      setErrors(validationResult);
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
