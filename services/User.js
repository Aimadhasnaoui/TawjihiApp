import axiosInstance from "./axiosInstance";
export const PutEtudient = async (data, id) => {
  try {
    const response = await axiosInstance.put(`/Etudient/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const GetEtudient = async (id) => {
  console.log(id);
  try {
    const response = await axiosInstance.get(`/Etudient/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
