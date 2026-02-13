import { useState, useEffect } from 'react';
import { getDocuments, deleteDocument } from '../services/api';

const DocumentList = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const docs = await getDocuments();
      setDocuments(docs);
      setError('');
    } catch (err) {
      setError('Failed to load documents');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleDelete = async (docId, filename) => {
    if (!confirm(`Delete "${filename}"?`)) return;
    
    try {
      await deleteDocument(docId);
      setDocuments(documents.filter(doc => doc.doc_id !== docId));
    } catch (err) {
      alert('Failed to delete document');
      console.error(err);
    }
  };

  if (loading) return <div className="text-center py-8">Loading documents...</div>;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Uploaded Documents</h2>
      
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {documents.length === 0 ? (
        <p className="text-gray-500 text-center py-8">
          No documents uploaded yet. Upload your first document to get started!
        </p>
      ) : (
        <div className="space-y-3">
          {documents.map((doc) => (
            <div
              key={doc.doc_id}
              className="flex items-center justify-between p-4 border rounded hover:bg-gray-50"
            >
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{doc.filename}</h3>
                <p className="text-sm text-gray-600">
                  {doc.chunk_count} chunks • Uploaded: {new Date(doc.upload_date).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => handleDelete(doc.doc_id, doc.filename)}
                className="ml-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                🗑️ Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DocumentList;
