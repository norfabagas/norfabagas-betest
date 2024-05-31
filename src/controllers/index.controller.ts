import { NextFunction, Request, Response } from "express";
import { PaginationData, SuccessResponse } from "../helpers/helper";

export const index = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const pagination: PaginationData = {total: 1, perPage: 1, page: 1};
        await SuccessResponse(
            req, 
            res, 
            { message: "OK" }, 
            200,
            pagination);
    } catch (err) {
        next(err);
    }
}