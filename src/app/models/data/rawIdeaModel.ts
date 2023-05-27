import mongoose from "mongoose";

const rawIdeaModal = new mongoose.Schema(
  {
    parent: { type: mongoose.Schema.Types.ObjectId, required: true },
    rawIdea: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("rawIdea", rawIdeaModal);
