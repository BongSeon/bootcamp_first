const express = require("express");
require("dotenv").config({ path: "mongodb/.env" });
const mongodb = require("./mongoose");
const Customer = require("./mongoose/schemas/customer");

const app = express();

mongodb.connect();

app.use(
  express.json({
    limit: "50mb", // 최대 50메가
  })
); // 클라이언트 요청 body를 json으로 파싱 처리

app.listen(3000, () => {
  console.log("3000 port로 서버가 start되었습니다.");
});

app.get("/api/customers", async (req, res) => {
  const customers = await Customer.find();
  res.send(customers);
});

app.post("/api/customer", async (req, res) => {
  const r = await Customer.create(req.body.params);
  res.send(r);
});
