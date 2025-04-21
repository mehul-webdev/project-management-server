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

module.exports = {
  getUsers,
};
