const express = require("express");

const appRoute = require("./routes/appRoute.js");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(app.router)

app.use("/api/", appRoute);

app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));

