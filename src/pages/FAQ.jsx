import Collapsible from '../components/Collapsible';

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
  },
  {
    q: '¿Cuáles son los medios de pago aceptados?',
    a: 'Aceptamos transferencias bancarias, depósitos y pagos con tarjeta de crédito/débito (sujeto a las condiciones de la plataforma de pago integrada).'
  },
  {
    q: '¿Se puede modificar la cantidad de invitados o servicios después de reservar?',
    a: 'Sí, puedes realizar modificaciones en los servicios y cantidades contratadas hasta 15 días antes del evento, sujeto a disponibilidad técnica. Los cambios podrían ajustar el presupuesto total de la cotización.'
  },
  {
    q: '¿Qué sucede en caso de mal tiempo o fuerza mayor en la Patagonia?',
    a: 'Entendemos que las condiciones climáticas de la Región de Magallanes pueden ser extremas. En caso de fuerza mayor comprobada, trabajaremos contigo para reprogramar el evento para una fecha disponible sin penalizaciones adicionales, siempre que se avise con el tiempo prudente estipulado en el contrato.'
  }
];

export default function FAQ() {
  return (
    <div className="page">
      <div className="container" style={{ maxWidth: 800 }}>
        <h2 style={{ textAlign: 'center', marginBottom: 12, fontSize: '2rem' }}>Preguntas Frecuentes</h2>
        <p style={{ textAlign: 'center', opacity: 0.7, marginBottom: 40, fontSize: '15px' }}>
          Encuentra respuestas rápidas a las dudas más comunes sobre la organización de eventos y arriendos con Jessi Eventos.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {faqs.map((faq, index) => (
            <Collapsible key={index} title={faq.q}>
              {faq.a}
            </Collapsible>
          ))}
        </div>
      </div>
    </div>
  );
}
