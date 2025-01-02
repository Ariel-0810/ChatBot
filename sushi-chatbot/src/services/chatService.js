import { apiClient } from '../config/apiClient'
import { Services } from './index'

export async function getMenuItems() {
    try {
        const response = await apiClient.get(Services.product.getAll)
        console.log("response products---->", response)
    
        if (!response || !response.data || !response.data.products) {
          throw new Error('Error al obtener el menú')
        }
    
        // Devuelve directamente los productos del menú
        return response.data.products
      } catch (error) {
        console.error(error)
        return [] // Devuelve un array vacío si ocurre un error
      }
    }

    export async function createOrder(orderDetails) {
        try {
            const response = await apiClient.post(Services.order.create, {
                orderDetails
            })
            console.log("response order---->", response)
        
            if (response.status === 'error') {
                return {
                  error: 'Ha ocurrido un error',
                };
              }
          
              return response
            } catch (error) {
                console.error(error);
                return {
                  error: 'Ha ocurrido un error',
                };
              }
        }
  