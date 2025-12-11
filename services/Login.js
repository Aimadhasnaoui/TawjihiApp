import axios from "axios";
import Constants from "expo-constants";
const { apiBaseUrl } = Constants.expoConfig.extra;
export const LoginStudent  = async (data) => {
    console.log("data send")
    console.log(data)
    try{
        const response = await  axios.post(`
https://eduinscrire.online/api/student/login`,data)
            return response.data;
    }
    catch(error){
throw error
    }
}