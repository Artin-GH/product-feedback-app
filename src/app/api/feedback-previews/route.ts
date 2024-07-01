import { getFeedbackProps } from "@/features/feedbacks";

export const revalidate = 0;

export async function GET() {
  const feedbackProps = await getFeedbackProps();
  return Response.json(feedbackProps);
}
