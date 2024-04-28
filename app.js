const Cookies = require("js-cookie");
const express = require("express");
const cors = require("cors");
const collection = require("./mongo");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

app.get("/", cors(), (req, res) => {});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await collection.findOne({ email });
    if (user) {
      const check = await bcrypt.compare(password, user.password);
      // console.log(user);
      if (check) {
        const payload = {
          userId: email,
          password: user.password,
        };
        const secretKey = "Ayumitra";
        const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });
        // console.log(token);
        res.status(200);
        res.json(token);
      } else {
        res.status(400);
        res.json("Invalid Password");
      }
    } else {
      res.status(400);
      res.json("notexist");
    }
  } catch (e) {
    res.json("fail");
  }
});

app.post("/signup", async (req, res) => {
  const { email, username, password } = req.body;
  try {
    const check = await collection.findOne({ email });
    if (check) {
      res.status(400);
      res.json("exist");
    } else {
      const hasedPassword = await bcrypt.hash(password, 10);
      const data = {
        email: email,
        username: username,
        password: hasedPassword,
      };
      await collection.insertMany([data]);
      const payload = {
        userId: email,
        password: hasedPassword,
      };
      const secretKey = "Ayumitra";
      const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });
      // console.log(token);
      res.status(200);
      res.json(token);
      //res.json("notexist");
    }
  } catch (e) {
    res.status(401);
    res.json("fail");
  }
});

app.listen(8000, () => {
  console.log("Port Connected");
});
