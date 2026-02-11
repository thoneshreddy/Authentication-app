import User from "../models/User.js";

/* GET ALL USERS */
export const getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

/* UPDATE USER ROLE */
export const updateUserRole = async (req, res) => {
  const { role } = req.body;
  const { id } = req.params;

  if (!["USER", "ADMIN"].includes(role)) {
    return res.status(400).json({ message: "Invalid role" });
  }

  const user = await User.findByIdAndUpdate(
    id,
    { role },
    { new: true }
  ).select("-password");

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
};


/* DELETE USER */
export const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
};
