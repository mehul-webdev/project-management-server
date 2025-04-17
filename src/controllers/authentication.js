const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../schemas/usersSchema");

async function handlePasswordHashing(password) {
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  return hashPassword;
}

async function handleCheckPassword(hashedPassword, userPassword) {
  const validatePassword = await bcrypt.compare(userPassword, hashedPassword);
  return validatePassword;
}

const handleCreateJWTToken = (user) => {
  const jwtToken = jwt.sign(
    { name: user.name, email: user.email, id: user._id },
    process.env.PRIVATE_KEY,
    { expiresIn: "7d" }
  );

  return jwtToken;
};

const handleSignUp = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      return res.status(409).json({
        message: "User already exist",
      });
    }

    const hashedPassword = await handlePasswordHashing(password);

    const createUser = await User.create({
      email,
      password: hashedPassword,
      name,
    });

    res.status(200).json({
      message: "User Added Successfully",
      user: createUser,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || "Internal server error",
    });
  }
};

const handleSignIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found. Please register",
      });
    }

    const isUserPasswordValid = await handleCheckPassword(
      user.password,
      password
    );

    if (!isUserPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Incorrect Credentials",
      });
    }

    const jwtToken = handleCreateJWTToken(user);

    res.cookie("access_token", jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    res.status(200).json({
      message: "Login Successful",
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || "Internal server error",
    });
  }
};

const handleUserLogout = (req, res) => {
  res.clearCookie("access_token").json({
    success: true,
    message: "Logout",
  });
};

const handleLoginStatus = async (req, res) => {
  res.status(200).json({
    isLoggedIn: true,
    user: req.user,
  });
};

module.exports = {
  handleSignUp,
  handleSignIn,
  handleLoginStatus,
  handleUserLogout,
};
