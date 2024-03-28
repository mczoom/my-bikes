
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const Activity = require('../models/activity');

module.exports.addAllActivities = async(req, res, next) => {
  const activitiesFromStrava = req.body.activities;
  const userID = req.user._id; 
  
  try {
    const rides = await Activity.create({activities: activitiesFromStrava, userID: userID})
    res.send(rides.activities);    
  } catch(err) {      
    next(err);
  }    
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
  const id = req.user._id;

  try{
  
    await Activity.updateOne({userID: id}, {activities: actualActivities});
    res.send('Список тренировок обновлен');
   
} catch(err) {
  next(err)
}  


  // Activity.findOne({userID: id})
  // .orFail(() => new NotFoundError('Тренировки не найдены в базе'))
  // .then(async(data) => {
  //   if(data.activities.length === actualActivities.length) {
  //     return res.send(actualActivities);
  //   };
  //   await Activity.updateOne({userID: id}, {activities: actualActivities});
  //   res.send('Список тренировок обновлен');
  // })  
  // .catch(next);  
};
