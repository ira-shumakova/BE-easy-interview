import Joi, { ObjectSchema } from "joi";
import { NextFunction, Response, Request } from 'express';
import Logging from "../library/Logging";
import { IQuestion } from '../models/Question';
import { ICandidate } from "../models/Candidate";
import { IResult } from "../models/Result";

export const ValidateSchema = ( schema: ObjectSchema ) => {
    return async ( req: Request, res: Response, next: NextFunction ) => {
        try {
            await schema.validateAsync(req.body);
            next();
        } catch(error) {
            Logging.error(error);
            return res.status(422).json({ error });
        }
    };
};

export const Schemas = {
    question: {
        create: Joi.object<IQuestion>({
            text: Joi.string().min(5).max(150).required(),
            point: Joi.number().positive().integer().min(1).max(5).required(),
            category: Joi.string().required(),
            answer: Joi.string().min(5).max(250).required(),
        }),
        update: Joi.object<IQuestion>({
            text: Joi.string().min(5).max(150).required(),
            point: Joi.number().positive().integer().min(1).max(5).required(),
            category: Joi.string().required(),
            answer: Joi.string().min(5).max(250).required(),
        }),
    },
    candidate: {
        create: Joi.object<ICandidate>({
            username: Joi.string().min(5).max(50).required(),
            position: Joi.string().min(5).max(50).required(),
            linkedinUrl: Joi.string().max(256).uri().allow('', null),
            feedback: Joi.string().max(250).allow('', null),
            avatarUrl: Joi.string().uri().allow('', null),
        }), 
        update: Joi.object<ICandidate>({
            username: Joi.string().min(5).max(50).required(),
            position: Joi.string().min(5).max(50).required(),
            linkedinUrl: Joi.string().max(256).uri().allow('', null),
            feedback: Joi.string().max(250).allow('', null),
            avatarUrl: Joi.string().uri().allow('', null),
        }),
    },
    result: {
        create: Joi.object<IResult>({
            answerArray: Joi.array().required(),
            startedAt: Joi.number().required(),
            endedAt: Joi.number().required(),
            title: Joi.string().required(),
            resultPoints: Joi.number().required(),
            candidateId: Joi.string().required(),
        }),
    }
}
