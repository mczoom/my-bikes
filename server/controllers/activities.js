
const NotFoundError = require('../errors/NotFoundError');
const Activity = require('../models/activity');

module.exports.addAllActivities = async(req, res, next) => {
  const activitiesFromStrava = req.body.activities;
  const userID = req.user._id;
  const storedActivities = await Activity.findOne({userID});  
    
  return Activity.create({activities: activitiesFromStrava, userID})
    .then(() => {
      res.status(201).send('Все тренировки успешно добавлены из Strava в базу');
    })      
    .catch(next);    
};


module.exports.getAllActivities = async(req, res, next) => {
  const userID = req.user._id;
  
  Activity.findOne({userID})
    .orFail(() => new NotFoundError('Тренировки не найдены в базе'))
    .then((trainings) => res.send(trainings.activities))  
    .catch(next);
};
