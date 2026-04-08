const auth = require('./middlewares/authMiddleware');
const permit = require('./middlewares/permissionMiddleware');

router.put(
  '/patients/:id',
  auth,
  permit('edit_patient'),
  (req, res) => {
    res.json({ message: 'Updated successfully' });
  }
);