require('dotenv').config();

const express = require('express');

const userRoutes = require("./routes/userRoutes");

const ticketRoutes = require("./routes/ticketRoutes");

const databaseTestConnect = require('./routes/databaseConnectionTestRoutes');

const loggerMiddleware = require('./middleware/loggerMiddleware');

const authenticate = require('./middleware/authenticateMiddleware');

const errorMiddleware = require('./middleware/errorMiddleware');

const app = express();

const PORT = process.env.PORT;

app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        project: "Help Desk",
        version: "1.0.0",
        status: "running"
    });
});

app.use(loggerMiddleware);

app.use("/users",  authenticate, userRoutes);

app.use("/tickets", authenticate, ticketRoutes);

app.use("/testdatabase", databaseTestConnect);

app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log('Server is running http://localhost:8090');
});