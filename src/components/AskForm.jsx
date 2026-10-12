import { useState } from 'react';
import { SITE, MARKETS, ASK_TOPICS } from '../site.js';

const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT;

/**
 * "Ask us" form: find a plant, a care question, or an event.
 * With VITE_FORM_ENDPOINT set (Formspree, Basin…) it posts there; without it, it just
 * shows the thank-you state so the template demos cleanly.
 */
export default function AskForm() {
  const [topic, setTopic] = useState(0);
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const t = ASK_TOPICS[topic];

  async function onSubmit(e) {
    e.preventDefault();
    if (!ENDPOINT) { setStatus('sent'); return; }
    setStatus('sending');
    try {
      const res = await fetch(ENDPOINT, { method: 'POST', body: new FormData(e.currentTarget), headers: { Accept: 'application/json' } });
      setStatus(res.ok ? 'sent' : 'error');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return (
      <div className="form-done" role="status">
        <span className="disp">Thanks! We're on it.</span>
        <p>We'll email you back within {SITE.replyTime}. If it's a plant you're after, we'll let you know which market it'll be at.</p>
        <button type="button" className="btn btn-line" onClick={() => { setStatus('idle'); setTopic(0); }}>Ask something else</button>
      </div>
    );
  }

  return (
    <form className="form-grid" onSubmit={onSubmit}>
      <fieldset className="pills full">
        <legend>What can we help with?</legend>
        {ASK_TOPICS.map((x, i) => (
          <label key={x.label} className={'pill' + (i === topic ? ' on' : '')}>
            <input type="radio" name="topic" value={x.label} checked={i === topic} onChange={() => setTopic(i)} />
            {x.label}
          </label>
        ))}
      </fieldset>
      <label className="field">Your name<input type="text" name="name" autoComplete="name" required /></label>
      <label className="field">Email<input type="email" name="email" autoComplete="email" required /></label>
      <label className="field full">{t.ask}<textarea name="message" rows={5} placeholder={t.hint} required /></label>
      <label className="field full">Where should we meet you?
        <select name="pickup">
          {MARKETS.map((m) => <option key={m.id}>{m.badge}: {m.name}</option>)}
          <option>Next pop-up</option>
          <option>Just answer by email</option>
        </select>
      </label>
      <div className="full form-foot">
        <button type="submit" className="btn btn-dark" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : 'Send it over'}</button>
        <span>{status === 'error' ? `That didn't send. Email us at ${SITE.email}.` : `We usually reply within ${SITE.replyTime}.`}</span>
      </div>
    </form>
  );
}
