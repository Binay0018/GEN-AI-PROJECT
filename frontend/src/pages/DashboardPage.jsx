import { useState } from 'react';
import { useNavigate } from 'react-router';
import { AnimatePresence } from 'framer-motion';
import { HiSparkles } from 'react-icons/hi2';
import JobDescriptionInput from '../components/interview/JobDescriptionInput';
import SelfDescriptionInput from '../components/interview/SelfDescriptionInput';
import ResumeUploader from '../components/interview/ResumeUploader';
import LoadingOverlay from '../components/interview/LoadingOverlay';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useInterview } from '../hooks/useInterview';
import { useToast } from '../hooks/useToast';
import { validateInterviewForm } from '../utils/validation';
import { formatDate } from '../utils/reportHelpers';
import './DashboardPage.scss';

const DashboardPage = () => {
  const navigate = useNavigate();
  const { generating, progress, loadingMessage, generateReport, reports } = useInterview();
  const { success, error: toastError } = useToast();

  const [jobDescription, setJobDescription] = useState('');
  const [selfDescription, setSelfDescription] = useState('');
  const [resumeFile, setResumeFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    const validation = validateInterviewForm({ jobDescription, selfDescription, resumeFile });
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setSubmitting(true);

    try {
      const report = await generateReport({ jobDescription, selfDescription, resumeFile });
      success('Interview report generated successfully!');
      navigate(`/report/${report._id}`);
    } catch (err) {
      toastError(err.userMessage || 'Failed to generate report. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {generating && <LoadingOverlay progress={progress} message={loadingMessage} />}
      </AnimatePresence>

      <div className="dashboard-page">
        <header className="dashboard-page__header">
          <h1>
            Create Your <span className="dashboard-page__highlight">Interview Plan</span>
          </h1>
          <p>Let AI analyze the job requirements and your profile to build a winning strategy.</p>
        </header>

        <Card padding="lg" className="dashboard-page__form">
          <div className="dashboard-page__grid">
            <div className="dashboard-page__left">
              <JobDescriptionInput
                value={jobDescription}
                onChange={setJobDescription}
                error={errors.jobDescription}
              />
            </div>

            <div className="dashboard-page__divider" />

            <div className="dashboard-page__right">
              <ResumeUploader
                file={resumeFile}
                onChange={setResumeFile}
                error={errors.resume}
              />

              <div className="dashboard-page__or"><span>OR</span></div>

              <SelfDescriptionInput
                value={selfDescription}
                onChange={setSelfDescription}
                error={errors.selfDescription}
              />

              <div className="dashboard-page__info">
                <p>
                  Upload a <strong>PDF resume</strong> for best results. Add a self-description for additional context.
                </p>
              </div>
            </div>
          </div>

          <div className="dashboard-page__footer">
            <span className="dashboard-page__footer-info">
              AI-Powered Strategy &bull; Approx 30s
            </span>
            <Button
              size="lg"
              loading={submitting || generating}
              disabled={submitting || generating}
              onClick={handleSubmit}
              icon={<HiSparkles />}
            >
              Generate Interview Report
            </Button>
          </div>
        </Card>

        {reports.length > 0 && (
          <section className="dashboard-page__recent">
            <h2>Recent Reports</h2>
            <div className="dashboard-page__reports">
              {reports.map((report) => (
                <Card
                  key={report._id}
                  hover
                  padding="md"
                  className="report-card"
                  onClick={() => navigate(`/report/${report._id}`)}
                >
                  <h3>{report.title || 'Interview Report'}</h3>
                  <p>{formatDate(report.createdAt)}</p>
                  <span className={`report-card__score report-card__score--${
                    report.matchScore >= 80 ? 'high' : report.matchScore >= 60 ? 'mid' : 'low'
                  }`}>
                    {report.matchScore}% Match
                  </span>
                </Card>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default DashboardPage;
