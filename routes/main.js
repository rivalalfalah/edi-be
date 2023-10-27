const express = require('express');

const userRouter = require("./user")

const mainRouter = express.Router()


const prefix = "/api";

mainRouter.use(`${prefix}/user`, userRouter)



mainRouter.get("/", (req, res) => {
  res.json({
      msg: "Berjalan dengan baik",
  })
})


//export
module.exports = mainRouter;