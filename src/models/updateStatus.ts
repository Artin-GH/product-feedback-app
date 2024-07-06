import mongoose from "mongoose";

export interface IUpdateStatus extends mongoose.Document {
  value: string;
  description: string;
}

export interface IUpdateStatusProps {
  id: string;
  value: string;
  description?: string;
}

const UpdateStatusSchema = new mongoose.Schema<IUpdateStatus>({
  value: {
    type: String,
    enum: {
      values: ["Not-Planned", "Planned", "Live"],
      message: "{VALUE} is not supported",
    },
    required: [true, "Please provide the update status."],
    default: "Not-Planned",
  },
  description: {
    type: String,
    required: [true, "Please provide the description for the update status."],
  },
});

export default mongoose.models.UpdateStatus ||
  mongoose.model<IUpdateStatus>("UpdateStatus", UpdateStatusSchema);
