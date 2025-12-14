import axiosInstance from './axiosInstance';
export const PutEtudient = async (data,id)=>{
  try {
    const response = await axiosInstance.put(`/Etudient/${id}`,data);
    return response.data;
  } catch (error) {
    throw error;
  }
}
