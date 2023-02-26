const { Router } = require('express');
const { login, createUser } = require('../controllers/users');
const { addAllBikes } = require('../controllers/bikes');
const { auth } = require('../middlewares/auth');


const router = Router();

router.post('/signup', createUser);
router.post('/signin', login);

router.post('/exchange-str-token', auth);
router.post('/renew-str-token', auth);
router.post('/bikes', auth, addAllBikes);
router.get('/bikes', auth, getAllBikes);

router.use('*', () => {
  throw new Error('Страница не найдена');
});

module.exports = router;
