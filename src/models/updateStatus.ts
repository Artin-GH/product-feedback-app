import mongoose from "mongoose";

export interface IUpdateStatus extends mongoose.Document {
  value: string;
}

export interface IUpdateStatusProps {
  id: string;
  value: string;
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
});

export default mongoose.models.UpdateStatus ||
  mongoose.model<IUpdateStatus>("UpdateStatus", UpdateStatusSchema);
