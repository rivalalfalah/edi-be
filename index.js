require("dotenv").config();

const express = require("express");
const morgan = require("morgan");

const cors = require("cors");

const server = express();
const PORT = 8080;

const postgreDb = require("./config/postgre")
const mainRouter = require("./routes/main")

postgreDb.connect()
.then(() => {
  console.log("Databse Connected")

  server.use(express.json());
  server.use(express.urlencoded({extended:false}))
  server.use(cors())
  server.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
  server.use(mainRouter);

  server.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});
})

.catch((err) => {
  console.log(err);
});