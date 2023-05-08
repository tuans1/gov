function format_two_digits(n) {
  return n < 10 ? "0" + n : n;
}

export function formatDateTime(dateTime) {
  const date = new Date(dateTime);
  const cur_date = date.getDate();
  const cur_month = date.getMonth();
  const cur_year = date.getFullYear();
  const cur_hours = format_two_digits(date.getHours());
  const cur_minute = format_two_digits(date.getMinutes());
  return cur_hours + ":" + cur_minute + " " + cur_date + "/" + cur_month + "/" + cur_year

}
