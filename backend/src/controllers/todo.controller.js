import { Todo } from "../models/todo.model.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { Board } from "../models/board.model.js";
import mongoose from "mongoose";

export const createTodoController = asyncHandler(async (req, res) => {
  const { title, boardId } = req.body;

  if (!title || !boardId) {
    throw new ApiError(400, "Title and boardId are required");
  }

  // ensure board exists and belongs to user
  const board = await Board.findOne({
    _id: boardId,
    owner: req.user.firebaseUid,
  });

  if (!board) {
    throw new ApiError(403, "Board not found or unauthorized");
  }

  const todo = await Todo.create({
    title,
    boardId,
    owner: req.user.firebaseUid,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, true, "Todo created successfully", todo));
});


export const allTodosOfBoardController = asyncHandler(async (req, res) => {
  const { boardId } = req.params;

  if (!boardId) {
    throw new ApiError(400, "boardId is required");
  }

  // verify board ownership
  const board = await Board.findOne({
    _id: boardId,
    owner: req.user.firebaseUid,
  });

  if (!board) {
    throw new ApiError(403, "Board not found or unauthorized");
  }

  const todos = await Todo.find({
    boardId,
    owner: req.user.firebaseUid,
  }).sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, true, "Todos fetched successfully", todos));
});


export const updateTodoController = asyncHandler(async (req, res) => {
  let { id } = req.params;
  const { title, completed } = req.body;

  if (!id) {
    throw new ApiError(400, "Todo id is required");
  }

  // Trim whitespace/newlines
  id = id.trim();

  // Validate Mongo ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid todo id");
  }

  // Find todo by id and owner
  const todo = await Todo.findOne({
    _id: id,
    owner: req.user.firebaseUid,
  });

  if (!todo) {
    throw new ApiError(404, "Todo not found or unauthorized");
  }

  // Update fields if provided
  if (title !== undefined) todo.title = title;
  if (completed !== undefined) todo.completed = completed;

  await todo.save();

  return res
    .status(200)
    .json(new ApiResponse(200, true, "Todo updated successfully", todo));
});


export const deleteTodoController = asyncHandler(async (req, res) => {
  let { id } = req.params;

  if (!id) {
    throw new ApiError(400, "Todo id is required");
  }

  // Trim whitespace/newlines
  id = id.trim();

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid todo id");
  }

  // Find todo by id and owner
  const todo = await Todo.findOne({
    _id: id,
    owner: req.user.firebaseUid,
  });

  if (!todo) {
    throw new ApiError(404, "Todo not found or unauthorized");
  }

  await todo.deleteOne();

  return res
    .status(200)
    .json(new ApiResponse(200, true, "Todo deleted successfully", null));
});




