import dbConnect from "@/dbConnect";
import { IFeedback } from "@/models/feedback";
import styles from "./Feedback.module.css";
import GoBack from "@/components/GoBack";
import Link from "next/link";
import { cls } from "@/helpers";
import { FeedbackPreview } from "@/app/Feedbacks";
import { getFeedbackById, getFeedbacks } from "@/features/feedbacks";
import { getCategoryById } from "@/features/categories";
import { notFound } from "next/navigation";

export const revalidate = 3600;

export default async function Feedback({ params }: { params: { id: string } }) {
  await dbConnect();
  const feedback = await getFeedbackById(params.id);
  if (!feedback) notFound();
  const category = await getCategoryById(feedback.category);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <GoBack />
        <Link
          href={`/edit-feedback/${params.id}`}
          className={cls("btn btn-royal-blue", styles.btnEdit)}
        >
          Edit Feedback
        </Link>
      </div>
      <FeedbackPreview
        feedback={{
          id: feedback.id!,
          title: feedback.title,
          details: feedback.details,
          upvoteCount: 99,
          commentCount: 6,
          categoryName: category!.name,
        }}
      />
    </div>
  );
}

export async function generateStaticParams() {
  await dbConnect();
  const feedbacks: IFeedback[] = await getFeedbacks();

  return feedbacks.map((feedback) => ({
    id: feedback.id!,
  }));
}
