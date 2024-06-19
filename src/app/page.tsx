import styles from "./styles/Index.module.css";
import SideBar from "./SideBar";
import Right from "./Right";
import { getFeedbackPreviews } from "@/features/feedbacks"; 
import { getCategories } from "@/features/categories";

export const revalidate = 3600;

export default async function Home() {
  const feedbackPreviews = await getFeedbackPreviews();
  const categories = await getCategories();

  return (
    <div className={styles.suggestions}>
      <div className={styles.row}>
        <SideBar categories={categories} />
        <Right feedbacks={feedbackPreviews} />
      </div>
    </div>
  );
}
