export const useDewPoint = (temperature: number, humidity: number) => {
  const value = temperature - ((100 - humidity) / 5);

  return Number(value?.toFixed(2));
}