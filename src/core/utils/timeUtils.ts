import moment from "moment";


const LOCAL_DATE_TIME_FORMAT = "YYYY-MM-DD HH:mm:ss"

/**
 * This function used to return current date time
 * @returns String
 */
export const getCurrentTime = () => {
  const now = moment();
  return now.format(LOCAL_DATE_TIME_FORMAT);
}
