import { Request, Response } from "express";
import { genSaltSync, hashSync, compareSync } from "bcrypt";

const jwt = require("jsonwebtoken");

export const SuccessResponse = async (
    req: Request, 
    res: Response, 
    data: any, 
    status: number = 200, 
    pagination?: PaginationData
): Promise<Response> => {
    return res
        .status(status)
        .json({
            meta: {
                status,
                pagination
            },
            data: data
        })
}

export const ErrorResponse = async (
    req: Request,
    res: Response,
    err: any,
    status: number = 500
): Promise<Response> => {
    return res
        .status(status)
        .json({
            meta: {
                status
            },
            err
        })
}

export interface PaginationData {
    total: number,
    page: number,
    perPage: number
}

export const hashPassword = (text: string): any => {
    const salt = genSaltSync(10);
    return hashSync(text, salt);
}

export const checkPassword = (text: string, encrypted: string): boolean => {
    return compareSync(text, encrypted);
}

export const jwtSign = (paylaod: any): string => {
    return jwt.sign({
        data: paylaod
    }, process.env.JWT_SECRET, { expiresIn: '1h' });
}

export const jwtDecode = (token: string): any => {
    let data: any = {};
    jwt.verify(token, process.env.JWT_SECRET || 'secret', (err: string | undefined, user: any) => {
        data = user;
    });

    return data;
}