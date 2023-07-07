import mongoose, { Schema, Document } from "mongoose";
import { WhiteModels } from "@failean/shared-types";

type WhiteCritiq = WhiteModels.Data.Critiq.WhiteCritiq;

interface Answer {
  question: string;
  selectedOption: string;
  failingScore: number;
  leanScore: number;
}

interface Step {
  title: string;
  answers: Answer[];
}

interface CritiqDocument extends Document, WhiteCritiq {
  steps: Step[];
}

const answerSchema = new mongoose.Schema<Answer>(
  {
    question: { type: String, required: true },
    selectedOption: { type: String, required: true },
    failingScore: { type: Number, required: true },
    leanScore: { type: Number, required: true },
  },
  { _id: false }
);

const stepSchema = new mongoose.Schema<Step>(
  {
    title: { type: String, required: true },
    answers: [answerSchema],
  },
  { _id: false }
);

const critiqSchema = new mongoose.Schema<CritiqDocument>(
  {
    owner: { type: Schema.Types.ObjectId, required: true },
    steps: [stepSchema],
    archived: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<CritiqDocument>("Critiq", critiqSchema);
