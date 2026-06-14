import clsx from 'clsx';
import './SkillMatchCard.scss';

const SkillMatchCard = ({ matchScore, missingSkills = [] }) => (
  <div className="skill-match-card">
    <div className="skill-match-card__header">
      <h3>Skill Match</h3>
      <span className={clsx('skill-match-card__score', {
        'skill-match-card__score--high': matchScore >= 80,
        'skill-match-card__score--mid': matchScore >= 60 && matchScore < 80,
        'skill-match-card__score--low': matchScore < 60,
      })}>
        {matchScore}%
      </span>
    </div>

    <div className="skill-match-card__bar">
      <div
        className="skill-match-card__bar-fill"
        style={{ width: `${matchScore}%` }}
      />
    </div>

    {missingSkills.length > 0 && (
      <div className="skill-match-card__gaps">
        <p className="skill-match-card__gaps-label">Missing Skills</p>
        <div className="skill-match-card__tags">
          {missingSkills.map((skill, i) => (
            <span key={i} className="skill-match-card__tag">{skill}</span>
          ))}
        </div>
      </div>
    )}
  </div>
);

export default SkillMatchCard;
