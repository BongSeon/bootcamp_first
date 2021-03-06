const express = require("express");
const app = express();
console.log(app.get("env"));

// require("dotenv").config({ path: `mysql/.env` });
require("dotenv").config({ path: `mysql/.env.${app.get("env")}` });
// consol.log(process.env);
const mysql = require("./mysql");

app.use(
  express.json({
    limit: "50mb", // 최대 50메가
  })
); // 클라이언트 요청 body를 json으로 파싱 처리

// listen
app.listen(3000, () => {
  console.log("서버가 포트 3000번으로 시작되었습니다.");
});

// get 전체
app.get("/api/product/category", async (req, res) => {
  const categoryList = await mysql.query("categoryList");
  res.send(categoryList);
});

// get 단일 1건만 조회
// app.get("/api/product/category/:product_category_id", async (req, res) => {
// 한번 해보세요
// });

// post
app.post("/api/product/category", async (req, res) => {
  const result = await mysql.query("categoryInsert", req.body.param);
  res.send(result);
});

// put: 수정  :id 라는 키로 주소에서 받아온다.
// categoryUpdate: `update product_category set ? where product_category_id=?`,
// 쿼리에 ? 가 두개이기 때문에 전달할 데이터도 2개 그래서 배열로 전달한다.
app.put("/api/product/category/:product_category_id", async (req, res) => {
  const { product_category_id } = req.params;
  const result = await mysql.query("categoryUpdate", [
    req.body.param,
    product_category_id,
  ]);
  res.send(result);
});

app.delete("/api/product/category/:product_category_id", async (req, res) => {
  const { product_category_id } = req.params;
  const result = await mysql.query("categoryDelete", product_category_id);
  res.send(result);
});
