require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");

// Connecting to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());

// Defining routes
app.use("/students", require("./routes/students"));
app.use("/courses", require("./routes/courses"));
app.use("/results", require("./routes/results"));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
