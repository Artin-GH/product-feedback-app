import { getCategoryProps } from "@/features/categories";

export const revalidate = 0;

export async function GET() {
  const categories = await getCategoryProps();
  return Response.json(categories);
}
