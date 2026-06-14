import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiChevronDown } from 'react-icons/hi2';
import './QuestionsCard.scss';

const QuestionItem = ({ item, index }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={`q-item ${open ? 'q-item--open' : ''}`}>
      <button className="q-item__header" onClick={() => setOpen(!open)}>
        <span className="q-item__index">Q{index + 1}</span>
        <p className="q-item__question">{item.question}</p>
        <HiChevronDown className="q-item__chevron" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            className="q-item__body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="q-item__section">
              <span className="q-item__tag q-item__tag--intention">Intention</span>
              <p>{item.intention}</p>
            </div>
            <div className="q-item__section">
              <span className="q-item__tag q-item__tag--answer">Model Answer</span>
              <p>{item.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const QuestionsCard = ({ title, questions = [], emptyMessage = 'No questions available.' }) => (
  <div className="questions-card">
    <div className="questions-card__header">
      <h3>{title}</h3>
      <span className="questions-card__count">{questions.length} questions</span>
    </div>
    {questions.length > 0 ? (
      <div className="questions-card__list">
        {questions.map((q, i) => (
          <QuestionItem key={i} item={q} index={i} />
        ))}
      </div>
    ) : (
      <p className="questions-card__empty">{emptyMessage}</p>
    )}
  </div>
);

export default QuestionsCard;
