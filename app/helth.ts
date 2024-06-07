import { getCurrentTime } from "@core/utils/timeUtils";
import { Request, Response } from "express";

const checkHelth = (_req: Request, res: Response) => res.status(200).json({
  time: getCurrentTime(),
  status: "OK"
})

export default checkHelth;
