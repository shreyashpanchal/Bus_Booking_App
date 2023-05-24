const User = require("../../models/usersModel");

const deleteUser = async (req, res) => {
  try {
    const userId = req.body.userId;
    await User.findByIdAndDelete(userId);
    res.send({
      message: "Deleted user successfully",
      success: true,
      data: null,
    });
  } catch (err) {
    res.send({
      message: "Cannot delete profile",
      success: false,
      data: null,
    });
  }
};

module.exports = deleteUser;
