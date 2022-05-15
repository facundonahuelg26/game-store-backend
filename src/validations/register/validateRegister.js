const validateRegister = (schema) => async (req, res, next) => {
  

    try {
      await schema.validate(req.body);
      
      next();
    } catch (error) {
      return res.status(400).json(error.message);
    }
  };
  
  module.exports = validateRegister;