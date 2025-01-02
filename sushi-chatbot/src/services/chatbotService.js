import { getMenuItems } from "./chatService"
  
export async function handleUserMessage(message) {
    const lowerCaseMessage = message.toLowerCase()
  
    if (lowerCaseMessage.includes('pedir') || lowerCaseMessage.includes('ordenar') || lowerCaseMessage.includes('pedido')) {
      const menuItems = await getMenuItems() // Consulta el menú
      if (menuItems.length === 0) {
        return {
          type: 'text',
          content: 'Lo siento, no pude obtener el menú en este momento. Por favor, intenta más tarde.',
        }
      }
  
      return {
        type: 'text',
        content: 'Aquí está nuestro menú:',
        items: menuItems.map(item => ({
          name: item.name,
          price: item.price,
          description: item.description,
        })),
      }
    }
  
    if (lowerCaseMessage.includes('menu') || lowerCaseMessage.includes('menú') || lowerCaseMessage.includes('carta')) {
        const menuItems = await getMenuItems() // Consulta el menú
        if (menuItems.length === 0) {
          return {
            type: 'text',
            content: 'Lo siento, no pude obtener el menú en este momento. Por favor, intenta más tarde.',
          }
        }
    
        return {
          type: 'text',
          content: 'Aquí está nuestro menú:',
          items: menuItems.map(item => ({
            name: item.name,
            price: item.price,
            image: item.image,
            ingredients: item.ingredients,
            description: item.description,
          })),
        }
      }
  
    if (lowerCaseMessage.includes('abierto') || lowerCaseMessage.includes('horario') || lowerCaseMessage.includes('atiende')) {
      return {
        type: 'text',
        content: "Nuestro horario de atención es de lunes a domingo, de 11:00 AM a 10:00 PM.",
      }
    }
  
    if (lowerCaseMessage.includes('hola') ||
        /buen(os)?\s*d[ií]as?/.test(lowerCaseMessage) || 
        /buen(as?)?\s*tardes?/.test(lowerCaseMessage) ||
        /buen(as?)?\s*noches?/.test(lowerCaseMessage)) { 
      return {
        type: 'text',
        content: "¡Hola! ¿En qué puedo ayudarte hoy? Puedes preguntarme por el menú, hacer un pedido o consultar nuestro horario.",
      }
    }
  
    return {
      type: 'text',
      content: "Lo siento, no entiendo tu pregunta. ¿Puedes reformularla? Puedo ayudarte con el menú, pedidos y horarios.",
    }
  }  
  