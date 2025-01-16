import jwt from 'jsonwebtoken';

export const generateJwt = userId => {
  const payload = {
    id: userId,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);

  return token;
};

export const verifyJWT = token => {
  return jwt.verify(token, process.env.JWT_SECRET_KEY);
};
