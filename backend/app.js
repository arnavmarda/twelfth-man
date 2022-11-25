const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = 9000;

const { MONGO_URI } = require("./keys.js");

require("./models/user.js");

app.use(express.json());
app.use(require("./routes/auth.js"));

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
    console.log("connected to mongoose");
});

mongoose.connection.on("error", (err) => {
    console.log("error in mongoose connection: ", err);
});

app.listen(PORT, () => {
    console.log("Server on: ", PORT);
});
