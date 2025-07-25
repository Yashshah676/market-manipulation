import React, { useState } from 'react';
import CaseList from '../components/CaseList';
import CaseDetail from '../components/CaseDetail';
import { useNavigate } from 'react-router-dom';

export default function CaseLibrary() {
  const [selectedCase, setSelectedCase] = useState(null);
  const navigate = useNavigate();

  const handleStartSimulation = (c) => {
    // Pass case ID to simulation page (could use state, context, or params)
    navigate('/simulation', { state: { caseId: c._id } });
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4 text-indigo-700">Case Library</h2>
      <p className="mb-4 text-gray-600">Browse real-world market manipulation cases. Select a case to start a simulation.</p>
      <CaseList onSelectCase={setSelectedCase} />
      <CaseDetail
        selectedCase={selectedCase}
        onClose={() => setSelectedCase(null)}
        onStartSimulation={handleStartSimulation}
      />
    </div>
  );
}
