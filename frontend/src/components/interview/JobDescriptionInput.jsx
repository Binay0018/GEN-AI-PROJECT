import Textarea from '../ui/Textarea';
import { MAX_JOB_DESC } from '../../utils/validation';
import { HiBriefcase } from 'react-icons/hi2';
import './JobDescriptionInput.scss';

const JobDescriptionInput = ({ value, onChange, error }) => (
  <div className="job-input">
    <div className="job-input__header">
      <HiBriefcase className="job-input__icon" />
      <div>
        <h3>Target Job Description</h3>
        <span className="job-input__badge">Required</span>
      </div>
    </div>
    <Textarea
      name="jobDescription"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Paste the full job description here...&#10;e.g. 'Senior Frontend Engineer requires proficiency in React, TypeScript, and system design...'"
      maxLength={MAX_JOB_DESC}
      error={error}
      className="job-input__textarea"
    />
  </div>
);

export default JobDescriptionInput;
