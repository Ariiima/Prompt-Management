import React from 'react';
import PromptCard from './components/PromptCard';

function PromptList() {
  const prompts = [
    { id: 1, title: 'Prompt 1', description: 'Description of Prompt 1' },
    { id: 2, title: 'Prompt 2', description: 'Description of Prompt 2' },
    { id: 3, title: 'Prompt 3', description: 'Description of Prompt 3' },
    { id: 4, title: 'Prompt 4', description: 'Description of Prompt 4' },
    { id: 5, title: 'Prompt 5', description: 'Description of Prompt 5' },
  ];

  return (
    <div className="flex justify-center">
      {prompts.map((prompt) => (
        <div key={prompt.id} className="m-4">
          <PromptCard
            title={prompt.title}
            description={prompt.description}
          />
        </div>
      ))}
    </div>
  );
}

export default PromptList;