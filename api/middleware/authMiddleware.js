import jwt from 'jsonwebtoken';


export const verifyToken = async (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) return res.status(401).json({ message: 'Access denied. No token.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // contains user.id
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token.' });
  }
};


export const verifyAdminToken = async (req, res, next) => {
  const token = req.cookies.admin_token;

  if (!token) return res.status(401).json({ message: 'Access denied. No token.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // contains user.id
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token.' });
  }
};