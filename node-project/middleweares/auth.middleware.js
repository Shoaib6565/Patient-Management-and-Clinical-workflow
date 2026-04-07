const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find user by email
    const user = await db.User.findOne({
      where: { email },
      include: [
        {
          model: db.Role,
          include: [db.Permission],
        },
      ],
    });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // 2. Check password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // 3. Extract roles
    const roles = user.Roles.map(r => r.name);

    // 4. Extract permissions
    const permissions = user.Roles.flatMap(role =>
      role.Permissions.map(p => p.name)
    );

    // 5. Create JWT token
    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_SECRET,
      { expiresIn: '59min' }
    );

    // 6. Send response
    return res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        roles,
        permissions,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { login };