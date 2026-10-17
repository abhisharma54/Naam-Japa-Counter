export const getLocalDate = (d = new Date()) => d.toLocaleDateString("en-CA");

export const daysBetween = (a, b) => {
  const toUTC = (s) => {
    const [y, m, d] = s.split("-").map(Number);
    return Date.UTC(y, m - 1, d); // converts a date string into a UTC timestamp in milliseconds
  };
  return Math.round((toUTC(b) - toUTC(a)) / 86400000);
};