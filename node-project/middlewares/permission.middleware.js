const permissionMiddleware = (requiredPermission) => {
  return (req, res, next) => {
    try {
      if (!req.user || !req.user.roles) {
        return res.status(401).json({ message: 'Unauthorized' });
      }


      const allPermissions = req.user.roles.flatMap(role => role.permissions);

      if (!allPermissions.includes(requiredPermission)) {
        return res.status(403).json({ message: 'Forbidden: Missing permission ' + requiredPermission });
      }

      next();
    } catch (error) {
      return res.status(500).json({ message: 'Server error' });
    }
  };
};
