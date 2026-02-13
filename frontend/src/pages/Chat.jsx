import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ChatInterface from '../components/ChatInterface';
import { getDocuments } from '../services/api';

const Chat = () => {
  const [documentCount, setDocumentCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const docs = await getDocuments();
        setDocumentCount(docs.length);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDocs();
  }, []);

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  if (documentCount === 0) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8 text-center">
          <div className="text-5xl mb-4">📭</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            No Documents Yet
          </h2>
          <p className="text-gray-600 mb-6">
            You need to upload documents before you can ask questions.
          </p>
          <Link
            to="/upload"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Go to Upload Page
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Ask Questions</h1>
        <div className="text-sm text-gray-600">
          📚 {documentCount} document{documentCount !== 1 ? 's' : ''} available
        </div>
      </div>
      
      <ChatInterface />
    </div>
  );
};

export default Chat;
