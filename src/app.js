const express = require("express");
const createError = require("http-errors");
const morgan = require("morgan");
const productsRoutes = require("./routes/products-routes")
const authRoutes = require("./routes/auth-routes")
const paymentRoutes = require("./routes/payment-routes")
const categoryRoutes = require('./routes/category-routes')
const termRoutes = require('./routes/term-routes')
const dataUserRoutes = require('./routes/dataUser-routes')
const orderRoutes = require("./routes/order-routes")
const minMax = require("./routes/min-max-routes")
const messageRoutes = require("./routes/message-routes")
const createRoles = require("./libs/InitialSetup")
const setCache = require("./middlewares/cache")

const app = express();
//const cors = require("cors");
//app.use(cors({ origin: "http://localhost:3000" }));
createRoles();

app.use(express.json());
app.use(morgan("dev"));

app.use(setCache)
app.use("/api/products", productsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/payment", paymentRoutes)
app.use("/api/search", categoryRoutes)
app.use("/api/term", termRoutes)
app.use('/api/user-info', dataUserRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/sort', minMax)
app.use('/api/message', messageRoutes)

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.use((req, res, next) => {
  next(createError(404, "The endpoint does not exist"))
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500)
  res.json({
    errorcode:err.status,
    message: err.message
  });
})

module.exports = app;
