import { NextFunction, Request, Response } from "express";
import UnauthorizedException from "../exceptions/UnauthorizedException";
import { connect } from "../config/redisConnection";
import { jwtDecode } from "../helpers/helper";
import BadRequestException from "../exceptions/BadRequestException";
import { User } from "../entity/user.entity";
import InternalServerErrorException from "../exceptions/InternalServerErrorException";
const jwt = require("jsonwebtoken");
import UserData from "../types/user.type";

export const verifyToken = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        
    } catch (err) {
        next(err);
    }
    const authHeaders = req.headers['authorization'];
    const token = authHeaders && authHeaders.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET || 'secret', async (err: string | undefined, parsed: {data: string, iat: number, exp: number}) => {
            if (err) {
                throw new UnauthorizedException(err);
            }
            const id = parsed?.data;
            const redis = await connect();
            const user = await redis.get(id);
            if (user !== null) {
                req.body['user'] = JSON.parse(user);
            } else {
                const user = await User.findOne({ _id: id }).exec();
                if (user) {
                    const userData: UserData = {
                        userName: user.userName,
                        accountNumber: user.accountNumber,
                        emailAddress: user.emailAddress,
                        identityNumber: user.identityNumber
                    };

                    req.body['user'] = userData;
                    (await connect()).set(id, JSON.stringify(req.body['user']));
                } else {
                    throw new BadRequestException("Token invalid");
                }
            }
            next();
    });
}