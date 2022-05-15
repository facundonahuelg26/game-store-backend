const User = require("../models/User");
const jsonResponse = require("../libs/jsonResponse");
const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const Role = require("../models/Role");

const signUp = async (req, res, next) => {
  const { name, lastname, email, password, roles } = req.body;

  try {
    const newUser = new User({
      name,
      lastname,
      email,
      password: await User.encryptPassword(password),
    });
   
    const validateEmail = await User.findOne({email});
    if(validateEmail) next(createError(400, "Ese correo electrónico ya fue registrado"));

    if (roles) {
      const foundRoles = await Role.find({ name: { $in: roles } })
      newUser.roles = foundRoles.map(role => role._id)
    } else {
      const role = await Role.findOne({ name: "user" })
      newUser.roles = [role._id]
    }
    const savedUser = await newUser.save();
    console.log(savedUser)
    

    const token = jwt.sign({ id: savedUser._id }, process.env.SECRET, {
      expiresIn: 86400,
    });
    const result = {user: savedUser, jwt:token};
    res.json(
      jsonResponse({
        statuscode: 201,
        message: "User created successfully",
        result,
      })
    );
  } catch (error) {
    next(createError(400, error));
  }
};

const signIn = async (req, res, next) => {
  try {
    const userFound = await User.findOne({email:req.body.email}).populate("roles")

  if(userFound === null) return next(createError(400, "No se encontro ningun usuario con ese correo electrónico"))

  const matchPassword = await User.comparePassword(req.body.password, userFound.password)
  
  console.log("my user", userFound)
  const data = {userId: userFound._id, name:userFound.name, lastname: userFound.lastname, email: userFound.email, roles:userFound.roles}
  if(!matchPassword) return next(createError(400, "Contraseña invalida"));


  const token = jwt.sign({id: userFound._id}, process.env.SECRET, {
    expiresIn:86400 
  })
  const result = {data,token};
  res.json(
    jsonResponse({
      statuscode: 201,
      message: "Valid authentication",
      result,
    })
  );

  } catch (error) {
    console.log(error)
  }
};

module.exports = { signUp, signIn };

