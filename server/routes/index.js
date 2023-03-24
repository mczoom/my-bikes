const { Router } = require('express');
const { login, createUser } = require('../controllers/users');
const { addAllBikes, getAllBikes, updateBikeInfo } = require('../controllers/bikes');
const { auth } = require('../middlewares/auth');
const { exchangeStrToken, refreshStrToken, tokenCheck, getStrToken } = require('../controllers/strToken');
const { checkStravaToken } = require('../middlewares/stravaAuth');


const router = Router();

router.post('/signup', createUser);
router.post('/signin', login);


router.post('/strtokenexchange', auth, exchangeStrToken);
router.get('/strtokenrefresh', auth, refreshStrToken);
router.get('/tokencheck', auth, checkStravaToken, refreshStrToken, tokenCheck);
router.get('/strtoken', auth, getStrToken);
router.post('/bikes', auth, checkStravaToken, addAllBikes);
router.get('/bikes', auth, checkStravaToken, getAllBikes);
router.post('/bikeinfo', auth, checkStravaToken, updateBikeInfo);

router.use('*', () => {
  throw new Error('Страница не найдена');
});

module.exports = router;

