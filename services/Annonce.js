// import axiosInstance from './axiosInstance';
import axios from 'axios';

export const GetAnnonce = async ()=>{
  try {
    // const response = await axios.get(`http://192.168.1.7:3002/api/Annonce`);
    const response = await axios.get(`https://eduinscrire.online/api/Annonce`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
// export const GetAnnonceById = async (id)=>{
//   try {
//     const response = await axiosInstance.get(`/Annonce/${id}`);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// }

