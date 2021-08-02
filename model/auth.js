const service = require('../service/');
const jwt = require('jsonwebtoken');
const path = require('path');
const fsAsync = require('fs/promises');
const fs = require('fs');
const { v4 } = require('uuid');
const Jimp = require('jimp');
require('dotenv').config();

const signup = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const result = await service.user.getOne({ email });
    if (result) {
      return res.status(409).json({
        status: 'error',
        code: 409,
        message: 'Email in use',
      });
    }
    const newUser = await service.user.add({ email, password });
    res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        user: {
          email: newUser.email,
          subscription: newUser.subscription,
          avatarURL: newUser.avatarURL,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await service.user.getOne({ email });
    if (!user || !user.comparePassword(password)) {
      return res.status(401).json({
        status: 'error',
        code: 401,
        message: 'Email or password is wrong',
      });
    }

    const { SECRET_KEY } = process.env;
    const payload = { id: user._id };
    const token = jwt.sign(payload, SECRET_KEY);
    await service.user.updateById(user._id, { token });

    res.status(200).json({
      status: 'success',
      code: 200,
      data: {
        token: token,
        user: {
          email: user.email,
          subscription: user.subscription,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  const id = req.user._id;
  try {
    await service.user.updateById(id, { token: null });
    res.status(204).json({
      status: 'success',
      code: 204,
      message: 'No Content',
    });
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  const { email, subscription } = req.user;
  res.json({
    status: 'success',
    code: 200,
    data: {
      email,
      subscription,
    },
  });
};

// const updateAvatar = async (req, res, next) => {
//   const { path: tempName, originalname } = req.file;

//   try {
//     const image = await Jimp.read(tempName);

//     await image.resize(256, 256).write(tempName);
//   } catch (error) {
//     console.log(error);
//   }

//   const uploadDir = path.join(process.cwd(), 'public/avatars');
//   const { id, avatarURL } = req.user;
//   const userDirectory = path.join(uploadDir, id);

//   try {
//     const avatarId = v4();
//     await fs.mkdir(userDirectory);

//     const fileName = path.join(userDirectory, `${avatarId}_${originalname}`);

//     fs.rename(tempName, fileName);

//     await service.user.updateById(id, { avatarURL: fileName });

//     res.status(200).json({
//       status: 'success',
//       code: 200,
//       data: {
//         avatarURL,
//       },
//     });
//   } catch (error) {
//     fs.unlink(tempName);
//     next(error);
//   }
// };

const updateAvatar = async (req, res, next) => {
  const { id, avatarURL } = req.user;
  const avatarId = v4();
  const { path: tempName, originalname } = req.file;
  const uploadDir = path.join(process.cwd(), 'public/avatars');
  const userDirectory = path.join(uploadDir, id);
  const newNameAvatar = `${avatarId}_${originalname}`;
  const fileName = path.join(userDirectory, newNameAvatar);

  function createDir() {
    if (!fs.existsSync(userDirectory)) {
      fsAsync.mkdir(userDirectory);
    }
  }

  async function prepareAvatar() {
    const image = await Jimp.read(tempName);
    await image.resize(256, 256).write(tempName);
    saveImage();
  }

  async function saveImage() {
    return await fsAsync.rename(tempName, fileName);
  }

  async function removeAvatar() {
    if (fs.existsSync(avatarURL)) {
      await fsAsync.unlink(avatarURL);
    }
  }
  createDir();
  prepareAvatar();
  removeAvatar();
  try {
    await service.user.updateById(id, { avatarURL: fileName });

    res.status(200).json({
      status: 'success',
      code: 200,
      data: {
        avatarURL: fileName,
      },
    });
  } catch (error) {
    fsAsync.unlink(tempName);
    next(error);
  }
};

module.exports = {
  signup,
  login,
  logout,
  getUser,
  updateAvatar,
};
