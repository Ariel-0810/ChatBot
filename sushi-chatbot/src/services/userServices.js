import { Services } from "./index";
import { apiClient } from "../config/apiClient";

export const signUpUser = async ({ email, password, username }) => {
  try {
    const response = await apiClient.post(Services.auth.signUp, {
      objectData: {
        email,
        password,
        username
      }
    });

    if (response.status === "error") {
      return {
        error: "Ha ocurrido un error"
      };
    }

    return {
      success: "Registro exitoso"
    };
  } catch (error) {
    console.error(error);
    return {
      error: "Ha ocurrido un error"
    };
  }
};
