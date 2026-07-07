import { useState, useEffect } from 'react';

const emptyForm = { emoji: '🎁', tag: '', tagColor: '#e8b94f', name: '', desc: '', price: '' };

export default function AdminProductos() {
  const [productos, setProductos] = useState([]);
  const [form, setForm]           = useState(emptyForm);
  const [editId, setEditId]       = useState(null);
  const [msg, setMsg]             = useState(null);
  const [errors, setErrors]       = useState({});

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      const res = await fetch('http://localhost:3000/productos');
      if (res.ok) {
        const data = await res.json();
        setProductos(data);
      } else {
        console.error('Error al cargar productos');
      }
    } catch (e) {
      console.error('Error de red al cargar productos:', e);
    }
  };

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const validateForm = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'El nombre es obligatorio';
    if (!form.desc.trim()) newErrors.desc = 'La descripción es obligatoria';
    if (!form.price || isNaN(form.price) || Number(form.price) <= 0) newErrors.price = 'El precio debe ser un número mayor a 0';
    if (!form.emoji.trim()) newErrors.emoji = 'El emoji es obligatorio';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const guardar = async () => {
    setMsg(null);
    if (!validateForm()) return;

    const producto = { 
      ...form, 
      price: Number(form.price) 
    };

    try {
      if (editId !== null) {
        // ACTUALIZAR (PUT)
        const res = await fetch(`http://localhost:3000/productos/${editId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(producto)
        });
        if (res.ok) {
          setMsg({ type: 'success', text: '✅ Producto actualizado correctamente' });
          await cargarProductos();
          setForm(emptyForm);
          setEditId(null);
        } else {
          throw new Error('Error al actualizar');
        }
      } else {
        // AGREGAR (POST)
        const res = await fetch('http://localhost:3000/productos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(producto)
        });
        if (res.ok) {
          setMsg({ type: 'success', text: '✅ Producto agregado correctamente' });
          await cargarProductos();
          setForm(emptyForm);
        } else {
          throw new Error('Error al agregar');
        }
      }
    } catch (e) {
      console.error('Error en guardar:', e);
      setMsg({ type: 'error', text: '❌ Error de comunicación con la base de datos.' });
    }
  };

  const editar = (producto) => {
    setForm(producto);
    setEditId(producto.id);
    setMsg(null);
    window.scrollTo(0, 0);
  };

  const eliminar = async (producto) => {
    if (!window.confirm(`¿Seguro que deseas eliminar el producto "${producto.name}"?`)) return;

    try {
      const res = await fetch(`http://localhost:3000/productos/${producto.id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setMsg({ type: 'success', text: '✅ Producto eliminado' });
        await cargarProductos();
        if (editId === producto.id) {
          setForm(emptyForm);
          setEditId(null);
        }
      } else {
        throw new Error('Error al eliminar');
      }
    } catch (e) {
      console.error('Error al eliminar:', e);
      setMsg({ type: 'error', text: '❌ Error al intentar eliminar de la base de datos.' });
    }
  };

  const cancelar = () => { 
    setForm(emptyForm); 
    setEditId(null); 
    setMsg(null); 
    setErrors({});
  };

  return (
    <div className="page">
      <div className="container">
        <h2 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: 32 }}>🛍️ Gestión de Productos</h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 24 }} className="grid-personas">
          
          {/* FORMULARIO */}
          <div className="glass" style={{ padding: 28 }}>
            <h3 style={{ marginBottom: 20, fontSize: '1.1rem' }}>
              {editId !== null ? '✏️ Editar Producto' : '➕ Agregar Producto'}
            </h3>

            <div className="form-group">
              <label>Nombre del Producto *</label>
              <input value={form.name} onChange={e => set('name', e.target.value)} placeholder="Ej. Cabina 360°" />
              {errors.name && <span style={{ fontSize: 12, marginTop: 4, display: 'block', color: '#ffaaaa' }}>{errors.name}</span>}
            </div>

            <div className="form-group">
              <label>Descripción *</label>
              <textarea rows={3} value={form.desc} onChange={e => set('desc', e.target.value)} placeholder="Breve descripción del servicio" />
              {errors.desc && <span style={{ fontSize: 12, marginTop: 4, display: 'block', color: '#ffaaaa' }}>{errors.desc}</span>}
            </div>

            <div className="form-group">
              <label>Precio (CLP) *</label>
              <input type="number" min="0" value={form.price} onChange={e => set('price', e.target.value)} placeholder="Ej. 150000" />
              {errors.price && <span style={{ fontSize: 12, marginTop: 4, display: 'block', color: '#ffaaaa' }}>{errors.price}</span>}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div className="form-group">
                <label>Emoji Icono *</label>
                <input value={form.emoji} onChange={e => set('emoji', e.target.value)} placeholder="Ej. 📸" />
                {errors.emoji && <span style={{ fontSize: 12, marginTop: 4, display: 'block', color: '#ffaaaa' }}>{errors.emoji}</span>}
              </div>

              <div className="form-group">
                <label>Etiqueta (Opcional)</label>
                <input value={form.tag} onChange={e => set('tag', e.target.value)} placeholder="Ej. Oferta, Popular" />
              </div>
            </div>

            <div className="form-group">
              <label>Color de Etiqueta</label>
              <select value={form.tagColor} onChange={e => set('tagColor', e.target.value)}>
                <option value="#ff7a3d">Naranja (--ember)</option>
                <option value="#e8b94f">Dorado (--gold)</option>
                <option value="#3d8b36">Verde (Éxito)</option>
                <option value="#3182ce">Azul (Info)</option>
              </select>
            </div>

            <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
              <button className="btn-green" style={{ flex: 1 }} onClick={guardar}>
                {editId !== null ? '💾 Actualizar' : '➕ Agregar'}
              </button>
              {editId !== null && (
                <button className="btn-outline" onClick={cancelar}>Cancelar</button>
              )}
            </div>

            {msg && (
              <div className={msg.type === 'error' ? 'alert-error' : 'alert-success'} style={{ marginTop: 14 }}>
                {msg.text}
              </div>
            )}
          </div>

          {/* TABLA */}
          <div className="glass" style={{ padding: 28, overflowX: 'auto' }}>
            <h3 style={{ marginBottom: 20, fontSize: '1.1rem' }}>
              📋 Catálogo ({productos.length})
            </h3>

            {productos.length === 0 ? (
              <p style={{ opacity: .6, textAlign: 'center', padding: 30 }}>No hay productos registrados en la base de datos.</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Icono</th>
                    <th>Producto</th>
                    <th>Precio</th>
                    <th>Etiqueta</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {productos.map((p) => (
                    <tr key={p.id}>
                      <td style={{ fontSize: '1.5rem', textAlign: 'center' }}>{p.emoji}</td>
                      <td>
                        <strong>{p.name}</strong>
                        <div style={{ fontSize: 12, opacity: 0.7, maxWidth: 200, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {p.desc}
                        </div>
                      </td>
                      <td style={{ fontWeight: 600 }}>${Number(p.price).toLocaleString('es-CL')}</td>
                      <td>
                        {p.tag ? (
                          <span style={{ 
                            background: `${p.tagColor}33`, border: `1px solid ${p.tagColor}`,
                            color: '#fff', borderRadius: 12, padding: '2px 8px', fontSize: 11 
                          }}>
                            {p.tag}
                          </span>
                        ) : '—'}
                      </td>
                      <td style={{ display: 'flex', gap: 6, alignItems: 'center', height: '100%' }}>
                        <button
                          onClick={() => editar(p)}
                          style={{ background: 'transparent', border: '1px solid rgba(232, 185, 79, 0.4)', color: 'var(--gold)', borderRadius: 6, padding: '4px 10px', cursor: 'pointer', fontSize: 13 }}
                        >✏️</button>
                        <button
                          onClick={() => eliminar(p)}
                          style={{ background: '#c53030', color: '#fff', border: 'none', borderRadius: 6, padding: '4px 10px', cursor: 'pointer', fontSize: 13 }}
                        >🗑️</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
