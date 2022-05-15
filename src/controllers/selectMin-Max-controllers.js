const Product = require("../models/Products");
const createError = require("http-errors");

const getMinOrMax = async (req, res, next) => {
    
    try {
      const products = await Product.find();
      if(products.length <= 0) next(createError(400, "No content"));

      if(req.query.price === 'min'){
        const minPrice = products.sort((a, b) => {return a.price - b.price})
        res.json(minPrice);
      }else if(req.query.price === 'max'){
        const maxPrice = products.sort((a, b) => {return b.price - a.price})
        res.json(maxPrice);
      }
      
    } catch (err) {
      next(createError(500, "error fetching products"));
    }
};

module.exports = getMinOrMax;