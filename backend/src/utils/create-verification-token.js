import crypto from 'crypto';

const createVerificationToken = () => {
  const randomBytes = crypto.randomBytes(32).toString('hex');
  const token = crypto.createHash('sha256').update(randomBytes).digest('hex');
  return token;
};

export default createVerificationToken;
