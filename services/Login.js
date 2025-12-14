import axios from "axios";
import Constants from "expo-constants";
const { apiBaseUrl } = Constants.expoConfig.extra;
export const LoginStudent  = async (data) => {
    console.log("data send")
    console.log(apiBaseUrl)
    try{
        const response = await axios.post(`${apiBaseUrl}/student/login`, data);
        return response.data;
    }
    catch(error){
        throw error
    }
} 