import styles from "./styles/Index.module.css";
import NavIcon from "public/suggestions/icon-suggestions.svg";
import ArrowDownIcon from "public/shared/icon-arrow-down.svg";
import PlusIcon from "public/shared/icon-plus.svg";
import Link from "next/link";
import IconCheck from "public/shared/icon-check.svg";
import SideBar from "./SideBar";
import FeedbackPreviews from "./FeedbackPreviews";
import { cache } from "react";
import dbConnect from "@/dbConnect";
import Category, { ICategoryProps } from "@/models/category";

export default async function Home() {
  const categories = await getCategories();
  return (
    <div className={styles.suggestions}>
      <div className={styles.row}>
        <SideBar categories={JSON.parse(JSON.stringify(categories))} />
        <div className={styles.right}>
          <header className={styles.header}>
            <span className={styles.headerIcon}>
              <NavIcon />
            </span>
            <h3 className={`heading-md ${styles.headerTitle}`}>
              6 Suggestions
            </h3>
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
            <button className={`btn btn-electro-violet ${styles.headerAddBtn}`}>
              <PlusIcon />
              &nbsp;
              <span>Add Feedback</span>
            </button>
          </header>
          <main className={styles.feedbackCon}>
            <FeedbackPreviews />
          </main>
        </div>
      </div>
    </div>
  );
}

const getCategories = cache(async () => {
  await dbConnect();
  const categories = await Category.find({}) as ICategoryProps[];
  return categories;
})
