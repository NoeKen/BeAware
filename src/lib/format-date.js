import moment from "moment";

export const format_date=(date, format='DD / MM / YYYY')=>{
  return  moment(date).format(format);
}
