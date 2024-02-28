const Part = require('../models/part');
const Bike = require('../models/bike');


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
  const bikeId = updatedInfo.bikeSelect;
  const userid = req.user._id;

  try {
    await Part.findOneAndUpdate({userID: userid, id: partId}, updatedInfo, {new: true});
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
      bike.installedParts.forEach(async(part) => {
        //const distDiff = b.converted_distance - part.bikeOdoAtInstal;
        //await Part.findOneAndUpdate({userID: userid, id: part}, {distance: b.converted_distance - bikeOdoAtInstal}, {new: true});
       const p = await Part.findOne({userID: userid, id: part});
       const distDiff = parseFloat(b.converted_distance) - parseFloat(p.bikeOdoAtInstal);
       p.distance = distDiff;
       p.save();
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
