const Part = require('../models/part');


module.exports.addPart = async(req, res, next) => {
  const part = req.body.part;
  const id = req.user._id;
  try {
    const updatedParts = await Part.findOneAndUpdate({userID: id}, {$push: {"parts": part}}, {new: true, upsert: true})
    res.send(updatedParts.parts)
  } catch (error) {
    next(error)
  };    
};


module.exports.getAllParts = async(req, res, next) => {
  const id = req.user._id;
  
  Part.findOne({userID: id})
    .orFail(() => res.send([]))
    .then(components => res.send(components.parts))
    .catch(next);
};

