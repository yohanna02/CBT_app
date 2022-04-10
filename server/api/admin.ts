import { Router } from "express";
import { addNewClass, addStudent, deleteClass, fetchClass } from "../controller/adminController";
import isAuth from "../middlewares/authenication";
import { classSchema, studentSchema } from "../validation_schema/adminValidation";

const router = Router();

router.post("/class", isAuth, (req, res) => {
    const {error} = classSchema.validate(req.body);

    if (error) return res.status(422).json(error);

    addNewClass(req, res);
});

router.get("/class", (req, res) => {
    fetchClass(req, res);
});

router.delete("/class/:id", isAuth, (req, res) => {
    deleteClass(req, res);
});

router.post("/student", isAuth, (req, res) => {
    const {error} = studentSchema.validate(req.body);

    if (error) return res.status(422).json(error);

    addStudent(req, res);
});


export default router;