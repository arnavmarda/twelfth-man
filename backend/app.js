const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = 9000;

const { MONGO_URI } = require("./keys.js");

app.use(express.json());

require("./models/user");
require("./models/match");
require("./models/scorecard");
require("./models/team");
require("./models/tournament");

app.use(require("./routes/matches.js"));
app.use(require("./routes/teams.js"));
app.use(require("./routes/tournaments.js"));
app.use(require("./routes/users.js"));
app.use(require("./routes/all.js"));


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
