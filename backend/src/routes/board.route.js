import { allBoardController, createBoardController, deleteBoardController, singleBoardController, updateBoardController } from "../controllers/board.controller.js";
import  authMiddleware  from "../middlewares/auth.middleware.js";
import { Router } from "express";
const router = Router();

// http://localhost:PORT/api/v1/board/...

router.route('/create').post(authMiddleware,createBoardController)
router.route('/all').get(authMiddleware,allBoardController)
router.route('/:id').get(authMiddleware,singleBoardController)
router.route('/:id').put(authMiddleware,updateBoardController)
router.route('/:id').delete(authMiddleware,deleteBoardController)

export default router;


