import express from "express";
import cors from "cors";
import userRoutes from './routes/user.route.js'
import testRoutes from "./routes/test.route.js";
import boardRoutes from "./routes/board.route.js";
import todoRoutes from "./routes/todo.route.js";

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());


app.use("/api/v1/user", userRoutes);
app.use("/api/v1/test", testRoutes);
app.use("/api/v1/board", boardRoutes);
app.use("/api/v1/todo", todoRoutes);

export default app;
