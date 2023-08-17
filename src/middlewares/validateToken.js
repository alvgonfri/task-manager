import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";
import { TOKEN } from "../controllers/AuthController.js";

export const authRequired = (req, res, next) => {
  const token = TOKEN;

  if (!token)
    return res.status(401).json({ message: "No token, authorization denied" });

  jwt.verify(token, TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Token is not valid" });
    req.user = decoded;
    next();
  });
};
