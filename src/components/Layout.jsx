import { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { MapPin, MessageSquare } from 'lucide-react';

export default function Layout() {
  const [selectedRegion, setSelectedRegion] = useState('Quito');
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100vw', backgroundColor: 'var(--color-bg-dark)' }}>
      
      {/* Header / Top Navigation */}
      <div style={{ padding: '1rem', position: 'sticky', top: 0, zIndex: 10 }}>
        <header style={{ 
          backgroundColor: '#050B14', 
          border: '1px solid rgba(59, 130, 246, 0.2)',
          borderRadius: '1rem',
          padding: '1rem 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-lg)' }}>
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
              <h1 style={{ fontSize: '1.25rem', fontWeight: '900', margin: 0, letterSpacing: '-0.025em' }}>
                <span style={{ color: '#F8FAFC' }}>CERO</span> <span style={{ color: '#3B82F6' }}>CUENTOS</span>
              </h1>
            </Link>
            
            <div style={{ width: '1px', height: '24px', backgroundColor: 'rgba(255, 255, 255, 0.1)' }}></div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
              <MapPin size={20} color="#3B82F6" />
              <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.2' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                  Usted consultará sobre las candidaturas de:
                </span>
                <strong style={{ color: '#3B82F6', fontSize: '0.9rem' }}>
                  {selectedRegion === 'Nacional' ? 'Nivel Nacional (Presidencia)' : `Alcaldía de ${selectedRegion}`}
                </strong>
              </div>
            </div>
          </div>
        </header>
      </div>

      {/* Main Content Area */}
      <main style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        backgroundColor: 'var(--color-bg-light)' 
      }}>
        {/* Pasamos la región seleccionada Y EL SETTER a las páginas hijas */}
        <Outlet context={{ selectedRegion, setSelectedRegion }} />
      </main>
      
      {/* Footer tipo Web/Blog */}
      <footer style={{
        padding: 'var(--spacing-xl)',
        textAlign: 'center',
        borderTop: '1px solid var(--color-border)',
        backgroundColor: 'var(--color-bg-surface)',
        color: 'var(--color-text-muted)',
        fontSize: '0.875rem',
        marginTop: 'auto'
      }}>
        <div style={{ fontWeight: 'bold', marginBottom: 'var(--spacing-xs)', color: 'var(--color-text-main)' }}>CERO CUENTOS</div>
        <p style={{ margin: 0 }}>Prototipo CóndorBot Hackathon - Plataforma ciudadana para el contraste de información política.</p>
      </footer>
    </div>
  );
}
