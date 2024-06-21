import { PriceTableType } from "@core/types";
import PriceTable from "@schemas/PriceTableSchema";

export const createPriceTable = async (priceTable: PriceTableType) => {
  return await new PriceTable(priceTable).save();
};

export const getPriceTableByParentId = async (_id: string) => {
  return (await PriceTable.findOne({ _id })) as PriceTableType;
};

export const updatePriceTable = async (
  _id: string,
  data: Partial<PriceTableType>
) => {
  return await PriceTable.updateOne({ _id }, { $set: data });
};
