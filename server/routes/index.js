const { Router } = require('express');
const { login, createUser } = require('../controllers/users');

const router = Router();

router.post('/signup', createUser);
router.post('/signin', login);

router.use('*', () => {
  throw new Error('Страница не найдена');
});

module.exports = router;
