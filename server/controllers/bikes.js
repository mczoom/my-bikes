const Bike = require('../models/bike');
const stravaToken = require('../models/stravaToken');
const { updateBikesOdo, getActualBikesOdo } = require('../utils/services');


// module.exports.addAllBikes = (req, res, next) => {
//   const {
//     converted_distance,
//     id,
//     name,
//     retired
//    } = req.body;
//   const userID = req.user._id;

//   return Bike.create({bikes: {distance: converted_distance, id, name, retired}, userID})
//     .then((bike) => {
//       res.send({ bike });
//     })
//     .catch(next);
// };




// module.exports.updateBikesOdo = async(req, res, next) => {
//   const userBikes = req.body.bikes;
//   const userID = req.user._id;

//   const bikes = await Bike.findOne({userID});
//   if(!bikes) {
//   return Bike.create({bikes: userBikes, userID})
//     .then((garage) => {
//       res.send({ bikes: garage.bikes });
//     })
//     .catch(next);
//   };
//   return;
// };


module.exports.addAllBikes = async(req, res, next) => {
  const actualBikesInfo = req.body.bikes;
  const userID = req.user._id;

  const storedBikes = await Bike.findOne({userID});
  if(!storedBikes) {
  return Bike.create({bikes: userBikes, userID})
    .then((garage) => {
      res.send({ bikes: garage.bikes });
    })
    .catch(next);
  };
  await updateBikesOdo(storedBikes, actualBikesInfo);
  storedBikes.save();
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
