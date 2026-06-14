import { motion } from 'framer-motion';
import {
  HiDocumentText,
  HiChartBar,
  HiLightBulb,
  HiChatBubbleLeftRight,
  HiCalendarDays,
  HiShieldCheck,
} from 'react-icons/hi2';
import Card from '../ui/Card';
import './FeatureCards.scss';

const features = [
  {
    icon: HiDocumentText,
    title: 'Resume Analysis',
    description: 'AI extracts and analyzes your resume against job requirements for precise matching.',
  },
  {
    icon: HiChartBar,
    title: 'ATS Score & Match',
    description: 'Get ATS compatibility score and skill match percentage to gauge your readiness.',
  },
  {
    icon: HiChatBubbleLeftRight,
    title: 'Interview Questions',
    description: 'Technical, behavioral, and HR questions tailored to your profile and target role.',
  },
  {
    icon: HiLightBulb,
    title: 'Skill Gap Analysis',
    description: 'Identify missing skills with severity levels and actionable improvement paths.',
  },
  {
    icon: HiCalendarDays,
    title: '7-Day Prep Plan',
    description: 'Structured daily roadmap with focused tasks to maximize your preparation time.',
  },
  {
    icon: HiShieldCheck,
    title: 'Model Answers',
    description: 'Each question includes intention and suggested answers to guide your responses.',
  },
];

const FeatureCards = () => (
  <section id="features" className="features">
    <div className="features__header">
      <h2>Everything You Need to <span className="features__gradient">Prepare</span></h2>
      <p>Comprehensive AI analysis tools designed to give you a competitive edge.</p>
    </div>

    <div className="features__grid">
      {features.map((feature, i) => (
        <motion.div
          key={feature.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08 }}
        >
          <Card hover padding="md" className="feature-card">
            <div className="feature-card__icon">
              <feature.icon />
            </div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </Card>
        </motion.div>
      ))}
    </div>
  </section>
);

export default FeatureCards;
