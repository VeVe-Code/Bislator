const { body, validationResult } = require('express-validator');

handleerrormsg = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({error : result.mapped()});
  }else{
    next()
  }

}

module.exports= handleerrormsg