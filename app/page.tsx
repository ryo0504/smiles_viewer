'use client';

import { useState } from 'react';
import MoleculeViewer from './components/MoleculeViewer';
import { generate3D } from './api-client/smiles';

export default function Home() {
  const [smiles, setSmiles] = useState('');
  const [molblock, setMolblock] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!smiles) return;
    setLoading(true);
    setError('');
    try {
      const result = await generate3D(smiles);
      setMolblock(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">SMILES to 3D Viewer</h1>

      <div className="w-full max-w-2xl bg-white p-6 rounded-xl shadow-lg">
        <div className="flex gap-4 mb-6">
          <input
            type="text"
            value={smiles}
            onChange={(e) => setSmiles(e.target.value)}
            placeholder="Enter SMILES (e.g., CCO, c1ccccc1)"
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-800"
          />
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium transition-colors"
          >
            {loading ? 'Generating...' : 'Generate 3D'}
          </button>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-lg border border-red-200">
            {error}
          </div>
        )}

        <div className="w-full h-[400px] bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
          {molblock ? (
            <MoleculeViewer molblock={molblock} />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              Enter a SMILES string to view 3D structure
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
