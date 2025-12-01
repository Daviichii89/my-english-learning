import { useState, useEffect } from 'react';
import { type Verb, loadVerbs, saveVerbs, resetVerbs } from '../../../utils/verbsStorage';

interface UseMovementVerbsReturn {
  verbs: Verb[];
  isLoading: boolean;
  isEditing: boolean;
  isAdding: boolean;
  editingVerbId: number | null;
  error: string | null;
  setIsEditing: (editing: boolean) => void;
  setEditingVerbId: (id: number | null) => void;
  updateVerb: (id: number, updates: Partial<Omit<Verb, 'id'>>) => void;
  addNewVerb: () => void;
  deleteVerb: (id: number) => void;
  saveChanges: () => Promise<void>;
  saveIndividualVerb: () => Promise<void>;
  cancelIndividualEdit: (id: number) => void;
  resetToDefault: () => Promise<void>;
  cancelEdit: () => void;
  cancelAdd: () => void;
}

export const useMovementVerbs = (): UseMovementVerbsReturn => {
  const [verbs, setVerbs] = useState<Verb[]>([]);
  const [originalVerbs, setOriginalVerbs] = useState<Verb[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [editingVerbId, setEditingVerbId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [newVerbId, setNewVerbId] = useState<number | null>(null);
  const [individualVerbBackup, setIndividualVerbBackup] = useState<Verb | null>(null);

  // Load verbs on component mount
  useEffect(() => {
    loadVerbsData();
  }, []);

  const loadVerbsData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const loadedVerbs = await loadVerbs();
      setVerbs(loadedVerbs);
      setOriginalVerbs(loadedVerbs);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load verbs');
    } finally {
      setIsLoading(false);
    }
  };

  const updateVerb = (id: number, updates: Partial<Omit<Verb, 'id'>>) => {
    setVerbs(prevVerbs =>
      prevVerbs.map(verb =>
        verb.id === id ? { ...verb, ...updates } : verb
      )
    );
  };

  const addNewVerb = () => {
    const newId = Math.max(...verbs.map(v => v.id), 0) + 1;
    const newVerb: Verb = {
      id: newId,
      verb: '',
      translation: '',
      example: '',
    };
    setVerbs(prevVerbs => [...prevVerbs, newVerb]);
    setNewVerbId(newId);
    setIsAdding(true);
  };

  const deleteVerb = (id: number) => {
    setVerbs(prevVerbs => prevVerbs.filter(verb => verb.id !== id));
  };

  const saveIndividualVerb = async (): Promise<void> => {
    try {
      setError(null);
      saveVerbs(verbs);
      setOriginalVerbs([...verbs]);
      setEditingVerbId(null);
      setIndividualVerbBackup(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save verb');
      throw err;
    }
  };

  const cancelIndividualEdit = (id: number) => {
    if (individualVerbBackup) {
      setVerbs(prevVerbs => 
        prevVerbs.map(verb => 
          verb.id === id ? individualVerbBackup : verb
        )
      );
    }
    setEditingVerbId(null);
    setIndividualVerbBackup(null);
    setError(null);
  };

  const startIndividualEdit = (id: number | null) => {
    if (id === null) return;
    const verbToEdit = verbs.find(verb => verb.id === id);
    if (verbToEdit) {
      setIndividualVerbBackup({ ...verbToEdit });
      setEditingVerbId(id);
    }
  };

  const saveChanges = async (): Promise<void> => {
    try {
      setError(null);
      saveVerbs(verbs);
      setOriginalVerbs([...verbs]);
      setIsEditing(false);
      setIsAdding(false);
      setEditingVerbId(null);
      setNewVerbId(null);
      setIndividualVerbBackup(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save changes');
      throw err;
    }
  };

  const cancelEdit = () => {
    setVerbs([...originalVerbs]);
    setIsEditing(false);
    setIsAdding(false);
    setEditingVerbId(null);
    setNewVerbId(null);
    setIndividualVerbBackup(null);
    setError(null);
  };

  const cancelAdd = () => {
    if (newVerbId) {
      setVerbs(prevVerbs => prevVerbs.filter(verb => verb.id !== newVerbId));
      setNewVerbId(null);
    }
    setIsAdding(false);
    setEditingVerbId(null);
    setIndividualVerbBackup(null);
    setError(null);
  };

  const resetToDefault = async (): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      const resetData = await resetVerbs();
      setVerbs(resetData);
      setOriginalVerbs(resetData);
      setIsEditing(false);
      setIsAdding(false);
      setEditingVerbId(null);
      setNewVerbId(null);
      setIndividualVerbBackup(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reset verbs');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    verbs,
    isLoading,
    isEditing,
    isAdding,
    editingVerbId,
    error,
    setIsEditing,
    setEditingVerbId: startIndividualEdit,
    updateVerb,
    addNewVerb,
    deleteVerb,
    saveChanges,
    saveIndividualVerb,
    cancelIndividualEdit,
    resetToDefault,
    cancelEdit,
    cancelAdd,
  };
};