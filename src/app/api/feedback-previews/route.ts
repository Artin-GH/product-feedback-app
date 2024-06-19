import { getFeedbackPreviews } from "@/features/feedbacks";

export const revalidate = 0;

export async function GET() {
  const feedbackPreviews = await getFeedbackPreviews();
  return Response.json(feedbackPreviews);
}
