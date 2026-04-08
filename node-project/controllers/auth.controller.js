const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { User, Role, Permission } = require("../models");
const { JWT_SECRET } = require("../config/jwt");

// LOGIN

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({
            where: { email },
            include: [
                {
                    model: Role,
                    attributes: ["id", "slug"],
                    include: {
                        model: Permission,
                        attributes: ["slug"]
                    }
                },
                {
                    model: Permission,
                    attributes: ["slug"]
                }
            ]
        });

        if (!user) {
            return res.api.error("Invalid credentials", 401);
        }

        if (!user.is_active) {
            return res.api.error("Account disabled", 403);
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.api.error("Invalid credentials", 401);
        }

        // roles
        const roles = user.Roles.map(r => r.slug);

        // role permissions
        const rolePerms = user.Roles.flatMap(role =>
            role.Permissions.map(p => p.slug)
        );


        const token = jwt.sign(
            {
                id: user.id,
                roles,
                rolePerms,
            },
            JWT_SECRET,
            { expiresIn: '30 minutes' }
        );

        return res.api.success({
            access_token: token,
            user: {
                id: user.id,
                email: user.email,
                roles,
                permissions
            }
        }, "Login successful");

    } catch (err) {
        next(err);
    }
};




// LOGOUT (STATELESS)

export const logout = async (req, res, next) => {
    try {
        return res.api.success(
            null,
            "Logged out successfully (client must delete token)"
        );

    } catch (err) {
        next(err);
    }
};




// GET CURRENT USER
export const getMe = async (req, res, next) => {
    try {
        const userId = req.user.id;

        const user = await User.findByPk(userId, {
            attributes: { exclude: ["password"] },
            include: [
                {
                    model: Role,
                    attributes: ["slug"],
                    include: {
                        model: Permission,
                        attributes: ["slug"]
                    }
                },
                {
                    model: Permission,
                    attributes: ["slug"]
                }
            ]
        });

        if (!user) {
            return res.api.notFound("User session is no longer valid");
        }

        const roles = user.Roles.map(r => r.slug);

        const rolePerms = user.Roles.flatMap(role =>
            role.Permissions.map(p => p.slug)
        );



        return res.api.success({
            user: {
                id: user.id,
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name,
                name: `${user.first_name} ${user.last_name}`,
                roles,
                rolePerms,
            }
        }, "Current user profile retrieved");

    } catch (err) {
        next(err);
    }
};

