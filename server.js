const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Api Working");
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`)
})