const Order = require("../models/Order");
const DataUser = require("../models/DataUser");
const jsonResponse = require("../libs/jsonResponse");
const createError = require("http-errors");

const getOrder = async (req, res, next) => {
  
  const client = req.query.client
  const user = req.query.user 
  const count = req.query.count 
  try {
    const orders = await Order.find()
    
    if(count < 2){
      await DataUser.updateOne({userData: user}, {$set: {clientId: client}})
    }
    
    const result = orders.filter(item => item.client === client && item)
   
    res.json(
        jsonResponse({ statuscode: 200, message: "result found", result})
    );
  } catch (err) {
    next(createError(500, "error fetching payment, try again"));
  }
  
}


module.exports = {
 getOrder
}


