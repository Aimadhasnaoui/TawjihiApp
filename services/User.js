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
  try {
    const response = await axiosInstance.get(`/Etudient/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const GetEtudientChoix = async (id) => {
  try {
    const response = await axiosInstance.get(`/Choix/Etudient/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
