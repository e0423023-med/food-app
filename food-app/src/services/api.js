import axios from "axios";

const BASE_URL = "https://t4e-testserver.onrender.com/api";

// 🔑 TOKEN GENERATION
export const getToken = async (uniqueId, password, set = "A") => {
  try {
    const response = await axios.post(`${BASE_URL}/public/token`, {
      studentId: "E0423023",
      password: "581442",
      set: "setA"
    });
    
    console.log("Token response:", response.data);
    return response.data; // Return entire response, not just token
  } catch (error) {
    console.error("Token generation failed:", error.response?.data || error.message);
    throw error;
  }
};

export const getDataset = async (token, dataUrl) => {
  try {
    const response = await axios.get(`${BASE_URL}${dataUrl}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    
    console.log("Dataset response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Dataset fetch failed:", error.response?.data || error.message);
    throw error;
  }
};