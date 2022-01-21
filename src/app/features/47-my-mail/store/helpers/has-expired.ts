export const hasExpired = (fromDt: number | null, ttl: number): boolean => {
  if (!fromDt) {
    return true;
  } else {
    return fromDt + ttl < Date.now();
  }
};
