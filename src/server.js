const express = require('express');

const userRoutes = require("./routes/userRoutes");

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

app.use("/users", userRoutes);


app.listen(PORT, () => {
    console.log('Server is running http://localhost:8090');
});