import mongoose from "mongoose";

const promptResultModal = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, required: true },
    ideaId: { type: mongoose.Schema.Types.ObjectId, required: true },
    promptName: { type: String, required: true },
    data: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("promptResult", promptResultModal);
