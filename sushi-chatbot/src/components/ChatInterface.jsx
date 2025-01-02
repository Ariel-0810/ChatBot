import React, { useState, useEffect, useRef, useCallback } from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { handleUserMessage } from "../services/chatbotService";
import { createOrder } from "../services/chatService";
import { useUserStore } from "../store/user/index";

export default function ChatInterface() {
  const { user } = useUserStore();
  const [messages, setMessages] = useState([]);
  const [order, setOrder] = useState({});
  const [total, setTotal] = useState(0);
  const [isOrdering, setIsOrdering] = useState(false);
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const messagesEndRef = useRef(null);
  const initialMessageSent = useRef(false);
  const [showMainButtons, setShowMainButtons] = useState(true);
  const [isViewingMenu, setIsViewingMenu] = useState(false);

  console.log("user--->", user);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const addMessage = useCallback((message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  }, []);

  const handleSendMessage = useCallback(
    async (message) => {
      if (message === "menu") {
        const menuItems = await handleUserMessage(message);
        if (menuItems.items && menuItems.items.length > 0) {
          addMessage({ type: "menu", items: menuItems.items });
          setIsViewingMenu(true);
          setShowMainButtons(false);
        }
        return;
      }

      if (message === "ordenar") {
        const menuItems = await handleUserMessage("menu");
        if (menuItems.items && menuItems.items.length > 0) {
          addMessage({ type: "ordenar", items: menuItems.items });
          setIsOrdering(true);
          setShowMainButtons(false);
        }
        return;
      }

      addMessage({ type: "text", content: message, isUser: true });

      const botResponse = await handleUserMessage(message);
      console.log("botResponse--->", botResponse);

      if (botResponse.items && botResponse.items.length > 0) {
        addMessage({ type: "menu", items: botResponse.items });
        setIsOrdering(true);
        setShowMainButtons(false);
      }

      if (botResponse.type === "order-completed") {
        setIsOrdering(false);
      }

      addMessage({ ...botResponse, isUser: false });
    },
    [addMessage]
  );

  const handleCloseMenuView = () => {
    setIsViewingMenu(false);
    setShowMainButtons(true);
  };

  useEffect(() => {
    if (!initialMessageSent.current) {
      addMessage({
        type: "text",
        content:
          "¡Hola! Soy el Sushi Chatbot. ¿En qué puedo ayudarte hoy?. Puedes preguntarme por el menú, hacer un pedido o consultar nuestros horarios de atención",
        isUser: false
      });
      initialMessageSent.current = true;
    }
  }, [addMessage]);

  const updateOrder = useCallback((item, increment) => {
    setOrder((prevOrder) => {
      const currentQuantity = prevOrder[item.name] || 0;
      const newQuantity = Math.max(0, currentQuantity + increment);
      const updatedOrder = { ...prevOrder };

      if (newQuantity === 0) {
        delete updatedOrder[item.name];
      } else {
        updatedOrder[item.name] = newQuantity;
      }

      console.log("Updated Order:", updatedOrder);
      return updatedOrder;
    });

    setTotal((prevTotal) => {
      const newTotal = Math.max(0, prevTotal + item.price * increment);
      console.log("Updated Total:", newTotal);
      return newTotal;
    });
  }, []);

  const handleFinalizePedido = useCallback(() => {
    setShowOrderSummary(true);
  }, []);

  const handleCancelOrder = useCallback(() => {
    setShowOrderSummary(false);
  }, []);

  const handleConfirmOrder = useCallback(async () => {
    if (!user?.id) {
      throw new Error("El usuario no está definido o no tiene ID.");
    }
    try {
      const orderDetails = {
        userId: user?.id,
        items: Object.entries(order).map(([name, quantity]) => {
          const item = messages
            .find((msg) => msg.type === "menu")
            ?.items.find((i) => i.name === name);
          return { name, quantity, price: item?.price || 0 };
        }),
        totalPrice: total
      };

      const response = await createOrder(orderDetails);
      const orderId = response.data.order._id.slice(-5);

      const orderSummary = orderDetails.items
        .map(
          ({ name, quantity, price }) =>
            `<li> - ${name}: ${quantity} x $${price.toFixed(2)} = $${(
              quantity * price
            ).toFixed(2)}</li>`
        )
        .join("");

      const detailedMessage = `
        <p><strong>Detalle del pedido:</strong></p>
        <ul>
         ${orderSummary}
        </ul>
        <p><strong>Total: $${total.toFixed(2)}</strong></p>
      `;

      addMessage({
        type: "text",
        content: `Pedido confirmado. Número de orden: ${orderId}`,
        isUser: false
      });
      addMessage({
        type: "text",
        content: detailedMessage,
        isUser: false,
        isHtml: true
      });
      addMessage({
        type: "text",
        content: "¿Puedo ayudarte con algo más?",
        isUser: false
      });
      setOrder({});
      setTotal(0);
      setIsOrdering(false);
      setShowMainButtons(true);
      setShowOrderSummary(false);
    } catch (error) {
      addMessage({
        type: "text",
        content:
          "Lo siento, hubo un error al procesar tu pedido. Por favor, intenta de nuevo...",
        isUser: false
      });
    }
  }, [user, order, messages, total, addMessage]);

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <h1 className="text-2xl font-semibold text-center mb-6">
            Sushi Chatbot
          </h1>
          <MessageList
            messages={messages}
            messagesEndRef={messagesEndRef}
            updateOrder={updateOrder}
            order={order}
            total={total}
            handleFinalizePedido={handleFinalizePedido}
          />
          {isViewingMenu && (
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleCloseMenuView}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Cerrar Menú
              </button>
            </div>
          )}

          {isOrdering && !showOrderSummary && (
            <div className="ml-6 mt-1 text-lg font-semibold flex justify-between items-center">
              <span>Precio Total: ${total.toFixed(2)}</span>
              <button
                onClick={handleFinalizePedido}
                className="mr-5 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                Finalizar Pedido
              </button>
            </div>
          )}

          {showOrderSummary && (
            <div className="mt-4 p-4 bg-gray-100 rounded-lg">
              <h2 className="text-xl font-semibold mb-2">Resumen del Pedido</h2>
              {Object.entries(order).map(([itemName, quantity]) => (
                <div key={itemName} className="flex justify-between">
                  <span>{itemName}</span>
                  <span>x {quantity}</span>
                </div>
              ))}
              <div className="mt-2 font-bold">Total: ${total.toFixed(2)}</div>
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  onClick={handleCancelOrder}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleConfirmOrder}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  Confirmar
                </button>
              </div>
            </div>
          )}

          <MessageInput
            onSendMessage={handleSendMessage}
            showMainButtons={showMainButtons}
          />
        </div>
      </div>
    </div>
  );
}
