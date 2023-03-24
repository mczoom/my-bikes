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
  await updateBikesOdo(storedBikes, actualBikesInfo);
  storedBikes.save();
};



module.exports.updateBikeInfo = async(req, res, next) => {
  const {bikeId, updatedInfo} = req.body;
  const userID = req.user._id;  

  const userGear = await Bike.findOne({userID});  
  const bikeToUpdate = userGear.bikes.find(bike => bike.id === bikeId);
  
  bikeToUpdate.brand = updatedInfo.brand;
  bikeToUpdate.model = updatedInfo.model;
  bikeToUpdate.year = updatedInfo.year;
  bikeToUpdate.weight = updatedInfo.weight;
  bikeToUpdate.photo = updatedInfo.photo;

  // function updateStoredBikeInfo(bikeToUpdate, updatedInfo) {
  //   Object.keys(updatedInfo).forEach((spec) => {
  //     //userGear.updateOne(bikeToUpdate, )
  //     bikeToUpdate.spec = updatedInfo[spec];      
  //   });
  // }
  
  //updateStoredBikeInfo(bikeToUpdate, updatedInfo);
  
  userGear.save();
};


module.exports.getAllBikes = (req, res, next) => {
  const userID = req.user._id;
  
  return Bike.findOne({userID})
    //.orFail(() => console.log('Велосипеды пользователя не найдены'))
    .then((garage) => {
      if(garage) {
      res.send(garage.bikes);
      };
    })
    .catch(next);
}
