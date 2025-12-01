import React from 'react';

interface ActionFooterProps {
  onAddNewVerb: () => void;
  onReset: () => void;
}

export const ActionFooter: React.FC<ActionFooterProps> = ({
  onAddNewVerb,
  onReset
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg p-4 z-50">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={onAddNewVerb}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2 shadow-md"
          >
            <span>➕</span>
            Add New Verb
          </button>
          <button
            onClick={onReset}
            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2 shadow-md"
          >
            <span>🔄</span>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};