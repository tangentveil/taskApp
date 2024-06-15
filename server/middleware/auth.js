import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({ message: "Authorization header missing" });
    }

    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Authorization token missing" });
    }

    try {
      const data = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = data?.id;
    } catch (error) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    next();
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Server error" });
  }
};

export default auth;
