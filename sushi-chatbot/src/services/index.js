export const Services = {
    auth: {
      signUp: 'users/createUser',
      logIn: 'auth/login',
    },
    users: {
      update: 'users/updateUser',
      getUserById: 'users/getUserById',
      getAll: 'users/getAllUsers',
      delete: 'users/deleteUser',
    },
    product: {
      create: 'product/createProduct',
      getById: 'product/getProduct',
      getAll: 'product/getAllProducts',
      update: 'product/updateProduct',
      delete: 'product/deleteProduct',
    },
    order: {
      create: 'order/createOrder',
      getById: 'order/getOrder',
      getAll: 'order/getAllOrders',
      update: 'order/updateOrder',
      delete: 'order/deleteOrder',
    }
  }
  