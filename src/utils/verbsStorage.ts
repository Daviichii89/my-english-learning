export interface Verb {
  id: number;
  verb: string;
  translation: string;
  example: string;
}

export interface VerbsData {
  verbs: Verb[];
}

const STORAGE_KEY = 'movementVerbs';

// Load verbs from localStorage or return default data
export const loadVerbs = async (): Promise<Verb[]> => {
  try {
    // First try to load from localStorage (user edits)
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const data: VerbsData = JSON.parse(stored);
      return data.verbs;
    }

    // If no localStorage data, load from JSON file
    const response = await fetch('/data/movementVerbs.json');
    if (!response.ok) {
      throw new Error('Failed to load verbs data');
    }
    
    const data: VerbsData = await response.json();
    return data.verbs;
  } catch (error) {
    console.error('Error loading verbs:', error);
    // Return empty array as fallback
    return [];
  }
};

// Save verbs to localStorage
export const saveVerbs = (verbs: Verb[]): void => {
  try {
    const data: VerbsData = { verbs };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving verbs:', error);
    throw new Error('Failed to save verbs data');
  }
};

// Reset verbs to original JSON data
export const resetVerbs = async (): Promise<Verb[]> => {
  try {
    // Clear localStorage
    localStorage.removeItem(STORAGE_KEY);
    
    // Load fresh data from JSON
    const response = await fetch('/data/movementVerbs.json');
    if (!response.ok) {
      throw new Error('Failed to load original verbs data');
    }
    
    const data: VerbsData = await response.json();
    return data.verbs;
  } catch (error) {
    console.error('Error resetting verbs:', error);
    throw new Error('Failed to reset verbs data');
  }
};