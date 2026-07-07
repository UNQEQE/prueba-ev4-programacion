import { useState } from 'react';
import './index.css';

import Navbar         from './components/Navbar';
import Auth           from './pages/Auth';
import Inicio         from './pages/Inicio';
import Nosotros       from './pages/Nosotros';
import Personas       from './pages/Personas';
import Productos      from './pages/Productos';
import Carrito        from './pages/Carrito';
import Venta          from './pages/Venta';
import Contacto       from './pages/Contacto';
import Requerimientos from './pages/Requerimientos';
import Terminos       from './pages/Terminos';
import FAQ            from './pages/FAQ';
import AdminProductos from './pages/AdminProductos';
import ManualUsuario  from './pages/ManualUsuario';

import { getCart, saveCart, getSession, clearSession, getIndicadores } from './utils/storage';

export default function App() {
  const [page,        setPage]        = useState('inicio');
  const [cart,        setCart]        = useState(getCart());
  const [session,     setSession]     = useState(getSession());
  const [indicadores, setIndicadores] = useState(getIndicadores());

  // ---- Sesión ----
  const handleLogin = (sess) => {
    setSession(sess);
    setPage('inicio');
  };

  const handleLogout = () => {
    clearSession();
    setSession(null);
    setCart([]);
    saveCart([]);
    setPage('login');
  };

  // ---- Carrito ----
  const addToCart = (nombre, precio) => {
    const updated = [...cart, { id: Date.now(), nombre, precio }];
    setCart(updated);
    saveCart(updated);
  };

  const renderPage = () => {
    if (!session && page === 'login') {
      return <Auth onLogin={handleLogin} />;
    }

    switch (page) {
      case 'inicio':         return <Inicio setPage={setPage} session={session} cartCount={cart.length} />;
      case 'nosotros':       return <Nosotros />;
      case 'personas':       return <Personas />;
      case 'productos':      return <Productos onAdd={addToCart} setPage={setPage} />;
      case 'carrito':        return <Carrito cart={cart} setCart={setCart} setPage={setPage} indicadores={indicadores} setIndicadores={setIndicadores} />;
      case 'venta':          return <Venta cart={cart} setCart={setCart} setPage={setPage} indicadores={indicadores} setIndicadores={setIndicadores} />;
      case 'contacto':       return <Contacto />;
      case 'requerimientos': return <Requerimientos />;
      case 'terminos':       return <Terminos />;
      case 'faq':            return <FAQ />;
      case 'admin-productos':return <AdminProductos />;
      case 'manual':         return <ManualUsuario />;
      case 'login':          return <Auth onLogin={handleLogin} />;
      default:               return <Inicio setPage={setPage} session={session} cartCount={cart.length} />;
    }
  };

  return (
    <>
      <Navbar
        page={page}
        setPage={setPage}
        cartCount={cart.length}
        session={session}
        onLogout={handleLogout}
      />
      <div style={{ paddingBottom: 60 }}>
        {renderPage()}
      </div>

      {/* CUADRO FLOTANTE DEL MANUAL DE USUARIO */}
      <button 
        onClick={() => setPage('manual')}
        style={{
          position: 'fixed',
          bottom: 20,
          left: 20,
          background: 'rgba(255, 122, 61, 0.9)', // Naranja (--ember)
          color: '#fff',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: 12,
          padding: '12px 18px',
          fontSize: '14px',
          fontWeight: 600,
          cursor: 'pointer',
          boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          backdropFilter: 'blur(10px)'
        }}
        title="Ver Manual de Usuario"
      >
        <span style={{ fontSize: '1.2rem' }}>📘</span> 
        <span>Manual de Usuario</span>
      </button>
    </>
  );
}
