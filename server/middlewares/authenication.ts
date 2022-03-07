import { Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";

import adminModel from "../model/adminModel";
import { JWTSecret } from "../controller/adminController";

const isAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.headers.authorization) return res.status(401).json({ msg: "unAuthorize" });
        const [word, token]: string[] = req.headers.authorization.split(' ');
        if (word !== "Bearer") return res.status(401).json({ msg: "unAuthorize" });
        const decoded: any = jwt.verify(token, JWTSecret);
        const data = await adminModel.findById(decoded._id);
        res.locals.user = data;
        next();
    } catch (err) {
        return res.status(401).json({ msg: "unAuthorize" });
    }
};

export default isAuth;
