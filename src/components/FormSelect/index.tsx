"use client";
import { cls } from "@/helpers";
import styles from "./FormSelect.module.css";
import IconArrowDown from "public/shared/icon-arrow-down.svg";
import { useRef, useState, useTransition } from "react";

const FormSelect: React.FC<{
  name: string;
  initialIndex: number;
  children: { text: string; value: string }[];
  conClassName?: string;
}> = (props) => {
  const [_, startTransition] = useTransition();
  const [currentOption, setCurrentOption] = useState(props.children[props.initialIndex]);
  const conteinerRef = useRef<HTMLDivElement>(null);

  return (
    <div className={styles.containerContainer}>
      <div
        className={cls(styles.container, props.conClassName)}
        tabIndex={0}
        ref={conteinerRef}
      >
        <input type="hidden" name={props.name} value={currentOption.value} />
        <div className={cls("formInput", styles.formInput)} tabIndex={0}>
          {currentOption.text}
        </div>
        <ul className={styles.menu}>
          {props.children.map((option, i) => (
            <li
              className={cls(
                "body-lg",
                styles.menuOption,
                option.value == currentOption.value ? "active" : null
              )}
              key={i}
              onClick={() => {
                startTransition(() => {
                  setCurrentOption(option);
                });
                if (conteinerRef.current) conteinerRef.current.blur();
              }}
            >
              {option.text}
            </li>
          ))}
        </ul>
        <div className={styles.arrow}>
          <IconArrowDown />
        </div>
      </div>
      <div className={styles.containerBlocker}></div>
    </div>
  );
};

export default FormSelect;
