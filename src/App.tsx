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
  const [filter, setFilter] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);

  const deletePrompt = (id: string) => {
    setPrompts(prompts.filter(prompt => prompt.id !== id));
  };

  const handleCreatePrompt = async (title: string, description: string, prompt: string, promptTags: string[]) => {
      await axios.post<Prompt>('http://localhost:3000/prompts', { title, description, prompt, promptTags }).then((response) => {
      if (response.status === 200) {
          setPrompts([...prompts, response.data]);
          setTags([...tags, ...promptTags]);

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
        setTags(response.data.flatMap(prompt => prompt.tags));

      })
      .catch((error) => {
        // Handle the error
        console.log(error);
      });
  }, []);

  const filteredPrompts = filter ? prompts.filter(prompt => {
  var tempFilter = filter.toLowerCase().trim();
  return prompt.title.toLowerCase().includes(tempFilter) || prompt.description.toLowerCase().includes(tempFilter) ||
  prompt.prompt.toLowerCase().includes(tempFilter);
}) : prompts;

  return (
    <div className='flex flex-col bg-gray-200 h-screen overflow-y-auto'>
      <h1 className='inline-flex justify-center text-[3rem] mt-10'>Prompt Management System</h1>
      <div className='flex items-center justify-center'>
        <input type="text" placeholder="Search" className='w-[50%] h-10 rounded-lg p-4 m-8' value={filter} onChange={(e) => setFilter(e.target.value)} />
        <CreatePromptButton onCreatePrompt={handleCreatePrompt} />
      </div>
      <div>
        {
          tags.map((tag) => (
            <div key={tag} className='inline-flex items-center justify-center text-[1.5rem] mt-10'>
              <p className='bg-gray-300 rounded-md p-2 m-2'>{tag}</p>
            </div>
          ))
        }
      </div>
     <div className={`flex justify-center flex-wrap`}>
        {filteredPrompts.map((prompt) => (
          <div key={prompt.id} className={`m-4 w-80`}>
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
    </div>
  );
}

export default PromptList;