const { Router } = require('express');
const { login, createUser } = require('../controllers/users');
const { addAllBikes, getAllBikes } = require('../controllers/bikes');
const { auth } = require('../middlewares/auth');
const { exchangeStrToken, refreshStrToken } = require('../controllers/strToken');
const { checkStravaToken } = require('../middlewares/stravaAuth');


const router = Router();

router.post('/signup', createUser);
router.post('/signin', login);

router.post('/strtokenexchange', auth, checkStravaToken, exchangeStrToken);
router.get('/strtokenrefresh', auth, checkStravaToken, refreshStrToken);
//router.post('/strtoken', auth, getStrTokenExpTime);
router.post('/bikes', auth, checkStravaToken, addAllBikes);
router.get('/bikes', auth, checkStravaToken, getAllBikes);

router.use('*', () => {
  throw new Error('Страница не найдена');
});

module.exports = router;

