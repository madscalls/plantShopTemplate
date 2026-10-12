import { Link } from 'react-router-dom';
import Arch from '../components/Arch.jsx';
import AskForm from '../components/AskForm.jsx';
import { SITE, MARKETS, FAVORITES, nextDate, formatDay } from '../site.js';
import { LEVELS } from '../plants.js';

export default function Home() {
  const markets = MARKETS.map((m) => ({ ...m, next: nextDate(m.rule) }));
  const soonest = [...markets].sort((a, b) => a.next - b.next)[0];

  return (
    <main id="top">
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="stack-26">
            <p className="eyebrow">Small-batch plants · {SITE.city}</p>
            <h1 className="disp hero-title">Succulents, orchids and plants that are hard to kill.</h1>
            <p className="lede">Grown and potted by hand, sold at markets around town. Looking for something specific? Ask, and we'll bring it to the next market.</p>
            <div className="btn-row">
              <Link className="btn btn-dark" to="/#find-us">Where to find us</Link>
              <Link className="btn btn-line" to="/care#match">Find your plant match</Link>
            </div>
          </div>
          <div className="trio">
            <Arch art="succulent" bg="blue" height={300} />
            <Arch art="snake" bg="celadon" height={420} />
            <Arch art="orchid" bg="canary" height={340} />
          </div>
        </div>
      </section>

      <div className="next-strip">
        <div className="wrap next-row">
          <span><strong>Next market:</strong> {formatDay(soonest.next)} · {soonest.name}</span>
          <Link to="/#find-us">All our spots →</Link>
        </div>
      </div>

      <section id="plants" className="section">
        <div className="wrap stack-48">
          <div className="sec-head">
            <div className="stack-14">
              <p className="eyebrow">What we grow</p>
              <h2 className="disp h2">Four favorites, lots of varieties.</h2>
            </div>
            <p className="sec-lede">Every plant goes home potted, labeled and with a care card. Here's what's usually on the table.</p>
          </div>
          <div className="grow">
            {FAVORITES.map((f) => (
              <article key={f.name} className="stack-16">
                <Arch art={f.art} bg={f.bg} photo={f.photo} alt={f.name} height={300} />
                <span className={`chip lv-${f.level} self-start`}>{LEVELS[f.level].label}</span>
                <h3 className="disp h3">{f.name}</h3>
                <p className="body">{f.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="find-us" className="section bg-blue">
        <div className="wrap stack-44">
          <div className="sec-head">
            <div className="stack-14">
              <p className="eyebrow ink">Find us</p>
              <h2 className="disp h2">Where we set up shop.</h2>
            </div>
            <p className="sec-lede">No storefront, just a table full of plants. Come say hi, or tell us what to bring.</p>
          </div>
          <div className="spots">
            {markets.map((m) => (
              <article key={m.id} className="spot">
                <span className={`chip bg-${m.tone} self-start`}>{m.badge}</span>
                <h3 className="disp h3-lg">{m.name}</h3>
                <p className="body">{m.time}<br />{m.address}</p>
                <p className="spot-next">Next: {formatDay(m.next)}</p>
              </article>
            ))}
            <article className="spot spot-dark">
              <span className="chip bg-celadon self-start">Pop-ups</span>
              <h3 className="disp h3-lg">Events &amp; pop-ups</h3>
              <p className="body">We pop up at festivals, makers' markets and local shops. Dates go up on Instagram first.</p>
              <p className="spot-next spot-links">
                <a href={SITE.instagram.href}>Follow {SITE.instagram.handle}</a>
                <Link to="/#ask">Book us for an event</Link>
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="band bg-celadon">
        <div className="wrap band-row">
          <div className="stack-14 band-text">
            <h2 className="disp h2-sm">Not sure what will survive your windowsill?</h2>
            <p className="body-lg">Answer three quick questions about your light, your watering habits and your pets, and we'll point you to your best plants.</p>
          </div>
          <Link className="btn btn-dark" to="/care#match">Find my plant match</Link>
        </div>
      </section>

      <section id="ask" className="section">
        <div className="wrap split">
          <div className="stack-22">
            <p className="eyebrow">Ask us</p>
            <h2 className="disp h2">Looking for a plant? Got a sick one?</h2>
            <p className="body-lg narrow">Tell us what you're after and we'll set it aside for the next market. Or send us your plant problem and we'll help you sort it out. Pictures help.</p>
            <Arch art="pothosSad" bg="lime" height={280} className="ask-arch" />
          </div>
          <div className="form-card">
            <AskForm />
          </div>
        </div>
      </section>
    </main>
  );
}
