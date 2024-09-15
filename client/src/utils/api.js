import axios from "axios";
import dayjs from "dayjs";
import { toast } from "react-toastify";

// Axios instance
export const api = axios.create({
  baseURL: "https://real-estate-homyz-ten.vercel.app/api",                          /* api due towritten in  index.js of server */             //as server is running at port 8000
  timeout: 10000, // 10 seconds
});

// Helper function to handle errors
const handleError = (error) => {
  const status = error.response?.status;
  if (status === 401) {
    toast.error("Unauthorized access. Please log in again.");
  } else if (status === 400 || status === 500) {
    toast.error("Something went wrong. Please try again.");
  } else {
    toast.error("An unexpected error occurred.");
  }
  throw error;
};

// Fetch all properties
export const getAllProperties = async () => {
  try {
    const response = await api.get("/residency/allresd");
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Fetch a specific property by ID
export const getProperty = async (id) => {
  try {
    const response = await api.get(`/residency/${id}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Create a new user
export const createUser = async (email, token) => {
  if (!token) {
    /* toast.error("Authorization token is missing"); */
    return;
  }

  try {
    await api.post(
      `/user/register`,
      { email },
      {
        headers: {                                                            /* authorization of token bearer token taken by backend */
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    handleError(error);
  }
};

// Book a visit
export const bookVisit = async (date, propertyId, email, token) => {
  if (!token) {
    /* toast.error("Authorization token is missing"); */
    return;
  }

  try {                                                                                 /* parameters,headers */
    await api.post(
      `/user/bookVisit/${propertyId}`,
      {
        email,
        id: propertyId,
        date: dayjs(date).format("DD/MM/YYYY"),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    handleError(error);
  }
};

// Remove a booking
export const removeBooking = async (id, email, token) => {                      /* refer userControl for parameters i.e eamil as payload*/
  if (!token) {
    toast.error("Authorization token is missing");
    return;
  }

  try {
    await api.post(
      `/user/removeBooking/${id}`,
      {
        email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    handleError(error);
  }
};

// Add a property to favorites
export const toFav = async (id, email, token) => {
  if (!token) {
    /* toast.error("Authorization token is missing"); */
    return;
  }

  try {
    await api.post(
      `/user/toFav/${id}`,
      {
        email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    handleError(error);
  }
};

// Fetch all favorite properties
export const getAllFav = async (email, token) => {
  if (!token) {
    toast.error("Authorization token is missing");
    return;
  }

  try {
    const res = await api.post(
      `/user/allFav`,
      { email },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data["favResidenciesID"];
  } catch (error) {
    handleError(error);
  }
};

// Fetch all bookings
export const getAllBookings = async (email, token) => {
  if (!token) {
    toast.error("Authorization token is missing");
    return;
  }

  try {
    const res = await api.post(
      `/user/allBookings`,
      { email },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data["bookedVisits"];
  } catch (error) {
    handleError(error);
  }
};

// Create a new residency
export const createResidency = async (data, token) => {
  if (!token) {
    toast.error("Authorization token is missing");
    return;
  }

  try {
    await api.post(
      `/residency/create`,                                          /*  id as parameter*/
      { data },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    handleError(error);
  }
};
