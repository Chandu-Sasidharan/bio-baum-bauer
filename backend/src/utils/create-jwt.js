import jwt from 'jsonwebtoken';
import { pick } from 'lodash-es';

const createJwt = user => {
  const payload = pick(user, [
    '_id',
    'firstName',
    'lastName',
    'email',
    'isAdmin',
    'isSuperAdmin',
    'isVerified',
  ]);

  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: '7m', // 7 minutes
  });

  return token;
};

export default createJwt;
