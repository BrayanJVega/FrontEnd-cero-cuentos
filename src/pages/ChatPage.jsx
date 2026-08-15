import { useState, useEffect } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ChatBox from '@/components/ChatBox';
import mascotaImg from '@/assets/MASCOTA.png'; // ¡La mascota original volvió!

export default function ChatPage() {
  const { selectedRegion } = useOutletContext();
  const navigate = useNavigate();

  const [currentResponse, setCurrentResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Efecto para que PoliBot adapte su saludo inicial a la región seleccionada
  useEffect(() => {
    const regionName = selectedRegion === 'Nacional' ? 'la Presidencia' : `la Alcaldía de ${selectedRegion}`;
    setCurrentResponse({
      etiqueta: "¡Hola! Soy CóndorBot.",
      explicacion: `Dime qué rumor, propuesta o frase quieres que verifique contra los documentos oficiales de los candidatos a ${regionName} y te diré si es verdad o falso.`,
      fuentes_citadas: []
    });
  }, [selectedRegion]);

  const handleSendMessage = async (text, selectedModel) => {
    setIsLoading(true);
    setCurrentResponse({
      etiqueta: "Investigando...",
      explicacion: `Buscando en los planes de gobierno y entrevistas oficiales de ${selectedRegion}...`,
      fuentes_citadas: []
    });

    try {
      const res = await fetch("http://localhost:8000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pregunta: text, modelo: selectedModel }),
      });

      if (!res.ok) throw new Error("Error en el servidor");
      const data = await res.json();
      setCurrentResponse(data);
    } catch (error) {
      console.error(error);
      setCurrentResponse({
        etiqueta: "Error de Conexión",
        explicacion: "CóndorBot se quedó sin saldo o el servidor de Python está apagado. ¡Intenta con Groq!",
        fuentes_citadas: []
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Función de colores dinámicos para el fondo de la burbuja
  const getBubbleColor = (etiqueta) => {
    const text = etiqueta?.toLowerCase() || "";
    if (text.includes("verdadero") || text.includes("sustentado")) return "#d4edda"; // Verde 
    if (text.includes("falso") || text.includes("engañoso")) return "#f8d7da"; // Rojo 
    if (text.includes("impreciso")) return "#fff3cd"; // Amarillo 
    if (text.includes("investigando") || text.includes("hola")) return "#f8fafc"; // Gris muy claro
    return "#e2e3e5"; // Gris
  };

  const bubbleBgColor = currentResponse ? getBubbleColor(currentResponse.etiqueta) : '#f8fafc';

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 'var(--spacing-lg)', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>

      {/* Header / Botón Volver */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 'var(--spacing-lg)' }}>
        <button
          onClick={() => navigate('/')}
          style={{ background: 'transparent', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
        >
          <ArrowLeft size={24} /> <span style={{ marginLeft: '8px', fontWeight: '500', fontSize: '1.125rem' }}>Volver </span>
        </button>
      </div>

      {/* Área interactiva: Mascota y Burbuja */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 'var(--spacing-xl)', position: 'relative' }}>

        {/* Mascota en grande (Izquierda) */}
        <div style={{ flexShrink: 0, width: '400px', display: 'flex', justifyContent: 'center' }}>
          <img
            src={mascotaImg}
            alt="CóndorBot"
            style={{ width: '100%', height: 'auto', maxHeight: '65vh', objectFit: 'contain', filter: 'drop-shadow(0px 10px 15px rgba(0,0,0,0.15))' }}
          />
        </div>

        {/* Burbuja de diálogo gigante (Derecha) */}
        {currentResponse && (
          <div style={{
            flex: 1,
            backgroundColor: bubbleBgColor,
            padding: 'var(--spacing-xl)',
            borderRadius: '2rem',
            borderTopLeftRadius: '0',
            border: '3px solid var(--color-primary)',
            boxShadow: '0 20px 25px -5px rgba(37, 99, 235, 0.1), 0 8px 10px -6px rgba(37, 99, 235, 0.1)',
            position: 'relative',
            minHeight: '250px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            transition: 'background-color 0.4s ease' // Suaviza el cambio de color
          }}>
            {/* Triángulo CSS que apunta a la mascota */}
            <div style={{
              position: 'absolute', left: '-24px', top: '-3px', width: '0', height: '0',
              borderTop: '0 solid transparent', borderBottom: '45px solid transparent',
              borderRight: '24px solid var(--color-primary)'
            }}></div>
            <div style={{
              position: 'absolute', left: '-18px', top: '0px', width: '0', height: '0',
              borderTop: '0 solid transparent', borderBottom: '40px solid transparent',
              borderRight: `20px solid ${bubbleBgColor}`,
              transition: 'border-right-color 0.4s ease'
            }}></div>

            {/* Etiqueta / Título */}
            <h2 style={{ marginTop: 0, textTransform: "uppercase", color: "#1F2937", fontSize: "1.5rem", fontWeight: "900" }}>
              {currentResponse.etiqueta}
            </h2>

            {/* Texto de Explicación */}
            <p style={{
              fontSize: '1.25rem', lineHeight: '1.8', color: isLoading ? '#6B7280' : '#374151',
              whiteSpace: 'pre-wrap', margin: 0, fontStyle: isLoading ? 'italic' : 'normal'
            }}>
              {currentResponse.explicacion}
            </p>

            {/* Fuentes Oficiales */}
            {!isLoading && currentResponse.fuentes_citadas && currentResponse.fuentes_citadas.length > 0 && (
              <div style={{ marginTop: 'var(--spacing-lg)', paddingTop: 'var(--spacing-md)', borderTop: '1px solid rgba(0,0,0,0.1)' }}>
                <strong style={{ display: 'block', marginBottom: 'var(--spacing-sm)', color: '#1D4ED8', fontSize: '1rem' }}>Evidencia / Fuentes Oficiales:</strong>
                <div style={{ display: 'flex', gap: 'var(--spacing-sm)', flexWrap: 'wrap' }}>
                  {currentResponse.fuentes_citadas.map((src, idx) => (
                      <a
                        key={idx} href={src.url || "/plan.pdf"} target="_blank" rel="noreferrer" download={!src.url ? "Plan_de_Gobierno.pdf" : undefined}
                        style={{
                          fontSize: '0.875rem', padding: 'var(--spacing-sm) var(--spacing-md)',
                          backgroundColor: 'rgba(255,255,255,0.7)', border: '1px solid rgba(0,0,0,0.1)',
                          borderRadius: 'var(--radius-md)', textDecoration: 'none', color: '#1F2937',
                          fontWeight: '600', transition: 'background-color 0.2s', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fff'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.7)'}
                      >
                        <span style={{ color: src.url ? 'red' : 'gray' }}>{src.url ? '▶' : '📄'}</span> {src.nombre} - {src.detalle}
                      </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

      </div>

      {/* Input de usuario */}
      <div style={{ marginTop: 'var(--spacing-xl)' }}>
        <ChatBox onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>

    </div>
  );
}
