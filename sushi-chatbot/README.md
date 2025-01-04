# Sushi Chatbot IA 1.0 - Frontend

Bienvenido al frontend del proyecto **Sushi Chatbot IA**, una aplicación interactiva para pedir sushi de manera rápida y sencilla. 🚀  
El chatbot guía al usuario para consultar el menú, realizar pedidos y obtener información sobre los horarios de atención.

## **Características principales**

- **Landing Page**: Una página inicial atractiva con un botón que dirige a la pantalla de inicio de sesión.
- **Autenticación**: Permite a los usuarios registrarse o iniciar sesión para acceder al chatbot.
- **Chatbot interactivo**:
  - **Horarios**: Consulta los horarios de atención.
  - **Menú**: Visualiza imágenes, descripciones, ingredientes y precios de los productos.
  - **Pedido**: Realiza pedidos interactivos, con una experiencia intuitiva para sumar/restar productos y confirmar compras.
- **Pedido confirmado**: Detalle del pedido con número de orden y resumen de los productos seleccionados.
- **Reinicio**: Una vez finalizado, el chatbot pregunta si necesita ayuda adicional.

---

## Requisitos

Asegúrate de tener las siguientes herramientas instaladas:
- **Node.js** v18.20.5 o superior
- **NPM** o **Yarn**

---

## **Instalación**

1. Clonar el repositorio
   ```bash
   git clone https://github.com/Ariel-0810/Nular_ChatBot-Client.git
   cd sushi-chatbot
   ```

2. Instala las dependencias del proyecto:
   ```bash
   npm install
   ```

3. Configura las variables de entorno. Crea un archivo .env en la raíz del proyecto con el siguiente contenido:
   ```bash
   VITE_API_URL=http://localhost:3001/
   ```

4. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```
   El proyecto estará disponible en http://localhost:5173.

## **Estructura del Proyecto**

    src/
    ├── components/         # Componentes reutilizables como ChatInterface, LandingPage, etc.
    ├── services/           # Lógica de comunicación con el backend (API).
    ├── modules/            # Hooks personalizados para manejar lógica de estado.
        ├── auth/
            ├── components/ # Formularios para LogIn y SignUp crear cuenta.
    ├── hooks/              # Hooks personalizados para manejar lógica de estado.
    ├── tests/              # Pruebas unitarias y de integración.
    ├── App.tsx             # Configuración principal de la aplicación.
    └── index.tsx           # Punto de entrada de la aplicación.

## **Ejemplos de interaccion con el chatbot**
**Mensajes iniciales**

   - **Chatbot**: "¡Hola! Soy el Sushi Chatbot. ¿En qué puedo ayudarte hoy?. Puedes preguntarme por el menú, hacer un pedido o consultar nuestros horarios de atención"
   
   - Botones disponibles:
        1. Horarios: Muestra "Nuestro horario de atención es de lunes a domingo, de 11:00 AM a 10:00 PM."

        2. Menú: Despliega el menú con imágenes, nombres, ingredientes y precios.

        3. Pedido: Permite seleccionar productos con botones + y - para ajustar cantidades, junto con un botón Finalizar pedido.

    

**Confirmación del pedido:**

  - Muestra un resumen con:

    - Productos seleccionados.

    - Cantidades y precios individuales.

    - Total general.


  - Botones disponibles:

    - **Cancelar:** Permite modificar el pedido.
  
    - **Confirmar:** "Pedido confirmado. Numero de orden: #12345"



## **Endpoints**

La aplicación interactúa con el backend a través de la URL configurada en el archivo .env.

 - **Menú:** GET/product/getAllProducts

    Retorna la lista de productos con sus detalles.


 - **Pedido:** POST/order/createOrder

    Envía el pedido al backend para su procesamiento.


 - **Horarios:** GET/horarios

    Devuelve los horarios de atención.

---

## **Manejo de errores**

El frontend está diseñado para manejar errores de forma clara y amigable para el usuario. A continuación, se describen las estrategias implementadas:

### **Errores comunes manejados**
1. **Errores de conexión al backend**:
   - **Mensaje mostrado al usuario**:  
     "Error al conectar con el servidor. Por favor, verifica tu conexión a internet o intenta nuevamente más tarde."
   - **Implementación**: Se verifica si el servidor responde correctamente antes de proceder. Si no, se muestra el mensaje y se ofrece la opción de reintentar.

2. **Errores de validación en el formulario de login/registro**:
  - **Casos manejados**:
    - Campos vacíos.
    - Contraseñas no coinciden.
    - Formato de correo electrónico inválido.
  - **Mensajes mostrados al usuario**:  
     "Por favor, completa todos los campos."  
     "La contraseña debe tener al menos 6 caracteres."  
     "Introduce un correo electrónico válido."
  - **Implementación**: Validaciones locales antes de enviar la solicitud al backend.

3. **Errores al cargar el menú o realizar pedidos**:
   - **Mensaje mostrado al usuario**:  
     "No se pudo cargar el menú. Por favor, intenta nuevamente."  
     "Error al procesar el pedido. Revisa tu selección o inténtalo más tarde."
   - **Implementación**: Manejo de errores en las respuestas de la API con mensajes personalizados según el código de estado.

4. **Errores inesperados**:
   - **Mensaje mostrado al usuario**:  
     "Ocurrió un error inesperado. Por favor, intenta nuevamente más tarde."
   - **Implementación**: Captura de errores no previstos con un fallback general.

---

### **Estrategia técnica de manejo de errores**

1. **Manejo de errores en las solicitudes HTTP**:
   Todas las llamadas al backend utilizan un controlador centralizado en la carpeta `services/`.  
   Se verifica el estado de las respuestas y se lanza un error en caso de códigos distintos a 200-299:  
   ```javascript
   const handleResponse = async (response) => {
       if (!response.ok) {
           const error = await response.json();
           throw new Error(error.message || "Error desconocido");
       }
       return response.json();
   };


1. **Captura de errores en los componentes**:

   - Uso de bloques try...catch en los eventos principales para capturar errores.

   - Ejemplo:
   ```javascript
   const fetchMenu = async () => {
    try {
        const data = await fetch(`${process.env.VITE_API_URL}/menu`);
        const menu = await handleResponse(data);
        setMenu(menu);
    } catch (error) {
        setErrorMessage(error.message || "Error al cargar el menú.");
    }
    };


## **Pruebas**

Se han realizado pruebas con Jest para validar el manejo adecuado de errores en escenarios comunes:

  - Falla al conectarse al servidor.

  - Respuestas con códigos de error (400, 401, 500, etc.).

  - Errores de validación en formularios.

**Para ejecutar las pruebas, usa:**
   ```bash
   npm test
   ```

## Contacto
Si tienes preguntas o problemas, no dudes en contactarme en g.a.gomez2016@gmail.com