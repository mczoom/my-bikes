
const NotFoundError = require('../errors/NotFoundError');
const Activity = require('../models/activity');

module.exports.addAllActivities = async(req, res, next) => {
  const activitiesFromStrava = req.body.activities;
  const userID = req.user._id; 
    
  return Activity.create({activities: activitiesFromStrava, userID})
    .then(() => {
      res.status(201).send('Все тренировки успешно добавлены из Strava в базу');
    })      
    .catch(next);    
};


module.exports.getAllActivities = async(req, res, next) => {
  const userID = req.user._id;
  
  Activity.findOne({userID})
    .orFail(() => res.send([]))
    .then((data) => res.send(data.activities))  
    .catch(next);
};


module.exports.updateActivities = async(req, res, next) => {
  const actualActivities = req.body.activities;
  const userID = req.user._id;

  Activity.findOne({userID})
  .orFail(() => new NotFoundError('Тренировки не найдены в базе'))
  .then(async(data) => {
    if(data.activities.length === actualActivities.length) {
      return res.send(actualActivities);
    };
    await Activity.updateOne({activities: actualActivities});
    res.send('Список тренировок обновлен');
  })  
  .catch(next);  
};
