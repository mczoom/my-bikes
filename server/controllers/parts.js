const NotFoundError = require('../errors/NotFoundError');
const Part = require('../models/part');


module.exports.addPart = async(req, res, next) => {
  const part = req.body.part;
  const userID = req.user._id;
  
  Part.create({part: part, userID})
      .then((newPart) => {
        res.send(newPart);
      })    
      .catch(next);
};

