import { Router } from "express";
import Joi from "joi";
import { addNewClass } from "../controller/adminController";
import isAuth from "../middlewares/authenication";

const classSchema = Joi.object({
    className: Joi.string().required()
});

const router = Router();

router.post("/add-class", isAuth, (req, res) => {
    const {error} = classSchema.validate(req.body);

    if (error) return res.status(422).json(error);

    addNewClass(req, res);
});


export default router;