import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
const router = Router();


// router.route("/register").post(registerController);

// router.route('/all').get(authMiddleware, (req, res)=>{
//     console.log("REQ USER:", req.user);
//   res.json({ message: "Middleware works", user: req.user });
// })

export default router;