import mongoose, { Document, Schema } from "mongoose";

export interface IQuestion {
  text: string;
  point: number;
  category: string;
  answer: string;
}

export interface IQuestionModel extends IQuestion, Document {};

const QuestionSchema: Schema = new Schema(
  {
    text: { type: String, required: true },
    point: { type: Number, required: true },
    category: { type: String, required: true },
    answer: { type: String, required: true},
  },
  {
    versionKey: false,
  }
);

export default mongoose.model<IQuestion>('Question', QuestionSchema);
