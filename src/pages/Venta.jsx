import { useState, useEffect } from 'react';
import { saveCart } from '../utils/storage';
import { fetchIndicadores, convertirMontos } from '../utils/indicadores';
import { saveIndicadores } from '../utils/storage';

export default function Venta({ cart, setCart, setPage, indicadores, setIndicadores }) {
  const [nombre,   setNombre]   = useState('');
  const [pago,     setPago]     = useState('debito');
  const [terminos, setTerminos] = useState(false);
  const [msg,      setMsg]      = useState(null);
  const [loadInd,  setLoadInd]  = useState(false);

  const total = cart.reduce((s, i) => s + i.precio, 0);
  const conv  = total > 0 ? convertirMontos(total, indicadores) : null;

  // No se requiere useEffect para el carrito vacío, se maneja condicionalmente en el renderizado


  const submit = () => {
    setMsg(null);
    if (!nombre.trim())       { setMsg({ type: 'error', text: '❌ Ingresa tu nombre' }); return; }
    if (/\d/.test(nombre))    { setMsg({ type: 'error', text: '❌ El nombre no puede contener números' }); return; }
    if (!terminos)            { setMsg({ type: 'error', text: '❌ Acepta los términos y condiciones' }); return; }

    setMsg({ type: 'success', text: `🎉 ¡Gracias ${nombre}! Pedido confirmado por $${total.toLocaleString('es-CL')}. Nos contactaremos a la brevedad para coordinar en Punta Arenas.` });
    setCart([]);
    saveCart([]);
    setNombre('');
    setTerminos(false);
  };

  const cargarInd = async () => {
    setLoadInd(true);
    const data = await fetchIndicadores();
    if (data) { saveIndicadores(data); setIndicadores(data); }
    setLoadInd(false);
  };

  return (
    <div className="page">
      <div className="container" style={{ maxWidth: 560 }}>
        <div className="glass" style={{ padding: '36px 30px' }}>
          <h2 style={{ textAlign: 'center', marginBottom: 28, fontSize: '1.8rem' }}>Finalizar Compra</h2>

          {/* Resumen de precio */}
          <div style={{ background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.2)', borderRadius: 12, padding: '14px 18px', marginBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '1.05rem', borderBottom: cart.length > 0 ? '1px solid rgba(255,255,255,.15)' : 'none', paddingBottom: cart.length > 0 ? 10 : 0, marginBottom: cart.length > 0 ? 10 : 0 }}>
              <span>Total del Pedido:</span>
              <span>${total.toLocaleString('es-CL')}</span>
            </div>

            {/* Lista de productos con opción de eliminar */}
            {cart.length > 0 && (
              <div style={{ marginBottom: 12 }}>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {cart.map((item, idx) => (
                    <li key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13, marginBottom: 8, background: 'rgba(255,255,255,.03)', padding: '6px 10px', borderRadius: 8 }}>
                      <span>{item.nombre} <span style={{ opacity: .6 }}>(${item.precio.toLocaleString('es-CL')})</span></span>
                      <button
                        onClick={() => {
                          const updated = cart.filter((_, i) => i !== idx);
                          setCart(updated);
                          saveCart(updated);
                        }}
                        title="Eliminar producto"
                        style={{ background: 'transparent', border: 'none', color: '#ff7777', cursor: 'pointer', padding: '2px 6px', fontSize: 14, fontWeight: 'bold' }}
                      >
                        ✕
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <small style={{ display: 'block', opacity: .6, fontStyle: 'italic', fontSize: 13, marginBottom: 8 }}>* Basado en tu selección.</small>

            {/* Conversiones */}
            {conv ? (
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 12 }}>
                {conv.uf   && <MiniConv label="UF"   value={conv.uf}   />}
                {conv.utm  && <MiniConv label="UTM"  value={conv.utm}  />}
                {conv.euro && <MiniConv label="€"    value={conv.euro} />}
              </div>
            ) : (
              total > 0 && (
                <button
                  className="btn-outline"
                  onClick={cargarInd}
                  disabled={loadInd}
                  style={{ marginTop: 12, fontSize: 13, padding: '6px 14px' }}
                >
                  {loadInd ? '⏳ Consultando...' : '💱 Ver en UF / UTM / Euro'}
                </button>
              )
            )}
          </div>

          {/* Formulario */}
          <div className="form-group">
            <label>Nombre Completo</label>
            <input value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Ej: Elian Cardenas" />
          </div>

          <div className="form-group">
            <label>Método de Pago</label>
            <div style={{ display: 'flex', gap: 20, marginTop: 6 }}>
              {['debito', 'efectivo'].map(v => (
                <label key={v} style={{ display: 'flex', alignItems: 'center', gap: 6, margin: 0 }}>
                  <input type="radio" name="pago" value={v} checked={pago === v}
                    onChange={() => setPago(v)} style={{ width: 'auto' }} />
                  {v.charAt(0).toUpperCase() + v.slice(1)}
                </label>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
            <input type="checkbox" id="term-venta" checked={terminos}
              onChange={e => setTerminos(e.target.checked)} style={{ width: 'auto' }} />
            <label htmlFor="term-venta" style={{ margin: 0 }}>Acepto los términos y condiciones</label>
          </div>

          <button
            className="btn-green"
            style={{ width: '100%', fontSize: 16, padding: 14 }}
            onClick={submit}
            disabled={cart.length === 0}
          >
            Realizar Pedido
          </button>

          {msg && (
            <div className={msg.type === 'error' ? 'alert-error' : 'alert-success'} style={{ marginTop: 16 }}>
              {msg.text}
            </div>
          )}

          {cart.length === 0 && (!msg || msg.type !== 'success') && (
            <div className="alert-info" style={{ marginTop: 16 }}>
              Tu carrito está vacío.
              <button className="btn-outline" style={{ marginLeft: 10, padding: '4px 12px', fontSize: 13 }} onClick={() => setPage('productos')}>
                Ver Productos
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function MiniConv({ label, value }) {
  return (
    <div style={{ background: 'rgba(255, 122, 61, 0.12)', border: '1px solid rgba(255, 122, 61, 0.3)', borderRadius: 8, padding: '4px 10px', fontSize: 13 }}>
      <span style={{ opacity: .7 }}>{label}: </span>
      <strong style={{ color: 'var(--ember)' }}>{value}</strong>
    </div>
  );
}
