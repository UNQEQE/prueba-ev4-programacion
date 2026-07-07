export default function ManualUsuario() {
  return (
    <div className="page">
      <div className="container" style={{ maxWidth: 800 }}>
        <h2 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: 28 }}>📘 Manual de Usuario</h2>
        <div className="glass" style={{ padding: 32, lineHeight: 1.8, fontSize: 15 }}>
          <h3>1. Introducción</h3>
          <p>
            Bienvenido al manual de usuario de <strong>JessiEventos</strong>. Aquí encontrarás instrucciones sobre cómo utilizar las distintas funcionalidades de nuestra plataforma web.
          </p>

          <h3 style={{ marginTop: 24 }}>2. Navegación Principal</h3>
          <p>
            En la barra superior encontrarás los enlaces principales:
          </p>
          <ul>
            <li><strong>Inicio:</strong> Información general sobre nosotros.</li>
            <li><strong>Productos:</strong> Catálogo público donde puedes ver y agregar servicios al carrito.</li>
            <li><strong>Gestión Prod:</strong> Interfaz de administración (CRUD) para que puedas crear, editar y eliminar productos de la base de datos dinámica.</li>
            <li><strong>Personas:</strong> Gestión de usuarios y clientes del sistema.</li>
            <li><strong>Carrito:</strong> Visualiza los servicios que has agregado y procede con la solicitud o pago.</li>
          </ul>

          <h3 style={{ marginTop: 24 }}>3. Cotizaciones y Monedas</h3>
          <p>
            En la sección de <strong>Productos</strong> y en el <strong>Carrito</strong>, tienes la opción de visualizar los precios en distintas divisas (Pesos Chilenos, UF, UTM y Euro). 
            Estas conversiones se realizan de forma automática utilizando indicadores en tiempo real que se almacenan de manera eficiente para su uso.
          </p>

          <h3 style={{ marginTop: 24 }}>4. Gestión de Datos (Base de Datos)</h3>
          <p>
            El sistema se sincroniza con una base de datos dinámica que te permite crear nuevos registros, modificarlos y eliminarlos en tiempo real. 
            Tanto en la sección de "Personas" como en la de "Gestión Prod." puedes administrar el negocio completamente. Si ocurre un fallo de conexión, el sistema recurrirá a un almacenamiento de respaldo local.
          </p>

          <h3 style={{ marginTop: 24 }}>5. Resolviendo dudas (FAQ)</h3>
          <p>
            Contamos con una sección interactiva de preguntas frecuentes (FAQ) donde podrás encontrar respuestas rápidas haciendo clic en las preguntas que se despliegan mediante animaciones suaves.
          </p>
        </div>
      </div>
    </div>
  );
}
