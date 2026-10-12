import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SITE } from '../site.js';
import { LEVELS, PLANTS, QUESTIONS, TIPS, matchPlants } from '../plants.js';

const FILTERS = [['all', 'All plants'], ['easy', 'Easy care'], ['some', 'Some attention'], ['fussy', 'Fussy']];

export default function Care() {
  const [answers, setAnswers] = useState({ light: 'medium', water: 'forgetful', pets: false });
  const [filter, setFilter] = useState('all');
  const { matches, tough } = matchPlants(answers);
  const shown = PLANTS.filter((p) => filter === 'all' || p.level === filter);

  useEffect(() => {
    document.title = `Plant care · ${SITE.name}`;
    return () => { document.title = SITE.name; };
  }, []);

  return (
    <main>
      <section className="care-hero bg-celadon">
        <div className="wrap stack-22">
          <p className="eyebrow ink">Plant care</p>
          <h1 className="disp care-title">Plant care, kept simple.</h1>
          <p className="lede">Find the plants that fit the way you live, see how much care each one needs, and pick up a few tricks that keep them going.</p>
          <div className="jump">
            <a href="#match">Plant match</a>
            <a href="#levels">Care levels</a>
            <a href="#tips">Tips &amp; tricks</a>
          </div>
        </div>
      </section>

      <section id="match" className="section bg-lime">
        <div className="wrap stack-36">
          <div className="stack-14">
            <p className="eyebrow">Plant match</p>
            <h2 className="disp h2-md">Three questions, your best plants.</h2>
          </div>
          <div className="quiz">
            {QUESTIONS.map((q, qi) => (
              <div key={q.key} className="q">
                <span className="q-title">{qi + 1}. {q.q}</span>
                <div className="opts" role="group" aria-label={q.q}>
                  {q.options.map((o) => {
                    const on = answers[q.key] === o.value;
                    return (
                      <button key={String(o.value)} type="button" className={'opt' + (on ? ' on' : '')} aria-pressed={on}
                        onClick={() => setAnswers({ ...answers, [q.key]: o.value })}>
                        {o.label}<small>{o.sub}</small>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="stack-16" aria-live="polite">
            <span className="disp h3-lg">Your best matches</span>
            {tough && (
              <p className="note">Low light with pets is the trickiest combo, since the toughest low-light plants are toxic. A moth orchid or zebra haworthia near your brightest window is your best bet.</p>
            )}
            <div className="results">
              {matches.map((m) => (
                <article key={m.name} className="result">
                  <span className="result-fit">{m.fit}</span>
                  <span className="disp result-name">{m.name}</span>
                  <span className="result-why">{m.why}</span>
                  <span className={`chip lv-${m.level} self-start`}>{LEVELS[m.level].label}</span>
                </article>
              ))}
            </div>
            <Link to="/#ask" className="text-link">Ask us to bring one to the next market →</Link>
          </div>
        </div>
      </section>

      <section id="levels" className="section">
        <div className="wrap stack-32">
          <div className="sec-head">
            <div className="stack-14">
              <p className="eyebrow">Care levels</p>
              <h2 className="disp h2-md">How much care does it need?</h2>
            </div>
            <div className="legend">
              {Object.entries(LEVELS).map(([k, l]) => (
                <span key={k}><span className={`chip lv-${k}`}>{l.label}</span> {l.blurb}</span>
              ))}
            </div>
          </div>
          <div className="filters" role="group" aria-label="Filter by care level">
            {FILTERS.map(([v, label]) => (
              <button key={v} type="button" className={'fbtn' + (filter === v ? ' on' : '')} aria-pressed={filter === v} onClick={() => setFilter(v)}>{label}</button>
            ))}
          </div>
          <div className="plants">
            {shown.map((p) => (
              <article key={p.name} className="pcard">
                <span className={`chip lv-${p.level} self-start`}>{LEVELS[p.level].label}</span>
                <h3 className="disp h3">{p.name}</h3>
                <dl>
                  <dt>Light</dt><dd>{p.lightText}</dd>
                  <dt>Water</dt><dd>{p.waterText}</dd>
                  <dt>Pets</dt><dd>{p.toxic ? 'Toxic to cats and dogs' : 'Pet-safe'}</dd>
                </dl>
              </article>
            ))}
          </div>
          <p className="fine">Pet safety follows the ASPCA's toxic and non-toxic plant lists. Even pet-safe plants can upset a stomach, so keep them out of reach of serious chewers.</p>
        </div>
      </section>

      <section id="tips" className="section bg-blue">
        <div className="wrap stack-36">
          <div className="stack-14">
            <p className="eyebrow ink">Tips &amp; tricks</p>
            <h2 className="disp h2-md">What we tell everyone at the table.</h2>
          </div>
          <div className="tips">
            {TIPS.map((t, i) => (
              <div key={t.title} className={`tip bg-${t.tone}`}>
                <span className="tip-n">{String(i + 1).padStart(2, '0')}</span>
                <strong>{t.title}</strong>
                <span>{t.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-sm">
        <div className="wrap">
          <div className="cta-box">
            <div className="stack-12">
              <h2 className="disp cta-title">Plant looking sad?</h2>
              <p className="body-lg">Send us a note and a photo. We'll tell you what we think is going on.</p>
            </div>
            <Link className="btn btn-canary" to="/#ask">Ask us a question</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
