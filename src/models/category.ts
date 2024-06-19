import mongoose from "mongoose";

export interface ICategory extends mongoose.Document {
  name: string;
}

export interface ICategoryProps {
  id: string;
  name: string;
}

const CategorySchema = new mongoose.Schema<ICategory>({
  name: {
    type: String,
    required: [true, "Please provide the name of the categoty."],
    maxlength: [25, "Name cannot be more than 25 characters."],
  },
});

export default mongoose.models.Category ||
  mongoose.model<ICategory>("Category", CategorySchema);
