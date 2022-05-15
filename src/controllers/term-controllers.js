const Product = require("../models/Products");

const getTerm = async (req, res, next) => {
  const products = await Product.find();
  console.log("req query price", req.query);

  let cadena = JSON.stringify(req.query);
  let expReg = /category/;
  let expReg2 = /name/;

  try {
    const selected = products.filter((item) => {
      if (expReg.test(cadena)) {
        return item.category
          .replace(/-/g, " ")
          .toString()
          .toLowerCase()
          .includes(req.query.category.toLowerCase());
      } else if (expReg2.test(cadena)) {
        return item.name
          .toString()
          .toLowerCase()
          .includes(req.query.name.toLowerCase());
      }
    });
    if (selected.length === 0) {
      res.json([]);
    }

    if (!req.query.price) {
      res.json(selected);
    } else if (req.query.price === "min") {
      const cateMin = selected.sort((a, b) => {
        return a.price - b.price;
      });
      res.json(cateMin);
    } else if (req.query.price === "max") {
      const cateMax = selected.sort((a, b) => {
        return b.price - a.price;
      });
      res.json(cateMax);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getTerm
};
