import cookieParser from 'cookie-parser';
import express from 'express';
import Account from '../models/account.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import auth from '../middlewear/auth';

var router = express.Router();

var app = express();
app.use(cookieParser());

router.post('/register', async(req,res) => {

  try {
    // Get user input
    const { name, surname, email, password, dateofbirth } = req.body;
    // check if user already exist
    // Validate if user exist in our database
    const exists = await Account.findOne({ email });

    if (exists) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    //Encrypt user password
    const encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database 
    const newAccount = await Account.create({
      name,
      surname,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
      dateofbirth,
    });

    // Create token
    const token = jwt.sign(
      { user_id: newAccount._id, email },
      process.env.SECRET_KEY,
      {
        expiresIn: "2h",
      }
    );
    // save user token
    newAccount.token = token;
    return res
      .cookie("access_token", token, {
        secure: process.env.NODE_ENV === "production"
      })
      .status(201)
      .json(newAccount);
  } catch (err) {
    console.log(err);
  }
});

router.post('/login', async (req, res) => {
  
  try {
    const user = await Account.findOne({ $or: [ {email: req.body.email} ] })

    if (!user) {
      return res.status(204).send("User not found!");
    }
    const validPass = await bcrypt.compare(req.body.pass, user.password);
    if (user && validPass) {
      const token = jwt.sign(
        { user_id: user._id, email: user.email },
        process.env.SECRET_KEY,
        {
          expiresIn: "2h",
        }
      );
      user.token = token;
      return res
        .cookie("access_token",token, {
          secure: process.env.NODE_ENV === "production"
        })
        .status(200)
        .json(user);
    } else {
      res.status(202).json("Incorrect Password!" );
    }
  } catch (e) {
    console.log(e); 
    return res.status(500).send()
  }
})

router.get('/home', auth, (req,res) => {
  try {
    res.status(200).send("Welcome cunt");
  } catch(e) {
    return res.status(401);
  }
  
})

router.get('/logout', auth, (req,res) => {
  try{
    return res
    .clearCookie("access_token")
    .status(200)
    .json("Successfully logged out 😏 🍀")
  }catch (e) {
    return res
    .status(404)
    .json(err);
  }
  
});

router.post('/edit', auth, async(req,res) => {

  try {
    //Get updated user credentials from front
    const {name, surname, email, dob} = req.body;
    //Search database by email for existing user
    const user = await Account.findOne({ $or: [ {email: req.headers.email} ] })
    if (user.email !== email){
      const emailExists = await Account.findOne({ $or: [ {email: email} ] })
      if (emailExists) {
        return res
        .status(409)
        .json("Email already in use!");
      }
    };
    if (name === null|| surname === null || email === null || dob === null ) {
      return res
      .status(401)
      .send("Credentials cannot be empty");
    }else {
      user.name = name;
      user.surname = surname;
      user.email = email;
      user.dateofbirth = dob;
      await user.save();
      return res
      .status(201)
      .send(user);
    }
  }catch(err) {
    return res.json(err);
  }

});

export default router;