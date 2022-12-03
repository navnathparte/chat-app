import UserModel from "../Models/userModel.js";
import constant from "../constants.js";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { username } = req.body;
    const newUser = new UserModel(req.body)
    const userData = await UserModel.find({ username });

    if (userData.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await newUser.save();
    const token = jwt.sign(
      { username: user.username, id: user._id },
      constant.JWTKEY,
      { expiresIn: "1h" }
    );

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
