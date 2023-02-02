import UserModal from '../models/User.js';

import { Errors } from '../consts/consts.js';

export const loadImage = async (req, res) => {
  try {
    const { file } = req;
    if (!file) {
      return res.json({
        result: Errors.FILE,
      });
    }
    const { userId } = req;

    const updatedUser = await UserModal.findByIdAndUpdate(
      userId,
      {
        urlImg: `http://localhost:4000/uploads/${file.originalname}`,
      },
      { new: true },
    );

    res.json({
      urlImg: updatedUser.urlImg,
    });
  } catch (error) {
    console.log('Load image', error);
    res.status(500).json({ message: Errors.UNKNOWN });
  }
};

export const loadBackgroundImage = async (req, res) => {
  try {
    const { file } = req.body;
    if (!file) {
      return res.json({
        result: Errors.FILE,
      });
    }
    const { userId } = req;

    const updatedUser = await UserModal.findByIdAndUpdate(
      userId,
      {
        urlBackgroundImg: file,
      },
      { new: true },
    );

    res.json({
      urlBackgroundImg: updatedUser.urlBackgroundImg,
    });
  } catch (error) {
    console.log('Load background image', error);
    res.status(500).json({ message: Errors.UNKNOWN });
  }
};
