import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Question from "../models/Question";

const createQuestion = ( req: Request, res: Response, next: NextFunction ) => {
  const { text, point, category, answer } = req.body;

  const question = new Question({
    _id: new mongoose.Types.ObjectId(),
    text,
    point,
    category,
    answer,
  });

  return question.save()
    .then((question) => res.status(201).json({ question }))
    .catch((error) => res.status(500).json({ error }));
};

const readQuestion = ( req: Request, res: Response, next: NextFunction ) => {
  const questionId = req.params.questionId;

  return Question.findById(questionId)
    .then((question) => (question ? res.status(200).json({ question }) : res.status(404)
    .json({ message: 'Not found'})))
    .catch((error) => res.status(500).json({ error }));
};

const readAllQuestions = ( req: Request, res: Response, next: NextFunction ) => {
  return Question.find()
    .then((questions) => res.status(200).json({ questions }))
    .catch((error) => res.status(500).json({ error }));
};

const questionsByCategory = ( req: Request, res: Response, next: NextFunction ) => {
  return Question.find().where({category: req.params.category})
    .then((questions) => res.status(200).json({ questions }))
    .catch((error) => res.status(500).json({ error }));
};

const updateQuestion = ( req: Request, res: Response, next: NextFunction ) => {
  const questionId = req.params.questionId;

  return Question.findById(questionId)
    .then((question) => {
      if (question) {
        question.set(req.body);

        return question.save()
          .then((question) => res.status(201).json({ question }))
          .catch((error) => res.status(500).json({ error }));
      } else {
        res.status(404).json({ message: 'Not found'});
      }
    })
    .catch((error) => res.status(500).json({ error }));
};
const deleteQuestion = ( req: Request, res: Response, next: NextFunction ) => {
  const questionId = req.params.questionId;

  return Question.findByIdAndDelete(questionId)
    .then((question) => (question ? res.status(201).json({ message: 'deleted' }) : res.status(404)
    .json({ message: 'Not found'})))
    .catch((error) => res.status(500).json({ error }));
};

export default { createQuestion, readAllQuestions, readQuestion, questionsByCategory, updateQuestion, deleteQuestion };