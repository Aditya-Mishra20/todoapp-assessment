import api from "./axios";

export const testProtectedRoute = async () => {
  const response = await api.get("/test/protected");
  return response.data;
};
