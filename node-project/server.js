const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
app.use(express.json());

// =======================
// CONFIG
// =======================
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'my_secret_key';

// =======================
// FAKE USERS (replace with DB later)
// =======================
const users = [
  {
    id: 1,
    email: 'admin@test.com',
    password: '123456',
    permissions: ['view_patient', 'edit_patient'],
    role: 'admin'
  },
  {
    id: 2,
    email: 'doctor@test.com',
    password: '123456',
    permissions: ['view_patient'],
    role: 'doctor'
  }
];

// =======================
// LOGIN API
// =======================
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    u => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign(
    {
      id: user.id,
      role: user.role,
      permissions: user.permissions
    },
    JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.json({
    message: 'Login successful',
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      permissions: user.permissions
    }
  });
});

// =======================
// AUTH MIDDLEWARE
// =======================
function auth(req, res, next) {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = header.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // store user in request
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

// =======================
// PERMISSION MIDDLEWARE
// =======================
function permission(requiredPermission) {
  return (req, res, next) => {
    const userPermissions = req.user.permissions || [];

    if (!userPermissions.includes(requiredPermission)) {
      return res.status(403).json({
        message: 'Forbidden - You do not have permission'
      });
    }

    next();
  };
}

// =======================
// TEST ROUTES
// =======================

// View Patients
app.get(
  '/patients',
  auth,
  permission('view_patient'),
  (req, res) => {
    res.json({
      message: 'You can VIEW patients',
      user: req.user
    });
  }
);

// Edit Patients
app.put(
  '/patients',
  auth,
  permission('edit_patient'),
  (req, res) => {
    res.json({
      message: 'You can EDIT patients',
      user: req.user
    });
  }
);

// =======================
// START SERVER
// =======================
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});