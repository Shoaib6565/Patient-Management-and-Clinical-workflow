export const roleMiddleware = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      if (!req.user || !req.user.roles) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const userRoles = req.user.roles.map(r => r.name);
      const hasRole = userRoles.some(role =>
        allowedRoles.includes(role)
      );

      if (!hasRole) {
        return res.status(403).json({
          message: "Forbidden: Access denied"
        });
      }

      next();
    } catch (error) {
      return res.status(500).json({ message: "Server error" });
    }
  };
};

