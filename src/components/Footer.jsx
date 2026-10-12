import { Link } from 'react-router-dom';
import { SITE } from '../site.js';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <span className="disp">{SITE.name}</span>
            <p>Succulents, orchids and easy houseplants from a small grower in {SITE.city}.</p>
          </div>
          <nav aria-label="Footer" className="footer-nav">
            <Link to="/#plants">Our plants</Link>
            <Link to="/#find-us">Find us</Link>
            <Link to="/care">Plant care</Link>
            <Link to="/#ask">Ask us</Link>
          </nav>
          <div className="footer-contact">
            <span className="footer-label">Say hi</span>
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            <span className="footer-socials">
              {SITE.socials.map((s) => <a key={s.label} href={s.href}>{s.label}</a>)}
            </span>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {SITE.name}</span>
          <span>Site by Whelk Works</span>
        </div>
      </div>
    </footer>
  );
}
