const User = require("../models/User");
const { userValidSchema } = require("../validation/user");
const userRegister = async (req, res) => {
  //validation
  const { error } = userValidSchema(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  // validation ends
  const { name, email, password } = req.body;
  const user = new User({
    name: name,
    email: email,
    password: password
  });

  try {
    const saveUser = await user.save();
    res.send(saveUser);
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports = {
  userRegister
};
