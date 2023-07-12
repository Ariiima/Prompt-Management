import React, { useState, useEffect } from 'react';
import PromptCard from './components/PromptCard';
import CreatePromptButton from './components/CreatePromptButton';
import axios from 'axios';

interface Prompt {
  id: string;
  title: string;
  description: string;
  prompt: string;
  tags: string[];
  isLiked: boolean;
}

function PromptList() {
  const [prompts, setPrompts] = useState<Prompt[]>([]);


  const deletePrompt = (id: string) => {
    setPrompts(prompts.filter(prompt => prompt.id !== id));
  };

  const handleCreatePrompt = async (title: string, description: string, prompt: string, tags: string[]) => {
      const response = await axios.post<Prompt>('http://localhost:3000/prompts', { title, description, prompt, tags }).then((response) => {
      if (response.status === 200) {
          setPrompts([...prompts, response.data]);
      }    
    })
    .catch((error) => {
      console.error(error);
    });
  }

  useEffect(() => {
    axios.get<Prompt[]>('http://localhost:3000/prompts')
      .then((response) => {
        setPrompts(response.data);
        console.log(prompts);
      })
      .catch((error) => {
        // Handle the error
        console.log(error);
      });
  }, []);

  return (
    <div className="flex justify-center flex-wrap">
      <CreatePromptButton onCreatePrompt={handleCreatePrompt} />
      {prompts.map((prompt) => (
        <div key={prompt.id} className="m-4">
          <PromptCard
            key={prompts.length}
            title={prompt.title}
            description={prompt.description}
            prompt={prompt.prompt}
            tags={prompt.tags}
            id={prompt.id}
            deletePrompt={deletePrompt}
          />
        </div>
      ))}
    </div>
  );
}

export default PromptList;