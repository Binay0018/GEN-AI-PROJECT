import { Link } from 'react-router';
import { HiArrowLeft, HiCalendar } from 'react-icons/hi2';
import { formatDate, extractJobTitle } from '../../utils/reportHelpers';
import './ReportHeader.scss';

const ReportHeader = ({ report, reportId }) => {
  const title = report?.title || extractJobTitle(report?.jobDescription);

  return (
    <header className="report-header">
      <div className="report-header__top">
        <Link to="/dashboard" className="report-header__back">
          <HiArrowLeft /> Back to Dashboard
        </Link>
        <div className="report-header__actions">
          <Link to={`/resume/${reportId}`} className="report-header__link-btn">
            View Resume
          </Link>
        </div>
      </div>
      <h1>{title}</h1>
      <div className="report-header__meta">
        <HiCalendar />
        <span>Generated on {formatDate(report?.createdAt)}</span>
      </div>
    </header>
  );
};

export default ReportHeader;
