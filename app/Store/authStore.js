import * as SecureStore from 'expo-secure-store';

export async function LoginUser(value) {
  console.log(value)
  await SecureStore.setItemAsync('UserTawjihi', value);
}

export async function GetUser(key) {
  let result = await SecureStore.getItemAsync('UserTawjihi');
  return result;
  }

export async function CheckUser(key) {
  let result = await SecureStore.getItemAsync('UserTawjihi');
  if(result){
    return true;
  }else{
    return false;
  }
  }