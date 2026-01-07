import { NextFunction, Request, Response } from 'express';
import { ZodObject } from 'zod';
import catchAsync from '../utils/catchAsync';

const ValidateRequest = (schema: ZodObject) => {
  return catchAsync(
    async (req: Request, response: Response, next: NextFunction) => {
      //====> validation
      // if everything is allright => next()=>
      await schema.parseAsync({ body: req.body, cookies: req.cookies });
      next();
    },
  );
};

export default ValidateRequest;
