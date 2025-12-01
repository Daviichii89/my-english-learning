import React, { useState } from 'react';
import { useMovementVerbs } from '../../hooks/useMovementVerbs';
import { AddVerbModal } from './components/AddVerbModal';
import { EditVerbModal } from './components/EditVerbModal';
import { ConfirmDeleteModal } from './components/ConfirmDeleteModal';
import { ToastNotification } from './components/ToastNotification';
import { VerbCard } from './components/VerbCard';
import { FloatingAddButton } from './components/FloatingAddButton';
import { LearningTips } from './components/LearningTips';

export const MovementVerbs: React.FC = () => {
  const {
    verbs,
    isLoading,
    error,
    updateVerb,
    addVerb,
    deleteVerb,
    saveChanges,
  } = useMovementVerbs();
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [verbToEdit, setVerbToEdit] = useState<{ id: number; verb: string; translation: string; example: string; } | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [verbToDelete, setVerbToDelete] = useState<{ id: number; verb: string; } | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleAddNewVerb = async (newVerbData: { verb: string; translation: string; example: string }) => {
    try {
      const newId = await addVerb(newVerbData);
      
      // Show success toast
      setToastMessage(`Verb "${newVerbData.verb}" added successfully`);
      setShowToast(true);
      
      // Wait for re-render and scroll to the new verb
      setTimeout(() => {
        const element = document.querySelector(`[data-verb-id="${newId}"]`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          // Add highlight effect
          element.classList.add('highlight-new');
          setTimeout(() => element.classList.remove('highlight-new'), 2000);
        }
      }, 100);
    } catch (error) {
      setToastMessage('Failed to add verb');
      setShowToast(true);
    }
  };

  const handleEditVerb = (id: number) => {
    const verb = verbs.find(v => v.id === id);
    if (verb) {
      setVerbToEdit(verb);
      setIsEditModalOpen(true);
    }
  };

  const handleSaveEdit = async (id: number, verbData: { verb: string; translation: string; example: string }) => {
    const verbName = verbData.verb;
    updateVerb(id, verbData);
    try {
      await saveChanges();
      setIsEditModalOpen(false);
      setVerbToEdit(null);
      
      // Show success toast
      setToastMessage(`Verb "${verbName}" updated successfully`);
      setShowToast(true);
    } catch (error) {
      // Error handled in hook
      throw error;
    }
  };

  const handleDeleteVerb = async (id: number) => {
    const verb = verbs.find(v => v.id === id);
    if (verb) {
      setVerbToDelete({ id: verb.id, verb: verb.verb });
      setIsDeleteModalOpen(true);
    }
  };

  const confirmDelete = async () => {
    if (verbToDelete) {
      const deletedVerbName = verbToDelete.verb;
      try {
        // deleteVerb now saves automatically
        await deleteVerb(verbToDelete.id);
        setIsDeleteModalOpen(false);
        setVerbToDelete(null);
        setIsEditModalOpen(false);
        setVerbToEdit(null);
        
        // Show success toast
        setToastMessage(`Verb "${deletedVerbName}" deleted successfully`);
        setShowToast(true);
      } catch (error) {
        // Error handled in hook
        setToastMessage('Failed to delete verb');
        setShowToast(true);
      }
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
      
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        verbName={verbToDelete?.verb || ''}
        onConfirm={confirmDelete}
        onCancel={() => {
          setIsDeleteModalOpen(false);
          setVerbToDelete(null);
        }}
      />
      
      <ToastNotification
        isVisible={showToast}
        message={toastMessage}
        type="success"
        onClose={() => setShowToast(false)}
      />
    </div>
  );
};