require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const server = require("http").createServer(app);
const v1 = require("./routes/v1");
const fs = require("fs");
var upload = require('multer')();


var corsOptions = {
  origin: ["http://localhost:3000"],
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// parse requests of content-type - multipart/form-data
app.use(upload.array()); 
app.use(express.static('public'));

// Api routes
app.get('/', (req, res) => {
  res.send("Server is running")
})
app.use("/api/v1", v1);

// set port, listen for requests
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
