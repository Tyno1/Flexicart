const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  // Get token from request header
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    
    return res
      .status(401)
      .json({ message: "No authorization header found", status: 401 });
  }

  const token = req.header("Authorization").split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: "No token, authorization denied", status: 401 });
  }

  try {
    // Verify token
    console.log(req.header("Authorization"));

    const decoded = jwt.verify(token, process.env.JWT_TOKEN);

    console.log(decoded);

    req.user = decoded; // Add user from payload to request object
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid", error });
  }
};

module.exports = authMiddleware;
