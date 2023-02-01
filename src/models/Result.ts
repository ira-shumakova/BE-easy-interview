import mongoose, { Schema } from "mongoose";

export interface IAnswer {
   text: string;
   point: number;
   answerPoints: number;
   category: string;
   answer: string;
};

export interface IResult {
    answerArray: IAnswer[];
    startedAt: number;
    endedAt: number;
    title: string;
    candidateId: string;
};

export interface IResultModel extends IResult, Document {};

const ResultSchema: Schema = new Schema(
    {
        answerArray: { type: Array, required: true },
        startedAt: { type: Number, required: true },
        endedAt: { type: Number, required: true },
        title: { type: String, required: true },
        candidateId: { type: Schema.Types.ObjectId, required: true, ref: 'Candidate' },
    },
    {
        versionKey: false,
        timestamps: true,
    }
)

export default mongoose.model<IResult>('Result', ResultSchema);