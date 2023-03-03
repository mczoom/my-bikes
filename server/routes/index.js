const { Router } = require('express');
const { login, createUser } = require('../controllers/users');
const { addAllBikes, getAllBikes } = require('../controllers/bikes');
const { auth } = require('../middlewares/auth');
const { exchangeStrToken, refreshStrToken } = require('../controllers/strToken');


const router = Router();

router.post('/signup', createUser);
router.post('/signin', login);

router.post('/strava-access', auth, exchangeStrToken);
router.post('/strtokenexchange', auth, exchangeStrToken);
router.get('/strtokenrefresh', auth, refreshStrToken);
router.post('/bikes', auth, addAllBikes);
// router.get('/bikes', auth, getAllBikes);

router.use('*', () => {
  throw new Error('Страница не найдена');
});

module.exports = router;
