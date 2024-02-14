const Part = require('../models/part');


module.exports.addPart = async(req, res, next) => {
  const part = req.body.part;
  const id = req.user._id;
  Part.findByIdAndUpdate({userID: id}, {$push: {'parts': part}}, {new: true})
  .then((components) => {
    res.send(components.parts)
  })
    .catch(next); 
};


module.exports.getAllParts = async(req, res, next) => {
  const id = req.user._id;
  
  Part.findOne({userID: id})
    .orFail(() => res.send([]))
    .then(components => res.send(components.parts))
    .catch(next);
};

