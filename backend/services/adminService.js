const User = require("../models/User");


exports.fetchUser = async () => {
  const users = await User.find();
  return users;
};

exports.addUser = async ({ name, email, password, role = "user" }) => {
  const userExists = await User.findOne({ email });
  if (userExists) throw new Error("User already exists");

  const user = await User.create({ name, email, password, role });
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
};

exports.deleteUser = async (id) => {
  const user = await User.findById(id);
  if (!user) throw new Error("User not found");
  await user.deleteOne();
  return { message: "User deleted" };
};