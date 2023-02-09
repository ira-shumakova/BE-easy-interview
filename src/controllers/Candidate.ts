import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Candidate from "../models/Candidate";

const createCandidate = ( req: Request, res: Response, next: NextFunction) => {
    const { username, position, linkedinUrl,
        feedback, avatarUrl
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

const readCandidatesByPages = ( req: Request, res: Response, next: NextFunction ) => {
    const getRouterParam = (param: string | string[]): string =>
        Array.isArray(param) ? param[0] : param;
    let query = getRouterParam(req.params.page);

    const pageOptions = {
        page: Number(query)-1,
        limit: 8,
    }

    return Candidate.find()
        .skip(pageOptions.page * pageOptions.limit)
        .limit(pageOptions.limit)
        .exec(function (error, candidates) {
            if(error) { res.status(500).json(error); return; };
            res.status(200).json(candidates);
    });
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

const findCandidate = ( req: Request, res: Response, next: NextFunction ) => {
    return Candidate.find({"username": { $regex: req.params.username, $options: 'i'  } })
        .then((candidates) => res.status(200).json({ candidates }))
        .catch((error) => res.status(500).json({ error }));
}

export default { createCandidate, readAllCandidates, readCandidate, readCandidatesByPages, updateCandidate, deleteCandidate, findCandidate };