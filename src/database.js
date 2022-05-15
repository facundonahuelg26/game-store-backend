const mongoose = require("mongoose");

const MONGO_DB_URI = process.env.DB_URI;

(async () => {
    try {
        const db = await mongoose.connect(MONGO_DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("db connected to ", db.connection.name);
    } catch (error) {
        console.log(error)
    }
})();

