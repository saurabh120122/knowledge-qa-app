import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-12 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          📚 Welcome to Knowledge Q&A
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Upload your documents and ask questions. Get AI-powered answers with source citations.
        </p>
        
        <div className="grid md:grid-cols-2 gap-6 mt-12">
          <Link
            to="/upload"
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-8 transition transform hover:scale-105"
          >
            <div className="text-5xl mb-4">📤</div>
            <h2 className="text-2xl font-bold mb-2">Upload Documents</h2>
            <p className="text-blue-100">
              Add text files, PDFs, or markdown documents to your knowledge base
            </p>
          </Link>
          
          <Link
            to="/chat"
            className="bg-green-600 hover:bg-green-700 text-white rounded-lg p-8 transition transform hover:scale-105"
          >
            <div className="text-5xl mb-4">💬</div>
            <h2 className="text-2xl font-bold mb-2">Ask Questions</h2>
            <p className="text-green-100">
              Get answers from your documents with AI-powered search
            </p>
          </Link>
        </div>
        
        <div className="mt-12 pt-8 border-t">
          <h3 className="text-xl font-semibold mb-4">How it works</h3>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div className="bg-gray-50 rounded p-4">
              <div className="text-3xl mb-2">1️⃣</div>
              <h4 className="font-semibold mb-1">Upload</h4>
              <p className="text-sm text-gray-600">
                Upload your documents (.txt, .pdf, .md)
              </p>
            </div>
            <div className="bg-gray-50 rounded p-4">
              <div className="text-3xl mb-2">2️⃣</div>
              <h4 className="font-semibold mb-1">Ask</h4>
              <p className="text-sm text-gray-600">
                Type any question about your documents
              </p>
            </div>
            <div className="bg-gray-50 rounded p-4">
              <div className="text-3xl mb-2">3️⃣</div>
              <h4 className="font-semibold mb-1">Get Answers</h4>
              <p className="text-sm text-gray-600">
                Receive answers with exact source citations
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
