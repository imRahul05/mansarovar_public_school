import jwt from 'jsonwebtoken';

// Generate JWT token for authentication
const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET || 'mansarovar_school_secret_key',
    { expiresIn: '30d' }
  );
};

export default generateToken;