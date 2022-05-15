const Role = require("../models/Role");
const createError = require("http-errors");

const createRoles = async (next) => {
  try {
    const count = await Role.estimatedDocumentCount();

    if (count > 0) return;
  
    const values = await Promise.all([
      new Role({ name: "user" }).save(),
      new Role({ name: "admin" }).save(),
    ]);
  
    console.log(values);
  } catch (error) {
    next(createError(500, error));
  }
};

module.exports = createRoles;