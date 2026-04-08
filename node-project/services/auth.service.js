// const { User, Role, Permission } = require("../models");

// exports.buildAuthPayload = async (userId) => {
//   const user = await User.findByPk(userId, {
//     include: [
//       {
//         model: Role,
//         attributes: ["id", "name", "role"],
//         include: {
//           model: Permission,
//           attributes: ["id", "role"]
//         }
//       },
//       {
//         model: Permission,
//         attributes: ["id", "role"]
//       }
//     ]
//   });

//   if (!user) return null;

//   // roles
//   const roles = user.Roles.map(r => r.slug);

//   // role permissions
//   const rolePerms = user.Roles.flatMap(role =>
//     role.Permissions.map(p => p.slug)
//   );

//   // direct permissions
//   const directPerms = user.Permissions.map(p => p.slug);

//   // union
//   const permissions = [...new Set([...rolePerms, ...directPerms])];

//   return {
//     roles,
//     permissions
//   };
// };