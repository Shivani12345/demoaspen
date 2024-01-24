import AsyncStorage from '@react-native-async-storage/async-storage';

export const TOKEN = 'token';
export const THEME = 'theme';
export const LANGUAGE = 'language';
export const LOCATION = 'location';
export const setToken = async (dataString: string | undefined) => {
  await AsyncStorage.setItem(TOKEN, `${dataString}`);
};

export const removeToken = async () => await AsyncStorage.removeItem(TOKEN);

export const getToken = async () => {
  return await AsyncStorage.getItem(TOKEN);
};

export const storeTheme = async (theme: string) => {
  await AsyncStorage.setItem(THEME, theme);
};

export const getTheme = async () => {
  return await AsyncStorage.getItem(THEME);
};

export const removeTheme = async () => await AsyncStorage.removeItem(THEME);

export const storeLanguage = async (language: string) => {
  console.log('storeLanguage=language----->', language);

  await AsyncStorage.setItem(LANGUAGE, language);
};

export const getLanguage = async () => {
  return await AsyncStorage.getItem(LANGUAGE);
};

export const removeLanguage = async () =>
  await AsyncStorage.removeItem(LANGUAGE);

export const storeLocation = async (location: string) => {
  await AsyncStorage.setItem(LOCATION, location);
};
export const getLocation = async () => {
  return await AsyncStorage.getItem(LOCATION);
};
