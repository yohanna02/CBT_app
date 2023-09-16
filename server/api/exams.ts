import { Router } from "express";
import { setExams, startExams, submitExams } from "../controller/examsController";
import isAuth from "../middlewares/authenication";

const router = Router();

router.post("/set-exams", isAuth, setExams);

router.post("/start-exams", startExams);

router.post("/submit-exams", submitExams);

export default router;
