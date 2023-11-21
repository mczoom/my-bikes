const NotFoundError = require('../errors/NotFoundError');
const Bike = require('../models/bike');
const { updateBikesOdo } = require('../utils/services');


module.exports.addAllBikes = async(req, res, next) => {
  const actualBikesInfo = req.body.bikes;
  const userID = req.user._id;
  const storedBikes = await Bike.findOne({userID});
    
  try{
    if(storedBikes) {
      updateBikesOdo(storedBikes, actualBikesInfo);
      storedBikes.save();
      return;
    };
    Bike.create({bikes: actualBikesInfo, userID})
      .then((garage) => {
        res.send({ bikes: garage.bikes });
      })      
  } catch (err) {
      next(err);
  }
};


module.exports.addBike = async(req, res, next) => {
  const newBike = await req.body.bike;
  const userID = req.user._id;
  try {
    const storedBikes = await Bike.findOneAndUpdate({userID}, {$push: {"bikes": newBike}}, {new: true});    
    //await storedBikes.save(); 
    res.send('Велосипед успешно добавлен');
  } catch(err) {
    next(err);
  };  
};


module.exports.updateOdo = async(req, res, next) => {
  const actualBikesInfo = req.body.bikes;
  const userID = req.user._id;
  const storedBikes = await Bike.findOne({userID});

  Bike.findOne({userID})
  .orFail(() => new NotFoundError('Велосипеды пользователя не найдены'))
  .then((savedBikes) => updateBikesOdo(savedBikes, actualBikesInfo))
  .then(() => {
    storedBikes.save()
    res.send('Километраж обновлен');
  })
  .catch(next);  
};


module.exports.getAllBikes = async(req, res, next) => {
  const userID = req.user._id;
  
  Bike.findOne({userID})
    .orFail(() => res.send([]))
    .then((garage) => {
      res.send(garage.bikes);      
    })
    .catch(next);
};


module.exports.updateBikeInfo = async(req, res, next) => {
  const {bikeId, updatedInfo} = req.body;
  const userID = req.user._id;  

  try {
    const userGear = await Bike.findOne({userID});
    const bikeToUpdate = userGear.bikes.find(bike => bike.id === bikeId);

    Object.keys(updatedInfo).forEach((spec) => {
      if(updatedInfo[spec]) {
        bikeToUpdate[spec] = updatedInfo[spec];  
      }
    });
    await userGear.save();
    res.send(userGear.bikes);
  } catch (err) {
    next(err);
  }
};
