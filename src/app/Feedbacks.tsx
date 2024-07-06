"use client";
import { IFeedbackProps } from "@/models/feedback";
import styles from "./styles/Feedbacks.module.css";
import IconArrowUp from "public/shared/icon-arrow-up.svg";
import IconComments from "public/shared/icon-comments.svg";
import { cls } from "@/helpers";
import Link from "next/link";

export default function Feedbacks({
  feedbacks,
}: {
  feedbacks: null | IFeedbackProps[];
}) {
  return (
    <>
      {feedbacks
        ? feedbacks.map((feedback, i) => (
            <FeedbackPreview key={i} feedback={feedback} />
          ))
        : [1, 2, 3, 4, 5].map((i) => (
            <div className={cls(styles.feedback, "skeleton")} key={i}></div>
          ))}
    </>
  );
}

export const FeedbackPreview: React.FC<{ feedback: IFeedbackProps }> = ({
  feedback,
}) => {
  return (
    <Link className={styles.feedback} href={`/feedback/${feedback.id}`}>
      <button className={cls("upvote upvoteResponsive", styles.upvote)}>
        <span className={cls("upvoteArrow")}>
          <IconArrowUp />
        </span>
        <span className={cls(styles.upvoteCount, "upvoteCount")}>
          {feedback.upvoteCount}
        </span>
      </button>
      <div className={styles.content}>
        <h1 className={`heading-md ${styles.contentTitle}`}>
          {feedback.title}
        </h1>
        <p className={`body-lg ${styles.contentDesc}`}>{feedback.details}</p>
        <span className={`badge ${styles.contentTag}`}>
          {feedback.categoryName}
        </span>
      </div>
      <div className={styles.comments}>
        <span>
          <IconComments />
        </span>
        <span className={styles.commentsCount}>{feedback.commentCount}</span>
      </div>
    </Link>
  );
};
