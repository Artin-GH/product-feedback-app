"use client";
import { ICategoryProps } from "@/models/category";
import { IFeedbackProps } from "@/models/feedback";
import styles from "./EditFeedback.module.css";
import FormSelect from "@/components/FormSelect";
import { cls } from "@/helpers";
import Link from "next/link";
import { useState } from "react";
import { IUpdateStatusProps } from "@/models/updateStatus";

const Form: React.FC<{
  categories: ICategoryProps[];
  updateStatuses: IUpdateStatusProps[];
  oldFeedback: IFeedbackProps;
  currentCategoryIndex: number;
  currentUpdateStatusIndex: number;
  edit: (formData: FormData) => Promise<void>;
  delete_: (formData: FormData) => Promise<void>;
}> = ({
  categories,
  edit,
  oldFeedback,
  delete_,
  updateStatuses,
  currentCategoryIndex,
  currentUpdateStatusIndex,
}) => {
  const [title, setTitle] = useState(oldFeedback.title);
  const [details, setDetails] = useState(oldFeedback.details);
  const [isSubmited, setIsSubmitted] = useState(false);
  const didTitleHitError = isSubmited && title === "";
  const didDetailsHitError = isSubmited && details === "";

  const handleSubmit: React.FormEventHandler<HTMLButtonElement> = (e) => {
    if ([title, details].includes("")) e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <form action={edit}>
      <div className={styles.formField}>
        <label className={cls("heading-sm", styles.formFieldLabel)}>
          Feedback Title
        </label>
        <p className={cls("heading-sm", styles.formFieldDetails)}>
          Add a short, descriptive headline
        </p>
        <input
          type="text"
          name="title"
          maxLength={70}
          className={cls("formInput", didTitleHitError ? "error" : null)}
          value={title}
          autoFocus
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        {didTitleHitError && (
          <p className={cls("heading-sm", styles.errorMessage)}>
            Can't be empty
          </p>
        )}
      </div>
      <div className={styles.formField}>
        <label className={cls("heading-sm", styles.formFieldLabel)}>
          Category
        </label>
        <p className={cls("heading-sm", styles.formFieldDetails)}>
          Choose a category for your feedback
        </p>
        <FormSelect name="category" initialIndex={currentCategoryIndex}>
          {categories.map((category) => ({
            text: category.name,
            value: category.id,
          }))}
        </FormSelect>
      </div>
      <div className={styles.formField}>
        <label className={cls("heading-sm", styles.formFieldLabel)}>
          Update Status
        </label>
        <p className={cls("heading-sm", styles.formFieldDetails)}>
          Change feedback state
        </p>
        <FormSelect name="updateStatus" initialIndex={currentUpdateStatusIndex}>
          {updateStatuses.map((updateStatus) => ({
            text: updateStatus.value,
            value: updateStatus.id,
          }))}
        </FormSelect>
      </div>
      <div className={styles.formField}>
        <label className={cls("heading-sm", styles.formFieldLabel)}>
          Feedback Detail
        </label>
        <p className={cls("heading-sm", styles.formFieldDetails)}>
          Include any specific comments on what should be improved, added, etc.
        </p>
        <textarea
          name="details"
          maxLength={170}
          className={cls(
            "formInput",
            styles.detailsTextarea,
            didDetailsHitError ? "error" : null
          )}
          value={details}
          onChange={(e) => {
            setDetails(e.target.value);
          }}
        ></textarea>
        {didDetailsHitError && (
          <p className={cls("heading-sm", styles.errorMessage)}>
            Can't be empty
          </p>
        )}
      </div>
      <div className={styles.btnCon}>
        <button
          type="submit"
          className={cls("btn btn-red", styles.btnDel)}
          formAction={delete_}
        >
          Delete
        </button>
        <Link href={`/feedback/${oldFeedback.id}`} className="btn btn-east-bay">
          Cancel
        </Link>
        <button
          type="submit"
          className="btn btn-electro-violet"
          onSubmit={handleSubmit}
        >
          Edit Feedback
        </button>
      </div>
    </form>
  );
};

export default Form;
