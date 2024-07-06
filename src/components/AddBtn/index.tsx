import Link from "next/link";
import styles from "./AddBtn.module.css";
import PlusIcon from "public/shared/icon-plus.svg";

export default function AddBtn({ className }: { className?: string }) {
  return (
    <Link
      href="/add-feedback"
      className={`btn btn-electro-violet ${styles.addBtn} ${className}`}
    >
      <PlusIcon />
      &nbsp;
      <span>Add Feedback</span>
    </Link>
  );
}
