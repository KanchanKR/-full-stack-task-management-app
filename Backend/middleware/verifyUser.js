import jwt from "jsonwebtoken";
import { createError } from "../error.js";

export const verifyToken = async (req, res, next) => {
  try {
    // Log the headers to check if the Authorization header exists
    console.log("Headers:", req.headers);

    if (!req.headers.authorization) {
      return next(createError(401, "You are not authenticated!"));
    }
    const token = req.headers.authorization.split(" ")[1];


    // Log the extracted token
    console.log("Token:", token);

    if (!token) return next(createError(401, "You are not authenticated!"));
    
    const decode = jwt.verify(token, process.env.JWT);
    
    req.user = decode;
    return next();
  } catch (err) {
    // Log error for debugging
    console.error("Token verification failed:", err);
    next(err);
  }
};
