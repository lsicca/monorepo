import joi from 'joi';

export const userRegisterValidator = joi.object({
	email: joi.string().email().required(),
	password: joi.string().required().min(4),
	login: joi.string().required(),
	firstName: joi.string().required(),
	lastName: joi.string().required(),
});

export const userLoginValidator = joi.object({
	password: joi.string().required().min(6),
	login: joi.string().required(),
});

export const userValidator = joi.object({
	email: joi.string().required(),
	login: joi.string().required(),
	firstName: joi.string().required(),
	lastName: joi.string().required(),
	isAdmin: joi.boolean().required(),
});
