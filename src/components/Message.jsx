import { User } from 'lucide-react';
import mascotaImg from '@/assets/MASCOTA.png';

export default function Message({ role, content, sources }) {
  const isUser = role === 'user';

  return (
    <div style={{
      display: 'flex',
      gap: 'var(--spacing-md)',
      padding: 'var(--spacing-md)',
      backgroundColor: isUser ? 'transparent' : 'var(--color-bg-surface)',
      borderRadius: 'var(--radius-md)',
      border: isUser ? 'none' : '1px solid var(--color-border)'
    }}>
      {isUser ? (
        <div style={{
          width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--color-primary)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
        }}>
          <User size={20} color="white" />
        </div>
      ) : (
        <img 
          src={mascotaImg} 
          alt="CóndorBot" 
          style={{ width: '36px', height: '36px', borderRadius: '50%', flexShrink: 0, objectFit: 'cover' }} 
        />
      )}
      
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: '500', marginBottom: 'var(--spacing-xs)', color: 'var(--color-text-muted)' }}>
          {isUser ? 'Tú' : 'CóndorBot'}
        </div>
        <div style={{ lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
          {content}
        </div>
        
        {/* Renderizado de fuentes si existen */}
        {!isUser && sources && sources.length > 0 && (
          <div style={{ 
            marginTop: 'var(--spacing-md)',
            paddingTop: 'var(--spacing-sm)',
            borderTop: '1px solid var(--color-border)'
          }}>
            <strong style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', display: 'block', marginBottom: 'var(--spacing-xs)' }}>Fuentes y Evidencia:</strong>
            <div style={{ display: 'flex', gap: 'var(--spacing-sm)', flexWrap: 'wrap' }}>
              {sources.map((src, idx) => (
                <a 
                  key={`${src.title}-${idx}`} 
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: '0.875rem',
                    padding: 'var(--spacing-xs) var(--spacing-sm)',
                    backgroundColor: 'var(--color-bg-light)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-md)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    textDecoration: 'none'
                  }}
                >
                  {src.title}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
