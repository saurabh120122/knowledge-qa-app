import { useState, useEffect } from 'react';
import { getHealth } from '../services/api';

const Status = () => {
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchHealth = async () => {
    try {
      setLoading(true);
      const data = await getHealth();
      setHealth(data);
      setError('');
    } catch (err) {
      setError('Failed to fetch health status');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHealth();
    
    // Auto-refresh every 10 seconds
    const interval = setInterval(fetchHealth, 10000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    if (status === 'healthy') return 'bg-green-100 text-green-800 border-green-300';
    if (status === 'degraded') return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    return 'bg-red-100 text-red-800 border-red-300';
  };

  const getStatusIcon = (status) => {
    if (status === 'healthy') return '🟢';
    if (status === 'degraded') return '🟡';
    return '🔴';
  };

  if (loading && !health) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <p className="text-gray-600">Loading status...</p>
      </div>
    );
  }

  if (error && !health) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-red-100 text-red-700 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-2">Error</h2>
          <p>{error}</p>
          <button
            onClick={fetchHealth}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">System Status</h1>
        <button
          onClick={fetchHealth}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          disabled={loading}
        >
          🔄 Refresh
        </button>
      </div>

      {health && (
        <>
          {/* Overall Status */}
          <div className={`rounded-lg border-2 p-6 ${getStatusColor(health.status)}`}>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">
                  {getStatusIcon(health.status)} Overall Status
                </h2>
                <p className="text-sm mt-1">
                  System is {health.status}
                </p>
              </div>
            </div>
          </div>

          {/* Backend Status */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              {getStatusIcon('healthy')} Backend Service
            </h3>
            <p className="text-gray-600">Status: <span className="font-semibold text-green-600">Healthy</span></p>
          </div>

          {/* Database Status */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              {getStatusIcon(health.database.status)} Database (ChromaDB)
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <p className="text-lg font-semibold text-green-600">
                  {health.database.status.charAt(0).toUpperCase() + health.database.status.slice(1)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Documents</p>
                <p className="text-lg font-semibold">{health.database.total_documents}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Chunks</p>
                <p className="text-lg font-semibold">{health.database.total_chunks}</p>
              </div>
            </div>
          </div>

          {/* LLM Status */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              {getStatusIcon(health.llm.status)} LLM Connection
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <p className={`text-lg font-semibold ${health.llm.status === 'healthy' ? 'text-green-600' : 'text-red-600'}`}>
                  {health.llm.status.charAt(0).toUpperCase() + health.llm.status.slice(1)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Provider</p>
                <p className="text-lg font-semibold">{health.llm.provider}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Model</p>
                <p className="text-lg font-semibold">{health.llm.model}</p>
              </div>
            </div>
          </div>

          <div className="text-sm text-gray-500 text-center">
            Auto-refreshes every 10 seconds
          </div>
        </>
      )}
    </div>
  );
};

export default Status;
