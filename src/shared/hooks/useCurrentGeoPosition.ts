export const useCurrentGeoPosition = async () => {
  let latitude;
  let longitude;

  try {
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });


    latitude = position?.coords?.latitude;
    longitude = position?.coords?.longitude;
  } catch (error) {
    console.error('Ошибка при получении геолокации:', error?.message);
  }

  return { latitude, longitude };
};