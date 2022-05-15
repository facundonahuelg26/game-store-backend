require("dotenv").config();

const app = require("./app");
require("./database");

const APP_PORT = process.env.PORT || 5000;

app.listen(APP_PORT, (error) => {
    if(error) return console.log(error);
    console.log("Server on port", APP_PORT)
});