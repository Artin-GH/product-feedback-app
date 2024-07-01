import mongoose from "mongoose";

export interface IFeedback extends mongoose.Document {
  title: string;
  details: string;
  category: mongoose.Types.ObjectId;
  updateStatus: mongoose.Types.ObjectId;
}

export interface IFeedbackProps {
  id: string;
  title: string;
  details: string;
  categoryName: string;
  upvoteCount: number;
  commentCount: number;
}

const FeedbackSchema = new mongoose.Schema<IFeedback>({
  title: {
    type: String,
    required: [true, "The title field is required."],
    maxlength: [70, "The title cannot be more than 70 characters"],
  },
  details: {
    type: String,
    required: [true, "The details field is required."],
    maxlength: [170, "The details cannot be more than 170 characters"],
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: [true, "The category field is required."],
  },
  updateStatus: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UpdateStatus",
    required: false,
    default: new mongoose.Types.ObjectId("6680740bded549b923ec8987"),
  },
});

export default mongoose.models.Feedback ||
  mongoose.model<IFeedback>("Feedback", FeedbackSchema);
