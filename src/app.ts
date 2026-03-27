import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { errorHandler } from "./middlewares/errorHandler.middleware.js";
import { FRONTEND_URL, NODE_ENV, PORT } from "./config/config.js";
import { authRoutes } from "./modules/auth/auth.routes.js";
import { blogRoutes } from "./modules/blog/blog.routes.js";
import { matchRouter } from "./modules/match/match.routes.js";

const app = express();

app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());

app.use((req: Request, _res: Response, next: NextFunction) => {
  const isProd = NODE_ENV === "production";
  if (isProd) return next();

  console.log("===== Incoming Request =====");
  console.log("Time     :", new Date().toISOString());
  console.log("Method   :", req.method);
  console.log("URL      :", req.originalUrl);
  console.log("Headers  :", req.headers);
  console.log("Body     :", req.body);
  console.log("Query    :", req.query);
  console.log("File     :", req.file);
  console.log("refreshToken :", req.cookies.refreshToken);
  console.log("============================\n");

  next();
});

app.get("/", (_req: Request, res: Response) => {
  res.send(`Your API is running on port: ${PORT}`);
});

app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/matches", matchRouter);

app.use(errorHandler.handle);

export default app;
