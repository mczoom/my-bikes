module.exports.errorHandler = (err, req, res, next) => {
    const { statusCode = 500, message } = err;
    console.log(message);
    console.log(statusCode);
    res
      .status(statusCode)
      .send({status: statusCode,
        message: statusCode === 500 ?
         'На сервере произошла ошибка'
          : message
      });
  };
