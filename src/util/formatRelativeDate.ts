import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

export default function formatRelativeDate(date: string) {
  const currentDate = dayjs();
  const inputDate = dayjs(date);

  // Check if the input date is within the last 7 days
  if (currentDate.diff(inputDate, 'day') < 7) {
    // Format the date with "ago"
    return inputDate.fromNow();
  } else {
    // Format the date without "ago"
    return inputDate.format('MMMM D, YYYY');
  }
}
