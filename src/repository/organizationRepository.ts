import { BulkProductUploadStatusResponse, SystemConfigsType } from "@types";
import System from "src/schemas/SystemSchema";

export const getSystemConfigurations: (
  code: string
) => Promise<SystemConfigsType> = async (code: string) => {
  return (await System.findOne({ code })) as unknown as SystemConfigsType;
};

export const updateSequenceNumberConfiguration: (
  code: string,
  next: number
) => void = async (code, next) => {
  await System.updateOne(
    { code: "SEQUENCES" },
    {
      $set: { [code]: next },
    }
  );
};

export const updateBulkProductQueueStatus: (
  input: BulkProductUploadStatusResponse
) => Promise<Boolean> = async (input) => {
  await System.updateOne(
    { code: "PRODUCT_BULK_UPLOAD_QUEUE" },
    {
      $set: { defaultConfigurations: input },
    }
  );
  return true;
};
