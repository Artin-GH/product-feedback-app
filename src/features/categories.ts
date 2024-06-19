import dbConnect from "@/dbConnect";
import Category, { ICategory, ICategoryProps } from "@/models/category";
import { cache } from "react";


export const getCategories = cache(async () => {
  await dbConnect();
  const categories = (await Category.find({})) as ICategory[];
  const categoryProps: ICategoryProps[] = categories.map((category) => ({
    id: category.id!,
    name: category.name,
  }));
  return categoryProps;
});
