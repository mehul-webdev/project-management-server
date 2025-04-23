const User = require("../schemas/usersSchema");

const getUsers = async (req, res, next) => {
  try {
    const { email } = req?.query;

    const users = await User.find(
      email ? { email: { $regex: `^${email}`, $options: "i" } } : {}
    ).select("-password");

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (err) {
    res.status(500);
    next(err);
  }
};

const checkUserExists = async (req, res, next) => {
  try {
    const { email } = req?.params;

    const user = await User.findOne({ email });

    res.status(200).json({
      message: "success",
      isExists: user ? true : false,
      message: user ? "User Exists" : "User Not Registered",
      id: user ? user._id : "",
    });
  } catch (err) {
    res.status(500);
    next(err);
  }
};

module.exports = {
  getUsers,
  checkUserExists,
};
