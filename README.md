# Cero Cuentos - Prototipo CóndorBot

## Descripción del Proyecto
**Cero Cuentos** es una plataforma ciudadana interactiva desarrollada en el marco de la Hackathon. Su objetivo principal es proporcionar herramientas tecnológicas de IA para el contraste y verificación de información política durante las elecciones. 

El proyecto permite a los ciudadanos consultar los perfiles de los candidatos a las principales alcaldías de Ecuador (Quito, Guayaquil, Cuenca) y a nivel Nacional (Presidencia). A través del asistente inteligente ("CóndorBot"), los usuarios pueden validar rumores, investigar propuestas de campaña y contrastar información basada únicamente en fuentes y planes de gobierno oficiales.

---

## Elementos de la Interfaz y Estructura

La interfaz (Frontend) está construida con **React** y **Vite**, y destaca por tener un diseño moderno, oscuro y estilo *Premium* o *Cinemático*. Está dividida en las siguientes piezas clave:

### 1. Página de Inicio y Candidatos (`CandidatesPage.jsx`)
Es el punto de entrada a la plataforma. 
- **Banner Dinámico (Hero Section):** Ocupa todo el ancho de la pantalla y cambia automáticamente el fondo oscuro dependiendo de la ciudad escogida.
- **Selector de Región Premium:** Un menú desplegable personalizado y animado que permite elegir la región a explorar.
- **Botón "Hablemos de Política":** Un botón de acción principal (CTA) con efecto de elevación e iluminación que redirige al usuario a la experiencia del asistente de IA.
- **Carrusel 3D de Candidatos:** Utiliza la librería `Swiper.js` para mostrar las tarjetas de los candidatos (nombres, partidos, propuestas clave) de forma inmersiva. Los datos de los candidatos se obtienen dinámicamente conectándose a un backend local en Python (`http://localhost:8000/api/candidatos`).

### 2. Asistente IA / CóndorBot (`ChatPage.jsx`)
La pantalla dedicada a la verificación de datos.
- **Mascota Interactiva:** Presenta al personaje de CóndorBot.
- **Burbuja de Diálogo Semántica:** La respuesta de la inteligencia artificial aparece en una burbuja de chat grande cuyo color cambia en tiempo real para indicar el veredicto:
  - 🟢 **Verde** (Sustentado / Verdadero)
  - 🔴 **Rojo** (Falso / Engañoso)
  - 🟡 **Amarillo** (Impreciso)
  - ⚪ **Blanco/Gris** (Investigando / Neutral)
- **Fuentes Oficiales:** Genera insignias con enlaces clicables a los PDFs o entrevistas de donde se extrajo la información, dando total transparencia al proceso de la IA.

### 3. Caja de Chat (`ChatBox.jsx`)
El componente donde el usuario escribe su consulta, ubicado dentro de la página del chat.
- **Entrada de texto:** Diseñado de forma limpia para que el ciudadano pregunte de forma natural (Ej. *"¿Qué propone el candidato X sobre seguridad?"*).
- **Selector de Motor IA:** Un menú desplegable con diseño Premium idéntico al selector de regiones, que le permite al usuario alternar internamente entre distintos modelos de lenguaje de IA (ej. *Groq Llama 3* o *Gemini 1.5*).

### 4. Layout Base (`Layout.jsx`)
Actúa como la "plantilla" o envoltorio de todas las páginas de la aplicación.
- **Barra de Navegación Flotante:** Contiene el logotipo "CERO CUENTOS" y un indicador sutil en el centro que le recuerda constantemente al usuario sobre qué ciudad o nivel de gobierno está consultando. Mantiene el estado global de la región elegida a través de `useOutletContext`.

---

## Requisitos y Cómo Ejecutar

Para que este frontend funcione a su máxima capacidad, debe estar acompañado de la API Backend en Python ejecutándose en el puerto `8000`.

**Comandos para arrancar el entorno de desarrollo (Frontend):**

1. Instalar dependencias necesarias:
   ```bash
   npm install
   ```

2. Arrancar el servidor Vite:
   ```bash
   npm run dev
   ```
El proyecto estará disponible localmente, generalmente en `http://localhost:5173`.
