const Yup = require("yup");

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .required("El correo electrónico es requerido")
    .email("Escribe un correo electrónico valido"),
  password: Yup.string()
    .required("La contraseña es requerida")
    .min(5, "La contraseña debe tener mas de 4 caracteres")
    .max(1024)
    .trim(),
});

module.exports = loginSchema;
