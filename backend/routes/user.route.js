import express from "express";

const router = express.Router();

router.post("/signup", usersignup);

export default router;
