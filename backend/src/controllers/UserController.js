import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import UserModal from '../models/User.js';

import {
  Errors,
  KEY_JWT,
  SALT_ROUNDS,
  TOKEN_LIFESPAN,
  UserErrors,
} from '../consts/consts.js';

export const login = async (req, res) => {
  try {
    const user = await UserModal.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        errors: [
          {
            parameter: 'invalidAccount',
            message: Errors.FAILED_AUTHENTICATION,
          },
        ],
      });
    }

    const { _id, passwordHash } = user;

    const isValidPassword = await bcrypt.compare(
      req.body.password,
      passwordHash,
    );

    if (!isValidPassword) {
      return res.status(404).json({
        errors: [
          {
            parameter: 'invalidAccount',
            message: Errors.FAILED_AUTHENTICATION,
          },
        ],
      });
    }

    const token = jwt.sign(
      {
        _id,
      },
      KEY_JWT,
      { expiresIn: TOKEN_LIFESPAN },
    );

    res.json({ token });
  } catch (error) {
    console.log('Login', error);
    res.status(500).json({ message: Errors.FAILED_AUTHENTICATION });
  }
};

export const registration = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hash = await bcrypt.hash(req.body.password, salt);

    const doc = new UserModal({
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
      companyName: req.body.companyName,
      address: '',
      passwordHash: hash,
    });

    const user = await doc.save();

    const { _id } = user;

    const token = jwt.sign(
      {
        _id,
      },
      KEY_JWT,
      { expiresIn: TOKEN_LIFESPAN },
    );

    res.json({ token });
  } catch (error) {
    console.log('Registration', error);
    res.status(500).json({ message: Errors.FAILED_REGISTRATION });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { userId } = req;
    const { newPassword, ...rest } = req.body;

    let hash;

    if (newPassword) {
      const salt = await bcrypt.genSalt(SALT_ROUNDS);
      hash = await bcrypt.hash(newPassword, salt);
    }

    const updatedUser = await UserModal.findByIdAndUpdate(
      userId,
      {
        ...rest,
        passwordHash: hash,
      },
      { new: true },
    );

    const { name, surname, companyName, email, address } = updatedUser;

    res.json({
      name,
      surname,
      companyName,
      email,
      address,
    });
  } catch (error) {
    console.log('Update user', error);
    res.status(500).json({ message: UserErrors.UPDATE_USER });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await UserModal.findOne({ _id: req.userId });

    if (!user) {
      return res.status(404).json({
        message: Errors.FAILED_AUTHENTICATION,
      });
    }

    const {
      name,
      surname,
      email,
      companyName,
      address,
      urlImg,
      urlBackgroundImg,
    } = user;

    res.json({
      name,
      surname,
      companyName,
      email,
      address,
      urlImg,
      urlBackgroundImg,
    });
  } catch (error) {
    console.log('Get user', error);
    res.status(500).json({ message: UserErrors.GET_USER });
  }
};
