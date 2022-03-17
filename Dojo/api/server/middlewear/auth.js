import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import express from 'express';  

var app = express();
app.use(cookieParser());

const config = process.env;

const verifyToken = (req, res, next) => {
  
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, config.SECRET_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

export default verifyToken;