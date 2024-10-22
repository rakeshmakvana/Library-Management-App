const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  try {
    const { username, email, password, confirmPassword, role } = req.body;

    if (!username || !email || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Fill all details",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return res.status(400).json({
        success: false,
        message: "User already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userEntry = new User({
      username,
      email,
      password: hashedPassword,
      role,
    });

    await userEntry.save();

    return res.status(200).json({
      success: true,
      message: "User signed up successfully",
      user: userEntry,
    });
  } catch (err) {
    console.error("Error in user signup:", err);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(404).json({
        success: false,
        message: "Please fill all fields while login",
      });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(402).json({
        success: false,
        message: `Unable to find user registered with ${email}`,
      });
    }

    if (await bcrypt.compare(password, user.password)) {
      const payload = {
        email: user.email,
        id: user._id,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: "2h",
      });

      user.password = undefined;
      user.token = token;

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.cookie("jwtToken", token, options).json({
        success: true,
        token: token,
        user: user,
        message: "User logged in successfully",
      });
    } else {
      return res.status(402).json({
        success: false,
        message: "Incorrect password",
      });
    }
  } catch (err) {
    console.log(err);

    return res.status(501).json({
      success: false,
      message: "Unable to logged in",
      error: err.message,
    });
  }
};
