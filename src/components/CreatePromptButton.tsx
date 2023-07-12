import React, { useState } from 'react';
import Modal from './Modal';

interface CreatePromptButtonProps {
    onCreatePrompt: (title: string, description: string, prompt: string, tags: string[]) => void;
}

function CreatePromptButton({ onCreatePrompt }: CreatePromptButtonProps) {
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [prompt, setPrompt] = useState('');
    const [tags, setTags] = useState<string[]>([]);

    const handleCreatePrompt = () => {
        onCreatePrompt(title, description, prompt, tags);
        setShowModal(false);
        setTitle('');
        setDescription('');
        setPrompt('');
        setTags([]);
    };

    return (
        <>
            <button onClick={() => setShowModal(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Create Prompt
            </button>            {showModal && (
                <Modal isOpen={true} modalName="Create Prompt" onClose={() => setShowModal(false)}>
                    <h2 className="text-lg font-bold mb-4">Create Prompt</h2>
                    <form className="space-y-4">
                        <div>
                            <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title:</label>
                            <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} className="w-full border border-gray-400 p-2 rounded-md" />
                        </div>
                        <div>
                            <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description:</label>
                            <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} className="w-full border border-gray-400 p-2 rounded-md"></textarea>
                        </div>
                        <div>
                            <label htmlFor="prompt" className="block text-gray-700 font-bold mb-2">Prompt:</label>
                            <textarea id="prompt" value={prompt} onChange={e => setPrompt(e.target.value)} className="w-full border border-gray-400 p-2 rounded-md"></textarea>
                        </div>
                        <div>
                            <label htmlFor="tags" className="block text-gray-700 font-bold mb-2">Tags:</label>
                            <input type="text" id="tags" value={tags.join(', ')} onChange={e => setTags(e.target.value.split(',').map(tag => tag.trim()))} className="w-full border border-gray-400 p-2 rounded-md" />
                        </div>
                        <div>
                            <button onClick={handleCreatePrompt} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Create</button>
                        </div>
                    </form>
                </Modal>
            )}
        </>
    );
}

export default CreatePromptButton;