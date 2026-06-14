import { useContext, useEffect, useCallback } from 'react';
import { InterviewContext } from '../context/InterviewContext';
import { AuthContext } from '../context/AuthContext';
import { generateInterviewReport } from '../services/interview.api';
import {
  saveReport,
  getReports,
  getReportById as getStoredReport,
  saveResumeFile,
  downloadResumeFile,
} from '../utils/storage';
import { extractJobTitle } from '../utils/reportHelpers';

const LOADING_MESSAGES = [
  { at: 10, text: 'Analyzing Resume...' },
  { at: 30, text: 'Matching Skills...' },
  { at: 50, text: 'Generating Questions...' },
  { at: 70, text: 'Calculating ATS Score...' },
  { at: 90, text: 'Preparing Final Report...' },
];

export function useInterview() {
  const context = useContext(InterviewContext);
  const { user } = useContext(AuthContext);
  if (!context) throw new Error('useInterview must be used within InterviewProvider');

  const {
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
  } = context;

  useEffect(() => {
    if (user?.id) {
      setReports(getReports(user.id));
    }
  }, [user?.id, setReports]);

  const simulateProgress = useCallback(() => {
    let current = 0;
    setProgress(0);
    setLoadingMessage(LOADING_MESSAGES[0].text);

    const interval = setInterval(() => {
      current += Math.random() * 8 + 2;
      if (current >= 95) {
        current = 95;
        clearInterval(interval);
      }

      setProgress(Math.round(current));

      const msg = [...LOADING_MESSAGES].reverse().find((m) => current >= m.at);
      if (msg) setLoadingMessage(msg.text);
    }, 600);

    return () => clearInterval(interval);
  }, [setProgress, setLoadingMessage]);

  const generateReport = async ({ jobDescription, selfDescription, resumeFile }) => {
    setGenerating(true);
    const stopProgress = simulateProgress();

    try {
      const data = await generateInterviewReport({
        jobDescription,
        selfDescription,
        resumeFile,
      });

      const interviewReport = {
        ...data.interviewReport,
        title: extractJobTitle(jobDescription),
      };

      if (user?.id) {
        saveReport(user.id, interviewReport);
        await saveResumeFile(user.id, interviewReport._id, resumeFile);
        setReports(getReports(user.id));
      }

      setReport(interviewReport);
      setProgress(100);
      setLoadingMessage('Report ready!');

      return interviewReport;
    } finally {
      stopProgress();
      setTimeout(() => {
        setGenerating(false);
        setProgress(0);
        setLoadingMessage('');
      }, 500);
    }
  };

  const fetchReportById = useCallback(
    async (reportId) => {
      if (!user?.id || !reportId) return null;

      setLoading(true);
      try {
        const stored = getStoredReport(user.id, reportId);
        if (stored) {
          setReport(stored);
          return stored;
        }
        return null;
      } finally {
        setLoading(false);
      }
    },
    [user?.id, setReport, setLoading]
  );

  const getResumePdf = (reportId) => {
    if (!user?.id) return false;
    return downloadResumeFile(user.id, reportId);
  };

  return {
    report,
    reports,
    loading,
    generating,
    progress,
    loadingMessage,
    generateReport,
    getReportById: fetchReportById,
    getResumePdf,
  };
}
