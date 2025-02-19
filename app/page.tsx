'use client';

import { useState } from 'react';
import ResumeForm from './components/ResumeForm';
import PDFResume from './components/PDFResume';
import { generateWordDocument } from './utils/wordGenerator';
import { ResumeData } from './types';

export default function Home() {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [format, setFormat] = useState<'pdf' | 'word'>('pdf');

  const handleSubmit = (data: ResumeData) => {
    // Convert comma-separated strings to arrays
    const processedData = {
      ...data,
      skills: {
        technical: data.skills.technical.toString().split(',').map(s => s.trim()),
        soft: data.skills.soft.toString().split(',').map(s => s.trim()),
      },
      hobbies: data.hobbies.toString().split(',').map(s => s.trim()),
    };
    setResumeData(processedData);
  };

  const handleDownloadWord = () => {
    if (resumeData) {
      generateWordDocument(resumeData);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4">
          <h1 className="text-3xl font-bold text-gray-900">Professional Resume Builder</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {!resumeData ? (
          <ResumeForm onSubmit={handleSubmit} />
        ) : (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
              <div className="space-x-4">
                <button
                  onClick={() => setFormat('pdf')}
                  className={`px-4 py-2 rounded ${format === 'pdf' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                >
                  PDF Preview
                </button>
                <button
                  onClick={() => setFormat('word')}
                  className={`px-4 py-2 rounded ${format === 'word' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                >
                  Word Preview
                </button>
              </div>
              <div className="space-x-4">
                <button
                  onClick={handleDownloadWord}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Download Word
                </button>
                <button
                  onClick={() => setResumeData(null)}
                  className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                >
                  Edit Resume
                </button>
              </div>
            </div>
            
            {format === 'pdf' ? (
              <PDFResume data={resumeData} />
            ) : (
              <div className="bg-white p-8 rounded-lg shadow">
                <h2 className="text-xl font-bold mb-4">Word Preview</h2>
                <p className="text-gray-600">
                  Click the "Download Word" button above to download your resume in Word format.
                </p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}