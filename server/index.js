const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());

const connection = require('./config/db');
connection();

const todoRoutes = require('./routes/todoRoutes');
app.use('/todo', todoRoutes);

app.listen("3000", () => {
    console.log("server is running on port 3000");
});
