import { useState } from "react";
import { useStore } from "zustand";
import { useUserStore } from "../../../store/user/index";
import { Services } from "../../../services/index";
import { apiClient } from "../../../config/apiClient";

function useLogIn() {
  const { setUser, setAuthenticated } = useStore(useUserStore);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const logIn = async ({ email, password }) => {
    setLoading(true);
    setError(null);

    try {
      const { data } = await apiClient.post(Services.auth.logIn, {
        email,
        password
      });
      if (!data?.user.email) {
        setError("Credenciales inválidas.");
        return { error: "Credenciales inválidas." };
      }
      setUser({
        email: data.user.email,
        id: data.user._id
        // sessionToken: data.sessionToken,
      });
      setAuthenticated(true);

      return { success: "Inicio de sesión exitoso" };
    } catch (err) {
      console.error(err);

      const message = err.response?.data?.message;
      setError(message);
      return { error: message };
    } finally {
      setLoading(false);
    }
  };

  return {
    logIn,
    loading,
    error
  };
}

export default useLogIn;
