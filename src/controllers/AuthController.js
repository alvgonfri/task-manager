import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";
import { createAccessToken } from "../libs/jwt.js";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const userFoundByUsername = await User.findOne({ username });
    const userFoundByEmail = await User.findOne({ email });

    if (userFoundByUsername)
      return res.status(400).json(["Username already exists"]);
    if (userFoundByEmail) return res.status(400).json(["Email already exists"]);

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: passwordHash,
    });
    const userSaved = await newUser.save();
    const token = await createAccessToken({ id: userSaved._id });
    res.cookie("token", token, {
      secure: true,
      sameSite: "none",
    });
    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const userFound = await User.findOne({ username });
    if (!userFound) return res.status(400).json(["User not found"]);

    const matchPassword = await bcrypt.compare(password, userFound.password);
    if (!matchPassword) return res.status(400).json(["Incorrect password"]);

    const token = await createAccessToken({
      id: userFound._id,
      username: userFound.username,
    });
    res.cookie("token", token, {
      secure: true,
      sameSite: "none",
    });
    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const logout = async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: true,
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;
  console.log(token);
  if (!token) return res.send(false);

  jwt.verify(token, TOKEN_SECRET, async (error, user) => {
    if (error) return res.sendStatus(401);

    const userFound = await User.findById(user.id);
    if (!userFound) return res.sendStatus(401);

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
  });
};

export const getProfile = async (req, res) => {
  const userFound = await User.findById(req.user.id);

  if (!userFound) return res.status(400).json(["User not found"]);

  return res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt,
  });
};
