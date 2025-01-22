import { StatusCodes } from 'http-status-codes';

// isAdmin middleware
// To be used in conjunction with the isAuthenticated middleware
const isAdmin = (req, res, next) => {
  if (!(req.user.isAdmin || req.user.isSuperAdmin)) {
    return res.status(StatusCodes.FORBIDDEN).json({ message: 'Access denied' });
  }

  next();
};

export default isAdmin;
