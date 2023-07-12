const { Router } = require('express');
const { login, createUser, getUser, addStravaPermissions, checkStravaPermissions } = require('../controllers/users');
const { addAllBikes, getAllBikes, updateBikeInfo, updateOdo, addBike } = require('../controllers/bikes');
const { auth } = require('../middlewares/auth');
const { exchangeStrToken, refreshStrToken, getStrToken } = require('../controllers/strToken');
const { checkStravaToken } = require('../middlewares/stravaAuth');
const { updateBikeInfoValidation } = require('../middlewares/validation');



const router = Router();

router.post('/signup', createUser);
router.post('/signin', login);

router.post('/strava-permissions', auth, addStravaPermissions);
router.get('/strava-permissions', auth, checkStravaPermissions);

router.get('/strtoken', auth, getStrToken);
router.post('/strtokenexchange', auth, exchangeStrToken);
router.get('/strtokenrefresh', auth, refreshStrToken);

router.get('/user', auth, getUser);
router.get('/tokencheck', auth, checkStravaToken, refreshStrToken);
router.post('/bikes', auth, checkStravaToken, addAllBikes);
router.get('/bikes', auth, checkStravaToken, getAllBikes);
router.post('/addbike', auth, checkStravaToken, addBike);
router.patch('/bikeodo', auth, checkStravaToken, updateOdo);
router.patch('/bikeinfo', auth, checkStravaToken, updateBikeInfoValidation, updateBikeInfo);

router.use('*', () => {
  throw new Error('Страница не найдена');
});

module.exports = router;

