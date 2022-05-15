const Product = require("../models/Products");
const createError = require("http-errors");
const jsonResponse = require("../libs/jsonResponse");
const getItemById = require("../middlewares/getItemById");

const createProduct = async (req, res, next) => {
    const { name, category, image,imageLarge, price, stock } = req.body;
    
    try {
    const newProduct = new Product({name, category, image,imageLarge,price, stock
    });
    result = await newProduct.save();
    res.json(
      jsonResponse({ statuscode: 201, message: "Product created successfully", result })
    );
  } catch (err) {
    next(createError(500, "error trying to register"));
  }

  
};

const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    if(products.length <= 0) next(createError(400, "No content"));
    res.json(products);
  } catch (err) {
    next(createError(500, "error fetching products"));
  }
};

const getProduct = async (req, res, next) => {
  const {productId} = req.params;

  try {
    
    const result = await getItemById(productId)
    res.json(
      jsonResponse({ statuscode: 200, message: "product found", result })
    );
  } catch (err) {
    next(createError(500, "error fetching product"));
  }
};

const updateProduct = async (req, res, next) => {
  const {productId} = req.params;

  try {
    const result = await Product.findByIdAndUpdate(
      productId,
      req.body,
      {new:true}
    )

    res.json(
        jsonResponse({ statuscode: 200, message: "upgraded product", result })
    );
  } catch (err) {
    next(createError(500, "error trying to fetch the product or product ID is incorrect"));
  }
};

const deleteProducts = async (req, res, next) => {
  const {productId} = req.params
 
  try {
    await Product.findByIdAndDelete(productId)  
    res.json(jsonResponse({statuscode: 200, 
      message:"Deleted Product"
    })) 
  } catch (err) {
    next(createError(500, "error deleting product"));
  }

  
};



module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProducts
};