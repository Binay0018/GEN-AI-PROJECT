import Textarea from '../ui/Textarea';
import { MAX_SELF_DESC } from '../../utils/validation';
import { HiUser } from 'react-icons/hi2';
import './SelfDescriptionInput.scss';

const SelfDescriptionInput = ({ value, onChange, error }) => (
  <div className="self-input">
    <div className="self-input__header">
      <HiUser className="self-input__icon" />
      <div>
        <h3>Self Description</h3>
        <span className="self-input__hint">Optional — adds context</span>
      </div>
    </div>
    <Textarea
      name="selfDescription"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Briefly describe your experience, key skills, and years of experience..."
      maxLength={MAX_SELF_DESC}
      error={error}
      className="self-input__textarea"
    />
  </div>
);

export default SelfDescriptionInput;
