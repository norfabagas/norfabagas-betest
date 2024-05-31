import { NextFunction, Request, Response } from "express";
import { checkPassword, hashPassword, jwtDecode, jwtSign, SuccessResponse } from "../../helpers/helper";
import BadRequestException from "../../exceptions/BadRequestException";
import { User } from "../../entity/user.entity";
import { connect } from "../../config/redisConnection";
import NotFoundException from "../../exceptions/NotFoundException";
import UserData from "../../types/user.type";

export const index = async (req: any, res: Response, next: NextFunction) => {
    try {
        const user = req.body['user'];
        await SuccessResponse(
            req, 
            res, 
            { message: `Hello : ${user.userName}` },
            200
        );
    } catch (err) {
        next(err);
    }
}

export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const existingUser = await User.findOne({
            emailAddress: req.body['emailAddress'],
        }).exec();

        if (existingUser) {
            throw new BadRequestException("User already exists");
        }
        
        const user = new User({
            userName: req.body['userName'],
            accountNumber: req.body['accountNumber'],
            emailAddress: req.body['emailAddress'],
            identityNumber: req.body['identityNumber'],
            password: hashPassword(req.body['password']),
        })

        await user.save();

        const userData: UserData = {
            userName: user.userName,
            emailAddress: user.emailAddress,
            accountNumber: user.accountNumber,
            identityNumber: user.identityNumber
        };

        (await connect()).set(user.id, JSON.stringify(userData));

        await SuccessResponse(
            req, 
            res, 
            { message: `user: created` },
            200
        );
    } catch (err) {
        next(err);
    }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const existingUser = await User.findOne({
            emailAddress: req.body['emailAddress'],
        })
        .exec();

        const id = existingUser?._id;
        const password = `${existingUser?.password}`;

        if (!existingUser) {
            throw new BadRequestException("User not found");
        }

        if (!checkPassword(req.body['password'], password)) {
            throw new BadRequestException("Password not match");
        }

        const token = jwtSign(id);

        await SuccessResponse(
            req, 
            res, 
            { token },
            200
        );
    } catch (err) {
        next(err);
    }
}

export const getUserByAccountNumber = async (req: any, res: Response, next: NextFunction) => {
    try {
        const user = await User.findOne({ accountNumber: req.body['accountNumber'] }).exec();
        if (!user) {
            throw new NotFoundException("User not found");
        }

        const userData: UserData = {
            userName: user.userName,
            emailAddress: user.emailAddress,
            accountNumber: user.accountNumber,
            identityNumber: user.identityNumber
        };

        await SuccessResponse(
            req, 
            res, 
            userData,
            200
        );
    } catch (err) {
        next(err);
    }
}

export const getUserByIdentityNumber = async (req: any, res: Response, next: NextFunction) => {
    try {
        const user = await User.findOne({ identityNumber: req.body['identityNumber'] }).exec();
        if (!user) {
            throw new NotFoundException("User not found");
        }

        const userData: UserData = {
            userName: user.userName,
            emailAddress: user.emailAddress,
            accountNumber: user.accountNumber,
            identityNumber: user.identityNumber
        };

        await SuccessResponse(
            req, 
            res, 
            userData,
            200
        );
    } catch (err) {
        next(err);
    }
}