// components/ProjectForm.tsx
'use client';

import React from 'react';

interface ProjectFormProps {
  onSubmit: (data: { projectName: string; description: string }) => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ onSubmit }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      projectName: formData.get('projectName') as string,
      description: formData.get('description') as string,
    };
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="projectName" className="block text-gray-700 font-medium mb-2">
          Project Name
        </label>
        <input
          type="text"
          id="projectName"
          name="projectName"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter project name"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
          Description [optional]
        </label>
        <textarea
          id="description"
          name="description"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter project description"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-3 rounded-md transition-all duration-300 hover:bg-blue-600"
      >
        Create Project
      </button>
    </form>
  );
};

export default ProjectForm;
