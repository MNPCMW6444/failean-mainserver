import mongoose, { Schema } from "mongoose";
import { WhiteModels } from "@failean/shared-types";

type WhiteCritiq = WhiteModels.Data.Critiq.WhiteCritiq;

interface Answer {
  question: string;
  selectedOption: string;
  additionalDetail?: string;
}

interface Step {
  title: string;
  answers: Answer[];
}

const answerSchema = new mongoose.Schema<Answer>(
  {
    question: { type: String, required: true },
    selectedOption: { type: String, required: true },
    additionalDetail: String,
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

const critiqSchema = new mongoose.Schema<WhiteCritiq>(
  {
    owner: { type: Schema.Types.ObjectId, required: true },
    steps: [stepSchema],
    archived: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<WhiteCritiq>("Critiq", critiqSchema);
