'use client';

import Link from 'next/link';
import SideBar from "../../../../components/SideBar";
import { useState, useEffect, useRef } from 'react';
import { useSidebar } from '../../../../context/SidebarContext';
import { useParams } from 'next/navigation';
import html2pdf from 'html2pdf.js'; // Import the library

interface FinancialDetails {
  projectName: string;
  reportType: string;
  name: string;
  size: string;
  content: string;
}

const ReportPage = () => {
  const [htmlContent, setHtmlContent] = useState('');
  const [error, setError] = useState('');
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  const params = useParams();
  const reportRef = useRef<HTMLDivElement>(null);
  const [isFetching, setIsFetching] = useState(false);
  const lastFetchedReportName = useRef('');

  const reportName = Array.isArray(params.reportName) ? params.reportName[0] : params.reportName;
  const name = Array.isArray(params.name) ? params.name[0] : params.name;

  useEffect(() => {
    const debounceFetch = setTimeout(() => {
      if (lastFetchedReportName.current !== reportName && !isFetching) {
        lastFetchedReportName.current = reportName;
        fetchHtml();
      }
    }, 300); // Adjust the delay as needed

    return () => clearTimeout(debounceFetch);
  }, [reportName]);

  async function fetchHtml() {
    setIsFetching(true);
    try {
      // Check for the existing report in localStorage
      const storedHtmlContent = localStorage.getItem(`${reportName}`);
      if (storedHtmlContent) {
        setHtmlContent(storedHtmlContent);
        setIsFetching(false);
        return;
      }

      const financialData = localStorage.getItem('files');

      if (!financialData) {
        console.error('No financial data found in localStorage');
        setError('No financial data found.');
        setIsFetching(false);
        return;
      }

      let financialDataJSON : FinancialDetails[] = JSON.parse(financialData)
      const reportType = localStorage.getItem('reportType')

      if (financialDataJSON) {
        console.log(`Report type: ${reportType}`)
      }

      const parameters = {
        name: decodeURIComponent(name as string),
        reportType: reportType,
        companyData: {
          companyName: decodeURIComponent(name as string),
          financialData: financialData
        }
      };

      const response = await fetch('http://localhost:8080/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(parameters)
      });

      if (response.ok) {
        const html = await response.text();
        setHtmlContent(html);
        localStorage.setItem(`${reportName}`, html);
      } else if (response.status === 429) {
        console.error('Rate limit exceeded');
        setError('Rate limit exceeded. Please try again later.');
      } else {
        console.error('Failed to fetch HTML content');
        setError('Failed to fetch HTML content.');
      }
    } catch (error) {
      console.error('Error fetching HTML content:', error);
      setError('An error occurred while fetching the HTML content.');
    } finally {
      setIsFetching(false);
    }
  }

  const handleBlur = () => {
    if (reportRef.current) {
      const updatedHtml = reportRef.current.innerHTML;
      setHtmlContent(updatedHtml);
      localStorage.setItem(`${reportName}`, updatedHtml);
    }
  };

  const handleDownloadPdf = () => {
    if (reportRef.current) {
      const element = reportRef.current.cloneNode(true) as HTMLElement;
      element.style.border = 'none';
      element.style.padding = '0';
  
      const opt = {
        margin:       0.5,
        filename:     `${decodeURIComponent(reportName as string)}.pdf`,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
      };
  
      html2pdf().from(element).set(opt).save();
    }
  };
  
  return (
    <>
      {htmlContent ? (
        <div className="text-center my-4">
          <h1 className="block text-4xl font-arial mb-8">{decodeURIComponent(reportName as string)}</h1>
          <div className="flex justify-center space-x-4">
            <button
              onClick={handleDownloadPdf}
              className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              Download as PDF
            </button>
            <button
              onClick={toggleSidebar}
              className="bg-gray-300 text-black py-2 px-4 rounded-md transition-all duration-300 hover:bg-white hover:border hover:border-gray-500 z-50"
            >
              Chat
            </button>
          </div>
        </div>
      ) : null}
      {isSidebarOpen && <SideBar />}
      {htmlContent ? (
        <div>
          <div 
            contentEditable 
            suppressContentEditableWarning 
            onBlur={handleBlur} 
            ref={reportRef}
            className="p-6 max-w-4xl mx-auto border border-gray-300 rounded-md"
          >
            <div dangerouslySetInnerHTML={{ __html: htmlContent }}></div>
          </div>
        </div>
      ) : (
        <div className="p-6 max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">We are generating your report for you...</h1>
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <p>This can take a few moments...</p>
          )}
          <Link href="/projects" className="text-blue-500 hover:underline mt-6 block">
            Back to Projects
          </Link>
        </div>
      )}
    </>
  );
};

export default ReportPage;