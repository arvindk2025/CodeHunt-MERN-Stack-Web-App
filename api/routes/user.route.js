import express from "express";
import {deleteUser,getUser} from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

//router.get("/register", )
//router.get("/login", )
router.delete("/:id", verifyToken, deleteUser)
router.get("/:id", verifyToken, getUser)


export default router;
