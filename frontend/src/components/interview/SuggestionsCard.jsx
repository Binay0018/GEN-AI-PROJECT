import { HiLightBulb } from 'react-icons/hi2';
import './SuggestionsCard.scss';

const SuggestionsCard = ({ improvements = [], learningAreas = [] }) => (
  <div className="suggestions-card">
    {improvements.length > 0 && (
      <div className="suggestions-card__section">
        <h3><HiLightBulb /> Improvement Suggestions</h3>
        <ul className="suggestions-card__list">
          {improvements.map((item, i) => (
            <li key={i}>
              <strong>{item.title}</strong>
              <p>{item.description}</p>
            </li>
          ))}
        </ul>
      </div>
    )}

    {learningAreas.length > 0 && (
      <div className="suggestions-card__section">
        <h3>Recommended Learning Areas</h3>
        <div className="suggestions-card__tags">
          {learningAreas.map((area, i) => (
            <span key={i} className="suggestions-card__tag">{area}</span>
          ))}
        </div>
      </div>
    )}
  </div>
);

export default SuggestionsCard;
