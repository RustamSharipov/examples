export function daysFromNow(dateTime: string): number {
  return Math.round(
    (+new Date() - +new Date(dateTime)) / (24 * 60 * 60 * 1000),
  );
}
