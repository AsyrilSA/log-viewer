export function formatTimestamp(timestamp: Date): string {
  return new Date(timestamp).toLocaleString() + '.' + new Date(timestamp).getMilliseconds();
}
