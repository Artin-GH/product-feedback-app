import styles from "./styles/Index.module.css";
import SideBar from "./SideBar";
import Right from "./Right";
import { getFeedbackProps } from "@/features/feedbacks"; 
import { getCategoryProps } from "@/features/categories";

export const revalidate = 3600;

export default async function Home() {
  const feedbackProps = await getFeedbackProps();
  const categories = await getCategoryProps();

  return (
    <div className={styles.suggestions}>
      <div className={styles.row}>
        <SideBar categories={categories} />
        <Right feedbacks={feedbackProps} />
      </div>
    </div>
  );
}
