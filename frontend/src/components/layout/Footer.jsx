import { Link } from 'react-router';
import { HiSparkles } from 'react-icons/hi2';
import './Footer.scss';

const Footer = () => (
  <footer className="footer">
    <div className="footer__inner">
      <div className="footer__brand">
        <HiSparkles className="footer__logo" />
        <span>InterviewAI</span>
        <p className="footer__tagline">AI-powered interview preparation for your dream job.</p>
      </div>

      <div className="footer__links">
        <div className="footer__col">
          <h4>Product</h4>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/#features">Features</Link>
          <Link to="/#how-it-works">How It Works</Link>
        </div>
        <div className="footer__col">
          <h4>Legal</h4>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
        <div className="footer__col">
          <h4>Support</h4>
          <a href="#">Help Center</a>
          <a href="#">Contact</a>
        </div>
      </div>
    </div>

    <div className="footer__bottom">
      <p>&copy; {new Date().getFullYear()} InterviewAI. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
