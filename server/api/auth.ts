import { Router } from "express";
import Joi from "joi";

import { login, registerAdmin } from "../controller/adminController";
import isAuth from "../middlewares/authenication";

const router = Router();

const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
});

router.post("/register", isAuth, (req, res) => {
    const {error} = schema.validate(req.body);

    if (error) return res.status(422).json(error);
    registerAdmin(req, res);
});

router.post("/login", (req, res) => {
    const {error} = schema.validate(req.body);

    if (error) return res.status(422).json(error);
    login(req, res);
});

export default router;