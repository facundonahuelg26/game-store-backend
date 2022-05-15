const Product = require("../models/Products");

const getCategory = async (req, res, next) => {

  const products = await Product.find();

  const selectedCategory = products.filter(
    (item) => item.category === req.query.category
  );

  if(req.query.category && !req.query.price){
    res.json(selectedCategory);
  }else if(req.query.category && req.query.price === 'min'){
    const cateMin = selectedCategory.sort((a, b) => {return a.price - b.price})
    res.json(cateMin)
  }else if(req.query.category && req.query.price === 'max'){
    const cateMax = selectedCategory.sort((a, b) => {return b.price - a.price})
    res.json(cateMax)
  }
};

module.exports = {
  getCategory,
};
