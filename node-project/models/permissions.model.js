const { checkPermission } = require('../utils/authUtils');

const requirePermission = (permission) => {
  return async (req, res, next) => {
    const userId = req.user.id;

    const allowed = await checkPermission(userId, permission);

    if (!allowed) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    next();
  };
};

module.exports = requirePermission;