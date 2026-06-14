import clsx from 'clsx';
import { getScoreLevel, getScoreLabel } from '../../utils/reportHelpers';
import './ATSScoreCard.scss';

const ATSScoreCard = ({ score, label = 'ATS Score' }) => {
  const level = getScoreLevel(score);
  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className={clsx('ats-card', `ats-card--${level}`)}>
      <p className="ats-card__label">{label}</p>
      <div className="ats-card__ring">
        <svg viewBox="0 0 120 120">
          <circle className="ats-card__track" cx="60" cy="60" r="54" />
          <circle
            className="ats-card__progress"
            cx="60"
            cy="60"
            r="54"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
        <div className="ats-card__value">
          <span>{score}</span>
          <small>%</small>
        </div>
      </div>
      <p className="ats-card__sub">{getScoreLabel(score)}</p>
    </div>
  );
};

export default ATSScoreCard;
