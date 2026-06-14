import { motion } from 'framer-motion';
import './HowItWorks.scss';

const steps = [
  {
    step: '01',
    title: 'Paste Job Description',
    description: 'Copy the full job posting including requirements, responsibilities, and qualifications.',
  },
  {
    step: '02',
    title: 'Upload Your Resume',
    description: 'Drag and drop your PDF resume. Add a self-description for additional context.',
  },
  {
    step: '03',
    title: 'AI Analysis',
    description: 'Our AI analyzes your profile, matches skills, and generates tailored interview content.',
  },
  {
    step: '04',
    title: 'Get Your Report',
    description: 'Review scores, questions, skill gaps, and a 7-day preparation roadmap.',
  },
];

const HowItWorks = () => (
  <section id="how-it-works" className="how-it-works">
    <div className="how-it-works__header">
      <h2>How It <span className="how-it-works__gradient">Works</span></h2>
      <p>Four simple steps to your personalized interview strategy.</p>
    </div>

    <div className="how-it-works__steps">
      {steps.map((item, i) => (
        <motion.div
          key={item.step}
          className="how-it-works__step"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
        >
          <span className="how-it-works__number">{item.step}</span>
          <div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

export default HowItWorks;
