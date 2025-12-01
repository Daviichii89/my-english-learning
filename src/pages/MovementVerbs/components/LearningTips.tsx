import React from 'react';

export const LearningTips: React.FC = () => {
  return (
    <div className="mt-12 p-6 bg-blue-50 rounded-lg">
      <h2 className="text-2xl font-semibold text-blue-800 mb-4">Tips for Learning Movement Verbs</h2>
      <ul className="list-disc list-inside text-gray-700 space-y-2">
        <li>Practice these verbs with physical actions when possible</li>
        <li>Create sentences using different subjects (I, you, he, she, we, they)</li>
        <li>Pay attention to irregular past tenses (swim → swam, run → ran)</li>
        <li>Use these verbs in present continuous to describe ongoing actions</li>
      </ul>
    </div>
  );
};