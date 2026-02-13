import { useState } from 'react';
import FileUpload from '../components/FileUpload';
import DocumentList from '../components/DocumentList';

const Upload = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleUploadSuccess = () => {
    // Trigger DocumentList refresh
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Document Management</h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        <FileUpload onUploadSuccess={handleUploadSuccess} />
        
        <div className="bg-blue-50 rounded-lg p-6">
          <h3 className="font-semibold text-lg mb-3">📝 Tips</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>✓ Supported formats: .txt, .pdf, .md</li>
            <li>✓ Documents are automatically chunked for better search</li>
            <li>✓ You can upload multiple documents</li>
            <li>✓ Delete documents you no longer need</li>
            <li>✓ Each document is searchable immediately after upload</li>
          </ul>
        </div>
      </div>
      
      <DocumentList key={refreshKey} />
    </div>
  );
};

export default Upload;
