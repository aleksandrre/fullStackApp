import express from "express";
import bodyParser from "body-parser";
import fs from "fs";
import cors from "cors";
const app = express();

app.use(bodyParser.json());
app.use(cors());
const books = JSON.parse(fs.readFileSync("./books.json").toString());

app.get("/", (req, res, next) => {
  res.json(books);
  console.log(books);
});

app.post("/", (req, res, next) => {
  res.send("well done");
  books.push(req.body);
  fs.writeFileSync("./books.json", JSON.stringify(books));
});

app.listen(4001, () => {
  console.log("hii");
});
