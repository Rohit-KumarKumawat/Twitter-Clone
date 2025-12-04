const mongoose = require("mongoose");
const connectMd = (url) => {
  mongoose
    .connect(url)
    .then(() => console.log("Mongodb connected successfully!"))
    .catch((err) => console.log(err));
};
module.exports = connectMd;
