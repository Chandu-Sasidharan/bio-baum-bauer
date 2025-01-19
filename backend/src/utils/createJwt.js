import jwt from 'jsonwebtoken';

const generateJwt = userId => {
  const payload = {
    id: userId,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: '7m', // 7 minutes
  });

  return token;
};

export default generateJwt;
