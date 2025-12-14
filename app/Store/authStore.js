import * as SecureStore from 'expo-secure-store';

export async function LoginUser(value) {
  await SecureStore.setItemAsync("UserTawjihi", JSON.stringify(value));
}
export async function Logout() {
  await SecureStore.deleteItemAsync("UserTawjihi");
  console.log("UserLoggedOut");
}

export async function GetUser(key) {
  let result = await SecureStore.getItemAsync("UserTawjihi");
  if (result) {
    return JSON.parse(result);
  }
  return null;
}

export async function CheckUser(key) {
  let result = await SecureStore.getItemAsync('UserTawjihi');
  if(result){
    return true;
  }else{
    return false;
  }
  }