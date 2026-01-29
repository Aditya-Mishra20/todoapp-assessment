import { Board } from "../models/board.model.js";
import {asyncHandler}  from "../utils/AsyncHandler.js";
import  ApiError  from "../utils/ApiError.js";
import  ApiResponse  from "../utils/ApiResponse.js";

export const createBoardController = asyncHandler(async (req, res) => {
    

    const {title, description} = req.body;
    if(!title){
        throw new ApiError(400, "Title is required")
    }
    const board = await Board.create({
        title,
        description,
        owner: req.user.firebaseUid,
    })
    res.status(201).json(new ApiResponse(201, true, "Board created successfully", board));


});

export const allBoardController = asyncHandler(async (req, res) => {
    const boards = await Board.find({ owner: req.user.firebaseUid }).sort({ createdAt: -1 });

    res.status(200).json(new ApiResponse(200, true, "Boards fetched successfully", boards));
});


export const singleBoardController = asyncHandler(async (req, res) => {
    const board = await Board.findOne({
        _id: req.params.id,
        owner: req.user.firebaseUid,
    });

    if (!board) {
        throw new ApiError(404, "Board not found or unauthorized");
    }

    res.status(200).json(new ApiResponse(200, true, "Board fetched successfully", board));
});

export const updateBoardController = asyncHandler(async (req, res) => {
    const { title, description } = req.body;

    const board = await Board.findOne({
        _id: req.params.id,
        owner: req.user.firebaseUid,
    });

    if (!board) {
        throw new ApiError(404, "Board not found or unauthorized");
    }

    // Update only if fields are provided
    if (title) board.title = title;
    if (description) board.description = description;

    await board.save();

    res.status(200).json(new ApiResponse(200, true, "Board updated successfully", board));
});


export const deleteBoardController = asyncHandler(async (req, res) => {
  const board = await Board.findOneAndDelete({
    _id: req.params.id,
    owner: req.user.firebaseUid,
  });

  if (!board) {
    throw new ApiError(404, "Board not found or unauthorized");
  }

  res
    .status(200)
    .json(new ApiResponse(200, true, "Board deleted"));
});