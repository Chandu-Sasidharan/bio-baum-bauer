import { StatusCodes } from 'http-status-codes';

// isSuperAdmin middleware
// To be used in conjunction with the isAuthenticated middleware
const isSuperAdmin = (req, res, next) => {
  if (!req.user.isSuperAdmin) {
    return res.status(StatusCodes.FORBIDDEN).json({ message: 'Access denied' });
  }

  next();
};

export default isSuperAdmin;
