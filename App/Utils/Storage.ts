import AsyncStorage from "@react-native-async-storage/async-storage";

export default {
  async getItem(key: string, defaultValue: string) {
    const result = await AsyncStorage.getItem(key);
    if (!result) {
      await AsyncStorage.setItem(key, defaultValue);
    }
    return result ?? defaultValue;
  },
  async setItem(key: string, value: string) {
    await AsyncStorage.setItem(key, value);
  },
  async removeItem(key: string) {
    await AsyncStorage.removeItem(key);
  },
};
