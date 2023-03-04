import jwt from 'jsonwebtoken';
import { config } from '../config/config';
import Logging from '../library/Logging';
import { IUser } from '../models/User';

const NAMESPACE = "Auth";

const signJWT = (user: IUser, callback: (error: Error | null, token: string | null) => void): void => {
    const timeSinceEpoch = new Date().getTime();
    const expirationTime = timeSinceEpoch + Number(config.server.token.expireTime) * 10000;
    const expirationTimeInSeconds = Math.floor(expirationTime /1000 );

    Logging.info(`${NAMESPACE}, Attempting to sing token for ${user.username}`);

    try {
        jwt.sign(
            {
                username: user.username
            },
            config.server.token.secret,
            {
                issuer: config.server.token.issuer,
                algorithm: "HS256",
                expiresIn: expirationTimeInSeconds
            },
            (error, token) => {
                if (error) 
                {
                    callback(error, null);
                } else if (token) {
                    callback(null, token);
                }
            }
        ) 
    } catch (error) {
        Logging.error(`${NAMESPACE}, ${(error as Error).message} , ${error}`);
        callback(error as Error, null)
    }
}

export default signJWT;