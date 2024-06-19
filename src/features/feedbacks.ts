import dbConnect from "@/dbConnect";
import Category, { ICategory } from "@/models/category";
import Feedback, { IFeedback, IFeedbackPreview } from "@/models/feedback";
import { cache } from "react";

export const getFeedbackPreviews = cache(async () => {
  await dbConnect();
  const feedbacks = (await Feedback.find({})) as IFeedback[];
  const feedbackPreviews: IFeedbackPreview[] = [];
  for (const feedback of feedbacks) {
    const categoryName = (
      (await Category.findById(feedback.category)) as ICategory
    ).name;
    const commentCount = 2;
    const upvoteCount = 112;
    feedbackPreviews.push({
      id: feedback.id!,
      title: feedback.title,
      details: feedback.details,
      categoryName,
      upvoteCount,
      commentCount,
    });
  }
  return feedbackPreviews;
});
