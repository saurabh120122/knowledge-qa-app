import { useState } from 'react';
import { uploadDocument } from '../services/api';

const FileUpload = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setMessage('');
    setError('');
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file first');
      return;
    }

    try {
      setUploading(true);
      setError('');
      setMessage('');
      
      const result = await uploadDocument(file);
      
      setMessage(`✓ ${result.message} (${result.chunks_created} chunks created)`);
      setFile(null);
      
      // Reset file input
      document.getElementById('file-input').value = '';
      
      // Callback to refresh document list
      if (onUploadSuccess) {
        onUploadSuccess();
      }
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to upload document');
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Upload Document</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Select File (txt, pdf, md)
          </label>
          <input
            id="file-input"
            type="file"
            accept=".txt,.pdf,.md"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
        
        {file && (
          <div className="text-sm text-gray-600">
            Selected: <span className="font-medium">{file.name}</span>
          </div>
        )}
        
        <button
          onClick={handleUpload}
          disabled={!file || uploading}
          className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
        >
          {uploading ? '⏳ Uploading...' : '📤 Upload Document'}
        </button>
        
        {message && (
          <div className="bg-green-100 text-green-700 p-3 rounded">
            {message}
          </div>
        )}
        
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
