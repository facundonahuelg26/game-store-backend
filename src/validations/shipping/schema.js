const Yup = require("yup")

const shippingSchema = Yup.object().shape({
    address: Yup.string()
      .required("La calle es requerida")
      .min(3, 'La calle debe tener mas de 2 caracteres')
      .max(16, 'La calle debe tener menos de 16 caracteres')
      .matches(/^[a-zA-ZÀ-ÿ\s]{1,40}$/,'Letras y espacios, puede llevar acentos')
      .trim(),
    height: Yup.string()
      .required("La altura es requerida")
      .matches(/^\d{4,6}$/,'Entre 4 y 6 números')
      .trim(),
    state: Yup.string()
    .required("La provincia es requerida")
    .min(3, 'La provincia debe tener mas de 2 caracteres')
    .max(26, 'La provincia debe tener menos de 16 caracteres')
    .matches(/^[a-zA-ZÀ-ÿ\s]{1,40}$/,'Letras y espacios, puede llevar acentos')
    .trim(),
    city: Yup.string()
    .required("La ciudad es requerida")
    .min(3, 'La ciudad debe tener mas de 2 caracteres')
    .max(26, 'La ciudad debe tener menos de 16 caracteres')
    .matches(/^[a-zA-ZÀ-ÿ\s]{1,40}$/,'Letras y espacios, puede llevar acentos')
    .trim(),
    areacode: Yup.string()
    .required("El código de área es requerido")
    .matches(/^\d{4,6}$/,'Entre 4 y 6 números')
    .trim(),
    phone: Yup.string()
    .required("El teléfono es requerido")
    .matches(/^\d{6,14}$/,'Entre 6 y 14 números')
    .trim(),
  });

module.exports = shippingSchema;