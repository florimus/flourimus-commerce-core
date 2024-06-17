import { FileUpload } from "graphql-upload-ts";
import * as xlsx from "xlsx";

export const readXlsx = async (xlxsFile: Promise<FileUpload>) => {
  const { createReadStream, filename, mimetype, encoding } = await xlxsFile;

  const stream = createReadStream();
  const chunks: Uint8Array[] = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
  }
  const buffer = Buffer.concat(chunks);

  const workbook = xlsx.read(buffer, { type: "buffer" });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const jsonData = xlsx.utils.sheet_to_json(sheet);
  return jsonData;
};
