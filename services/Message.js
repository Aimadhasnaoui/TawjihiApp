// import axiosInstance from './axiosInstance';
import axiosInstance from './axiosInstance';
export const GetMessage = async ()=>{
  try {
    const response = await axiosInstance.get(`/Message`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
