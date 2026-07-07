import { useState } from 'react';

export default function Collapsible({ title, children, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div
      className="glass"
      style={{
        borderRadius: 12,
        overflow: 'hidden',
        border: isOpen ? '1px solid var(--gold)' : '1px solid rgba(232, 185, 79, 0.2)',
        transition: 'border-color 0.3s ease',
      }}
    >
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          padding: '18px 24px',
          background: 'rgba(28, 39, 64, 0.4)',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 16,
          userSelect: 'none'
        }}
      >
        <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 600, color: isOpen ? 'var(--gold)' : '#fff', transition: 'color 0.2s' }}>
          {title}
        </h4>
        <span style={{
          color: 'var(--gold)',
          fontSize: 12,
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.3s ease',
          display: 'inline-block'
        }}>
          ▼
        </span>
      </div>
      <div
        style={{
          maxHeight: isOpen ? '1000px' : '0px',
          opacity: isOpen ? 1 : 0,
          overflow: 'hidden',
          transition: 'max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease',
          background: 'rgba(14, 19, 32, 0.2)',
        }}
      >
        <div
          style={{
            padding: '20px 24px',
            fontSize: '14.5px',
            lineHeight: 1.6,
            color: '#e4e6eb',
            borderTop: '1px solid rgba(232, 185, 79, 0.1)',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
