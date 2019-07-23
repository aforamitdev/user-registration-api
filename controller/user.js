const User = require("../models/User");
const { userValidSchema } = require("../validation/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userRegister = async (req, res) => {
  //validation
  const { error } = userValidSchema(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  // validation ends
  const { name, email, password } = req.body;
  //    if user in allready in database
  const Emailexist = await User.findOne({ email: email });
  if (Emailexist)
    return res.status(400).json({ message: "User Exist,Please Login" });

  //   encrypting password

  const salt = await bcrypt.genSalt(10);
  const hashpassword = await bcrypt.hash(password, salt);

  const user = new User({
    name: name,
    email: email,
    password: hashpassword
  });

  try {
    const saveUser = await user.save();
    res.send(saveUser);
  } catch (err) {
    res.status(400).send(err);
  }
};

// login

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user)
    return res
      .status(400)
      .json({ message: "Email doesent exist, please register" });

  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass)
    return res.status(400).json({ error: "email and password missmatch" });

  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRATE);
  res.header("auth-token", token).send(token);
};

module.exports = {
  userRegister,
  login
};
