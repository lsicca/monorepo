/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

export const checkBodySchema = (schema: Joi.Schema) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { logger } = req;
    try {
      if (!schema) {
        throw Error;
      }
      const { value, error } = await schema.validate(req.body, {
        abortEarly: true,
        allowUnknown: true,
        stripUnknown: true,
      });

      if (error) {
        let err;
        switch (error.details[0].type) {
        case 'any.required':
        case 'string.empty':
          res
            .status(400)
            .json(`Field ${error.details[0].context?.label} should not be empty`);
          break;
        case 'any.unknown':
        case 'date.base':
          res
            .status(400)
            .json(`Field ${error.details[0].context?.label} is invalid`);
          break;
        default:
          res
            .status(500)
            .json('An unknown error happened');
          break;
        }
        throw err;
      }

      req.bodyData = value;

      next();
    } catch (err) {
      logger.error('Error during validation');
    }
  };
};
