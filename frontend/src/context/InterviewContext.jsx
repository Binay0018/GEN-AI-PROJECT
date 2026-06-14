import { createContext, useState } from 'react';

export const InterviewContext = createContext(null);

export function InterviewProvider({ children }) {
  const [report, setReport] = useState(null);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState('');

  return (
    <InterviewContext.Provider
      value={{
        report,
        setReport,
        reports,
        setReports,
        loading,
        setLoading,
        generating,
        setGenerating,
        progress,
        setProgress,
        loadingMessage,
        setLoadingMessage,
      }}
    >
      {children}
    </InterviewContext.Provider>
  );
}
