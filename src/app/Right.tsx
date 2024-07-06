"use client";
import NavIcon from "public/suggestions/icon-suggestions.svg";
import ArrowDownIcon from "public/shared/icon-arrow-down.svg";
import Link from "next/link";
import IconCheck from "public/shared/icon-check.svg";
import Feedbacks from "./Feedbacks";
import styles from "./styles/Index.module.css";
import { IFeedbackProps } from "@/models/feedback";
import AddBtn from "@/components/AddBtn";

const Right: React.FC<{ feedbacks: IFeedbackProps[] }> = ({ feedbacks }) => {
  return (
    <div className={styles.right}>
      <header className={styles.header}>
        <span className={styles.headerIcon}>
          <NavIcon />
        </span>
        <h3 className={`heading-md ${styles.headerTitle}`}>6 Suggestions</h3>
        <div className={styles.headerSortCon}>
          <div className={styles.headerSort} tabIndex={0}>
            <span className={`${styles.headerSortLeft} heading-sm`}>
              Sort by :&nbsp;
            </span>
            <div className={styles.headerSortRight}>
              <h4 className={`${styles.headerSortBold} heading-sm`}>
                Most Upvotes
              </h4>
            </div>
            <span className={styles.headerSortArrow}>
              <ArrowDownIcon />
            </span>
            <ul className={`body-lg ${styles.headerSortDropMenu}`}>
              <li className={`${styles.headerSortDropMenuItem} selected`}>
                <Link href="#" className={styles.headerSortDropMenuLink}>
                  Most Upvotes
                </Link>
                <span className={styles.headerSortDropMenuItemTick}>
                  <IconCheck />
                </span>
              </li>
              <li className={styles.headerSortDropMenuItem}>
                <Link href="#" className={styles.headerSortDropMenuLink}>
                  Least Upvotes
                </Link>
                <span className={styles.headerSortDropMenuItemTick}>
                  <IconCheck />
                </span>
              </li>
              <li className={styles.headerSortDropMenuItem}>
                <Link href="#" className={styles.headerSortDropMenuLink}>
                  Most Comments
                </Link>
                <span className={styles.headerSortDropMenuItemTick}>
                  <IconCheck />
                </span>
              </li>
              <li className={styles.headerSortDropMenuItem}>
                <Link href="#" className={styles.headerSortDropMenuLink}>
                  Least Comments
                </Link>
                <span className={styles.headerSortDropMenuItemTick}>
                  <IconCheck />
                </span>
              </li>
            </ul>
          </div>
          <i className={styles.headerSortDropMenuCloser} tabIndex={0}></i>
        </div>
        <AddBtn className={styles.headerAddBtn} />
      </header>
      <main className={styles.feedbackCon}>
        <Feedbacks feedbacks={feedbacks} />
      </main>
    </div>
  );
};

export default Right;
