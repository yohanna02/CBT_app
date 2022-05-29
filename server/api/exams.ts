import { Router } from "express";
import { setExams, startExams } from "../controller/examsController";
import isAuth from "../middlewares/authenication";

const router = Router();

router.post("/set-exams", isAuth, setExams);

router.post("/start-exams", startExams);

export default router;
