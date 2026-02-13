import { useState } from 'react';

const SourceCard = ({ source }) => {
  const [expanded, setExpanded] = useState(false);
  
  const truncatedText = source.chunk_text.length > 150
    ? source.chunk_text.substring(0, 150) + '...'
    : source.chunk_text;

  return (
    <div className="border rounded p-4 bg-gray-50">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-blue-600">📄 {source.document}</h4>
        <span className="text-sm text-gray-500">
          {(source.relevance_score * 100).toFixed(1)}% match
        </span>
      </div>
      
      <p className="text-sm text-gray-700 whitespace-pre-wrap">
        {expanded ? source.chunk_text : truncatedText}
      </p>
      
      {source.chunk_text.length > 150 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-blue-600 text-sm mt-2 hover:underline"
        >
          {expanded ? 'Show less' : 'Show more'}
        </button>
      )}
    </div>
  );
};

export default SourceCard;
