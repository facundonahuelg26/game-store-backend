const getOrderAmount = require("../middlewares/getOrderAmount");
const mercadopago = require("mercadopago");
const getService = require("../service/getService");
const Order = require("../models/Order");
const Product = require("../models/Products");
const createError = require("http-errors");

mercadopago.configure({
  access_token: process.env.API_KEY_MP,
});

const createPayment = async (req, res, next) => {
  const items = req.body;
  console.log("mis items",items)
  try {
    let result;
    if(Object.keys(items).length === 0) return next(createError(500, "La informacion es requerida"));
    if(items.myShipping === false) return next(createError(500, "Registre sus datos de envio o retire en tienda"));

    items.cart.map(async (item) => {
      const itemsProd = await Product.findById(item._id);
      if (itemsProd.stock === item.stock) {
        const controlStock = itemsProd.stock - item.quantity;
        if (controlStock > 0) {
          return console.log(controlStock);
        } else {
          return next(createError(500, "there is not stock"));
        }
      }
    });

    if (items.atLocal) {
      result = await getOrderAmount(items.cart, items.atLocal);
    } else {
      result = await getOrderAmount(items.cart, items.myShipping);
    }
    const response = await mercadopago.preferences.create(result.preference);
    const initPoint = response.body.init_point;
    const id = response.body.id;

    res.json({ statuscode: 200, message: "success", id, initPoint });
  } catch (error) {
    console.log(error);
  }
};

const getPayment = async (req, res) => {
  let id = req.query.payment_id;

  const response = await getService(id);
  console.log("get payment", response.additional_info.items);
  if (response !== undefined) {
    let status = response.status;

    response.additional_info.items.map(async (item) => {
      const itemsProd = await Product.findById(item.id);
      await Product.findByIdAndUpdate(
        item.id,
        { stock: itemsProd.stock - item.quantity },
        { new: true }
      );
    });

    console.log("products");
    if (response.shipping_amount === 0) {
      const newOrder = new Order({
        items: response.additional_info.items,
        state: "En local",
        city: "En local",
        address: "En local",
        height: 0001,
        client: response.payer.id,
        paymentId: id,
        paymentStatus: status,
        shippingPrice: response.shipping_amount,
        amount: response.transaction_amount,
      });

      await newOrder.save();

      res.redirect(`http://localhost:3000`);
    } else {
      const newOrder = new Order({
        items: response.additional_info.items,
        state: response.additional_info.shipments.receiver_address.state_name,
        city: response.additional_info.shipments.receiver_address.city_name,
        address:
          response.additional_info.shipments.receiver_address.street_name,
        height:
          response.additional_info.shipments.receiver_address.street_number,
        client: response.payer.id,
        paymentId: id,
        paymentStatus: status,
        shippingPrice: response.shipping_amount,
        amount: response.transaction_amount,
      });

      await newOrder.save();

      res.redirect(`http://localhost:3000/orders?${response.payer.id}`);
    }
  }
};

module.exports = {
  createPayment,
  getPayment,
};
