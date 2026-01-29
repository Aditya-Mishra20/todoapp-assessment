import { Router } from "express";
const router = Router();


// router.route("/register").post(registerController);

router.route('/test').get((req, res)=>{
    res.send("All users")
})

export default router;