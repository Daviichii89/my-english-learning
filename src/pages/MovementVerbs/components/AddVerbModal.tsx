import React, { useState } from 'react';

interface AddVerbModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (verb: { verb: string; translation: string; example: string }) => Promise<void>;
}

export const AddVerbModal: React.FC<AddVerbModalProps> = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    verb: '',
    translation: '',
    example: ''
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.verb.trim()) return;
    
    setIsSaving(true);
    try {
      await onSave(formData);
      setFormData({ verb: '', translation: '', example: '' });
      onClose();
    } catch (error) {
      // Error handled in parent
    } finally {
      setIsSaving(false);
    }
  };

  const handleClose = () => {
    setFormData({ verb: '', translation: '', example: '' });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={handleClose}
    >
      <div 
        className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-purple-600">Add New Verb</h2>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
            >
              ×
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Verb *
              </label>
              <input
                type="text"
                value={formData.verb}
                onChange={(e) => setFormData({ ...formData, verb: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                placeholder="Enter the verb"
                required
                autoFocus
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Translation
              </label>
              <input
                type="text"
                value={formData.translation}
                onChange={(e) => setFormData({ ...formData, translation: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                placeholder="Enter Spanish translation"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Example Sentence
              </label>
              <textarea
                value={formData.example}
                onChange={(e) => setFormData({ ...formData, example: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none resize-none"
                placeholder="Enter an example sentence"
                rows={3}
              />
            </div>
            
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={!formData.verb.trim() || isSaving}
                className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                {isSaving ? (
                  <span className="animate-spin">⟳</span>
                ) : (
                  <span>✓</span>
                )}
                {isSaving ? 'Saving...' : 'Add Verb'}
              </button>
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};