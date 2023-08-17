import User from "../models/user.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export let TOKEN = "";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
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
    res.header("Authorization", token);
    TOKEN = token;
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
  const { username, password } = req.body;

  try {
    const userFound = await User.findOne({ username });
    if (!userFound) return res.status(400).json(["User not found"]);

    const matchPassword = await bcrypt.compare(password, userFound.password);
    if (!matchPassword) return res.status(400).json(["Incorrect password"]);

    const token = await createAccessToken({ id: userFound._id });
    res.header("Authorization", token);
    TOKEN = token;
    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
      token: token,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const logout = (req, res) => {
  res.header("Authorization", "");
  TOKEN = "";
  return res.sendStatus(200);
};

export const verifyToken = (req, res) => {
  const token = TOKEN;
  console.log("11111111");
  if (!token) return res.status(401).json({ message: "Unauthorized a" });

  console.log("2222222222");
  jwt.verify(token, TOKEN_SECRET, (err, user) => {
    console.log("333333333333");
    if (err) return res.status(401).json({ message: "Unauthorized b" });

    const userFound = User.findById(user.id);
    console.log("4444444444444");
    if (!userFound) return res.status(401).json({ message: "Unauthorized c" });
    console.log("yyyyyyyyyyyyy");
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
