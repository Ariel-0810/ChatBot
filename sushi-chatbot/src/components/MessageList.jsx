function MessageList({ messages, messagesEndRef, updateOrder, order, total, handleFinalizePedido }) {
    const renderMessage = (message) => {
      if (message.type === 'menu') {
        return (
          <div>
            <p className="font-bold text-lg">Aqui está nuestro Menú:</p>
            <ul className="space-y-2 mt-2">
              {message.items.map((item, index) => (
                <li key={index} className="flex space-x-4 items-start">
                  {/* <span className="font-bold">{item.name}</span> */}
                  <img src={item.image} alt={item.name} className="w-32 h-32 object-cover rounded-md" />
                  <div className="flex-1 space-y-1">
                  <span className="font-bold text-l">{item.name}</span>
                  <p className="text-gray-600">{item.description}</p>
                  <p className="text-sm text-gray-500">Ingredientes: {item.ingredients.join(', ')}</p>
                  <p className="font-semibold">Precio: ${item.price.toFixed(2)}</p>
                </div>
                </li>
              ))}
            </ul>
          </div>
        );
      }
  
      if (message.type === 'ordenar') {
        return (
          <div>
            <p className="font-bold text-lg">Carta interactiva:</p>
            <ul className="space-y-2 mt-2">
              {message.items.map((item, index) => (
                <li key={index} className="flex justify-between items-center">
                  <span>{item.name} - ${item.price.toFixed(2)}</span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateOrder(item, -1)}
                      className="px-2 py-1 bg-red-500 text-white rounded"
                      disabled={!order[item.name]}
                    >
                      -
                    </button>
                    <span className="w-8 text-center">{order[item.name] || 0}</span>
                    <button
                      onClick={() => updateOrder(item, 1)}
                      className="px-2 py-1 bg-green-500 text-white rounded"
                    >
                      +
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        );
      } if (message.isHtml) {
        return <div dangerouslySetInnerHTML={{ __html: message.content }} />
      }
      return message.content
    }
  
    return (
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${message.isUser ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
              {renderMessage(message)}
            </div>
          </div>
        ))}
      {messages.some(message => message.type === 'text' && message.items) && (
        <div className="mt-4 text-lg font-semibold flex justify-between items-center">
          <span>Precio Total: ${total.toFixed(2)}</span>
          <button 
            onClick={handleFinalizePedido}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            Finalizar Pedido
          </button>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
    );
  }
  
  
  export default MessageList

