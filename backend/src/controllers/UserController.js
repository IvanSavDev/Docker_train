import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';

import UserModal from '../models/User.js';
import { Errors, KEY_JWT, TOKEN_LIFESPAN } from '../consts/consts.js';
import { getFormatDate } from '../utils/utils.js';

export const login = async (req, res) => {
  try {
    const user = await UserModal.findOne({ email: req.body.email });

    if (!user) {
      return res.status(401).json({
        message: Errors.Authentication_Error,
      });
    }

    const { _id, name, surname, email, address, passwordHash } = user._doc;

    const isValidPassword = await bcrypt.compare(
      req.body.password,
      passwordHash,
    );

    if (!isValidPassword) {
      return res.status(401).json({
        message: Errors.Authentication_Error,
      });
    }

    const token = jwt.sign(
      {
        _id,
      },
      KEY_JWT,
      { expiresIn: TOKEN_LIFESPAN },
    );

    res.json({ _id, name, surname, email, address, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: Errors.Failed_Authorization });
  }
};

export const registration = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: Errors.Invalid_Data,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);

    const doc = new UserModal({
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
      address: '',
      passwordHash: hash,
    });

    const user = await doc.save();

    const { _id, name, surname, email, address } = user._doc;

    const token = jwt.sign(
      {
        _id,
      },
      KEY_JWT,
      { expiresIn: TOKEN_LIFESPAN },
    );

    res.json({ _id, name, surname, email, address, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: Errors.Failed_Registration });
  }
};

export const updateUser = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: Errors.Not_valid_user,
      });
    }

    const productId = req.params.id;

    const updatedProduct = await UserModal.findByIdAndUpdate(
      productId,
      {
        ...req.body,
      },
      { new: true },
    );

    const {
      _id: id,
      store,
      price,
      name,
      category,
      remains,
      weight,
      createdAt: creationDate,
    } = updatedProduct;

    res.json({
      id,
      store,
      price,
      name,
      category,
      remains,
      weight,
      creationDate: getFormatDate(creationDate),
    });
  } catch (error) {
    console.log('Edit user', error);
    res.status(500).json({ message: Errors.Edit_user });
  }
};
