import { useState } from 'react';
import { askQuestion } from '../services/api';
import SourceCard from './SourceCard';
import ReactMarkdown from "react-markdown";

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    const userMessage = {
      type: 'user',
      content: input,
      timestamp: new Date(),
    };
    
    setMessages([...messages, userMessage]);
    setInput('');
    setLoading(true);
    
    try {
      const response = await askQuestion(input);
      
      const aiMessage = {
        type: 'ai',
        content: response.answer,
        sources: response.sources,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      const errorMessage = {
        type: 'error',
        content: err.response?.data?.detail || 'Failed to get answer. Please try again.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow flex flex-col h-[calc(100vh-12rem)]">
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 py-12">
            <p className="text-lg mb-2">💬 Ask a question about your documents</p>
            <p className="text-sm">Type your question below to get started</p>
          </div>
        ) : (
          messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-3xl ${msg.type === 'user' ? 'bg-blue-600 text-white' : msg.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-gray-100'} rounded-lg p-4`}>
                <ReactMarkdown>{msg.content}</ReactMarkdown>
                
                {msg.sources && msg.sources.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <p className="text-sm font-semibold text-gray-700">Sources:</p>
                    {msg.sources.map((source, i) => (
                      <SourceCard key={i} source={source} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
        
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg p-4">
              <p className="text-gray-600">🤔 Thinking...</p>
            </div>
          </div>
        )}
      </div>
      
      {/* Input form */}
      <form onSubmit={handleSubmit} className="border-t p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question about your documents..."
            className="flex-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatInterface;
