import { Services } from '@/services'
import axios from 'axios';
import { useStore } from 'zustand';
import { useUserStore } from '../../../store/user/index'; 
// import { Moralis } from 'moralis-v1'
// import type { SignUp } from '../types'
import { useState } from 'react'
import { signUpUser } from '../../../services/userServices'; 

function useSignUp() {
  const [loading, setLoading] = useState(false)

  const signUp = async ({ email, password, username }) => {
    try {
      const result = await signUpUser({ email, password, username })

      return result
    } catch (error) {
      console.error(error)
      return {
        error: 'Ha ocurrido un error',
      }
    } finally {
      setLoading(false)
    }
  }

  return {
    signUp,
    loading,
  }
}

export default useSignUp
