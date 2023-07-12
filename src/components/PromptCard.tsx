import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import editIcon from '../resources/8666681_edit_icon.svg';
import Modal from './Modal';



interface PromptCardProps {
  title: string;
  description: string;
  prompt: string;
  id:string;
  tags:string[];
  deletePrompt: (id: string) => void;
}

const PromptCard: React.FC<PromptCardProps> = ({ title, description, prompt,id,tags,deletePrompt }) => {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description);
  const [editPrompt, setEditPrompt] = useState(prompt);
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [copySuccess, setCopySuccess] = useState('Copy Prompt');

  const copyToClipboard = async (e: React.MouseEvent) => {
      try {
        await navigator.clipboard.writeText(prompt);
        setCopySuccess('Copied!'); // Show a success message
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    
  };
  

  useEffect(() => {
    if (copySuccess === 'Copied!') {
      setTimeout(() => setCopySuccess('Copy Prompt'), 2000);
    }
  }, [copySuccess]);
  
  

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenEditModal = () => {
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const handleSaveEditModal = async () => {
    const updatedData = {
      id:id,
      title: editTitle,
      description: editDescription,
      prompt: editPrompt,
      tags:tags
    };

    try {
      setIsLoading(true); // Set loading state to true
      await axios.put(`http://localhost:3000/prompts/${id}`, updatedData);
      setShowEditModal(false);
      setIsLoading(false); // Set loading state back to false
      
    } catch (err) {
      console.error(err);
      // Handle error as needed
    }
  };

  const handleDeletePrompt = async () => {
    setShowDeleteModal(true);
  };
  
  const handleConfirmDelete = async () => {
    try {
      setIsLoading(true);
      const response = await axios.delete(`http://localhost:3000/prompts/${id}`);
      if (response.status === 200) {
        deletePrompt(id); // Remove the prompt from the parent component
      }
      setIsLoading(false);
      setShowDeleteModal(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };
  
  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };
  return (
    <div className="max-w-sm p-6 h-50 w-80 bg-white border border-gray-200 rounded-lg shadow flex flex-col justify-between min-h-full relative">
      <div>
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{title}</h5>
      <p className="mb-3 font-normal text-gray-700 overflow-hidden overflow-ellipsis">{description}</p>
      </div>      
      <div className="flex">
      <button onClick={handleOpenModal} className="inline-flex mt-auto items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
        Show Prompt
      </button>
      <img src={editIcon} alt="Edit" className="absolute bottom-7 right-6 cursor-pointer" onClick={handleOpenEditModal} />
      </div>
      <Modal isOpen={showModal} modalName={title} onClose={handleCloseModal}>
          <p className="mb-3 font-normal text-gray-700 italic">{description}</p>
          <div className="flex flex-col relative border bg-gray-100 rounded-lg">
          <span className="flex flex-col block bg-gray-500 h-full w-full rounded-t-lg">
          <button onClick={copyToClipboard} className="inline-flex items-center justify-center px-3 text-sm font-medium text-center text-white ml-auto py-2">
          {copySuccess}
          </button>
          </span>
          <div className="mb-3 w-full rounded-md mt-4 p-2">{prompt}</div>
          <textarea className="hidden" value={prompt} readOnly />
          </div>
          <button onClick={handleCloseModal} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 mt-2">
          Close
          </button>
      </Modal>

      {showEditModal && (
        <Modal isOpen={showEditModal} modalName="Edit Prompt" onClose={handleCloseEditModal}>
          <input type="text" className="mb-3 p-2 w-full border-2 border-gray-300 rounded-md" value={editTitle} onChange={e => setEditTitle(e.target.value)} />
          <input type="text" className="mb-3 p-2 w-full border-2 border-gray-300 rounded-md" value={editDescription} onChange={e => setEditDescription(e.target.value)} />
          <textarea className="mb-3 p-2 w-full border-2 border-gray-300 rounded-md" value={editPrompt} onChange={e => setEditPrompt(e.target.value)} />
          <button onClick={handleSaveEditModal} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
            Save
          </button>
          <button onClick={handleDeletePrompt} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 ml-2">
            Delete
          </button>
          <button onClick={handleCloseEditModal} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 ml-2">
            Close
          </button>
        </Modal>
      )}
      <Modal isOpen={showDeleteModal} modalName="Delete Prompt" onClose={handleCancelDelete}>
        <p className="mb-3 font-normal text-gray-700">Are you sure you want to delete this prompt?</p>
        <button onClick={handleConfirmDelete} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300">
          Yes
        </button>
        <button onClick={handleCancelDelete} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 ml-2">
          No
        </button>
      </Modal>
      
    </div>
  );}

export default PromptCard;