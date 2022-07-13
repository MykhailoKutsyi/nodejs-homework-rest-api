const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User } = require("../../models/user");

const { createError } = require("../../helpers");

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw createError(401, "Email not found");
  }

  const checkPassword = await bcrypt.compare(password, user.password);
  if (!checkPassword) {
    throw createError(401, "Password wrong");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    token,
  });
  function foo(a) {
    let returnValue = "";
    try {
      if (a === "bar") {
        throw new Error("qux");
      }
      returnValue = "try";
      console.log(returnValue);
    } catch (error) {
      returnValue = "catch";
      console.log(returnValue);
    } finally {
      return (returnValue = "finally");
      //   console.log(returnValue);
    }
    return returnValue;
  }
  console.log(foo("bar"));
  console.log(foo("zzz"));
};

module.exports = login;
