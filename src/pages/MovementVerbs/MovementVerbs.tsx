import React, { useState } from 'react';
import { useMovementVerbs } from '../../hooks/useMovementVerbs';
import { AddVerbModal } from './components/AddVerbModal';
import { EditVerbModal } from './components/EditVerbModal';
import { VerbCard } from './components/VerbCard';
import { FloatingAddButton } from './components/FloatingAddButton';
import { LearningTips } from './components/LearningTips';
import { addNewVerb } from './utils/verbActions';

export const MovementVerbs: React.FC = () => {
  const {
    verbs,
    isLoading,
    error,
    updateVerb,
    deleteVerb,
    saveChanges,
  } = useMovementVerbs();
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [verbToEdit, setVerbToEdit] = useState<{ id: number; verb: string; translation: string; example: string; } | null>(null);

  const handleAddNewVerb = async (newVerbData: { verb: string; translation: string; example: string }) => {
    await addNewVerb(verbs, newVerbData);
  };

  const handleEditVerb = (id: number) => {
    const verb = verbs.find(v => v.id === id);
    if (verb) {
      setVerbToEdit(verb);
      setIsEditModalOpen(true);
    }
  };

  const handleSaveEdit = async (id: number, verbData: { verb: string; translation: string; example: string }) => {
    updateVerb(id, verbData);
    try {
      await saveChanges();
      setIsEditModalOpen(false);
      setVerbToEdit(null);
    } catch (error) {
      // Error handled in hook
      throw error;
    }
  };

  const handleDeleteVerb = async (id: number) => {
    deleteVerb(id);
    try {
      await saveChanges();
      setIsEditModalOpen(false);
      setVerbToEdit(null);
    } catch (error) {
      // Error handled in hook
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
    <div className="max-w-4xl mx-auto pb-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Movement Verbs</h1>
        <p className="text-lg text-gray-600">
          Learn essential English verbs related to movement and motion.
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          Error: {error}
        </div>
      )}
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {verbs.map((verb) => (
          <VerbCard
            key={verb.id}
            verb={verb}
            onStartEdit={handleEditVerb}
            onDelete={handleDeleteVerb}
          />
        ))}
      </div>
      
      <LearningTips />
      
      <FloatingAddButton onClick={() => setIsAddModalOpen(true)} />
      
      <AddVerbModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddNewVerb}
      />
      
      <EditVerbModal
        isOpen={isEditModalOpen}
        verb={verbToEdit}
        onClose={() => {
          setIsEditModalOpen(false);
          setVerbToEdit(null);
        }}
        onSave={handleSaveEdit}
      />
    </div>
  );
};