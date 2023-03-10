import { Request, Response, NextFunction } from 'express';
import Logging from '../library/Logging';
import { config } from '../config/config';
import jwt from 'jsonwebtoken';

const NAMESPACE = "Auth";

const extractJWT = (req: Request, res: Response, next: NextFunction) => {
    Logging.info(`${NAMESPACE}, Validating Token`);

    let token = req.headers.authorization;

    if (token) {
        jwt.verify(token, config.server.token.secret, (error: any, decoded: any ) => {
            if (error) {
                return res.status(401).json({
                    message: error.message,
                    error
                });
            } else {
                res.locals.jwt = decoded;
                next();
            }
        });
    } else {
        return res.status(401).json({
            message: "Unauthorized"
        })
    }
};

export default extractJWT;