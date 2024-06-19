import { getCategories } from "@/features/categories";

export const revalidate = 0;

export async function GET() {
  const categories = await getCategories();
  return Response.json(categories);
}
