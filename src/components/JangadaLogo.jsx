export default function JangadaLogo({ className = "h-9 w-9" }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <circle cx="32" cy="32" r="31" fill="#0b1e33" stroke="#f5a623" strokeWidth="1.5" />
      <circle cx="40" cy="22" r="9" fill="#f5a623" />
      <path d="M6 44 L58 44 L50 52 L14 52 Z" fill="#0b1e33" stroke="#f4ead9" strokeWidth="1.2" />
      <path d="M20 44 L20 20 L38 44 Z" fill="#e8452c" opacity="0.9" />
      <line x1="20" y1="44" x2="20" y2="16" stroke="#f4ead9" strokeWidth="1.5" />
      <path d="M10 12 q4 -4 8 0" stroke="#f4ead9" strokeWidth="1.3" fill="none" strokeLinecap="round" />
      <path d="M16 8 q4 -4 8 0" stroke="#f4ead9" strokeWidth="1.3" fill="none" strokeLinecap="round" />
    </svg>
  );
}
