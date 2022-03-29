import { Router } from "express";
import Joi from "joi";
import { addNewClass, deleteClass, fetchClass } from "../controller/adminController";
import isAuth from "../middlewares/authenication";

const classSchema = Joi.object({
    className: Joi.string().required()
});

const router = Router();

router.post("/class", isAuth, (req, res) => {
    const {error} = classSchema.validate(req.body);

    if (error) return res.status(422).json(error);

    addNewClass(req, res);
});

router.get("/class", (req, res) => {
    fetchClass(req, res);
});

router.delete("/class/:id", (req, res) => {
    deleteClass(req, res);
});


export default router;