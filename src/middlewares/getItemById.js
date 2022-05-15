const Products = require("../models/Products")

module.exports = getItemByID = async (itemId) => {
    const itemFromDB = await Products.findById(itemId)

    return itemFromDB;
}