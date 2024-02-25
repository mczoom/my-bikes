const Part = require('../models/part');


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
  try {
    await Part.findOneAndUpdate({id: partId}, updatedInfo, {new: true});
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
