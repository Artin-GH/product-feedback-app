import dbConnect from "@/dbConnect";
import Category, { ICategory, ICategoryProps } from "@/models/category";
import { Types } from "mongoose";
import { cache } from "react";

export const getCategoryProps = cache(async () => {
  await dbConnect();
  const categories = await getCategories();
  const categoryProps: ICategoryProps[] = categories.map((category) => ({
    id: category.id!,
    name: category.name,
  }));
  return categoryProps;
});

export const getCategories = cache(
  async () => {
    await dbConnect();
    return (await Category.find({})) as ICategory[]}
);

export const getCategoryById = cache(async (id: Types.ObjectId | string) => {
  await dbConnect();
  try {
    id = new Types.ObjectId(id);
    return await Category.findById<ICategory>(id);
  } catch (err) {
    console.error(err);
    return null;
  }
});
