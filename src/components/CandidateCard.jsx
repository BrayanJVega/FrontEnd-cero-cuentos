import { FileText } from 'lucide-react';

export default function CandidateCard({ candidate }) {
  return (
    <div style={{
      /* Estilo Glassmorphism para el carrusel */
      backgroundColor: 'var(--color-bg-surface)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderRadius: 'var(--radius-xl)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderTop: '1px solid rgba(255, 255, 255, 0.2)',
      borderLeft: '1px solid rgba(255, 255, 255, 0.2)',
      padding: '0',
      display: 'flex',
      flexDirection: 'column',
      height: '450px', /* Altura fija para el carrusel */
      width: '320px', /* Ancho fijo para el carrusel */
      overflow: 'hidden',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1) inset',
      position: 'relative'
    }}>
      
      {/* Etiqueta de Partido / Movimiento */}
      <div style={{
        position: 'absolute',
        top: '1rem',
        right: '1rem',
        backgroundColor: 'var(--color-accent)',
        color: '#000',
        padding: '4px 12px',
        borderRadius: 'var(--radius-full)',
        fontSize: '0.75rem',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        zIndex: 10,
        boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
      }}>
        {candidate.party}
      </div>

      {/* Imagen Principal (Arriba, ocupa la mitad) */}
      <div style={{
        width: '100%',
        height: '55%',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid rgba(255,255,255,0.1)'
      }}>
        <img 
          src={candidate.image} 
          alt={candidate.name} 
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover',
            objectPosition: 'top',
          }}
        />
        {/* Gradiente para transición suave con el texto */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '50px',
          background: 'linear-gradient(to bottom, transparent, rgba(20, 25, 35, 0.8))'
        }}></div>
      </div>
      
      {/* Contenido (Abajo) */}
      <div style={{
        padding: 'var(--spacing-lg)',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        gap: 'var(--spacing-sm)',
        background: 'linear-gradient(180deg, rgba(20, 25, 35, 0.8) 0%, rgba(11, 14, 20, 0.95) 100%)'
      }}>
        <h3 style={{ 
          margin: 0, 
          fontSize: '1.5rem', 
          fontWeight: '800',
          color: 'var(--color-text-main)',
          textShadow: '0 2px 4px rgba(0,0,0,0.5)'
        }}>
          {candidate.name}
        </h3>
        
        <p style={{ 
          fontSize: '0.9rem', 
          color: 'var(--color-text-muted)', 
          lineHeight: '1.5', 
          flex: 1,
          margin: 0,
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}>
          {candidate.description}
        </p>

        <a 
          href={candidate.planUrl || '/plan.pdf'} 
          target="_blank"
          rel="noopener noreferrer"
          download="Plan_de_Gobierno.pdf"
          onClick={(e) => e.stopPropagation()}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'var(--spacing-xs)',
            padding: 'var(--spacing-md)',
            marginTop: 'auto',
            backgroundColor: 'var(--color-primary)',
            borderRadius: 'var(--radius-lg)',
            color: 'white',
            fontWeight: '600',
            fontSize: '0.9rem',
            textDecoration: 'none',
            transition: 'all 0.2s ease',
            boxShadow: '0 4px 14px 0 rgba(0, 51, 160, 0.39)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--color-primary-hover)';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 51, 160, 0.6)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--color-primary)';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 14px 0 rgba(0, 51, 160, 0.39)';
          }}
        >
          <FileText size={18} />
          Plan de Gobierno
        </a>
      </div>
    </div>
  );
}
