'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import Modal from '../../components/Modal';  // Ensure you have this Modal component created
import * as pdfjsLib from 'pdfjs-dist';

interface Project {
  id: string;
  name: string;
  files: Array<string>;
}

interface FileDetails {
  projectName?: string;
  name: string;
  size: number;
  content: string;
}

const ProjectPage = () => {
  const { name } = useParams();
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [projectDescription, setProjectDescription] = useState<String | null>(null);
  const [files, setFiles] = useState<FileDetails[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [reportModal, setReportModal] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [buyerReports, setBuyerReports] = useState<string[]>([]);
  const [supplierReports, setSupplierReports] = useState<string[]>([]);
  const [supplierSelectionReports, setSupplierSelectionReports] = useState<string[]>([]);
  const [reportName, setReportName] = useState<string>('');
  const [reportType, setReportType] = useState<'buyer' | 'supplier' | 'supplierSelection'>('buyer');

  useEffect(() => {
    if (name) {
      const decodedName = decodeURIComponent(name as string);
      const storedProjects = localStorage.getItem('projects');
      if (storedProjects) {
        const projects: Project[] = JSON.parse(storedProjects);
        const foundProject = projects.find((project) => project.name === decodedName);
        setProject(foundProject || null);
      }

      const projectDescription = localStorage.getItem(`${decodeURIComponent(name as string)} Description`)

      if (projectDescription) {
        setProjectDescription(projectDescription)
      }
      else {
        setProjectDescription("No Description Provided")
      }

    }
  }, [name]);

  const readFileContent = (file: File): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result as string);
      };

      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };

      reader.readAsText(file);
    });
  };

  const handleFileInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const newFiles: File[] = Array.from(e.target.files || []);

    console.log(`Selected file type: ${reportType}`)
    const fileDetailsPromises = newFiles.map(async (file) => {
      const content = await readFileContent(file);
      return {
        projectName: project?.name,
        reportType: reportType,
        name: file.name,
        size: file.size,
        content: content,
      };
    });

    const fileDetails = await Promise.all(fileDetailsPromises);
    const updatedFiles = [...files, ...fileDetails];
    setFiles(updatedFiles);
    localStorage.setItem('files', JSON.stringify(updatedFiles));
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const newFiles: File[] = Array.from(e.dataTransfer.files);

    console.log(`Selected file type: ${reportType}`)
    const fileDetailsPromises = newFiles.map(async (file) => {
      const content = await readFileContent(file);
      return {
        projectName: project?.name,
        name: file.name,
        size: file.size,
        content: content,
      };
    });

    const fileDetails = await Promise.all(fileDetailsPromises);
    const updatedFiles = [...files, ...fileDetails];
    setFiles(updatedFiles);
    localStorage.setItem('files', JSON.stringify(updatedFiles));
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const deleteFile = (fileName: string) => {
    const updatedFiles = files.filter((file) => file.name !== fileName);
    setFiles(updatedFiles);
    localStorage.setItem('files', JSON.stringify(updatedFiles));
  };

  const handleGenerateReport = () => {
    if (files.length === 0) {
      alert('You must upload at least one file to continue!');
    } else {
      setShowModal(true);
    }
  };

  const handleFileSelection = (fileName: string) => {
    setSelectedFiles((prevSelected) => {
      const updatedSelectedFiles = prevSelected.includes(fileName)
        ? prevSelected.filter((name) => name !== fileName)
        : [...prevSelected, fileName];

      localStorage.setItem(`${decodeURIComponent(name as string)} Files`, JSON.stringify(updatedSelectedFiles));

      return updatedSelectedFiles;
    });
  };

  const handleGenerate = () => {
    setShowModal(false);
    if (selectedFiles.length === 0) {
      alert('You must select at least one file to continue!');
    } 
    else {
      setReportType(reportType)
      localStorage.setItem('reportType', reportType)

      if (reportType === 'buyer') {
        const updatedReports = [...buyerReports, reportName];
        setBuyerReports(updatedReports);
        localStorage.setItem(`${decodeURIComponent(name as string)} BuyerReports`, JSON.stringify(updatedReports));
      } else if (reportType === 'supplier') {
        const updatedReports = [...supplierReports, reportName];
        setSupplierReports(updatedReports);
        localStorage.setItem(`${decodeURIComponent(name as string)} SupplierReports`, JSON.stringify(updatedReports));
      } else if (reportType === 'supplierSelection') {
        const updatedReports = [...supplierSelectionReports, reportName];
        setSupplierSelectionReports(updatedReports);
        localStorage.setItem(`${decodeURIComponent(name as string)} SupplierSelectionReports`, JSON.stringify(updatedReports));
      }
      router.push(`/projects/${project!.name}/report/${reportName}`);
    }
  };

  const deleteReport = (reportName: string, type: 'buyer' | 'supplier' | 'supplierSelection') => {
    if (type === 'buyer') {
      const updatedReports = buyerReports.filter((report) => report !== reportName);
      setBuyerReports(updatedReports);
      localStorage.setItem(`${decodeURIComponent(name as string)} BuyerReports`, JSON.stringify(updatedReports));
    } else if (type === 'supplier') {
      const updatedReports = supplierReports.filter((report) => report !== reportName);
      setSupplierReports(updatedReports);
      localStorage.setItem(`${decodeURIComponent(name as string)} SupplierReports`, JSON.stringify(updatedReports));
    } else if (type === 'supplierSelection') {
      const updatedReports = supplierSelectionReports.filter((report) => report !== reportName);
      setSupplierSelectionReports(updatedReports);
      localStorage.setItem(`${decodeURIComponent(name as string)} SupplierSelectionReports`, JSON.stringify(updatedReports));
    }
    localStorage.removeItem(encodeURIComponent(reportName));
  };

  useEffect(() => {
    const storedBuyerReports = localStorage.getItem(`${decodeURIComponent(name as string)} BuyerReports`);
    const storedSupplierReports = localStorage.getItem(`${decodeURIComponent(name as string)} SupplierReports`);
    const storedSupplierSelectionReports = localStorage.getItem(`${decodeURIComponent(name as string)} SupplierSelectionReports`);
    
    if (storedBuyerReports) {
      setBuyerReports(JSON.parse(storedBuyerReports));
    }
    if (storedSupplierReports) {
      setSupplierReports(JSON.parse(storedSupplierReports));
    }
    if (storedSupplierSelectionReports) {
      setSupplierSelectionReports(JSON.parse(storedSupplierSelectionReports));
    }
  }, [name]);

  const handleReportType = (type: 'buyer' | 'supplier' | 'supplierSelection') => {
    setReportType(type)
    localStorage.setItem('reportType', type)
  }

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div className="p-6 max-w-8xl mx-auto font-arial">
      <h1 className="text-4xl font-bold mb-4 font-arial">{project.name}</h1>
      <p>{projectDescription}</p>
  
      <div className="my-4 relative">
        <div
          className="p-6 border-2 border-dashed border-gray-300 rounded-md text-center font-arial hover:border-blue-400 transition duration-200 ease-in-out"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <p className="mb-4 text-xl">Drag & Drop files here</p>
          <p className="mb-4 font-bold"> or </p>
          <label
            htmlFor="file-upload"
            className="inline-block p-2 bg-blue-300 text-black rounded-md cursor-pointer hover:bg-blue-600 transition duration-200 ease-in-out transform hover:scale-105"
          >
            Open File Explorer
          </label>
          <input
            type="file"
            id="file-upload"
            className="hidden"
            multiple
            onChange={handleFileInputChange}
          />
        </div>
      </div>
  
      <ul className="space-y-2">
        {files.map((file) => (
          <li key={file.name} className="flex justify-between items-center p-2 border rounded-md">
            <span>
              {file.name} ({(file.size / 1024).toFixed(2)} KB)
            </span>
            <button onClick={() => deleteFile(file.name)} className="text-red-500 hover:text-red-700 transition duration-200 ease-in-out">
              🗑️
            </button>
          </li>
        ))}
      </ul>
  
      <button
        onClick={handleGenerateReport}
        className="mt-6 p-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-200 ease-in-out transform hover:scale-105 font-arial"
      >
        Generate Report
      </button>
  
      {showModal && (
        <Modal show={showModal} onClose={() => setShowModal(false)}>
          <h2 className="text-2xl font-bold mb-6 text-center font-arial">Select Files to Generate Report</h2>
          <ul className="space-y-2 mb-4">
            {files.map((file) => (
              <li key={file.name} className="flex justify-between items-center p-2 border rounded-md">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" name="selectedFile" value={file.name} onChange={() => handleFileSelection(file.name)} />
                  <span>
                    {file.name} ({(file.size / 1024).toFixed(2)} KB)
                  </span>
                </label>
              </li>
            ))}
          </ul>
          <input
            type="text"
            placeholder="Enter report name"
            value={reportName}
            onChange={(e) => setReportName(e.target.value)}
            className="w-full p-2 border rounded-md mb-4"
          />
          <div className="flex mb-4">
            <label className="mr-4">
              <input
                type="radio"
                name="reportType"
                value="buyer"
                checked={reportType === 'buyer'}
                onChange={() => handleReportType('buyer')}
                className="mr-2"
              />
              Buyer Analysis Report
            </label>
            <label className="mr-4">
              <input
                type="radio"
                name="reportType"
                value="supplier"
                checked={reportType === 'supplier'}
                onChange={() => handleReportType('supplier')}
                className="mr-2"
              />
              Supplier Analysis Report
            </label>
            <label>
              <input
                type="radio"
                name="reportType"
                value="supplierSelection"
                checked={reportType === 'supplierSelection'}
                onChange={() => handleReportType('supplierSelection')}
                className="mr-2"
              />
              Supplier Selection Report
            </label>
          </div>
          <button onClick={handleGenerate} className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200 ease-in-out">
            Generate
          </button>
        </Modal>
      )}
  
      {reportModal && (
        <Modal show={showModal} onClose={() => setReportModal(false)}>
          <h2 className="text-2xl font-bold mb-6 text-center font-arial">Select Report Name</h2>
        </Modal>
      )}
  
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-4 bg-blue-100 rounded-lg shadow-lg">
          <div className="flex items-center space-x-2 mb-4">
            <h2 className="text-3xl font-bold font-arial mr-4">Buyer Analysis Reports</h2>
            <div className="relative group">
              <span className="w-6 h-6 flex items-center justify-center bg-gray-300 text-gray-700 rounded-full cursor-pointer">?</span>
              <div className="absolute hidden group-hover:block bg-gray-700 text-white text-sm rounded-md p-2 w-48 -left-10 top-8 z-10">
                A buyer analysis report provides insights into purchasing trends, buyer behavior, and market analysis.
              </div>
            </div>
          </div>
  
          {buyerReports.length > 0 ? (
            <ul className="space-y-2 mt-4">
              {buyerReports.map((report, index) => (
                <li key={index} className="flex justify-between items-center p-4 border rounded-md bg-white shadow-sm hover:shadow-md transition duration-200 ease-in-out transform hover:scale-105">
                  <a href={`/projects/${project!.name}/report/${report}`} className="text-blue-500 hover:underline">
                    {report}
                  </a>
                  <button onClick={() => deleteReport(report, 'buyer')} className="text-red-500 hover:text-red-700 transition duration-200 ease-in-out">
                    🗑️
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-gray-500">Your Buyer Analysis Reports will appear here</p>
          )}
        </div>
  
        <div className="p-4 bg-green-100 rounded-lg shadow-lg">
          <div className="flex items-center space-x-2 mb-4">
            <h2 className="text-3xl font-bold font-arial mr-4">Supplier Analysis Reports</h2>
            <div className="relative group">
              <span className="w-6 h-6 flex items-center justify-center bg-gray-300 text-gray-700 rounded-full cursor-pointer">?</span>
              <div className="absolute hidden group-hover:block bg-gray-700 text-white text-sm rounded-md p-2 w-48 -left-10 top-8 z-10">
                A supplier analysis report provides insights into supplier performance, cost-effectiveness, and market trends.
              </div>
            </div>
          </div>
  
          {supplierReports.length > 0 ? (
            <ul className="space-y-2 mt-4">
              {supplierReports.map((report, index) => (
                <li key={index} className="flex justify-between items-center p-4 border rounded-md bg-white shadow-sm hover:shadow-md transition duration-200 ease-in-out transform hover:scale-105">
                  <a href={`/projects/${project!.name}/report/${report}`} className="text-blue-500 hover:underline">
                    {report}
                  </a>
                  <button onClick={() => deleteReport(report, 'supplier')} className="text-red-500 hover:text-red-700 transition duration-200 ease-in-out">
                    🗑️
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-gray-500">Your Supplier Analysis Reports will appear here</p>
          )}
        </div>
  
        <div className="p-4 bg-red-100 rounded-lg shadow-lg">
          <div className="flex items-center space-x-2 mb-4">
            <h2 className="text-3xl font-bold font-arial mr-4">Supplier Selection Reports</h2>
            <div className="relative group">
              <span className="w-6 h-6 flex items-center justify-center bg-gray-300 text-gray-700 rounded-full cursor-pointer">?</span>
              <div className="absolute hidden group-hover:block bg-gray-700 text-white text-sm rounded-md p-2 w-48 -left-10 top-8 z-10">
                A supplier selection report provides insights into the criteria and decisions for selecting suppliers.
              </div>
            </div>
          </div>
  
          {supplierSelectionReports.length > 0 ? (
            <ul className="space-y-2 mt-4">
              {supplierSelectionReports.map((report, index) => (
                <li key={index} className="flex justify-between items-center p-4 border rounded-md bg-white shadow-sm hover:shadow-md transition duration-200 ease-in-out transform hover:scale-105">
                  <a href={`/projects/${project!.name}/report/${report}`} className="text-blue-500 hover:underline">
                    {report}
                  </a>
                  <button onClick={() => deleteReport(report, 'supplierSelection')} className="text-red-500 hover:text-red-700 transition duration-200 ease-in-out">
                    🗑️
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-gray-500">Your Supplier Selection Reports will appear here</p>
          )}
        </div>
      </div>
    </div>
  );
  
};

export default ProjectPage;
