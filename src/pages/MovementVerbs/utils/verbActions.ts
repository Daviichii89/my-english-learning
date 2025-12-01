export const addNewVerb = async (
  verbs: Array<{ id: number; verb: string; translation: string; example: string }>,
  newVerbData: { verb: string; translation: string; example: string }
) => {
  const newId = Math.max(...verbs.map(v => v.id), 0) + 1;
  const verbToAdd = {
    id: newId,
    ...newVerbData
  };
  
  const updatedVerbs = [...verbs, verbToAdd];
  
  try {
    const { saveVerbs } = await import('../../../utils/verbsStorage');
    saveVerbs(updatedVerbs);
    // Reload data to reflect changes
    window.location.reload();
  } catch (error) {
    throw error;
  }
};

export const handleDelete = (id: number, deleteCallback: (id: number) => void) => {
  if (window.confirm('¿Estás seguro de que quieres eliminar este verbo?')) {
    deleteCallback(id);
  }
};

export const handleReset = async (resetCallback: () => Promise<void>) => {
  if (window.confirm('¿Estás seguro de que quieres restaurar todos los verbos a sus valores originales?')) {
    try {
      await resetCallback();
    } catch (error) {
      // Error is handled in the hook
    }
  }
};