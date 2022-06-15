import { Router } from "express";
import { getAllResults, getStudentsResultDetails, getSingleResult } from "../controller/examResultController";
import isAuth from "../middlewares/authenication";

const router = Router();

router.get("/get-results", isAuth, getAllResults);

router.get("/get-results/:resultId", isAuth, getStudentsResultDetails);

router.get("/get-single-result/:resultId", isAuth, getSingleResult);

export default router;