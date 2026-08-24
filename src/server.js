const express = require('express');

const userRoutes = require("./routes/userRoutes");

const ticketRoutes = require("./routes/ticketRoutes");

const loggerMiddleware = require('./middleware/loggerMiddleware');

const authenticate = require('./middleware/authenticateMiddleware');

const app = express();

const PORT = 8090;

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


app.listen(PORT, () => {
    console.log('Server is running http://localhost:8090');
});