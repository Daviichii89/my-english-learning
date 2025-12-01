import React, { useState } from 'react';

interface VerbCardProps {
  verb: {
    id: number;
    verb: string;
    translation: string;
    example: string;
  };
  onStartEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export const VerbCard: React.FC<VerbCardProps> = ({ 
  verb, 
  onStartEdit,
  onDelete
}) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow relative">
      {/* Menu button - always visible on mobile, subtle on desktop */}
      <div className="absolute top-2 right-2">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          title="Options"
          aria-label="Verb options"
        >
          <svg 
            className="w-5 h-5" 
            fill="currentColor" 
            viewBox="0 0 16 16"
          >
            <circle cx="8" cy="2" r="1.5"/>
            <circle cx="8" cy="8" r="1.5"/>
            <circle cx="8" cy="14" r="1.5"/>
          </svg>
        </button>
        
        {/* Dropdown menu */}
        {showMenu && (
          <>
            {/* Backdrop to close menu */}
            <div 
              className="fixed inset-0 z-10" 
              onClick={() => setShowMenu(false)}
            />
            
            {/* Menu */}
            <div className="absolute right-0 mt-1 w-36 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
              <button
                onClick={() => {
                  onStartEdit(verb.id);
                  setShowMenu(false);
                }}
                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-blue-50 flex items-center gap-2"
              >
                <span>✏️</span>
                Edit
              </button>
              <button
                onClick={() => {
                  onDelete(verb.id);
                  setShowMenu(false);
                }}
                className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
              >
                <span>🗑️</span>
                Delete
              </button>
            </div>
          </>
        )}
      </div>
      
      <h3 className="text-xl font-semibold text-blue-600 mb-2 pr-8">
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