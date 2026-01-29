import express from "express";
import cors from "cors";
import userRoutes from './routes/user.route.js'
import testRoutes from "./routes/test.route.js";

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());


app.use("/api/v1/user", userRoutes);
app.use("/api/v1/test", testRoutes);


export default app;
