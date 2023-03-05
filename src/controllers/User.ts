import { NextFunction, Request, Response } from "express";
import Logging from "../library/Logging";
import bcryptjs from 'bcryptjs';
import User from "../models/User";
import signJWT from "../middleware/singJWT";
import mongoose from "mongoose";

const NAMESPACE = "User";

const validateToken = ( req: Request, res: Response, next: NextFunction ) => {
    Logging.info(`${NAMESPACE}, "Token validated, user authorized"`);

    return res.status(200).json({
        message: "User authorized"
    });
};

const register = ( req: Request, res: Response, next: NextFunction ) => {
    let { username, password, email } = req.body;

    bcryptjs.hash(password, 10, (hashError, hash) => {
        if(hashError) {
            return res.status(500).json({
                message: hashError.message,
                error: hashError
            });
        }

        const _user = new User({
            _id: new mongoose.Types.ObjectId(),
            username,
            email,
            password: hash
        });

        return _user.save()
            .then(user => {
                return res.status(201).json({ user });
            })
            .catch(error => {
                return res.status(500).json({
                    message: error.message,
                    error
                })
            })
    })
};

const login = ( req: Request, res: Response, next: NextFunction ) => {
    let { username, password } = req.body;

    User.find({username})
        .exec()
        .then(users => {
            if (users.length !== 1) {
                return res.status(401).json({
                    message: "Unauthorized"
                });
            }
            
            bcryptjs.compare(password, users[0].password, (error, result) => {
                if (error) {
                    Logging.error(`${NAMESPACE}, ${error.message}, ${error}`);

                    return res.status(401).json({
                        message: "Unauthorized"
                    });
                } else if (result) {
                    signJWT(users[0], (error, token) => {
                        if (error) {

                            Logging.error(`${NAMESPACE}, Unable to sign token , ${error}`);

                            return res.status(401).json({
                                message: "Unauthorized",
                                error: error
                            });
                        } else if (token) {
                            return res.status(200).json({
                                message: "Auth successful",
                                token,
                                user: users[0]
                            });
                        }
                    });
                } else if (password != users[0].password) {
                    return res.status(401).json({
                        message: "Unauthorized"
                    })
                }
            });
        })
        .catch(error => {
            return res.status(500).json({
                message: error.message,
                error
            })
        })
};


export default { validateToken, register, login }