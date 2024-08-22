'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IoTrashBin } from "react-icons/io5";
import { AiOutlinePlus } from "react-icons/ai";
import Modal from '../components/Modal';
import ProjectForm from '../components/ProjectForm';

interface Project {
  id: string;
  name: string;
  files: Array<string>;
}

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const storedProjects = localStorage.getItem('projects');
    if (storedProjects) {
      setProjects(JSON.parse(storedProjects));
    }
  }, []);

  const addProject = (data: { projectName: string; description: string }) => {
    if (data.projectName.trim()) {
      const newProject: Project = {
        id: Date.now().toString(),
        name: data.projectName.trim(),
        files: []
      };
      const updatedProjects = [...projects, newProject];
      setProjects(updatedProjects);
      localStorage.setItem('projects', JSON.stringify(updatedProjects)); // Update localStorage
      localStorage.setItem(`${data.projectName.trim()} Description`, data.description.trim())
      setShowModal(false);
    }
  };

  const deleteProject = (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      const updatedProjects = projects.filter((project) => project.id !== id);
      setProjects(updatedProjects);
      localStorage.setItem('projects', JSON.stringify(updatedProjects));
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <nav className="bg-gray-100 p-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold text-deloitte-green">Projects</h1>
        </div>
      </nav>
      <header className="text-center mb-8 mt-8">
        <button
          onClick={() => setShowModal(true)}
          className="w-48 p-2 bg-blue-500 text-white rounded-md border-2 border-dashed border-blue-500 flex items-center justify-center space-x-2 hover:bg-blue-600"
        >
          <AiOutlinePlus size={20} />
          <span>Create Project</span>
        </button>
      </header>
      <main>
        <ul className="space-y-4">
          {projects.map((project) => (
            <li key={project.id} className="flex justify-between items-center p-4 border rounded-md shadow-sm">
              <Link href={`/projects/${project.name}`}>
                <p className="text-blue-500 hover:underline">{project.name}</p>
              </Link>
              <button
                onClick={() => deleteProject(project.id)}
                className="text-red-500 hover:text-red-700"
              >
                <IoTrashBin />
              </button>
            </li>
          ))}
        </ul>
      </main>

      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <h2 className="text-2xl font-bold mb-6 text-center">Create New Project</h2>
        <ProjectForm onSubmit={addProject} />
      </Modal>
    </div>
  );
}
