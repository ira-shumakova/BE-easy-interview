import mongoose, { Schema } from "mongoose";

export interface ICandidate {
    username: string;
    position: string;
    linkedinUrl: string;
    feedback: string;
    avatarUrl: string;
}

export interface ICandidateModel extends ICandidate, Document {};

const CandidateSchema: Schema = new Schema(
    {
        username: { type: String, required: true },
        position: { type: String, required: true },
        linkedinUrl: { type: String, required: false },
        feedback: {type: String, required: false },
        avatarUrl: { type: String, required: false },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

export default mongoose.model<ICandidate>('Candidate', CandidateSchema);