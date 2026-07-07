import { useState } from 'react';

const textContent = {
  intro: "Bienvenido a JessiEventos. Al usar este sitio web aceptas los siguientes términos y condiciones, que regulan el uso de nuestra plataforma y los servicios que ofrecemos.",
  sections: [
    {
      title: "Uso del sitio",
      content: "El sitio está destinado a la presentación de servicios de organización de eventos y el arrendamiento de productos relacionados. Toda la información ofrecida es de carácter informativo y puede variar sin previo aviso."
    },
    {
      title: "Registro y datos",
      content: "Los usuarios deben registrarse con datos veraces y mantener su información actualizada. Los datos almacenados se guardan en localStorage para permitir el ingreso y la sesión dentro del navegador."
    },
    {
      title: "Precios y moneda",
      content: "Los precios mostrados en el catálogo son referenciales. Se puede cambiar la visualización entre Pesos Chilenos, UF, UTM y Euro. Las conversiones se calculan con indicadores públicos y pueden no corresponder al tipo de cambio exacto aplicado por bancos o instituciones financieras."
    },
    {
      title: "Responsabilidad",
      content: "JessiEventos no se hace responsable de errores en la información, la disponibilidad de productos o cambios de última hora en precios. El uso del sitio implica la aceptación de esta limitación de responsabilidad."
    },
    {
      title: "Derechos de autor",
      content: "El contenido del sitio, incluyendo textos, imágenes y diseños, es propiedad de JessiEventos o de sus colaboradores. Queda prohibida la reproducción total o parcial sin autorización."
    },
    {
      title: "Contacto",
      content: "Para dudas sobre estos términos puedes usar la sección de contacto del sitio."
    }
  ]
};

const buildHtml = (framework) => {
  let head = '';
  let bodyClass = '';
  let containerClass = '';
  let cardClass = '';
  let titleClass = '';
  let subtitleClass = '';
  let introClass = '';

  if (framework === 'bootstrap') {
    head = '<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">';
    bodyClass = 'bg-light py-5';
    containerClass = 'container';
    cardClass = 'card shadow-sm p-4 border-0 rounded-4';
    titleClass = 'text-primary mb-4 text-center';
    subtitleClass = 'text-secondary mt-4 mb-2 fs-5';
    introClass = 'lead';
  } else if (framework === 'materialize') {
    head = '<link href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css" rel="stylesheet">';
    bodyClass = 'grey lighten-4';
    containerClass = 'container';
    cardClass = 'card-panel hoverable z-depth-3';
    titleClass = 'teal-text text-darken-2 center-align';
    subtitleClass = 'teal-text text-lighten-1';
    introClass = 'flow-text';
  } else if (framework === 'bulma') {
    head = '<link href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css" rel="stylesheet">';
    bodyClass = 'has-background-light py-6';
    containerClass = 'container is-max-desktop';
    cardClass = 'box p-6';
    titleClass = 'title is-2 has-text-centered has-text-link';
    subtitleClass = 'title is-4 has-text-info mt-6 mb-3';
    introClass = 'subtitle is-5';
  }

  const sectionsHtml = textContent.sections.map(sec => `
    <h3 class="${subtitleClass}" style="margin-top: 24px;">${sec.title}</h3>
    <p style="line-height: 1.6;">${sec.content}</p>
  `).join('');

  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      ${head}
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; margin: 0; padding: 20px 0; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.2); border-radius: 4px; }
      </style>
    </head>
    <body class="${bodyClass}">
      <div class="${containerClass}">
        <div class="${cardClass}">
          <h2 class="${titleClass}">Términos y Condiciones</h2>
          <p class="${introClass}">${textContent.intro}</p>
          ${sectionsHtml}
          <p style="margin-top: 40px; opacity: 0.6; font-size: 0.85rem;">Última actualización: junio 2026.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

export default function Terminos() {
  const [style, setStyle] = useState('original');

  return (
    <div className="page" style={{ display: 'flex', flexDirection: 'column', height: '100vh', padding: '0 20px 40px' }}>
      
      {/* HEADER Y PESTAÑAS */}
      <div style={{ maxWidth: 900, margin: '0 auto', width: '100%', paddingTop: 20 }}>
        <h2 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: 20 }}>Términos y Condiciones</h2>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 20 }}>
          <button 
            onClick={() => setStyle('original')}
            className={style === 'original' ? 'btn-green' : 'btn-outline'}
          >
            Estilo Original
          </button>
          <button 
            onClick={() => setStyle('bootstrap')}
            className={style === 'bootstrap' ? 'btn-green' : 'btn-outline'}
          >
            Bootstrap
          </button>
          <button 
            onClick={() => setStyle('materialize')}
            className={style === 'materialize' ? 'btn-green' : 'btn-outline'}
          >
            Materialize
          </button>
          <button 
            onClick={() => setStyle('bulma')}
            className={style === 'bulma' ? 'btn-green' : 'btn-outline'}
          >
            Bulma
          </button>
        </div>
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <div style={{ flexGrow: 1, maxWidth: 900, margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column' }}>
        
        {style === 'original' ? (
          /* VISTA ORIGINAL (JSX puro con estilos globales de la app) */
          <div className="glass" style={{ padding: 32, lineHeight: 1.8, fontSize: 15, overflowY: 'auto', flexGrow: 1 }}>
            <p>{textContent.intro}</p>
            {textContent.sections.map((sec, idx) => (
              <div key={idx}>
                <h3 style={{ marginTop: 24 }}>{sec.title}</h3>
                <p>{sec.content}</p>
              </div>
            ))}
            <p style={{ marginTop: 24, opacity: .9, fontSize: 13 }}>Última actualización: junio 2026.</p>
          </div>
        ) : (
          /* VISTA CON IFRAME Y FRAMEWORKS CSS */
          <div className="glass" style={{ flexGrow: 1, padding: 0, overflow: 'hidden', borderRadius: 20, border: '1px solid rgba(255,255,255,0.2)' }}>
            <iframe 
              srcDoc={buildHtml(style)} 
              style={{ width: '100%', height: '100%', border: 'none', background: '#fff', borderRadius: 20 }}
              title={`Terminos - ${style}`}
            />
          </div>
        )}
        
      </div>
    </div>
  );
}
