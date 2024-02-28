const Bike = require('../models/bike');
const { updateBikeOdo, getBikesId, getBikesUpdatedOdo } = require('../utils/services');


// module.exports.addAllBikes = async(req, res, next) => {
//   const actualBikesInfo = req.body.bikes;
//   const userID = req.user._id;
//   const storedBikes = await Bike.findOne({userID});
    
//   try{
//     if(storedBikes) {
//       updateBikeOdo(storedBikes, actualBikesInfo);
//       storedBikes.save();
//       return;
//     };
//     Bike.create({bikes: actualBikesInfo, userID})
//       .then((garage) => {
//         res.send({ bikes: garage.bikes });
//       })      
//   } catch (err) {
//       next(err);
//   }
// };




module.exports.addBike = async(req, res, next) => {
  const {newBike} = await req.body;
  const id = req.user._id;
  const newBikeWithId = await newBike.map((bike) => {
    return {...bike, userID: id}
  });  
  
  try {
    const bikes = await Bike.create(newBikeWithId)
    res.send(bikes)
  } catch(err) {
    next(err);
  };  
};


module.exports.getAllBikes = async(req, res, next) => {
  const id = req.user._id;
  
  Bike.find({userID: id})
    .orFail(() => res.send([]))
    .then((bikes) => {
      res.send(bikes);      
    })
    .catch(next);
};



// module.exports.updateOdo = async(req, res, next) => {
//   const actualBikesInfo = req.body.bikes;
//   const userID = req.user._id;
  
//   try {
//     const storedBikes = await Bike.findOne({userID});
//     await updateBikeOdo(storedBikes, actualBikesInfo);
//     storedBikes.save();
//     res.send('Километраж обновлен');
//   } catch (err) {
//     next(err);
//   };
// };


module.exports.updateOdo = async(req, res, next) => {
  const bikesToUpdate = req.body.bikes;
  const userId = req.user._id;  
  
  try {
    if(bikesToUpdate.length > 0) {
      bikesToUpdate.forEach(async (bike) => {
        await Bike.findOneAndUpdate({userID: userId, id: bike.id}, {converted_distance: bike.converted_distance})
      });      
      res.send('Километраж обновлен');
    }
  } catch (err) {
    next(err);
  };
};




module.exports.updateBikeInfo = async(req, res, next) => {
  const {bikeId, updatedInfo} = req.body;
  const userID = req.user._id;
  try {
    const userGear = await Bike.findOne({userID});
    const bikeToUpdate = userGear.bikes.find(bike => bike.id === bikeId);

    Object.keys(updatedInfo).forEach((spec) => {
      if(updatedInfo[spec] !== "") {
        bikeToUpdate[spec] = updatedInfo[spec];  
      }
    });    
    await userGear.save();
    res.send(userGear.bikes);
  } catch (err) {
    next(err);
  }
};

