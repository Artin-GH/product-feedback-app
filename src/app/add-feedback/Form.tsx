"use client";
import { ICategoryProps } from "@/models/category";
import styles from "./AddFeedback.module.css";
import FormSelect from "@/components/FormSelect";
import { cls } from "@/helpers";
import Link from "next/link";
import { useState } from "react";

const Form: React.FC<{
  categories: ICategoryProps[];
  create: (formData: FormData) => Promise<void>;
}> = ({ categories, create }) => {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [isSubmited, setIsSubmitted] = useState(false);
  const didTitleHitError = isSubmited && title === "";
  const didDetailsHitError = isSubmited && details === "";

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    if ([title, details].includes("")) e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <form action={create} onSubmit={handleSubmit}>
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
        <FormSelect name="category">
          {categories.map((category) => ({
            text: category.name,
            value: category.id,
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
        <Link href="/" className="btn btn-east-bay">
          Cancel
        </Link>
        <button type="submit" className="btn btn-electro-violet">
          Add Feedback
        </button>
      </div>
    </form>
  );
};

export default Form;
