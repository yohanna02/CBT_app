import Joi from "joi";

export const classSchema = Joi.object({
    className: Joi.string().required()
});

export const studentSchema = Joi.object({
    regNo: Joi.string().required(),
    class_id: Joi.string().required()
});