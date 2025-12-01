import React, { useState } from 'react';
import { useMovementVerbs } from '../../hooks/useMovementVerbs';

interface VerbCardProps {
  verb: {
    id: number;
    verb: string;
    translation: string;
    example: string;
  };
  isEditing: boolean;
  isAdding: boolean;
  isNewVerb: boolean;
  isIndividuallyEditing: boolean;
  onUpdate: (id: number, updates: { verb?: string; translation?: string; example?: string }) => void;
  onDelete: (id: number) => void;
  onStartEdit: (id: number) => void;
  onSaveIndividual: () => Promise<void>;
  onCancelIndividual: (id: number) => void;
}

const VerbCard: React.FC<VerbCardProps> = ({ 
  verb, 
  isEditing, 
  isAdding, 
  isNewVerb, 
  isIndividuallyEditing, 
  onUpdate, 
  onDelete, 
  onStartEdit, 
  onSaveIndividual, 
  onCancelIndividual 
}) => {
  const isEditableMode = isEditing || (isAdding && isNewVerb) || isIndividuallyEditing;
  const [isSaving, setIsSaving] = useState(false);
  
  const handleSaveIndividual = async () => {
    setIsSaving(true);
    try {
      await onSaveIndividual();
    } catch (error) {
      // Error is handled in the hook
    } finally {
      setIsSaving(false);
    }
  };
  
  if (isEditableMode) {
    return (
      <div className={`bg-white rounded-lg shadow-md p-6 border-2 relative ${
        isNewVerb ? 'border-purple-200 bg-purple-50' : 
        isIndividuallyEditing ? 'border-green-200 bg-green-50' : 
        'border-blue-200'
      }`}>
        {(isEditing || isIndividuallyEditing) && (
          <button
            onClick={() => onDelete(verb.id)}
            className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-lg font-bold w-6 h-6 flex items-center justify-center"
            title="Delete verb"
          >
            ×
          </button>
        )}
        
        {/* Individual edit controls */}
        {isIndividuallyEditing && (
          <div className="absolute top-2 left-2 flex gap-1">
            <button
              onClick={handleSaveIndividual}
              disabled={isSaving}
              className="text-green-600 hover:text-green-800 text-sm font-bold px-2 py-1 bg-white rounded border border-green-300 disabled:opacity-50"
              title="Save this verb"
            >
              {isSaving ? '...' : '✓'}
            </button>
            <button
              onClick={() => onCancelIndividual(verb.id)}
              className="text-red-600 hover:text-red-800 text-sm font-bold px-2 py-1 bg-white rounded border border-red-300"
              title="Cancel editing"
            >
              ×
            </button>
          </div>
        )}
        
        <input
          type="text"
          value={verb.verb}
          onChange={(e) => onUpdate(verb.id, { verb: e.target.value })}
          className={`text-xl font-semibold mb-2 w-full border-b focus:outline-none bg-transparent ${
            isNewVerb ? 'text-purple-600 border-purple-300 focus:border-purple-500' : 
            isIndividuallyEditing ? 'text-green-600 border-green-300 focus:border-green-500' :
            'text-blue-600 border-blue-300 focus:border-blue-500'
          }`}
          placeholder="Verb"
          autoFocus={isNewVerb || isIndividuallyEditing}
        />
        <div className="mb-3">
          <span className="text-sm text-gray-500">Translation:</span>
          <input
            type="text"
            value={verb.translation}
            onChange={(e) => onUpdate(verb.id, { translation: e.target.value })}
            className="text-gray-700 font-medium ml-2 w-full border-b border-gray-300 focus:border-green-500 outline-none bg-transparent"
            placeholder="Translation"
          />
        </div>
        <div>
          <span className="text-sm text-gray-500">Example:</span>
          <textarea
            value={verb.example}
            onChange={(e) => onUpdate(verb.id, { example: e.target.value })}
            className="text-gray-600 italic ml-2 w-full border-b border-gray-300 focus:border-green-500 outline-none bg-transparent resize-none"
            placeholder="Example sentence"
            rows={2}
          />
        </div>
      </div>
    );
  }

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

export const MovementVerbs: React.FC = () => {
  const {
    verbs,
    isLoading,
    isEditing,
    isAdding,
    editingVerbId,
    error,
    setIsEditing,
    setEditingVerbId,
    updateVerb,
    addNewVerb,
    deleteVerb,
    saveChanges,
    saveIndividualVerb,
    cancelIndividualEdit,
    resetToDefault,
    cancelEdit,
    cancelAdd,
  } = useMovementVerbs();

  const handleSave = async () => {
    try {
      await saveChanges();
    } catch (error) {
      // Error is handled in the hook
    }
  };

  const handleReset = async () => {
    if (window.confirm('¿Estás seguro de que quieres restaurar todos los verbos a sus valores originales?')) {
      try {
        await resetToDefault();
      } catch (error) {
        // Error is handled in the hook
      }
    }
  };

  const handleDelete = (id: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este verbo?')) {
      deleteVerb(id);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-gray-600">Loading movement verbs...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Movement Verbs</h1>
          <p className="text-lg text-gray-600">
            Learn essential English verbs related to movement and motion.
          </p>
        </div>
        <div className="flex gap-2">
          {!isEditing && !isAdding ? (
            <>
              <button
                onClick={addNewVerb}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Add New Verb
              </button>
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Reset
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Save
              </button>
              <button
                onClick={isAdding ? cancelAdd : cancelEdit}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          Error: {error}
        </div>
      )}

      {isEditing && (
        <div className="mb-6 p-4 bg-blue-100 border border-blue-400 text-blue-700 rounded-lg">
          ✏️ Edit mode: Modify existing verbs or use the "×" button to delete them. Click Save when done!
        </div>
      )}

      {isAdding && (
        <div className="mb-6 p-4 bg-purple-100 border border-purple-400 text-purple-700 rounded-lg">
          ➕ Adding new verb: Fill in the highlighted fields below and click Save to add it permanently!
        </div>
      )}
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {verbs.map((verb) => {
          const isNewVerb = isAdding && verb.id === Math.max(...verbs.map(v => v.id));
          const isIndividuallyEditing = editingVerbId === verb.id;
          return (
            <VerbCard
              key={verb.id}
              verb={verb}
              isEditing={isEditing}
              isAdding={isAdding}
              isNewVerb={isNewVerb}
              isIndividuallyEditing={isIndividuallyEditing}
              onUpdate={updateVerb}
              onDelete={handleDelete}
              onStartEdit={setEditingVerbId}
              onSaveIndividual={saveIndividualVerb}
              onCancelIndividual={cancelIndividualEdit}
            />
          );
        })}
      </div>
      
      <div className="mt-12 p-6 bg-blue-50 rounded-lg">
        <h2 className="text-2xl font-semibold text-blue-800 mb-4">Tips for Learning Movement Verbs</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Practice these verbs with physical actions when possible</li>
          <li>Create sentences using different subjects (I, you, he, she, we, they)</li>
          <li>Pay attention to irregular past tenses (swim → swam, run → ran)</li>
          <li>Use these verbs in present continuous to describe ongoing actions</li>
        </ul>
      </div>
    </div>
  );
};