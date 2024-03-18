"use client";
import { IFeedbackPreview } from "@/models/feedback";
import styles from "./styles/FeedbackPreview.module.css";
import IconArrowUp from "public/shared/icon-arrow-up.svg";
import IconComments from "public/shared/icon-comments.svg";
import { useEffect, useState } from "react";
import { cls } from "@/helpers";

export default function FeedbackPreviews() {
  const [feedbacks, setFeedbacks] = useState<IFeedbackPreview[] | null>(null);
  useEffect(() => {
    fetch("/api/feedback-previews")
      .then((res) => res.json())
      .then((feedbacks) => {
        setFeedbacks(feedbacks);
      });
  });
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

const FeedbackPreview: React.FC<{ feedback: IFeedbackPreview }> = ({
  feedback,
}) => {
  return (
    <a className={styles.feedback} href="#">
      <button className={styles.upvote}>
        <span className={styles.upvoteArrow}>
          <IconArrowUp />
        </span>
        <span className={`heading-sm-mobile ${styles.upvoteCount}`}>
          {feedback.upvoteCount}
        </span>
      </button>
      <div className={styles.content}>
        <h1 className={`heading-md ${styles.contentTitle}`}>
          {feedback.title}
        </h1>
        <p className={`body-lg ${styles.contentDesc}`}>{feedback.details}</p>
        <span className={`body-sm ${styles.contentTag}`}>
          {feedback.categoryName}
        </span>
      </div>
      <div className={styles.comments}>
        <span>
          <IconComments />
        </span>
        <span className={styles.commentsCount}>{feedback.commentCount}</span>
      </div>
    </a>
  );
};
