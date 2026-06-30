import { useState, useEffect } from 'react';
import { validateRut, formatRut, formatRutInput, cleanRut, calcEdad, hashRut } from '../utils/rut';
import { getPersonas, savePersonas } from '../utils/storage';

const emptyForm = { rut: '', nombre: '', correo: '', telefono: '', fecha: '' };

export default function Personas() {
  const [personas, setPersonas]   = useState([]);
  const [form, setForm]           = useState(emptyForm);
  const [editId, setEditId]       = useState(null);
  const [msg, setMsg]             = useState(null);
  const [edad, setEdad]           = useState(null);
  const [errors, setErrors]       = useState({});
  const [useLocalStorage, setUseLocalStorage] = useState(false);

  useEffect(() => {
    cargarPersonas();
  }, []);

  const cargarPersonas = async () => {
    try {
      const res = await fetch('http://localhost:3000/personas');
      if (res.ok) {
        const data = await res.json();
        setPersonas(data);
        setUseLocalStorage(false);
      } else {
        console.error('Error al cargar personas: Status ' + res.status);
        fallbackToLocalStorage();
      }
    } catch (e) {
      console.error('Error de red al cargar personas:', e);
      fallbackToLocalStorage();
    }
  };

  const fallbackToLocalStorage = () => {
    setUseLocalStorage(true);
    const localData = getPersonas();
    setPersonas(localData);
    setMsg({ type: 'info', text: 'ℹ️ Usando almacenamiento local (json-server no disponible).' });
  };

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const validateField = (k, v) => {
    let error = '';

    if (k === 'rut') {
      if (!v.trim()) error = 'RUT obligatorio';
      else if (!validateRut(v)) error = 'RUT inválido';
    }

    if (k === 'nombre') {
      if (!v.trim()) error = 'Nombre requerido';
      else if (/\d/.test(v)) error = 'El nombre no puede contener números';
    }

    if (k === 'correo') {
      if (!v.trim()) error = 'Correo requerido';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) error = 'Correo inválido';
    }

    if (k === 'telefono' && v.trim()) {
      if (!/^[0-9+()\s-]{7,20}$/.test(v)) error = 'Teléfono inválido';
    }

    if (k === 'fecha' && v) {
      const fecha = new Date(v);
      if (Number.isNaN(fecha.getTime())) {
        error = 'Fecha inválida';
      } else {
        const hoy = new Date();
        const hoySinHora = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
        if (fecha > hoySinHora) {
          error = 'La fecha no puede ser futura';
        } else {
          const edadCalculada = calcEdad(v);
          if (edadCalculada > 120) error = 'No puede superar los 120 años';
        }
      }
    }

    setErrors(prev => ({ ...prev, [k]: error }));
    return error;
  };

  const validateForm = () => {
    const fields = ['rut', 'nombre', 'correo', 'telefono', 'fecha'];
    const newErrors = {};

    fields.forEach((key) => {
      const value = form[key] || '';
      const error = validateField(key, value);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFieldChange = (k, v) => {
    set(k, v);
    validateField(k, v);
  };

  const handleRut = (v) => {
    const formatted = formatRutInput(v);
    handleFieldChange('rut', formatted);
  };

  const handleFecha = (v) => {
    handleFieldChange('fecha', v);
    setEdad(calcEdad(v));
  };

  const rutStatus = () => {
    if (form.rut.length < 6) return null;
    return validateRut(form.rut);
  };

  const today = new Date().toISOString().slice(0, 10);

  const guardar = async () => {
    setMsg(null);
    if (!validateForm()) {
      setMsg({ type: 'error', text: 'Por favor corrige los campos requeridos antes de continuar.' });
      return;
    }

    const edadStr = edad !== null ? `${edad} años` : '';
    const persona = { ...form, rut: formatRut(form.rut), edad: edadStr };

    if (useLocalStorage) {
      if (editId !== null) {
        // ACTUALIZAR (Local)
        const updated = personas.map(p => p.id === editId ? { ...persona, id: editId } : p);
        savePersonas(updated);
        setPersonas(updated);
        setMsg({ type: 'success', text: '✅ Persona actualizada (Modo local)' });
        setForm(emptyForm);
        setEditId(null);
        setEdad(null);
      } else {
        // AGREGAR (Local)
        if (personas.some(p => cleanRut(p.rut) === cleanRut(form.rut))) {
          setMsg({ type: 'error', text: '❌ Este RUT ya está registrado' });
          return;
        }
        const newPersona = { ...persona, id: Date.now() };
        const updated = [...personas, newPersona];
        savePersonas(updated);
        setPersonas(updated);
        setMsg({ type: 'success', text: '✅ Persona agregada (Modo local)' });
        setForm(emptyForm);
        setEdad(null);
      }
      return;
    }

    try {
      if (editId !== null) {
        // ACTUALIZAR (PUT)
        const res = await fetch(`http://localhost:3000/personas/${editId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(persona)
        });
        if (res.ok) {
          setMsg({ type: 'success', text: '✅ Persona actualizada en la base de datos' });
          await cargarPersonas();
          setForm(emptyForm);
          setEditId(null);
          setEdad(null);
        } else {
          throw new Error('Error al actualizar: ' + res.status);
        }
      } else {
        // AGREGAR (POST)
        if (personas.some(p => cleanRut(p.rut) === cleanRut(form.rut))) {
          setMsg({ type: 'error', text: '❌ Este RUT ya está registrado' });
          return;
        }
        const res = await fetch('http://localhost:3000/personas', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(persona)
        });
        if (res.ok) {
          setMsg({ type: 'success', text: '✅ Persona agregada a la base de datos' });
          await cargarPersonas();
          setForm(emptyForm);
          setEdad(null);
        } else {
          throw new Error('Error al agregar: ' + res.status);
        }
      }
    } catch (e) {
      console.error('Error en guardar:', e);
      setMsg({ type: 'error', text: '❌ Error de comunicación con la base de datos.' });
    }
  };

  const editar = (persona) => {
    setForm({ ...persona, rut: persona.rut });
    setEditId(persona.id);
    setEdad(calcEdad(persona.fecha));
    setMsg(null);
    window.scrollTo(0, 0);
  };

  const eliminar = async (persona) => {
    if (!confirm('¿Eliminar esta persona de la base de datos?')) return;
    if (useLocalStorage) {
      const updated = personas.filter(p => p.id !== persona.id);
      savePersonas(updated);
      setPersonas(updated);
      setMsg({ type: 'success', text: '✅ Persona eliminada (Modo local)' });
      if (editId === persona.id) {
        setForm(emptyForm);
        setEditId(null);
        setEdad(null);
      }
      return;
    }

    try {
      const res = await fetch(`http://localhost:3000/personas/${persona.id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setMsg({ type: 'success', text: '✅ Persona eliminada' });
        await cargarPersonas();
        if (editId === persona.id) {
          setForm(emptyForm);
          setEditId(null);
          setEdad(null);
        }
      } else {
        throw new Error('Error al eliminar: ' + res.status);
      }
    } catch (e) {
      console.error('Error al eliminar:', e);
      setMsg({ type: 'error', text: '❌ Error al intentar eliminar de la base de datos.' });
    }
  };

  const cancelar = () => { 
    setForm(emptyForm); 
    setEditId(null); 
    setEdad(null); 
    setMsg(null); 
  };

  const rs = rutStatus();

  return (
    <div className="page">
      <div className="container">
        <h2 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: 32 }}>👥 Gestión de Personas</h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 24 }} className="grid-personas">

          {/* FORMULARIO */}
          <div className="glass" style={{ padding: 28 }}>
            <h3 style={{ marginBottom: 20, fontSize: '1.1rem' }}>
              {editId !== null ? '✏️ Editar Persona' : '➕ Agregar Persona'}
            </h3>

            <div className="form-group">
              <label>RUT *</label>
              <input value={form.rut} onChange={e => handleRut(e.target.value)} placeholder="12.345.678-9" />
              {(errors.rut || rs !== null) && (
                <span style={{ fontSize: 12, marginTop: 4, display: 'block', color: errors.rut ? '#ffaaaa' : rs ? '#afffaa' : '#ffaaaa' }}>
                  {errors.rut || (rs ? '✅ RUT válido' : '❌ RUT inválido')}
                </span>
              )}
            </div>

            <div className="form-group">
              <label>Nombre *</label>
              <input value={form.nombre} onChange={e => handleFieldChange('nombre', e.target.value)} placeholder="Nombre completo" />
              {errors.nombre && (
                <span style={{ fontSize: 12, marginTop: 4, display: 'block', color: '#ffaaaa' }}>
                  {errors.nombre}
                </span>
              )}
            </div>

            <div className="form-group">
              <label>Correo *</label>
              <input type="email" value={form.correo} onChange={e => handleFieldChange('correo', e.target.value)} placeholder="correo@ejemplo.com" />
              {errors.correo && (
                <span style={{ fontSize: 12, marginTop: 4, display: 'block', color: '#ffaaaa' }}>
                  {errors.correo}
                </span>
              )}
            </div>

            <div className="form-group">
              <label>Teléfono</label>
              <input value={form.telefono} onChange={e => handleFieldChange('telefono', e.target.value)} placeholder="+56 9 1234 5678" />
              {errors.telefono && (
                <span style={{ fontSize: 12, marginTop: 4, display: 'block', color: '#ffaaaa' }}>
                  {errors.telefono}
                </span>
              )}
            </div>

            <div className="form-group">
              <label>Fecha de Nacimiento</label>
              <input type="date" max={today} value={form.fecha} onChange={e => handleFecha(e.target.value)} />
              {errors.fecha && (
                <span style={{ fontSize: 12, marginTop: 4, display: 'block', color: '#ffaaaa' }}>
                  {errors.fecha}
                </span>
              )}
            </div>

            {edad !== null && (
              <div style={{ background: 'rgba(255, 122, 61, 0.15)', border: '1px solid var(--ember)', borderRadius: 8, padding: '10px 14px', marginBottom: 14, fontSize: 14 }}>
                📅 Edad calculada: <strong>{edad} años</strong>
              </div>
            )}

            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn-green" style={{ flex: 1 }} onClick={guardar}>
                {editId !== null ? '💾 Actualizar' : '➕ Agregar'}
              </button>
              {editId !== null && (
                <button className="btn-outline" onClick={cancelar}>Cancelar</button>
              )}
            </div>

            {msg && (
              <div className={
                msg.type === 'error' ? 'alert-error' :
                msg.type === 'info'  ? 'alert-info'  : 'alert-success'
              } style={{ marginTop: 14 }}>
                {msg.text}
              </div>
            )}
          </div>

          {/* TABLA */}
          <div className="glass" style={{ padding: 28, overflowX: 'auto' }}>
            <h3 style={{ marginBottom: 20, fontSize: '1.1rem' }}>
              📋 Personas Registradas ({personas.length})
            </h3>

            {personas.length === 0 ? (
              <p style={{ opacity: .6, textAlign: 'center', padding: 30 }}>No hay personas registradas aún.</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>RUT</th>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Edad</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {personas.map((p, i) => (
                    <tr key={p.id || i}>
                      <td>
                        <span style={{ background: 'rgba(232, 185, 79, 0.15)', border: '1px solid var(--gold)', color: 'var(--gold)', borderRadius: 20, padding: '2px 10px', fontSize: 12 }}>
                          {hashRut(p.rut)}
                        </span>
                      </td>
                      <td>{p.nombre}</td>
                      <td style={{ fontSize: 13, opacity: .8 }}>{p.correo}</td>
                      <td>{p.edad || '—'}</td>
                      <td style={{ display: 'flex', gap: 6 }}>
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
