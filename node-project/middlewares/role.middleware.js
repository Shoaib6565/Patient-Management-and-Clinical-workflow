import db from "../models/index.js";

const { User, Role, Permission } = db;

export const roleMiddleware = (...allowedRoles) => {
  return async (req, res, next) => {
    try {
      const user = await User.findByPk(req.user.id, {
        attributes: { exclude: ["password"] },
        include: [
          {
            model: Role,
            as: "roles",
            attributes: ["id", "name"],
            through: { attributes: [] },
            include: [
              {
                model: Permission,
                as: "permissions",
                attributes: ["name"],
                through: { attributes: [] },
              },
            ],
          },
        ],
      });
      if (!user || !user.roles) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const userRoles = user.roles.map(r => r.name);
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

