const Part = require('../models/part');
const Bike = require('../models/bike');
const { convertNumToString } = require('../utils/services');

module.exports.addPart = async(req, res, next) => {
  const part = req.body.part;
  const id = req.user._id;
  const update = {...part, userID: id}

  try {
    const parts = await Part.create(update)
      .then(() => Part.find({}))

    res.send(parts);    
  } catch (error) {
    next(error)
  };    
};


module.exports.updatePartInfo = async(req, res, next) => {
  const {partId, updatedInfo} = req.body;
  const bikeOdo = updatedInfo.bikeOdo;
  const bikeId = updatedInfo.bikeSelect;
  const uninstalled = updatedInfo.uninstalled;
  const userid = req.user._id;
  const update = {...updatedInfo, userID: userid, bikeOdoAtInstal: bikeOdo, bikeOdoAtLastUpdate: bikeOdo}

  try {
    await Part.findOneAndUpdate({userID: userid, id: partId}, update, {new: true});
    if(uninstalled) {
     await Bike.findOneAndUpdate({userID: userid, id: bikeId}, {$pull:{"installedParts": partId}}, {new: true})
    }
    if(bikeId) {
     await Bike.findOneAndUpdate({userID: userid, id: bikeId}, {$push:{"installedParts": partId}}, {new: true})
    }
    const allParts = await Part.find({});    
    res.send(allParts);  
  } catch (err) {
    next(err);
  }
};


module.exports.updatePartOdo = async(req, res, next) => {
  const {bikes} = req.body;  
  const userid = req.user._id;

  try {
    bikes.forEach(async(b) => {
      const bike = await Bike.findOne({userID: userid, id: b.id})
      bike.installedParts.forEach(async(partId) => {
        const part = await Part.findOne({userID: userid, id: partId}); 
        if(b.converted_distance !== part.bikeOdoAtLastUpdate) {      
          if(part.bikeOdoAtLastUpdate) { //УБРАТЬ КОСТЫЛЬ!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
          const distDiff = b.converted_distance - part.bikeOdoAtLastUpdate;
          part.$inc('distance', distDiff);
          part.bikeOdoAtLastUpdate = b.converted_distance;
          part.save();
          }
        }
      })      
    });
    const allParts = await Part.find({});    
    res.send(allParts);  
  } catch (err) {
    next(err);
  }
};


module.exports.getAllParts = async(req, res, next) => {
  const id = req.user._id;
  
  Part.find({})
    .orFail(() => res.send([]))
    .then(components => res.send(components))
    .catch(next);
};
