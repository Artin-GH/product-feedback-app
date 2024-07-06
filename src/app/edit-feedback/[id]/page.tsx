import GoBack from "@/components/GoBack";
import styles from "./EditFeedback.module.css";
import dbConnect from "@/dbConnect";
import { IFeedback } from "@/models/feedback";
import { getCategories, getCategoryById } from "@/features/categories";
import Form from "./Form";
import { cls } from "@/helpers";
import Image from "next/image";
import { getFeedbackById, getFeedbacks } from "@/features/feedbacks";
import { notFound, redirect } from "next/navigation";
import Feedback from "@/models/feedback";
import { revalidatePath } from "next/cache";
import {
  getUpdateStatusById,
  getUpdateStatuses,
} from "@/features/updateStatuses";

export const revalidate = 3600;

export default async function EditFeedback({
  params,
}: {
  params: { id: string };
}) {
  await dbConnect();
  const feedback = await getFeedbackById(params.id);
  if (!feedback) notFound();
  const oldUpdateStatus = (await getUpdateStatusById(feedback.updateStatus))!.value
  const oldFeedback = {
    id: feedback.id!,
    title: feedback.title,
    commentCount: 99,
    upvoteCount: 6,
    categoryName: (await getCategoryById(feedback.category))!.name,
    details: feedback.details,
  };
  let currentCategoryIndex = 0,
    currentUpdateStatusIndex = 0;
  const categories = (await getCategories()).map((category, i) => {
    if (category.name === oldFeedback.categoryName) currentCategoryIndex = i;
    return {
      id: category.id!,
      name: category.name,
    };
  });
  const updateStatuses = (await getUpdateStatuses()).map((updateStatus, i) => {
    if (updateStatus.value === oldUpdateStatus)
      currentUpdateStatusIndex = i;
    return {
      id: updateStatus.id!,
      value: updateStatus.value,
    };
  });

  const edit = async (formData: FormData) => {
    "use server";
    await dbConnect();
    const title = formData.get("title")?.toString();
    const categoryId = formData.get("category")?.toString();
    const details = formData.get("details")?.toString();
    const updateStatusId = formData.get("updateStatus")?.toString();
    if (!(title && categoryId && details && updateStatusId)) return;
    try {
      await Feedback.findByIdAndUpdate(feedback.id, {
        title: title,
        details: details,
        category: await getCategoryById(categoryId),
        updateStatus: await getUpdateStatusById(updateStatusId),
      });
    } catch (error) {
      return;
    }
    revalidatePath("/page");
    revalidatePath(`/edit-feedback/${feedback.id}`);
    revalidatePath(`/feedback/${feedback.id}`);
    redirect(`/feedback/${feedback.id}`);
  };

  const delete_ = async () => {
    "use server";
    await dbConnect();
    try {
      await Feedback.findByIdAndDelete(feedback.id);
    } catch (err) {
      console.log(err);
      return;
    }
    revalidatePath("/page");
    revalidatePath(`/edit-feedback/${feedback.id}`);
    revalidatePath(`/feedback/${feedback.id}`);
    redirect("/");
  };

  return (
    <main className={styles.main}>
      <GoBack className={styles.goBack} />
      <div className={styles.box}>
        <div className={styles.circle}>
          <Image src="/shared/icon-edit-feedback.svg" alt="edit" fill />
        </div>
        <h1 className={cls("heading-xl", styles.title)}>
          Editing ‘{feedback.title}’
        </h1>
        <Form
          categories={categories}
          updateStatuses={updateStatuses}
          currentCategoryIndex={currentCategoryIndex}
          currentUpdateStatusIndex={currentUpdateStatusIndex}
          oldFeedback={oldFeedback}
          edit={edit}
          delete_={delete_}
        />
      </div>
    </main>
  );
}

export async function generateStaticParams() {
  await dbConnect();
  const feedbacks: IFeedback[] = await getFeedbacks();

  return feedbacks.map((feedback) => ({
    id: feedback.id!,
  }));
}
