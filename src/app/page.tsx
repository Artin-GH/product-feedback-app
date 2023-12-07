import styles from "./Index.module.css";
import Image from "next/image";
import NavIcon from "public/suggestions/icon-suggestions.svg";
import ArrowDownIcon from "public/shared/icon-arrow-down.svg";
import PlusIcon from "public/shared/icon-plus.svg";
import { cls } from "@/helpers";

export default function Home() {
  return (
    <div className={styles.suggestions}>
      <div className={styles.row}>
        <aside className={styles.sidebar}>
          <div className={styles.sidebarGradient}>
            <div className={`${styles.sidebarGradientContent} body-md`}>
              <h2 className="heading-lg">Frontend Mentor</h2>
              <p className={styles.sidebarGradientDesc}>Feedback Board</p>
            </div>
            <Image
              src="/suggestions/desktop/background-header.png"
              fill
              alt="gradient"
            />
          </div>
          <div className={styles.sidebarTags}>
            {["All", "UI", "UX", "Enhancement", "Bug", "Feature"].map(
              (item, i) => (
                <div
                  className={cls(
                    styles.sidebarTagsTag,
                    i === 0 ? "active" : null
                  )}
                  key={i}
                >
                  {item}
                </div>
              )
            )}
          </div>
        </aside>
        <div className={styles.right}>
          <header className={styles.header}>
            <NavIcon />
            <h3 className={`heading-md ${styles.headerTitle}`}>
              6 Suggestions
            </h3>
            <div className={styles.headerSort}>
              <span>Sort by :&nbsp;</span>
              <div className={styles.headerSortRight}>
                <h4 className={`${styles.headerSortBold} heading-sm`}>
                  Most Upvotes
                </h4>
                <ArrowDownIcon />
              </div>
            </div>
            <div className={`btn btn-electro-violet ${styles.headerAddBtn}`}>
              <PlusIcon />
              &nbsp;
              <span>Add Feedback</span>
            </div>
          </header>
          <main></main>
        </div>
      </div>
    </div>
  );
}
