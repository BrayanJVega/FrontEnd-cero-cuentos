import React, { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { Calendar, MapPin, MessageSquare } from 'lucide-react';
import quitoBg from '@/assets/quito_bg.png';
import banderaQuito from '@/assets/bandera-quito-escudo.webp';
import banderaGuayaquil from '@/assets/bandera-guayaquil.jpg';
import banderaCuenca from '@/assets/bandera-cuenca-ecuador.webp';
import banderaEcuador from '@/assets/bandera-ecuador.jpg';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import CandidateCard from '@/components/CandidateCard';

export default function CandidatesPage() {
  const navigate = useNavigate();
  const { selectedRegion, setSelectedRegion } = useOutletContext();

  const regionLabels = {
    Quito: 'Pichincha - Quito',
    Guayaquil: 'Guayas - Guayaquil',
    Cuenca: 'Azuay - Cuenca',
    Nacional: 'Nivel Nacional (Presidenciales)'
  };

  const [candidatos, setCandidatos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(`http://localhost:8000/api/candidatos?region=${selectedRegion}`)
      .then((res) => res.json())
      .then((data) => {
        setCandidatos(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error al traer candidatos", err);
        setIsLoading(false);
      });
  }, [selectedRegion]);

  const getFlagBackground = (region) => {
    const darkOverlay = `linear-gradient(to right, #0B0E14 40%, rgba(11, 14, 20, 0.6) 70%, transparent 100%), linear-gradient(to top, #0B0E14 0%, transparent 20%)`;
    switch (region) {
      case 'Guayaquil':
        return `${darkOverlay}, url(${banderaGuayaquil})`;
      case 'Cuenca':
        return `${darkOverlay}, url(${banderaCuenca})`;
      case 'Nacional':
        return `${darkOverlay}, url(${banderaEcuador})`;
      case 'Quito':
      default:
        // Use the exact night view for Quito as shown in the screenshot
        return `${darkOverlay}, url(${quitoBg})`;
    }
  };

  return (
    <div style={{
      flex: 1,
      padding: 'var(--spacing-xl)',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden'
    }}>

      {/* Decorative background glow elements */}
      <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, var(--color-ecu-yellow) 0%, transparent 70%)', opacity: 0.05, filter: 'blur(60px)', pointerEvents: 'none' }}></div>
      <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, var(--color-ecu-red) 0%, transparent 70%)', opacity: 0.05, filter: 'blur(60px)', pointerEvents: 'none' }}></div>

      <div style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)', zIndex: 1, position: 'relative' }}>
        <div style={{
          position: 'relative',
          width: '100%',
          padding: '6rem 0',
          marginBottom: 'var(--spacing-xl)',
          backgroundImage: getFlagBackground(selectedRegion),
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          justifyContent: 'center',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
        }}>
          {/* Abstract blue slanted shape on the right */}
          <div style={{
            position: 'absolute',
            top: 0, right: 0, bottom: 0,
            width: '35%',
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0) 0%, rgba(59, 130, 246, 0.25) 100%)',
            clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0 100%)',
            pointerEvents: 'none',
          }}></div>

          <div style={{ width: '100%', padding: '0 2rem', zIndex: 1, position: 'relative' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.25rem 0.75rem',
              border: '1px solid rgba(59, 130, 246, 0.4)',
              borderRadius: 'var(--radius-full)',
              marginBottom: '1.5rem',
              backgroundColor: 'rgba(59, 130, 246, 0.05)'
            }}>
              <Calendar size={14} color="#3B82F6" />
              <span style={{ fontSize: '0.75rem', fontWeight: 'bold', letterSpacing: '0.05em', color: '#60A5FA' }}>ELECCIONES 2027</span>
            </div>

            <h2 style={{ fontSize: '3.5rem', fontWeight: '900', margin: '0 0 var(--spacing-md) 0', lineHeight: '1.1', letterSpacing: '-0.025em' }}>
              <span style={{ color: '#F8FAFC', display: 'block' }}>Elecciones</span>
              <span style={{ display: 'block' }}>
                <span style={{ color: '#3B82F6' }}>{selectedRegion === 'Nacional' ? 'Presidenciales' : `Alcaldía de ${selectedRegion}`}</span> <span style={{ color: '#F8FAFC' }}>2027</span>
              </span>
            </h2>

            <p style={{ margin: 0, color: '#CBD5E1', fontSize: '1.1rem', marginBottom: 'var(--spacing-xl)', maxWidth: '500px', lineHeight: '1.6' }}>
              Explora los perfiles de los candidatos y descarga los<br />planes de gobierno oficiales.
            </p>

            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '0.75rem',
                backgroundColor: 'rgba(20, 25, 35, 0.6)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '1rem',
                maxWidth: '400px',
                flex: '1 1 300px',
                backdropFilter: 'blur(16px)',
                position: 'relative',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(30, 38, 50, 0.8)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(20, 25, 35, 0.6)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.3) 0%, rgba(37, 99, 235, 0.1) 100%)',
                  border: '1px solid rgba(59, 130, 246, 0.4)',
                  borderRadius: '0.75rem',
                  width: '48px',
                  height: '48px',
                  flexShrink: 0,
                  boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.1)'
                }}>
                  <MapPin size={24} color="#60A5FA" />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <span style={{ fontSize: '0.75rem', color: '#94A3B8', marginBottom: '2px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Selecciona tu región</span>
                  <span style={{
                    color: '#FFD100',
                    fontSize: '1.05rem',
                    fontWeight: '700',
                    letterSpacing: '0.01em'
                  }}>
                    {regionLabels[selectedRegion]}
                  </span>
                </div>

                {/* Custom dropdown arrow */}
                <div style={{ paddingRight: '0.5rem', pointerEvents: 'none', transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }}>
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1.5L6 6.5L11 1.5" stroke="#FFD100" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                {/* Custom Dropdown Menu */}
                {isDropdownOpen && (
                  <div style={{
                    position: 'absolute',
                    top: 'calc(100% + 0.5rem)',
                    left: 0,
                    width: '100%',
                    backgroundColor: '#0F172A',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: '1rem',
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
                    overflow: 'hidden',
                    zIndex: 20,
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                    {Object.entries(regionLabels).map(([key, label]) => (
                      <div
                        key={key}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedRegion(key);
                          setIsDropdownOpen(false);
                        }}
                        style={{
                          padding: '0.85rem 1.25rem',
                          cursor: 'pointer',
                          backgroundColor: selectedRegion === key ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
                          color: selectedRegion === key ? '#60A5FA' : '#F8FAFC',
                          fontSize: '0.95rem',
                          fontWeight: selectedRegion === key ? '600' : '400',
                          transition: 'background-color 0.2s ease',
                          borderBottom: key !== 'Nacional' ? '1px solid rgba(255,255,255,0.05)' : 'none'
                        }}
                        onMouseEnter={(e) => {
                          if (selectedRegion !== key) e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
                        }}
                        onMouseLeave={(e) => {
                          if (selectedRegion !== key) e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                      >
                        {label}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={() => navigate('/chat')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.75rem',
                  padding: '1.25rem 2.5rem',
                  backgroundColor: '#2563EB',
                  color: 'white',
                  border: 'none',
                  borderRadius: '1rem',
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  boxShadow: '0 10px 25px -5px rgba(37, 99, 235, 0.6), inset 0 2px 4px rgba(255,255,255,0.2)',
                  transition: 'all 0.3s ease',
                  flex: '0 1 auto'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 15px 35px -5px rgba(37, 99, 235, 0.8), inset 0 2px 4px rgba(255,255,255,0.3)';
                  e.currentTarget.style.backgroundColor = '#1D4ED8';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(37, 99, 235, 0.6), inset 0 2px 4px rgba(255,255,255,0.2)';
                  e.currentTarget.style.backgroundColor = '#2563EB';
                }}
              >
                <MessageSquare size={28} />
                Hablemos de Política
              </button>
            </div>
          </div>
        </div>

        {/* Candidatos Title */}
        <div style={{ textAlign: 'center', marginTop: '3rem', marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '3rem', fontWeight: '900', color: 'var(--color-text-main)', margin: 0 }}>Candidatos</h2>
        </div>

        {/* 3D Coverflow Carousel */}
        {isLoading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
            <p style={{ fontSize: '1.5rem', color: 'var(--color-text-muted)', fontWeight: '500', animation: 'pulse 2s infinite' }}>Cargando candidatos...</p>
          </div>
        ) : (
          <div style={{ width: '100%', paddingTop: '2rem', paddingBottom: '4rem' }}>
            <Swiper
              effect={'coverflow'}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={'auto'}
              initialSlide={Math.floor(candidatos.length / 2)}
              coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 150,
                modifier: 2.5,
                slideShadows: true,
              }}
              pagination={{ clickable: true }}
              navigation={true}
              modules={[EffectCoverflow, Pagination, Navigation]}
              className="candidates-swiper"
              style={{
                width: '100%',
                paddingTop: '20px',
                paddingBottom: '50px',
                '--swiper-pagination-color': 'var(--color-accent)',
                '--swiper-navigation-color': 'var(--color-accent)',
                '--swiper-navigation-size': '2rem',
              }}
            >
              {candidatos.map((candidate) => (
                <SwiperSlide key={candidate.id} style={{ width: '320px', height: '450px' }}>
                  <CandidateCard candidate={candidate} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}

      </div>
    </div>
  );
}
