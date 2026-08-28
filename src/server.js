require('dotenv').config();

const express = require('express');

const authRoutes = require("./routes/authRoutes");

const userRoutes = require("./routes/userRoutes");

const ticketRoutes = require("./routes/ticketRoutes");

const companyRoutes = require('./routes/companyRoutes');

const databaseTestConnect = require('./routes/databaseConnectionTestRoutes');

const databasePrismaTestRoutes = require('./routes/databasePrismaTestRoutes');

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

app.use("/testdatabase", databaseTestConnect);

app.use("/test-prisma-database", databasePrismaTestRoutes);

app.use("/auth", authRoutes);

// app.use(loggerMiddleware);

app.use("/users",  authenticate, userRoutes);

app.use("/tickets", authenticate, ticketRoutes);

app.use('/company', authenticate, companyRoutes);


app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log('Server is running http://localhost:8090');
});