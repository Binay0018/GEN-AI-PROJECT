import { HiCheckCircle, HiExclamationTriangle } from 'react-icons/hi2';
import './StrengthWeaknessCard.scss';

const StrengthWeaknessCard = ({ strengths = [], weaknesses = [] }) => (
  <div className="sw-card">
    <div className="sw-card__col">
      <h3><HiCheckCircle /> Strengths</h3>
      <ul>
        {strengths.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
    <div className="sw-card__col sw-card__col--weak">
      <h3><HiExclamationTriangle /> Weaknesses</h3>
      <ul>
        {weaknesses.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  </div>
);

export default StrengthWeaknessCard;
