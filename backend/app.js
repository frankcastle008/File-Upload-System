const express = require("express");
const app = express();
const connect = require("./db/mongodb");
const auth = require("./routes/auth");
const user = require("./routes/user");
const cors = require("cors");
const { errorMiddleware } = require("./middlewares/middlewares");

app.use(express.static("uploads"));
const URL =
  "mongodb+srv://adityadixit113:jmQFE3f02Q18DMyw@cluster0.eoo3agr.mongodb.net/?retryWrites=true&w=majority";
app.use(cors());
app.use(express.json());
// app.get("/",(req,res)=>{
//     res.send("hello world");
// })
app.use("/auth", auth);
app.use("/user", user);
app.use(errorMiddleware);

const Port = 7090;

connect(URL)
  .then((data) => {
    app.listen(Port, () => {
      console.log("Database Connected, Server running on, ", Port);
    });
  })
  .catch((err) => {
    console.log("Error connecting to database", err);
  });
