import { NextFunction, Request, Response } from "express"
import { z, ZodError } from "zod"
import BadRequestException from "../exceptions/BadRequestException";

export const validate = (schema: z.ZodObject<any, any>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.body);
            next();
        } catch (err) {
            if (err instanceof ZodError) {
                const errorMessages = err.errors.map((issue: any) => ({
                    message: `${issue.path.join('.')} : ${issue.message}`,
                }));
                throw new BadRequestException("", errorMessages);
            }
        }
    }
}