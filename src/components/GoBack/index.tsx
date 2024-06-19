import IconArrowLeft from "public/shared/icon-arrow-left.svg";
import styles from "./GoBack.module.css";
import Link from "next/link";
import React from "react";
import { cls } from "@/helpers";

const GoBack: React.FC<{
  href: string;
  isDark?: boolean;
  className?: string;
}> = ({ href, isDark, className }) => {
  return (
    <Link
      href={href}
      className={cls(
        "btn-noback",
        styles.goback,
        isDark ? "dark" : "",
        className
      )}
    >
      <span className={styles.arrowLeft}>
        <IconArrowLeft />
      </span>
      <span className={styles.text}>Go Back</span>
    </Link>
  );
};

export default GoBack;
