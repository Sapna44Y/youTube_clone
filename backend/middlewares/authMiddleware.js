import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization');
    // const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) return res.status(401).json({ error: "Access denied" });
    try {
      const decoded = jwt.verify(token, process.env.Jwt_secret_key);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(400).json({ error: "Invalid token" });
    }
};

export default authMiddleware;