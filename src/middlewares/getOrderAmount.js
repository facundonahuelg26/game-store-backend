const calculateShipping = require("../libs/calculateShipping");
module.exports = getOrderAmount = async (products, shipping) => {
  let amount = 0;
  
  amount = products.reduce(
    (acc, { quantity, price }) => acc + quantity * price,
    0
  );
    console.log("shipping",shipping.state)
  let shippingPrice = calculateShipping(shipping.state);

  let preference = {
    additional_info: shipping.userData  || '0',
    items: [],
    back_urls: {
      success: "https://game-store-application.herokuapp.com/api/payment",
      failure: "https://facundonahuelg26.github.io/game-store-app/",
    },
    auto_return: "approved",
    binary_mode: true,
    shipments: {
      mode: "not_specified",
      cost: shipping === 'local' ? 0 : shippingPrice,
      receiver_address: {
        street_name: shipping.address  || shipping,
        street_number: Number(shipping.height)  || 0000,
        city_name: shipping.city  || shipping,
        state_name: shipping.state  || shipping,
      },
    },
    payer: {
      phone: { area_code: shipping.areacode || '0000', number: Number(shipping.phone)  || 000000},
      address: {
        street_name: shipping.address  || shipping,
        street_number: Number(shipping.height)  || 0000,
      },
      name: "",
      surname: "",
      date_created: null,
      last_purchase: null,
    },

    payment_methods: {
      excluded_payment_methods: [{ id: "rapipago" }, { id: "pagofacil" }],
      excluded_payment_types: [{ id: "ticket" }],
    },
   
    statement_descriptor: "Game Store",
  };
  products.forEach((el) => {
    preference.items.push({
      id: el._id,
      title: el.name,
      unit_price: el.price,
      currency_id: "ARS",
      quantity: el.quantity,
    });
  });
  return { preference, amount };
};


