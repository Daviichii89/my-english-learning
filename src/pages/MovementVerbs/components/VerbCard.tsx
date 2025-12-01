import React from 'react';

interface VerbCardProps {
  verb: {
    id: number;
    verb: string;
    translation: string;
    example: string;
  };
  onStartEdit: (id: number) => void;
}

export const VerbCard: React.FC<VerbCardProps> = ({ 
  verb, 
  onStartEdit
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow relative group">
      <button
        onClick={() => onStartEdit(verb.id)}
        className="absolute top-2 right-2 text-gray-400 hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity text-sm font-bold px-2 py-1 bg-gray-100 hover:bg-blue-100 rounded"
        title="Edit this verb"
      >
        ✏️
      </button>
      
      <h3 className="text-xl font-semibold text-blue-600 mb-2">
        {verb.verb}
      </h3>
      <p className="text-gray-700 font-medium mb-3">
        <span className="text-sm text-gray-500">Translation:</span> {verb.translation}
      </p>
      <p className="text-gray-600 italic">
        <span className="text-sm text-gray-500">Example:</span> "{verb.example}"
      </p>
    </div>
  );
};