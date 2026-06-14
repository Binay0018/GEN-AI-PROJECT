import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { HiArrowRight, HiSparkles } from 'react-icons/hi2';
import { useAuth } from '../../hooks/useAuth';
import Button from '../ui/Button';
import './HeroSection.scss';

const HeroSection = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleCTA = () => {
    navigate(user ? '/dashboard' : '/register');
  };

  return (
    <section className="hero">
      <div className="hero__glow hero__glow--1" />
      <div className="hero__glow hero__glow--2" />

      <motion.div
        className="hero__content"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="hero__badge">
          <HiSparkles />
          <span>Powered by Gemini AI</span>
        </div>

        <h1 className="hero__title">
          Ace Your Next Interview with{' '}
          <span className="hero__gradient">AI-Powered</span> Preparation
        </h1>

        <p className="hero__subtitle">
          Upload your resume, paste the job description, and get a personalized
          interview strategy with questions, skill analysis, and a 7-day prep plan.
        </p>

        <div className="hero__actions">
          <Button size="lg" onClick={handleCTA} icon={<HiArrowRight />}>
            Generate Report
          </Button>
          <Button variant="secondary" size="lg" onClick={() => navigate('/#how-it-works')}>
            See How It Works
          </Button>
        </div>

        <div className="hero__stats">
          <div className="hero__stat">
            <strong>5+</strong>
            <span>Technical Questions</span>
          </div>
          <div className="hero__stat">
            <strong>7-Day</strong>
            <span>Prep Roadmap</span>
          </div>
          <div className="hero__stat">
            <strong>100%</strong>
            <span>Personalized</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
