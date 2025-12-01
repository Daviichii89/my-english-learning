import { useState, useEffect } from 'react';
import { type Verb, loadVerbs, saveVerbs } from '../utils/verbsStorage';

interface UseMovementVerbsReturn {
  verbs: Verb[];
  isLoading: boolean;
  error: string | null;
  updateVerb: (id: number, updates: Partial<Omit<Verb, 'id'>>) => void;
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
      setVerbs(loadedVerbs);
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

  const deleteVerb = async (id: number): Promise<void> => {
    try {
      setError(null);
      const updatedVerbs = verbs.filter(verb => verb.id !== id);
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
      saveVerbs(verbs);
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
    deleteVerb,
    saveChanges,
  };
};