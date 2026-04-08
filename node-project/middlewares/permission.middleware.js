export const authorize = (requiredPermission) => {
  return (req, res, next) => {
    const user = req.user;

    if (!user || !user.permissions) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    if (!user.permissions.includes(requiredPermission)) {
      return res.status(403).json({ message: 'Access denied' });
    }

    next();
  };
};