const express = require("express");
const cors = require("cors");
const route = require("./routes");
const db = require("./config/db");

// connect db
db.connect();

const app = express();
const PORT = process.env.PORT || 5000;

// req.body, bodyParser
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// config router
route(app);

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
