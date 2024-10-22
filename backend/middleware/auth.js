const jwt = require("jsonwebtoken");

exports.auth = async (req, res, next) => {
  try {
    const token =
      req.cookies.jwtToken ||
      req.body.token ||
      req.header("Authorization").replace("Bearer ", "");

    if (!token) {
      return res.status(404).json({
        success: false,
        message: "JWT token is missing",
      });
    }

    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = decode;
    } catch (err) {
      return res.status(402).json({
        success: false,
        message: "Error occured while verifying jwt token",
      });
    }
    next();
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Error occured while authenticating user",
      error: err.message,
    });
  }
};
