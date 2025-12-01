import { useState, useEffect } from 'react';
import { type Verb, loadVerbs, saveVerbs } from '../utils/verbsStorage';

// Helper function to sort verbs alphabetically
const sortVerbsAlphabetically = (verbs: Verb[]): Verb[] => {
  return [...verbs].sort((a, b) => a.verb.localeCompare(b.verb, 'en', { sensitivity: 'base' }));
};

interface UseMovementVerbsReturn {
  verbs: Verb[];
  isLoading: boolean;
  error: string | null;
  updateVerb: (id: number, updates: Partial<Omit<Verb, 'id'>>) => void;
  addVerb: (verbData: { verb: string; translation: string; example: string }) => Promise<number>;
  deleteVerb: (id: number) => Promise<void>;
  saveChanges: () => Promise<void>;
}

export const useMovementVerbs = (): UseMovementVerbsReturn => {
  const [verbs, setVerbs] = useState<Verb[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load verbs on component mount
  useEffect(() => {
    loadVerbsData();
  }, []);

  const loadVerbsData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const loadedVerbs = await loadVerbs();
      setVerbs(sortVerbsAlphabetically(loadedVerbs));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load verbs');
    } finally {
      setIsLoading(false);
    }
  };

  const updateVerb = (id: number, updates: Partial<Omit<Verb, 'id'>>) => {
    setVerbs(prevVerbs => {
      const updated = prevVerbs.map(verb =>
        verb.id === id ? { ...verb, ...updates } : verb
      );
      return sortVerbsAlphabetically(updated);
    });
  };

  const addVerb = async (verbData: { verb: string; translation: string; example: string }): Promise<number> => {
    try {
      setError(null);
      const newId = Math.max(...verbs.map(v => v.id), 0) + 1;
      const newVerb: Verb = {
        id: newId,
        ...verbData
      };
      const updatedVerbs = sortVerbsAlphabetically([...verbs, newVerb]);
      setVerbs(updatedVerbs);
      saveVerbs(updatedVerbs);
      return newId;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add verb');
      throw err;
    }
  };

  const deleteVerb = async (id: number): Promise<void> => {
    try {
      setError(null);
      const updatedVerbs = verbs.filter(verb => verb.id !== id);
      // No need to sort after delete, order is maintained
      setVerbs(updatedVerbs);
      saveVerbs(updatedVerbs);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete verb');
      throw err;
    }
  };

  const saveChanges = async (): Promise<void> => {
    try {
      setError(null);
      const sortedVerbs = sortVerbsAlphabetically(verbs);
      saveVerbs(sortedVerbs);
      setVerbs(sortedVerbs);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save changes');
      throw err;
    }
  };

  return {
    verbs,
    isLoading,
    error,
    updateVerb,
    addVerb,
    deleteVerb,
    saveChanges,
  };
};