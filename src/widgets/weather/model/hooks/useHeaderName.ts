export const useHeaderName = (isSettingActive: boolean, city?: string, country?: string) => {
  if (isSettingActive) {
    return 'Settings';
  }

  if (city && country) {
    return `${city}, ${country}`
  }

  return '';
}