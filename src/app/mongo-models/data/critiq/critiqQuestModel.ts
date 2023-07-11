import mongoose, { Schema, Document } from "mongoose";
import { WhiteModels } from "@failean/shared-types";

type WhiteCritiq = WhiteModels.Data.Critiq.WhiteCritiq;

interface Answer {
  question: string;
  selectedOption: string;
}

interface CritiqDocument extends Document, WhiteCritiq {
  ideaID: string;
  owner: Schema.Types.ObjectId;
  failScore: number;
  leanScore: number;
  answers: Answer[];
  archived: boolean;
}

const answerSchema = new mongoose.Schema<Answer>(
  {
    question: { type: String, required: true },
    selectedOption: { type: String, required: true },
  },
  { _id: false }
);

const critiqSchema = new mongoose.Schema<CritiqDocument>(
  {
    ideaID: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, required: true },
    failScore: { type: Number, required: true },
    leanScore: { type: Number, required: true },
    answers: [answerSchema],
    archived: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<CritiqDocument>("Critiq", critiqSchema);
