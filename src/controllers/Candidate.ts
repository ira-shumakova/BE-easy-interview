import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Candidate from "../models/Candidate";

const createCandidate = ( req: Request, res: Response, next: NextFunction) => {
    const { username, position, linkedinUrl,
        feedback, avatarUrl, createdAt
    } = req.body;

    const candidate = new Candidate({
        _id: new mongoose.Types.ObjectId(),
        username,
        position,
        linkedinUrl,
        feedback,
        avatarUrl,
    });

    return candidate.save()
        .then((candidate) => res.status(201).json({ candidate }))
        .catch((error) => res.status(500).json({ error }));
};

const readCandidate = ( req: Request, res: Response, next: NextFunction ) => {
    const candidateId = req.params.candidateId;

    return Candidate.findById(candidateId)
        .then((candidate) => (candidate ? res.status(200).json({ candidate }) : res.status(404)
        .json({ message: 'Not found' })))
        .catch((error) => res.status(500).json({ error }));
};

const readAllCandidates = ( req: Request, res: Response, next: NextFunction ) => {
    return Candidate.find()
        .then(( candidates ) => res.status(200).json({ candidates }))
        .catch((error) => res.status(500).json({ error }));
};

const updateCandidate = ( req: Request, res: Response, next: NextFunction ) => {
    const candidateId = req.params.candidateId;

    return Candidate.findById(candidateId)
    .then((candidate) => {
      if (candidate) {
        candidate.set(req.body);

        return candidate.save()
          .then((candidate) => res.status(201).json({ candidate }))
          .catch((error) => res.status(500).json({ error }));
      } else {
        res.status(404).json({ message: 'Not found'});
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

const deleteCandidate = ( req: Request, res: Response, next: NextFunction ) => {
    const candidateId = req.params.candidateId;

    return Candidate.findByIdAndDelete(candidateId)
        .then((candidate) => (candidate ? res.status(201).json({ message: 'deleted' }) : res.status(404)
        .json({ message: 'Not found'})))
        .catch((error) => res.status(500).json({ error }));
};

export default { createCandidate, readAllCandidates, readCandidate, updateCandidate, deleteCandidate };