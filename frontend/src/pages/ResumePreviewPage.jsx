import { useParams, Link } from 'react-router';
import { HiDocument, HiArrowDownTray, HiArrowLeft, HiCalendar } from 'react-icons/hi2';
import { useAuth } from '../hooks/useAuth';
import { getResumeFile, downloadResumeFile } from '../utils/storage';
import { formatDate } from '../utils/reportHelpers';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Loader from '../components/ui/Loader';
import './ResumePreviewPage.scss';

const ResumePreviewPage = () => {
  const { interviewId } = useParams();
  const { user, loading } = useAuth();
  const file = user?.id && interviewId ? getResumeFile(user.id, interviewId) : null;

  if (loading) {
    return (
      <div className="resume-preview resume-preview--loading">
        <Loader size="lg" />
      </div>
    );
  }

  if (!file) {
    return (
      <div className="resume-preview resume-preview--empty">
        <HiDocument className="resume-preview__empty-icon" />
        <h2>Resume Not Found</h2>
        <p>The uploaded resume is no longer available in local storage.</p>
        <Link to={`/report/${interviewId}`}>
          <Button variant="secondary">Back to Report</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="resume-preview">
      <Link to={`/report/${interviewId}`} className="resume-preview__back">
        <HiArrowLeft /> Back to Report
      </Link>

      <Card padding="lg" className="resume-preview__card">
        <div className="resume-preview__icon-wrap">
          <HiDocument />
        </div>

        <h1>{file.name}</h1>

        <div className="resume-preview__meta">
          <span><HiCalendar /> Uploaded {formatDate(file.uploadedAt)}</span>
          <span>{(file.size / 1024).toFixed(1)} KB</span>
        </div>

        <div className="resume-preview__actions">
          <Button
            size="lg"
            icon={<HiArrowDownTray />}
            onClick={() => downloadResumeFile(user.id, interviewId)}
          >
            Download PDF
          </Button>
          <a href={file.url} target="_blank" rel="noopener noreferrer">
            <Button variant="secondary" size="lg">Open in New Tab</Button>
          </a>
        </div>
      </Card>
    </div>
  );
};

export default ResumePreviewPage;
