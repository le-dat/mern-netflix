const userRouter = require("./user");

function router(app) {
  app.use("/api/user", userRouter);
}

module.exports = router;
