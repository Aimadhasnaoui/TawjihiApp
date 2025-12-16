import * as SecureStore from "expo-secure-store";

const KEY = "UserTawjihi";

export async function LoginUser(value) {
  await SecureStore.setItemAsync(KEY, JSON.stringify(value));
}

export async function Logout() {
  await SecureStore.deleteItemAsync(KEY);
  console.log("UserLoggedOut");
}

export async function GetUser() {
  const result = await SecureStore.getItemAsync(KEY);
  if (!result) return null;

  try {
    return JSON.parse(result); // ✅ return object, not string
  } catch (e) {
    // corrupted data? remove it so the app doesn't crash forever
    await SecureStore.deleteItemAsync(KEY);
    return null;
  }
}

export async function CheckUser() {
  const result = await SecureStore.getItemAsync(KEY);
  return !!result;
}
