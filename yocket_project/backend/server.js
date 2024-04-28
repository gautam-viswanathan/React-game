const express = require("express");
const app = express();

app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://662eabfb1ac3121158225376--tourmaline-faun-ea35e6.netlify.app/"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
const useRouter = require("./routes/selection");

app.use("/selection", useRouter);

app.listen(8000);
