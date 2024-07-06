import GoBack from "@/components/GoBack";
import styles from "./Roadmap.module.css";
import { cls } from "@/helpers";
import AddBtn from "@/components/AddBtn";
import { getFeedbacks } from "@/features/feedbacks";
import { IFeedbackProps } from "@/models/feedback";
import { getUpdateStatusById } from "@/features/updateStatuses";
import { getCategoryById } from "@/features/categories";
import ArrowUpIcon from "public/shared/icon-arrow-up.svg";
import CommentIcon from "public/shared/icon-comments.svg";
import Link from "next/link";

export const revalidate = 3600;
type OrderedFeedbacks = {
  [key: string]: {
    description: string;
    feedbacks: IFeedbackProps[];
  };
};

export default async function Roadmap() {
  const feedbacks = await getFeedbacks();
  const orderedFeedbacks: OrderedFeedbacks = {
    Planned: { description: "", feedbacks: [] },
    "In-Progress": { description: "", feedbacks: [] },
    Live: { description: "", feedbacks: [] },
  };
  for (const feedback of feedbacks) {
    const updateStatus = (await getUpdateStatusById(feedback.updateStatus))!;
    const feedbacks = orderedFeedbacks[updateStatus.value]?.feedbacks;
    if (!feedbacks) continue;
    orderedFeedbacks[updateStatus.value].description = updateStatus.description;
    feedbacks.push({
      id: feedback.id!,
      commentCount: 6,
      upvoteCount: 99,
      title: feedback.title,
      details: feedback.details,
      categoryName: (await getCategoryById(feedback.category))!.name,
    });
  }
  const orderedFeedbackEntries = Object.entries(orderedFeedbacks);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <GoBack isDark />
          <h1 className={cls("heading-xl", styles.title)}>Roadmap</h1>
        </div>
        <AddBtn />
      </header>
      <main className={styles.main}>
        {orderedFeedbackEntries.map(([updateStatus], i) => (
          <input
            type="radio"
            value={updateStatus}
            id={updateStatus}
            name="tab"
            defaultChecked={i === 1}
            key={i}
          />
        ))}
        <ul className={cls("heading-sm-mobile", styles.togglers)}>
          {orderedFeedbackEntries.map(([updateStatus], i) => (
            <label
              htmlFor={updateStatus}
              className={cls(styles.tabToggler, `status-${updateStatus}`)}
              key={i}
            >
              {updateStatus} ({orderedFeedbacks[updateStatus].feedbacks.length})
            </label>
          ))}
        </ul>
        <div className={styles.tabs}>
          {orderedFeedbackEntries.map(([updateStatus, feedbackList], i) => (
            <RoadmapFeedback
              value={updateStatus}
              feedbacks={orderedFeedbacks}
              description={feedbackList.description}
              key={i}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

const RoadmapFeedback: React.FC<{
  value: string;
  feedbacks: OrderedFeedbacks;
  description: string;
}> = async (props) => {
  return (
    <div
      aria-label={props.value}
      className={cls(styles.tab, `status-${props.value}`)}
    >
      <h1 className={styles.tabHeading}>{props.value}</h1>
      <p className={cls("body-sm", styles.tabDescription)}>
        {props.description}
      </p>
      <div className={styles.tabFeedbacks}>
        {props.feedbacks[props.value].feedbacks.map((feedback, i) => (
          <Link
            href={`/feedback/${feedback.id}`}
            key={i}
            className={styles.tabFeedback}
          >
            <div className={styles.tabFeedbackStrip}></div>
            <div className={styles.tabFeedbackTag}>
              <div className={styles.tabFeedbackTagCircle}></div>
              <span className={styles.tabFeedbackTagName}>{props.value}</span>
            </div>
            <h2 className={styles.tabFeedbackTitle}>{feedback.title}</h2>
            <div className={styles.tabFeedbackDetailsCon}>
              <p className={styles.tabFeedbackDetails}>{feedback.details}</p>
            </div>
            <div className={cls("badge", styles.tabFeedbackCategory)}>
              {feedback.categoryName}
            </div>
            <div className={styles.tabFeedbackBottom}>
              <div className={cls("upvote")}>
                <span className={cls("upvoteArrow")}>
                  <ArrowUpIcon />
                </span>
                <span className={cls("upvoteCount")}>
                  {feedback.upvoteCount}
                </span>
              </div>
              <div className={styles.tabFeedbackComment}>
                <span className={styles.tabFeedbackCommentIcon}>
                  <CommentIcon />
                </span>
                <span className={styles.tabFeedbackCommentCount}>
                  {feedback.commentCount}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
