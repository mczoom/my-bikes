const Bike = require('../models/bike');


module.exports.addBike = async(req, res, next) => {
  const {newBike} = await req.body;
  const id = req.user._id;
    
  try {
    if(newBike) {
      const newBikeWithId = await newBike.map((bike) => {
        return {...bike, userID: id}
      });  
      const bikes = await Bike.create(newBikeWithId)
      res.send(bikes)
    }
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
    await Bike.findOneAndUpdate({userID, id: bikeId}, updatedInfo, {new: true});
    const allBikes = await Bike.find({userID})
    res.send(allBikes)
  } catch (err) {
    next(err);
  }
};
