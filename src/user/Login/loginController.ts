import { NextFunction, Request, Response } from 'express';
import userModel from '../Registration/userModel';
import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import { config } from '../../config/config';
import { sign } from 'jsonwebtoken';

const loginUser = async (req: Request, res: Response, next:NextFunction) => {

    const {username, email, password} = req.body;

    try {
        const user = await userModel.findOne({ $or: [{ email }, { username }] });
    // const user = await userModel.findOne({ email } );
    if (!user) {
        const error = createHttpError(404, "User not found");
        return next(error);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        const error = createHttpError(400, "Invalid credentials");
        return next(error);
    }

    let token = sign({ sub: user._id }, config.jwtsecret as string, { expiresIn: "1h" });

    res.json({ message: "Login successful" });
    } catch (error) {
        return res.json(createHttpError(500, "error while logging in user"));
    }
}

export { loginUser };