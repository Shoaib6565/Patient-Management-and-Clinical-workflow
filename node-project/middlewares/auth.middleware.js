const { User, Role, Permission } = require('../models');

async function checkPermission(userId, requiredPermission) {
  // Fetch user with roles and permissions
  const user = await User.findByPk(userId, {
    include: [
      {
        model: Role,
        through: { attributes: [] }, // user_roles
        include: [
          {
            model: Permission,
            through: { attributes: [] }, // role_permissions
          },
        ],
      },
    ],
  });

  if (!user) return false;

  // Flatten permissions
  const permissions = user.Roles.flatMap(role =>
    role.Permissions.map(p => p.name)
  );

  // Check if required permission exists
  return permissions.includes(requiredPermission);
}

module.exports = {
  checkPermission,
};