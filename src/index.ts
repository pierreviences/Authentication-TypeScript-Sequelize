// jalanin : npm run dev / npm start pokoknya liat di package.json aja deh
import express from "express";
import dotenv from "dotenv";
import router from "./routes/Routes";

const app = express();

dotenv.config();

app.use(express.json());

app.use(router);

app.listen(process.env.APP_PORT, () => {
  console.log(
    `${process.env.APP_NAME} running on port ${process.env.APP_PORT}`
  );
});
