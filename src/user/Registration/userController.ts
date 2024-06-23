import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import userModel from "../Registration/userModel";
import bcrypt from "bcrypt";
import {sign} from "jsonwebtoken"; // Corrected import
import { config } from "../../config/config";

function validateEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
}

function validateUsername(username: string): boolean {
    const usernamePattern = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]+$/;
    return usernamePattern.test(username);
}

function validatePassword(password: string): boolean {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordPattern.test(password);
}

const createUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { name, username, email, password } = req.body;

    // Validation
    if (!name || !username || !email || !password) {
        const error = createHttpError(400, "All fields are required");
        return next(error);
    }

    if (!validateEmail(email)) {
        const error = createHttpError(400, "Invalid email address");
        return next(error);
    }

    if (!validateUsername(username)) {
        const error = createHttpError(400, "Invalid username. Username must contain at least one letter and one number.");
        return next(error);
    }

    if (!validatePassword(password)) {
        const error = createHttpError(400, "Weak password. Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.");
        return next(error);
    }

    try {
        // Check if user already exists
        const user = await userModel.findOne({ $or: [{ email }, { username }] });
        if (user) {
            const error = createHttpError(400, "User already exists");
            return next(error);
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 15);

        // Create the user
        const newUser = await userModel.create({
            name,
            username,
            email,
            password: hashedPassword
        });

        // Generate JWT token
        const token = sign({ sub: newUser._id }, config.jwtsecret as string, { expiresIn: "1h" });

        // Send response
        res.status(201).json({ message: "User created successfully"});
    } catch (err) {
        return next(createHttpError(500, "error while creating user."));
    }
};

export { createUser };

