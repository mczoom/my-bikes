const Bike = require('../models/bike');
const stravaToken = require('../models/stravaToken');
const { updateBikesOdo, getActualBikesOdo } = require('../utils/services');


module.exports.addAllBikes = async(req, res, next) => {
  const actualBikesInfo = req.body.bikes;
  const userID = req.user._id;
  const storedBikes = await Bike.findOne({userID});
  
  if(!storedBikes) {
  return Bike.create({bikes: actualBikesInfo, userID})
    .then((garage) => {
      res.send({ bikes: garage.bikes });
    })
    .catch(next);
  };
  updateBikesOdo(storedBikes, actualBikesInfo);
  storedBikes.save();
};


module.exports.addBike = async(req, res, next) => {
  const newBike = await req.body.bike;
  const userID = req.user._id;
  const storedBikes = await Bike.findOneAndUpdate({userID}, {$push: {"bikes": newBike}}, {new: true});  
  
  storedBikes.save();  
};


module.exports.updateOdo = async(req, res, next) => {
  const actualBikesInfo = req.body.bikes;
  const userID = req.user._id;
  const storedBikes = await Bike.findOne({userID});
  
  updateBikesOdo(storedBikes, actualBikesInfo);
  storedBikes.save();
};


module.exports.getAllBikes = (req, res, next) => {
  const userID = req.user._id;
  
  Bike.findOne({userID})
    //.orFail(() => console.log('Велосипеды пользователя не найдены'))
    .then((garage) => {
      if(garage) {
      res.send(garage.bikes);
      };
    })
    .catch(next);
};


module.exports.updateBikeInfo = async(req, res, next) => {
  const {bikeId, updatedInfo} = req.body;
  const userID = req.user._id;  

  const userGear = await Bike.findOne({userID});
  const bikeToUpdate = userGear.bikes.find(bike => bike.id === bikeId);

  Object.keys(updatedInfo).forEach((spec) => {
    if(updatedInfo[spec]) {
      bikeToUpdate[spec] = updatedInfo[spec];  
    }
  });

  await userGear.save();
  res.send(userGear.bikes);
};
