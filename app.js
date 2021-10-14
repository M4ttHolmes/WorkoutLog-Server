const Express = require('express');
const app = Express();
require("dotenv").config();
const dbConnection = require("./db");

app.use(Express.json());


const controllers = require("./controllers");

app.use("/log", controllers.logController);
app.use("/user", controllers.userController);

dbConnection.authenticate()
    .then(() => dbConnection.sync())
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`[Server]: App is listening on port ${process.env.PORT}.`);
        });
    })
    .catch((err) => {
        console.log(`[Server]: Server Crashed. Error = ${err}`);
    });