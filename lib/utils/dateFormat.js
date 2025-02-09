import { formatInTimeZone } from "date-fns-tz";

const dateFormat = (date) => {
  return formatInTimeZone(date, "Europe/Zurich", "dd.MM.yyyy");
};

export default dateFormat;
