import { useState, useEffect } from 'react';
import { hashRut } from '../utils/rut';
import hero1 from '../assets/evento1.jpg';
import hero2 from '../assets/evento2.jpg';
import hero3 from '../assets/evento3.jpg';
import c1 from '../assets/circulo1.jpg';
import c2 from '../assets/circulo2.jpg';
import c3 from '../assets/circulo3.jpg';
const slides=[
{image:hero1,title:'Matrimonios Inolvidables.',sub:'Organizamos el mejor día de tu vida en Punta Arenas.'},
{image:hero2,title:'Eventos Corporativos.',sub:'Profesionalismo y elegancia para tu empresa.'},
{image:hero3,title:'Fiestas de XV Años.',sub:'Momentos únicos con fotocabinas y más.'},
];

const circles = [
  {
    image: c1,
    title: 'Matrimonios',
    desc: 'Organización completa para el día más especial.',
    details: 'Planificación integral de matrimonios en Punta Arenas. Nos hacemos cargo de cada detalle para crear un día inolvidable: desde la decoración fina y la distribución del salón, hasta la coordinación del protocolo en el evento.',
    quoteItems: [
      'Arriendo del salón con montaje y mantelería de gala.',
      'Decoración temática, arreglos florales y arcos decorativos.',
      'Iluminación perimetral decorativa y robótica de fiesta.',
      'Servicio de Wedding Planner / Coordinación del evento.',
      'Cabina fotográfica interactiva o plataforma 360° para recuerdos.'
    ]
  },
  {
    image: c2,
    title: 'Empresas',
    desc: 'Eventos corporativos con la mejor elegancia.',
    details: 'Cenas de fin de año, aniversarios corporativos, seminarios y lanzamientos de marcas. Entregamos el estándar de elegancia, puntualidad y soporte técnico que requiere tu empresa en la Región de Magallanes.',
    quoteItems: [
      'Amplificación de sonido profesional para discursos y música.',
      'Pantallas LED gigantes de alta definición y proyección.',
      'Decoración corporativa sobria adaptada a la marca.',
      'Banquetería fina, cocteles de bienvenida y servicio de garzones.',
      'Fotocabina con personalización del logotipo de la empresa.'
    ]
  },
  {
    image: c3,
    title: 'Licenciaturas',
    desc: 'Celebraciones con todo incluido.',
    details: 'Fiestas de graduación escolar y universitaria. Diseñamos un ambiente juvenil y lleno de energía con un fuerte énfasis en la seguridad, diversión de los egresados y tranquilidad de los apoderados.',
    quoteItems: [
      'DJ profesional con mezclas en vivo e iluminación de pista de baile.',
      'Pista de baile LED e iluminación ambiental interactiva.',
      'Decoración del salón, fondos para fotografías y cotillón temático.',
      'Fotocabina Espejo Mágico con tomas e impresiones ilimitadas.',
      'Banquetería completa con menús especiales para jóvenes y adultos.'
    ]
  },
];

const faqs = [
  {
    q: '¿Con cuánta anticipación debo reservar mi evento?',
    a: 'Recomendamos reservar con al menos 3 a 6 meses de anticipación, especialmente durante la temporada alta (noviembre a marzo) para garantizar la disponibilidad de fechas, equipos y personal técnico en Magallanes.'
  },
  {
    q: '¿Realizan eventos fuera de Punta Arenas?',
    a: 'Sí, realizamos coberturas para eventos en toda la Región de Magallanes (Puerto Natales, Porvenir, etc.), sujeto a factibilidad técnica y costos adicionales por traslado logístico de personal y equipos.'
  },
  {
    q: '¿Cómo funciona el proceso de cotización y reserva?',
    a: 'Tras recibir tu solicitud mediante nuestra sección de Contacto o Carrito, definimos los requerimientos. Emitimos una cotización formal detallada. Para reservar y congelar la fecha se solicita un abono del 30%, liquidándose el resto antes del inicio del evento.'
  },
  {
    q: '¿Qué incluye el arriendo de fotocabinas?',
    a: 'Nuestros arriendos de fotocabinas (Espejo Mágico, Domo y Cabina 360°) incluyen capturas e impresiones fotográficas ilimitadas, cotillón festivo premium, personal calificado a cargo para asistir a los invitados y la entrega digital de todo el registro fotográfico.'
  }
];

export default function Inicio({ setPage, session, cartCount }) {
  const [current, setCurrent] = useState(0);
  const [selectedService, setSelectedService] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const t = setInterval(() => setCurrent(p => (p + 1) % slides.length), 4500);
    return () => clearInterval(t);
  }, []);

  const slide = slides[current];

  return (
    <div>
      <div style={{
        width: '100%', padding: '18px 20px', background: 'linear-gradient(90deg, var(--ember), var(--gold))',
        color: 'var(--ink)', textAlign: 'center', fontSize: 16, fontWeight: 700,
        boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
      }}>
        Hacemos la noche de tus sueños, una realidad en la Patagonia
      </div>

      {/* Hero / Carrusel simulado */}
      <div style={{
        minHeight: 380, background: 'linear-gradient(135deg, rgba(14, 19, 32, 0.95), rgba(28, 39, 64, 0.85))',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexDirection: 'column', textAlign: 'center', padding: '60px 24px',
        borderBottom: '1px solid rgba(232, 185, 79, 0.15)', position: 'relative', overflow: 'hidden',
      }}>
        <img src={slide.image} alt={slide.title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.22, zIndex: 0 }} />
        <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 960 }}>
          <h1 style={{ fontSize: 'clamp(1.8rem,5vw,3rem)', marginBottom: 12, transition: 'all .4s' }}>
            {slide.title}
          </h1>
          <p style={{ opacity: .85, fontSize: 17, marginBottom: 18 }}>{slide.sub}</p>
          {session && (
            <p style={{ opacity: .7, fontSize: 14, marginBottom: 24 }}>
              Bienvenido/a, <strong style={{ color: 'var(--gold)' }}>
                {session.nombre && session.apellido ? `${session.nombre} ${session.apellido}` : 'Usuario'}
              </strong>
            </p>
          )}
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn-green" onClick={() => setPage('productos')}>Ver Productos</button>
          <button className="btn-outline" onClick={() => setPage('carrito')}>
            🛒 Carrito ({cartCount})
          </button>
        </div>
        </div>
        {/* Indicadores de slide */}
        <div style={{ display: 'flex', gap: 8, position: 'absolute', bottom: 20 }}>
          {slides.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)} style={{
              width: i === current ? 24 : 8, height: 8, borderRadius: 4,
              background: i === current ? 'var(--ember)' : 'rgba(255,255,255,0.4)',
              border: 'none', cursor: 'pointer', transition: 'all .3s',
            }} />
          ))}
        </div>
      </div>

      {/* Divisor de Firma Patagónica */}
      <div className="horizon-divider" />

      {/* Sección de servicios */}
      <div className="container" style={{ padding: '40px 20px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: 40, fontSize: '1.8rem' }}>Nuestros Servicios</h2>
        <div className="grid-3" style={{ gap: 36, textAlign: 'center' }}>
          {circles.map(c => (
            <div key={c.title}>
              <div style={{
                width: 120, height: 120, borderRadius: '50%',
                overflow: 'hidden', margin: '0 auto 16px',
                border: '2px solid rgba(232, 185, 79, 0.5)',
              }}>
                <img src={c.image} alt={c.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <h3 style={{ marginBottom: 10 }}>{c.title}</h3>
              <p style={{ opacity: .8, fontSize: 15, marginBottom: 14 }}>{c.desc}</p>
              <button className="btn-outline" onClick={() => setSelectedService(c)}>Ver detalles »</button>
            </div>
          ))}
        </div>
      </div>

      {/* Divisor de Firma Patagónica */}
      <div className="horizon-divider" />

      {/* Preguntas Frecuentes (Acordeón) */}
      <div className="container" style={{ padding: '20px 20px 60px', maxWidth: 800 }}>
        <h2 style={{ textAlign: 'center', marginBottom: 30, fontSize: '1.8rem' }}>Preguntas Frecuentes</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div 
                key={index} 
                className="glass" 
                style={{ 
                  borderRadius: 12, 
                  overflow: 'hidden', 
                  border: isOpen ? '1px solid var(--gold)' : '1px solid rgba(232, 185, 79, 0.2)',
                  transition: 'border-color 0.3s ease'
                }}
              >
                <div 
                  onClick={() => setOpenFaq(isOpen ? null : index)}
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
                    {faq.q}
                  </h4>
                  <span style={{ 
                    color: 'var(--gold)', 
                    fontSize: 14, 
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease',
                    display: 'inline-block'
                  }}>
                    ▼
                  </span>
                </div>
                {isOpen && (
                  <div 
                    style={{ 
                      padding: '20px 24px', 
                      fontSize: '14.5px', 
                      lineHeight: 1.6, 
                      color: '#e4e6eb',
                      background: 'rgba(14, 19, 32, 0.2)',
                      borderTop: '1px solid rgba(232, 185, 79, 0.1)',
                      animation: 'fadeIn 0.2s ease-out'
                    }}
                  >
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal Emergente de Detalles */}
      {selectedService && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(14, 19, 32, 0.85)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: 24,
          }}
          onClick={() => setSelectedService(null)}
        >
          <div 
            className="glass" 
            style={{
              maxWidth: 550,
              width: '100%',
              backgroundColor: 'var(--midnight)',
              border: '1px solid var(--gold)',
              borderRadius: 16,
              padding: '32px',
              position: 'relative',
              boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
              animation: 'fadeIn 0.25s ease-out',
              textAlign: 'left'
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Cerrar */}
            <button 
              onClick={() => setSelectedService(null)}
              style={{
                position: 'absolute',
                top: 20,
                right: 20,
                background: 'none',
                border: 'none',
                color: '#fff',
                fontSize: 20,
                cursor: 'pointer',
                opacity: 0.6,
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => e.target.style.opacity = 1}
              onMouseLeave={e => e.target.style.opacity = 0.6}
            >
              ✕
            </button>

            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
              <div style={{
                width: 72, height: 72, borderRadius: '50%',
                overflow: 'hidden', border: '2.5px solid var(--gold)',
                flexShrink: 0
              }}>
                <img src={selectedService.image} alt={selectedService.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.6rem', color: 'var(--gold)', margin: 0, lineHeight: 1.2 }}>
                  {selectedService.title}
                </h3>
                <p style={{ opacity: 0.7, fontSize: 13, margin: '4px 0 0 0' }}>Servicio de Eventos en Magallanes</p>
              </div>
            </div>

            {/* Detalles */}
            <div style={{ marginBottom: 28 }}>
              <h4 style={{ fontSize: '1.1rem', color: 'var(--ember)', marginBottom: 8, fontWeight: 600 }}>
                Descripción del Servicio
              </h4>
              <p style={{ opacity: 0.95, fontSize: 14.5, lineHeight: 1.6, marginBottom: 20, color: '#f5f6f8' }}>
                {selectedService.details}
              </p>

              <h4 style={{ fontSize: '1.1rem', color: 'var(--ember)', marginBottom: 12, fontWeight: 600 }}>
                ¿Qué incluye y cotiza?
              </h4>
              <ul style={{ padding: 0, margin: 0, listStyle: 'none' }}>
                {selectedService.quoteItems.map((item, idx) => (
                  <li key={idx} style={{
                    fontSize: 14,
                    lineHeight: 1.5,
                    marginBottom: 8,
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 10,
                    color: '#e4e6eb'
                  }}>
                    <span style={{ color: 'var(--gold)', fontWeight: 'bold', fontSize: 16 }}>✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Acciones */}
            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
              <button 
                className="btn-outline" 
                onClick={() => setSelectedService(null)}
                style={{ padding: '10px 20px' }}
              >
                Cerrar
              </button>
              <button 
                className="btn-green" 
                onClick={() => {
                  setSelectedService(null);
                  setPage('contacto');
                }}
                style={{ padding: '10px 24px' }}
              >
                Cotizar este Servicio
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
