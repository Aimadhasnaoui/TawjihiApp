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
export const PutChoixEtudient = async (choix, id) => {
  try {
    const response = await axiosInstance.put(`/Choix/Etudient/${id}`, choix);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const DeleteChoixEtudient = async (id) => {
  try {
    const response = await axiosInstance.delete(`/Choix/Etudient/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
