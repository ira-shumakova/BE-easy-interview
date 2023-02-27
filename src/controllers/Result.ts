import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Result from "../models/Result";

const createResult = ( req: Request, res: Response, next: NextFunction ) => {
  const {answerArray, startedAt, endedAt, title, resultPoints, candidateId } = req.body;

  const result = new Result({
    _id: new mongoose.Types.ObjectId(),
    answerArray, 
    startedAt, 
    endedAt, 
    title,
    resultPoints,
    candidateId,
  });

  return result.save()
    .then((result) => res.status(201).json({ result }))
    .catch((error) => res.status(500).json({ error }));
};

const readResult = ( req: Request, res: Response, next: NextFunction ) => {
  const resultId = req.params.resultId;

  return Result.find().where({ _id: resultId })
    .populate('candidateId')
    .then((result) => (result ? res.status(200).json({ result }) : res.status(404)
    .json({ message: 'Not found'})))
    .catch((error) => res.status(500).json({ error }));
};

const readAllResults = ( req: Request, res: Response, next: NextFunction ) => {
  return Result.find()
    .populate('candidateId')
    .then((result) => res.status(200).json({ result }))
    .catch((error) => res.status(500).json({ error }));
};

const resultsByCandidate = ( req: Request, res: Response, next: NextFunction ) => {
  return Result.find().where({candidateId: req.params.candidateId})
    .populate('candidateId')
    .then((result) => res.status(200).json({ result }))
    .catch((error) => res.status(500).json({ error }));
};

const deleteResult = ( req: Request, res: Response, next: NextFunction ) => {
  const resultId = req.params.resultId;

  return Result.findByIdAndDelete(resultId)
    .then((result) => (result ? res.status(201).json({ message: 'deleted' }) : res.status(404)
    .json({ message: 'Not found'})))
    .catch((error) => res.status(500).json({ error }));
};

const lastResult = ( req: Request, res: Response, next: NextFunction ) => {
  return Result.findOne().sort({"createdAt": -1})
    .populate('candidateId')
    .then((result) => res.status(200).json({ result }))
    .catch((error) => res.status(500).json({ error }));
}

export default { createResult, readAllResults, readResult, resultsByCandidate, lastResult, deleteResult };