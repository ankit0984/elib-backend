import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";

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
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
        const error = createHttpError(400, "All fields are required");
        return next(error);
    }

    if (!validateEmail(email)) {
        const error = createHttpError(400, "Invalid email address");
        return next(error);
    }

    if (!validateUsername(name)) {
        const error = createHttpError(400, "Invalid username. Username must contain at least one letter and one number.");
        return next(error);
    }

    if (!validatePassword(password)) {
        const error = createHttpError(400, "Weak password. Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.");
        return next(error);
    }

    // <-- simple validation technique -->
    // if (!name || !email || !password) {
    //     const error = createHttpError(400, "All fielda are required")
    //     return next(error)

    // }

    // Process
    // Response
    res.json("User Created");
};

export { createUser };

