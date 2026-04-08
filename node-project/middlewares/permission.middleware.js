const permissionMiddleware = (requiredPermission) => {
  return (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      if (!req.user.permissions.includes(requiredPermission)) {
        return res.status(403).json({ message: 'Forbidden' });
      }

      next();
    } catch (error) {
      return res.status(500).json({ message: 'Server error' });
    }
  };
};

module.exports = permissionMiddleware;