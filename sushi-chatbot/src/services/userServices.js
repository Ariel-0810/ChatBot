// // import type { SignUp } from '@/modules/auth/types'
// // import { formatUserSession } from '@/modules/core/utils/formatUser'
// // import { formatUsers } from '@/modules/users/utils'
import axios from 'axios';
import { Services } from './index'
import { apiClient } from '../config/apiClient'
// // import { Moralis } from 'moralis-v1'
// // import type { User } from '@/types'

export const signUpUser = async ({ email, password, username }) => {
    try {
      const response = await apiClient.post(Services.auth.signUp, {
        objectData: {
          email,
          password,  
          username             
        },
      });
  
      if (response.status === 'error') {
        return {
          error: 'Ha ocurrido un error',
        };
      }
  
      return {
        success: 'Registro exitoso',
      };
    } catch (error) {
      console.error(error);
      return {
        error: 'Ha ocurrido un error',
      };
    }
}
// // export const getUserById = async (id: string) => {
// //   try {
// //     const response = await Moralis.Cloud.run(Services.users.getUserById, {
// //       userId: id,
// //     })

// //     if (response?.status === 'error') {
// //       return {
// //         error: response?.errorDetails?.message,
// //       }
// //     }

// //     console.log(" Servidor:", response.user.attributes);
    
// //     const data = formatUserSession(response)

// //     return {
// //       data,
// //     }
// //   } catch (error) {
// //     console.error(error)
// //     return {
// //       error: 'Ha ocurrido un error',
// //     }
// //   }
// // }

// // export const getAllUsers = async (page: number, user_fullName?: string) => {
// //   try {
// //     const response = await Moralis.Cloud.run(Services.users.getAll, {
// //       page,
// //       limit: 9,
// //       user_fullName,
// //     })

// //     if (response?.status === 'error') {
// //       return {
// //         error: response?.errorDetails?.message,
// //       }
// //     }

// //     const data = formatUsers(response.users)

// //     return {
// //       data,
// //       totalPages: response.totalPages,
// //     }
// //   } catch (error) {
// //     console.error(error)
// //     return {
// //       data: [],
// //     }
// //   }
// // }

// // export const updateUser = async (id: string, values: Partial<User>) => {
// //   try {
// //     const response = await Moralis.Cloud.run(Services.users.update, {
// //       userId: id,
// //       objectData: values,
// //     })

// //     const data = formatUserSession(response)

// //     return data
// //   } catch (error) {
// //     console.error(error)
// //     return {
// //       error: 'Ha ocurrido un error',
// //     }
// //   }
// // }
