import { AxiosError } from "axios";

export const getError = (error: AxiosError) => {
  if (error.isAxiosError && error.response) return error.response.data;
  return "Unexpected Error";
};

export const handleApiError = (
  error: AxiosError<{ message: string; errors?: any }>
) => {
  if (error.response?.data.message == "Validation Error") {
    for (let i = 0; i < error.response.data.errors.length; i++) {
      console.log(error.response.data.errors[i]);
    }
  }
};
