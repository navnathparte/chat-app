import UserModel from "../Models/userModel.js";
import constant from "../constants.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Register New User
export const registerUser = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
    const { username } = req.body;
    const newUser = new UserModel(req.body);
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

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// login user
export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await UserModel.findOne({ username: username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const validate = await bcrypt.compare(password, user.password);
    if (!validate) {
      return res.status(400).json("Invalid password");
    }
    const token = jwt.sign(
      { username: user.username, id: user._id },
      constant.JWTKEY,
      { expiresIn: "1h" }
    );
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
