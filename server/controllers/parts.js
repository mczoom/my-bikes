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
    const partsToUpdate = await Part.findOne({userID: id})
    const partsToUpdate2 = partsToUpdate.parts[cat]
    const partsToUpdate3 = partsToUpdate2.find(part => part.id === partId)
    Object.keys(updatedInfo).forEach((spec) => {
        partsToUpdate3[spec] = updatedInfo[spec];  
      
    }); 
       await partsToUpdate.save()




    //partsToUpdate.aggregate()
    //const partsToUpdate = await Part.findOneAndUpdate({userID: id},{$set: {['parts.'+cat+'.$[elem]']: updatedInfo}}, {arrayFilters: [ { 'elem.$': { $eq: updatedInfo } } ], new: true, upsert: true})
    //const partsToUpdate = await Part.findOneAndUpdate({userID: id},{$set: {['parts.'+cat+'.$[elem].price']: pr}}, {arrayFilters: [ { 'elem.id': { $eq: partId } } ], new: true, upsert: true})
  //   const partsDoc = await Bike.findOne({userID});
  //   const bikeToUpdate = partsDoc.parts.find(bike => bike.id === bikeId);

  //   Object.keys(updatedInfo).forEach((spec) => {
  //     if(updatedInfo[spec] !== "") {
  //       bikeToUpdate[spec] = updatedInfo[spec];  
  //     }
  //   });    
  //   
  res.send(partsToUpdate.parts);
  //console.log(partsToUpdate);
  //console.log(['parts.'+cat+'.$.'+ partId+'price']);
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
