const Yup = require("yup");

const registerSchema = Yup.object().shape({
  name: Yup.string()
    .required("El nombre es requerido")
    .min(3, "El nombre debe tener mas de 2 caracteres")
    .max(16, "El nombre debe tener menos de 16 caracteres")
    .matches(
      /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
      " Letras y espacios, puede llevar acentos"
    )
    .trim(),
  lastname: Yup.string()
    .required("El apellido es requerido")
    .min(3, "El apellido debe tener mas de 2 caracteres")
    .max(16, "La apellido debe tener menos de 16 caracteres")
    .matches(
      /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
      " Letras y espacios, puede llevar acentos"
    )
    .trim(),
  email: Yup.string()
    .required("El correo electrónico es requerido")
    .email("Escribe un correo electrónico valido"),
  password: Yup.string()
    .required("La contraseña es requerida")
    .min(5, "La contraseña debe tener mas de 4 caracteres")
    .max(1024)
    .trim(),
});

module.exports = registerSchema;
