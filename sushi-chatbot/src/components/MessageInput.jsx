import React, { useState } from "react";

function MessageInput({ onSendMessage, showMainButtons }) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  const handleButtonClick = (action) => {
    onSendMessage(action);
  };

  return (
    <div className="mt-6 flex justify-center">
      {showMainButtons && (
        <div className="flex w-full space-x-2 mb-2">
          <button
            onClick={() => handleButtonClick("horarios")}
            className="flex-1 px-2 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            Horarios
          </button>
          <button
            onClick={() => handleButtonClick("menu")}
            className="flex-1 px-2 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            Menú
          </button>
          <button
            onClick={() => handleButtonClick("ordenar")}
            className="flex-1 px-2 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            Ordenar
          </button>
        </div>
      )}
    </div>
  );
}

export default MessageInput;
