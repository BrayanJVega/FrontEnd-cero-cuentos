import { useState } from 'react';
import { Send } from 'lucide-react';

export default function ChatBox({ onSendMessage }) {
  const [inputValue, setInputValue] = useState('');
  const [selectedModel, setSelectedModel] = useState('groq');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const modelLabels = {
    groq: 'Groq (Llama 3)',
    gemini: 'Gemini 1.5'
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSendMessage(inputValue, selectedModel);
      setInputValue('');
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      style={{ 
        display: 'flex', 
        gap: 'var(--spacing-sm)', 
        backgroundColor: 'var(--color-bg-surface)', 
        padding: 'var(--spacing-sm)', 
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--color-border)'
      }}
    >
      <input 
        type="text" 
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Ej: ¿Qué propone el candidato X sobre el Metro?" 
        style={{ 
          flex: 1, 
          padding: 'var(--spacing-sm)', 
          border: 'none', 
          backgroundColor: 'transparent', 
          color: 'var(--color-text-main)',
          outline: 'none',
          fontSize: '1rem'
        }}
      />
      
      {/* Premium Custom Model Selector */}
      <div style={{ position: 'relative' }}>
        <div 
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          style={{
            padding: '0 var(--spacing-md)',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'rgba(30, 41, 59, 0.5)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#FFD100',
            fontSize: '0.875rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(30, 41, 59, 0.8)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(30, 41, 59, 0.5)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
          }}
        >
          {modelLabels[selectedModel]}
          
          <div style={{ 
            pointerEvents: 'none', 
            display: 'flex', 
            alignItems: 'center',
            transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)', 
            transition: 'transform 0.2s ease' 
          }}>
            <svg width="10" height="6" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1.5L6 6.5L11 1.5" stroke="#FFD100" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* Custom Dropdown Menu */}
        {isDropdownOpen && (
          <div style={{
            position: 'absolute',
            bottom: 'calc(100% + 0.5rem)', /* Opens upwards because it's at the bottom */
            right: 0,
            width: 'max-content',
            minWidth: '150px',
            backgroundColor: '#0F172A',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '0.75rem',
            boxShadow: '0 -10px 25px -5px rgba(0, 0, 0, 0.5)',
            overflow: 'hidden',
            zIndex: 20,
            display: 'flex',
            flexDirection: 'column'
          }}>
            {Object.entries(modelLabels).map(([key, label]) => (
              <div
                key={key}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedModel(key);
                  setIsDropdownOpen(false);
                }}
                style={{
                  padding: '0.75rem 1rem',
                  cursor: 'pointer',
                  backgroundColor: selectedModel === key ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
                  color: selectedModel === key ? '#60A5FA' : '#F8FAFC',
                  fontSize: '0.875rem',
                  fontWeight: selectedModel === key ? '600' : '400',
                  transition: 'background-color 0.2s ease',
                  borderBottom: key === 'groq' ? '1px solid rgba(255,255,255,0.05)' : 'none'
                }}
                onMouseEnter={(e) => {
                  if (selectedModel !== key) e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
                }}
                onMouseLeave={(e) => {
                  if (selectedModel !== key) e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                {label}
              </div>
            ))}
          </div>
        )}
      </div>

      <button 
        type="submit"
        disabled={!inputValue.trim()}
        style={{ 
          padding: 'var(--spacing-sm) var(--spacing-lg)', 
          borderRadius: 'var(--radius-md)', 
          backgroundColor: inputValue.trim() ? 'var(--color-primary)' : 'var(--color-border)', 
          border: 'none', 
          color: 'white', 
          cursor: inputValue.trim() ? 'pointer' : 'not-allowed',
          fontWeight: '500',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--spacing-xs)'
        }}
      >
        <span>Analizar</span>
        <Send size={16} />
      </button>
    </form>
  );
}
