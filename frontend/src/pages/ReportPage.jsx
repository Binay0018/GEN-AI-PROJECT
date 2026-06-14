import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import {
  HiCodeBracket,
  HiChatBubbleLeftRight,
  HiUserGroup,
  HiMap,
  HiArrowDownTray,
} from 'react-icons/hi2';
import ReportHeader from '../components/interview/ReportHeader';
import ATSScoreCard from '../components/interview/ATSScoreCard';
import SkillMatchCard from '../components/interview/SkillMatchCard';
import QuestionsCard from '../components/interview/QuestionsCard';
import SuggestionsCard from '../components/interview/SuggestionsCard';
import StrengthWeaknessCard from '../components/interview/StrengthWeaknessCard';
import Sidebar from '../components/layout/Sidebar';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Loader from '../components/ui/Loader';
import { useInterview } from '../hooks/useInterview';
import { useToast } from '../hooks/useToast';
import { deriveReportInsights, normalizeTasks } from '../utils/reportHelpers';
import './ReportPage.scss';

const SECTIONS = [
  { id: 'overview', label: 'Overview', icon: <HiMap /> },
  { id: 'technical', label: 'Technical', icon: <HiCodeBracket /> },
  { id: 'behavioral', label: 'Behavioral', icon: <HiChatBubbleLeftRight /> },
  { id: 'hr', label: 'HR Questions', icon: <HiUserGroup /> },
  { id: 'roadmap', label: 'Prep Plan', icon: <HiMap /> },
];

const ReportPage = () => {
  const navigate = useNavigate();
  const { interviewId } = useParams();
  const { report, loading, getReportById, getResumePdf } = useInterview();
  const { error: toastError } = useToast();
  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    if (interviewId) getReportById(interviewId);
  }, [interviewId, getReportById]);

  const handleDownload = () => {
    const ok = getResumePdf(interviewId);
    if (!ok) toastError('Resume file not found. It may have been cleared from storage.');
  };

  if (loading) {
    return (
      <div className="report-page report-page--loading">
        <Loader size="lg" />
        <p>Loading your report...</p>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="report-page report-page--empty">
        <h2>Report Not Found</h2>
        <p>This report may have expired or doesn't exist in your local storage.</p>
        <Button onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
      </div>
    );
  }

  const insights = deriveReportInsights(report);

  const sidebarItems = SECTIONS.map((s) => ({
    ...s,
    badge: s.id === 'technical'
      ? report.technicalQuestions?.length
      : s.id === 'behavioral'
        ? report.behavioralQuestions?.length
        : undefined,
  }));

  return (
    <div className="report-page">
      <ReportHeader report={report} reportId={interviewId} />

      <div className="report-page__layout">
        <Sidebar
          items={sidebarItems}
          activeId={activeSection}
          onSelect={setActiveSection}
          footer={
            <Button variant="secondary" size="sm" onClick={handleDownload} icon={<HiArrowDownTray />}>
              Download Resume
            </Button>
          }
        />

        <motion.div
          className="report-page__content"
          key={activeSection}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeSection === 'overview' && (
            <>
              <div className="report-page__scores">
                <Card padding="md"><ATSScoreCard score={insights.atsScore} label="ATS Score" /></Card>
                <Card padding="md"><ATSScoreCard score={insights.readinessScore} label="Interview Readiness" /></Card>
                <Card padding="md">
                  <SkillMatchCard matchScore={insights.skillMatch} missingSkills={insights.missingSkills} />
                </Card>
              </div>

              <StrengthWeaknessCard strengths={insights.strengths} weaknesses={insights.weaknesses} />

              {report.skillGaps?.length > 0 && (
                <Card padding="md" className="report-page__gaps">
                  <h3>Skill Gaps by Severity</h3>
                  <div className="report-page__gap-tags">
                    {report.skillGaps.map((gap, i) => (
                      <span key={i} className={`report-page__gap report-page__gap--${gap.severity.toLowerCase()}`}>
                        {gap.skill}
                        <small>{gap.severity}</small>
                      </span>
                    ))}
                  </div>
                </Card>
              )}

              <SuggestionsCard
                improvements={insights.improvements}
                learningAreas={insights.learningAreas}
              />
            </>
          )}

          {activeSection === 'technical' && (
            <QuestionsCard
              title="Technical Questions"
              questions={report.technicalQuestions}
            />
          )}

          {activeSection === 'behavioral' && (
            <QuestionsCard
              title="Behavioral Questions"
              questions={report.behavioralQuestions}
            />
          )}

          {activeSection === 'hr' && (
            <QuestionsCard
              title="HR Questions"
              questions={insights.hrQuestions.length > 0 ? insights.hrQuestions : report.behavioralQuestions}
              emptyMessage="HR questions are derived from your behavioral question set."
            />
          )}

          {activeSection === 'roadmap' && (
            <div className="report-page__roadmap">
              <div className="report-page__roadmap-header">
                <h3>7-Day Preparation Roadmap</h3>
                <span>{report.preparationPlan?.length || 0} days</span>
              </div>
              {report.preparationPlan?.map((day) => (
                <Card key={day.day} padding="md" className="roadmap-day">
                  <div className="roadmap-day__header">
                    <span className="roadmap-day__badge">Day {day.day}</span>
                    <h4>{day.focus}</h4>
                  </div>
                  <ul>
                    {normalizeTasks(day.tasks).map((task, i) => (
                      <li key={i}>{task}</li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ReportPage;
