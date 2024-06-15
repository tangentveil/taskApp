import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import User from "../models/User.js";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const exisitingUser = await User.findOne({ email });

    if (exisitingUser) {
      return res.status(404).json({ message: "User already Exist." });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json("Something went wrong...");
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User don't Exist." });
    }

    const isPasswordCrt = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCrt) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json("Something went wrong...");
  }
};
