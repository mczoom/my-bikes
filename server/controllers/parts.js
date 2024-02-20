const Part = require('../models/part');


module.exports.addPart = async(req, res, next) => {
  const part = req.body.part;
  const id = req.user._id;
  const cat = part.category  

  try {
    const updatedParts = await Part.findOneAndUpdate({userID: id}, {$push: {['parts.' + cat]: part}}, {new: true, upsert: true})
    res.send(updatedParts.parts);
  } catch (error) {
    next(error)
  };    
};


module.exports.updatePartInfo = async(req, res, next) => {
  const {partId, cat, updatedInfo} = req.body;
  const id = req.user._id;
  try {
    const partsToUpdate = await Part.findOne({userID: id})//, {$push: {['parts.' + cat]: part}}, {new: true, upsert: true})
  //   const partsDoc = await Bike.findOne({userID});
  //   const bikeToUpdate = partsDoc.parts.find(bike => bike.id === bikeId);

  //   Object.keys(updatedInfo).forEach((spec) => {
  //     if(updatedInfo[spec] !== "") {
  //       bikeToUpdate[spec] = updatedInfo[spec];  
  //     }
  //   });    
  //   await partsDoc.save();
  //   res.send(partsDoc.parts);
  console.log(partsToUpdate);
  } catch (err) {
    next(err);
  }
};



module.exports.getAllParts = async(req, res, next) => {
  const id = req.user._id;
  
  Part.findOne({userID: id})
    .orFail(() => res.send([]))
    .then(components => res.send(components.parts))
    .catch(next);
};
