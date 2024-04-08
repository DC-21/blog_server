import compression from "compression";
import cors from "cors";
import express, { Application, Request, Response } from "express";
import morgan from "morgan";

const app: Application = express();
const PORT = process.env.PORT || 9000;

app.use(express.json());
app.use(morgan("dev"));
app.use(compression());
app.use(cors());

app.get("/", (_req: Request, res: Response) => {
  res.send("Hello Nino, Ya blog server is up");
});

const start = () => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

start();
