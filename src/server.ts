import express, { response } from "express";

const app = express();

app.use(express.json());

app.get("/", () => {
  console.log("Listagem de usuarios");

  response.json({ message: "hello world" });
});

app.listen(3333, () => {
  console.log("App is running");
});
