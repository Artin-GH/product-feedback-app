import dbConnect from "@/dbConnect";
import Feedback, { IFeedback, IFeedbackProps } from "@/models/feedback";
import { Types } from "mongoose";
import { cache } from "react";
import { getCategoryById } from "./categories";

export const getFeedbackProps = cache(async () => {
  await dbConnect();
  const feedbacks = await getFeedbacks();
  const feedbackProps: IFeedbackProps[] = [];
  for (const feedback of feedbacks) {
    const categoryName = (await getCategoryById(feedback.category))!.name;
    const commentCount = 2;
    const upvoteCount = 112;
    feedbackProps.push({
      id: feedback.id!,
      title: feedback.title,
      details: feedback.details,
      categoryName,
      upvoteCount,
      commentCount,
    });
  }
  return feedbackProps;
});

export const getFeedbacks = cache(async () => {
  await dbConnect();
  return (await Feedback.find({})) as IFeedback[];
});

export const getFeedbackById = cache(async (id: Types.ObjectId | string) => {
  await dbConnect();
  try {
    id = new Types.ObjectId(id);
    return await Feedback.findById<IFeedback>(id);
  } catch (err) {
    console.error(err);
    return null;
  }
});
