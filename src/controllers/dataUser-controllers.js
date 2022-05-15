const DataUser = require("../models/DataUser");
const createError = require("http-errors");
const jsonResponse = require("../libs/jsonResponse");

const createDataUser = async (req, res, next) => {
  const { address, height, state, city, areacode, phone, userData } = req.body;

  try {
    const newDataUser = new DataUser({
      address,
      height,
      state,
      city,
      areacode,
      phone,
      userData,
      clientId: "1",
    });

    const validateUserData = await DataUser.findOne({ userData });
    if (validateUserData) {
      return next(createError(400, "si desea modificar los datos dirijase a la sección mi cuenta"));
      
    }
    
    result = await newDataUser.save();
    res.json(
      jsonResponse({
        statuscode: 201,
        message: "Data created successfully",
        result,
      })
    );
  } catch (err) {
    console.log(err)
  }
};

const getDataUser = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const result = await DataUser.findOne({ userData: userId });
    if (result === null) {
      res.json({ yourData: "Sin datos de envio registrados" });
    } else {
      res.json(
        jsonResponse({ statuscode: 200, message: "user found", result })
      );
    }
  } catch (err) {
    next(createError(500, "error fetching user"));
  }
};

const updateDataUser = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const result = await DataUser.findOneAndUpdate(
      { userData: userId },
      req.body,
      { new: true }
    );

    res.json(
      jsonResponse({
        statuscode: 200,
        message: "upgraded shipping data",
        result,
      })
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createDataUser,
  getDataUser,
  updateDataUser
};

