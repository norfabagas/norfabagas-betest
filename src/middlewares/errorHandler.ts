import { NextFunction, Request, Response } from "express";
import BaseError from "../exceptions/BaseError";

export const errorHandler = async (err: BaseError, req: Request, res: Response, next: NextFunction) => {
    return res
        .status(err.status || 500)
        .json({
            error: err.name,
            status: errStatus(err.status),
            errorCode: err.status || 500,
            message: {
                summary: err.message,
                trace: err.trace
            }
        })
}

const errStatus = (httpCode: number): string => {
    switch (httpCode) {
    case 400:
        return "Bad Request";
    case 401:
        return "Unauthorized";
    case 403:
        return "Forbidden";
    default:
        return "Internal Server Error";
    }
}