import { apiClient } from "../config/apiClient";
import { Services } from "./index";

export async function getMenuItems() {
  try {
    const response = await apiClient.get(Services.product.getAll);
    console.log("response products---->", response);

    if (!response || !response.data || !response.data.products) {
      throw new Error("Error al obtener el menú");
    }

    return response.data.products;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function createOrder(orderDetails) {
  try {
    const response = await apiClient.post(Services.order.create, {
      orderDetails
    });

    if (response.status === "error") {
      return {
        error: "Ha ocurrido un error"
      };
    }

    return response;
  } catch (error) {
    console.error(error);
    return {
      error: "Ha ocurrido un error"
    };
  }
}
