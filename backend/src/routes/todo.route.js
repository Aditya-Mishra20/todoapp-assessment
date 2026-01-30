import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
  createTodoController,
} from "../controllers/todo.controller.js";
import { allTodosOfBoardController } from "../controllers/todo.controller.js";
import { updateTodoController } from "../controllers/todo.controller.js";
import { deleteTodoController } from "../controllers/todo.controller.js";

const router = Router();


//   Todos always belong to a board
//  boardId comes from params
 

// create todo on a board
router
  .route("/create")
  .post(authMiddleware, createTodoController);

// get all todos of a board
router
  .route("/board/:boardId")
  .get(authMiddleware, allTodosOfBoardController);

// // get single todo
// router
//   .route("/:boardId/:id")
//   .get(authMiddleware, singleTodoController);

// // update todo (checkbox / text)
router
  .route("/:id")
  .put(authMiddleware, updateTodoController);

// // delete todo
router
  .route("/:id")
  .delete(authMiddleware, deleteTodoController);

export default router;
