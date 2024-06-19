import GoBack from "@/components/GoBack";
import styles from "./AddFeedback.module.css";
import dbConnect from "@/dbConnect";
import Category, { ICategory } from "@/models/category";
import Feedback from "@/models/feedback";
import Form from "./Form";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { cls } from "@/helpers";
import Image from "next/image";

export default async function AddFeedback() {
  await dbConnect();
  const categories = (await Category.find({})) as ICategory[];

  const create = async (formData: FormData) => {
    "use server";
    await dbConnect();
    const title = formData.get("title")?.toString();
    const categoryId = formData.get("category")?.toString();
    const details = formData.get("details")?.toString();
    if (!(title && categoryId && details)) return;
    try {
      await Feedback.create({
        title: title,
        category: await Category.findById(categoryId),
        details: details,
      });
    } catch (error) {
      return;
    }
    revalidatePath("/page");
    redirect("/");
  };

  return (
    <main className={styles.main}>
      <GoBack href="/" className={styles.goBack} />
      <div className={styles.box}>
        <div className={styles.circle}>
          <Image
            className={styles.circleBack}
            src={"/suggestions/tablet/background-header.png"}
            alt="gradient"
            fill
          />
          <span className={styles.circleIcon}>+</span>
        </div>
        <h1 className={cls("heading-xl", styles.title)}>Create New Feedback</h1>
        <Form
          categories={categories.map((category) => ({
            id: category.id!,
            name: category.name,
          }))}
          create={create}
        />
      </div>
    </main>
  );
}
