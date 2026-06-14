import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';
import { HiSparkles } from 'react-icons/hi2';
import HeroSection from '../components/landing/HeroSection';
import FeatureCards from '../components/landing/FeatureCards';
import HowItWorks from '../components/landing/HowItWorks';
import Button from '../components/ui/Button';
import './LandingPage.scss';

const benefits = [
  'Personalized question bank based on your resume',
  'Real-time skill gap analysis with severity levels',
  'Structured 7-day preparation roadmap',
  'Model answers to guide your responses',
  'ATS compatibility scoring',
];

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <HeroSection />
      <FeatureCards />
      <HowItWorks />

      <section className="benefits">
        <div className="benefits__inner">
          <motion.div
            className="benefits__content"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2>Why Choose <span className="benefits__gradient">InterviewAI</span>?</h2>
            <ul>
              {benefits.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <Button size="lg" onClick={() => navigate('/register')}>
              Start Preparing Free
            </Button>
          </motion.div>

          <motion.div
            className="benefits__visual"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="benefits__card">
              <HiSparkles />
              <div className="benefits__score">87%</div>
              <p>Match Score</p>
              <div className="benefits__mini-stats">
                <span>5 Technical</span>
                <span>3 Behavioral</span>
                <span>7-Day Plan</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
