import { Router } from "express";
import { setExams } from "../controller/examsController";
import isAuth from "../middlewares/authenication";

const router = Router();

router.post("/set-exams", isAuth, setExams);

export default router;