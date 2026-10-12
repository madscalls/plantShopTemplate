export default function Logo({ size = 40 }) {
  return (
    <svg viewBox="0 0 40 40" width={size} height={size} aria-hidden="true">
      <circle cx="20" cy="20" r="19" fill="#A8D4AD" />
      <path d="M20 31V17" stroke="#2E2A24" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M20 20c-6 0-9-4-9-9 6 0 9 4 9 9zM20 17c0-5 3-8 9-8 0 5-3 8-9 8z" fill="#2E2A24" />
      <path d="M13 27h14l-2 6H15z" fill="#967D69" />
    </svg>
  );
}
