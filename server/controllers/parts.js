const Part = require('../models/part');
const Bike = require('../models/bike');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');

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


module.exports.getAllParts = async(req, res, next) => {
  const id = req.user._id;
  
  Part.find({userID: id})
    .orFail(() => new NotFoundError('Компоненты не найдены'))
    .then(components => res.send(components))
    .catch(next);
};


module.exports.updatePartInfo = async(req, res, next) => {
  const {partId, updatedInfo} = req.body;
  const bikeOdo = updatedInfo.bikeOdo;
  const bikeId = updatedInfo.bikeSelect;
  //const uninstalled = updatedInfo.uninstalled;
  const userid = req.user._id;
  const update = {...updatedInfo, userID: userid, bikeOdoAtInstal: bikeOdo, bikeOdoAtLastUpdate: bikeOdo, updated: new Date()}

  try {
    const part = await Part.findOne({userID: userid, id: partId});
    if(bikeId === 'uninstall') {
      await Bike.findOneAndUpdate({_id: bikeId}, {$pull:{"installedParts": partId}}, {new: true})
      part.bikeSelect = '';
      part.bikeName = '';
      part.bikeOdoAtInstal = 0;
      part.bikeOdoAtLastUpdate = 0;
      part.save();
    }
    if(bikeId && bikeId !== 'uninstall') {
      if(part.installed) {
        await Bike.updateOne({_id: part.bikeSelect}, {$pull:{"installedParts": partId}}, {new: true});
      }
      const bike = await Bike.findOneAndUpdate({_id: bikeId}, {$push:{"installedParts": partId}}, {new: true});
      part.bikeName = bike.name;
      part.installed = true;
      part.save();
    }
    await Part.findOneAndUpdate({userID: userid, id: partId}, update, {new: true});
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
      const bike = await Bike.findOne({_id: b._id})
      bike?.installedParts.forEach(async(partId) => {
        const part = await Part.findOne({userID: userid, id: partId}); 
        if(part && b.converted_distance !== part.bikeOdoAtLastUpdate) { 
          const distDiff = b.converted_distance - part.bikeOdoAtLastUpdate;
          part.$inc('distance', distDiff);
          part.bikeOdoAtLastUpdate = b.converted_distance;
          part.save();         
        }
      })      
    });
    const allParts = await Part.find({});    
    res.send(allParts);  
  } catch (err) {
    next(err);
  }
};


module.exports.deletePart = async(req, res, next) => {
  const {partId} = req.body;
  const userId = req.user._id;

  try {
    await Part.deleteOne({userID: userId, id: partId})
      .then(async (report) => {
        if(!report.deletedCount) {
         return next( new BadRequestError('Не удалось удалить компонент'));
        };        
        await Bike.findOneAndUpdate({'installedParts': {$in: partId}}, {$pull:{"installedParts": partId}}, {new: true})
        const allParts = await Part.find({userID: userId})
        res.send(allParts)
      })
  } catch (error) {
    next(error)
  };    
};