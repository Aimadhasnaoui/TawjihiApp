import axiosInstance from "./axiosInstance";
export const GetEcoles = async () => {
  try {
    const response = await axiosInstance.get(`/Ecole`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const GetEcolesFillier = async (id) => {
  try {
    const response = await axiosInstance.get(`/Ecole/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const PushChoixEtudient = async (choix) => {
  try {
    const response = await axiosInstance.post(`/Choix/Etudient`, choix);
    return response.data;
  } catch (error) {
    throw error;
  }
};
