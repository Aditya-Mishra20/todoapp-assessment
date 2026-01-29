import express from "express";
import auth from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/protected", auth, (req, res) => {
  res.json({
    message: "Access granted",
    user: req.user,
  });
});

export default router;

