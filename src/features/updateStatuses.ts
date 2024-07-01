import dbConnect from "@/dbConnect";
import UpdateStatus, { IUpdateStatus } from "@/models/updateStatus";
import { Types } from "mongoose";
import { cache } from "react";

export const getUpdateStatuses = cache(async () => {
  await dbConnect();
  return (await UpdateStatus.find({})) as IUpdateStatus[];
});

export const getUpdateStatusById = cache(
  async (id: Types.ObjectId | string) => {
    await dbConnect();
    try {
      id = new Types.ObjectId(id);
      return await UpdateStatus.findById<IUpdateStatus>(id);
    } catch (err) {
      console.error(err);
      return null;
    }
  }
);
