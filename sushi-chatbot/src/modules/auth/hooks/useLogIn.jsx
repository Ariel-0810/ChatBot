import { useState } from 'react';
import { useStore } from 'zustand';
import { useUserStore } from '../../../store/user/index';
import { Services } from '../../../services/index'
import { apiClient } from '../../../config/apiClient'

function useLogIn() {
  const { setUser, setAuthenticated, setSessionToken, setId, setEmail  } = useStore(useUserStore); // Estado global para manejar el usuario y la autenticación
  const [loading, setLoading] = useState(false); // Estado para el indicador de carga
  const [error, setError] = useState(null); // Estado para manejar errores

  const logIn = async ({ email, password }) => {
    setLoading(true); // Activa el estado de carga
    setError(null); // Resetea cualquier error previo

    try {
      // Solicitud de inicio de sesión al backend
    const { data } = await apiClient.post(Services.auth.logIn, {
        email,
        password,  
    });

      // Verifica si el backend retorna datos válidos
      if (!data?.user.email) {
        setError('Credenciales inválidas.');
        return { error: 'Credenciales inválidas.' };
      }

      // Guarda los datos en Zustand
      setUser({
        email: data.user.email,
        id: data.user._id,
        // sessionToken: data.sessionToken,
      });
      setAuthenticated(true); // Marca al usuario como autenticado
      console.log('Estado en Zustand:', useUserStore.getState());
      console.log('Datos guardados:', { email: data.email, sessionToken: data.sessionToken, id: data.id});

      return { success: 'Inicio de sesión exitoso' };
    } catch (err) {
      console.error(err);

      // Manejando errores del servidor o de red
      const message =
        err.data?.data?.message || 'Ha ocurrido un error inesperado.';
      setError(message);
      return { error: message };
    } finally {
      setLoading(false); // Desactiva el estado de carga
    }
  };

  return {
    logIn,
    loading,
    error, // Retorna el estado de error para manejarlo en el componente
  };
}

export default useLogIn;
