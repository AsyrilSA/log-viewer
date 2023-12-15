const dateFormat = 'DD.MM.YYYY HH:mm:ss';
const dateLocale = 'fr-CH';

export { dateFormat, dateLocale };

export function formatTimestamp(timestamp: Date): string {
  return (
    new Date(timestamp).toLocaleString(dateLocale) +
    '.' +
    new Date(timestamp).getMilliseconds()
  );
}
