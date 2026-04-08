import React, { useState, useEffect } from 'react';

const App = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [datos, setDatos] = useState({
    fecha: "", turno: "Mañana",
    pB2BV: '0', pB2BB: '0', pB2CV: '0', pB2CB: '0',
    despB: '0', despP: '0',
    descPL4: '0', descTort: '0', descMCR: '0', descAduana: '0',
    ciclicoLoc: '', movInt: '0', obs: ''
  });

  // URL DE TU IMPLEMENTACIÓN DE GOOGLE APPS SCRIPT
  const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbzM9IGr9vvOR4u1fa5Ieeo9Byy2MHJjsOgm4a1aNrGaz_8VHiFtZdlMzrnL-y5Msd4Z/exec";

  useEffect(() => {
    const hoy = new Date();
    const opciones = { day: 'numeric', month: 'long', year: 'numeric' };
    setDatos(prev => ({ ...prev, fecha: hoy.toLocaleDateString('es-AR', opciones) }));
  }, []);

  const handleChange = (e) => setDatos({...datos, [e.target.name]: e.target.value});

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await fetch(WEB_APP_URL, {
        method: 'POST',
        mode: 'no-cors', 
        body: JSON.stringify(datos),
        headers: { 'Content-Type': 'application/json' }
      });
      alert("✅ Datos guardados en Google Sheets con éxito");
      window.scrollTo({ top: 800, behavior: 'smooth' });
    } catch (error) {
      alert("❌ Error al guardar en Sheets");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 font-sans text-slate-900">
      
      {/* --- PANEL DE CARGA (OCULTO AL IMPRIMIR) --- */}
      <div className="max-w-4xl mx-auto bg-white p-6 shadow-xl rounded-lg mb-8 border-b-4 border-blue-600 print:hidden">
        <h2 className="font-bold mb-6 text-blue-800 flex items-center gap-2 text-lg border-b pb-2">📝 CARGA DE DATOS DIARIOS - PL3</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <select name="turno" onChange={handleChange} className="border-2 border-blue-100 p-2 rounded font-bold outline-none focus:border-blue-500">
            <option value="Mañana">🌅 Turno Mañana</option>
            <option value="Tarde">🌇 Turno Tarde</option>
          </select>
          <input type="text" name="fecha" value={datos.fecha} readOnly className="border-2 border-slate-50 p-2 rounded font-bold text-slate-400 bg-slate-50" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-xs font-black text-emerald-700 uppercase border-l-4 border-emerald-500 pl-2">🛒 Picking</h3>
            <div className="grid grid-cols-2 gap-2">
              <input type="text" name="pB2BV" placeholder="B2B Viajes" onChange={handleChange} className="border p-2 rounded text-sm" />
              <input type="text" name="pB2BB" placeholder="B2B Bultos" onChange={handleChange} className="border p-2 rounded text-sm" />
              <input type="text" name="pB2CV" placeholder="B2C Viajes" onChange={handleChange} className="border p-2 rounded text-sm" />
              <input type="text" name="pB2CB" placeholder="B2C Bultos" onChange={handleChange} className="border p-2 rounded text-sm" />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-black text-indigo-700 uppercase border-l-4 border-indigo-500 pl-2">🚚 Despachos</h3>
            <div className="grid grid-cols-2 gap-2">
              <input type="text" name="despB" placeholder="Bultos Totales" onChange={handleChange} className="border p-2 rounded text-sm" />
              <input type="text" name="despP" placeholder="Pallets Totales" onChange={handleChange} className="border p-2 rounded text-sm" />
            </div>
          </div>

          <div className="space-y-4 md:col-span-2 border-t pt-4">
            <h3 className="text-xs font-black text-orange-700 uppercase border-l-4 border-orange-500 pl-2">📦 Descargas</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <input type="text" name="descPL4" placeholder="PL4" onChange={handleChange} className="border p-2 rounded text-sm" />
              <input type="text" name="descTort" placeholder="Tortugas" onChange={handleChange} className="border p-2 rounded text-sm" />
              <input type="text" name="descMCR" placeholder="MCR" onChange={handleChange} className="border p-2 rounded text-sm" />
              <input type="text" name="descAduana" placeholder="Aduana" onChange={handleChange} className="border p-2 rounded text-sm" />
            </div>
          </div>

          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4 border-t pt-4">
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase">Stock (Mov. Int)</label>
              <input type="text" name="movInt" placeholder="0" onChange={handleChange} className="w-full border p-2 rounded text-sm" />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase">Ubicación Cíclico</label>
              <input type="text" name="ciclicoLoc" placeholder="Ej: A1-10" onChange={handleChange} className="w-full border p-2 rounded text-sm" />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase">Observaciones</label>
              <input type="text" name="obs" placeholder="..." onChange={handleChange} className="w-full border p-2 rounded text-sm" />
            </div>
          </div>
        </div>

        <div className="mt-8 flex gap-4 justify-center">
            <button 
              onClick={handleSave} 
              disabled={isSaving}
              className={`${isSaving ? 'bg-gray-400' : 'bg-emerald-600 hover:bg-emerald-700'} text-white px-8 py-3 rounded-lg font-black shadow-lg transition-all uppercase text-sm`}>
              {isSaving ? "Guardando..." : "💾 Guardar en Excel e Informe"}
            </button>
            <button onClick={() => window.print()} className="bg-slate-800 text-white px-8 py-3 rounded-lg font-black shadow-lg hover:bg-slate-900 transition-all uppercase text-sm">
              🖨️ Imprimir PDF
            </button>
        </div>
      </div>

      {/* --- INFORME DE CIERRE (LO QUE SE IMPRIME) --- */}
      <div className="max-w-4xl mx-auto bg-white p-10 border border-gray-300 shadow-2xl relative mb-20">
        <div className="flex justify-between items-center mb-6 border-b-4 border-blue-500 pb-4">
          <img src="/logo_ocasa.png" alt="OCASA" className="h-14 w-auto object-contain" />
          <div className="text-right">
            <h2 className="text-xl font-black text-slate-700 uppercase leading-none">Informe de Cierre</h2>
            <p className="text-[11px] font-black text-blue-600 uppercase tracking-widest mt-1">Planta: PL3 — Turno: {datos.turno}</p>
            <div className="mt-2 bg-slate-800 text-white px-4 py-1 inline-block font-bold text-xs rounded-sm uppercase">FECHA: {datos.fecha}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div className="border-2 border-emerald-700 rounded-xl p-5 bg-white shadow-sm">
            <p className="text-emerald-800 font-black text-[10px] uppercase mb-2 tracking-tighter italic">🛒 Preparación (Picking)</p>
            <p className="flex justify-between border-b pb-1 text-sm font-bold">B2B: <span className="text-lg font-black">{datos.pB2BV} V / {datos.pB2BB} B</span></p>
            <p className="flex justify-between pt-1 text-sm font-bold">B2C: <span className="text-lg font-black">{datos.pB2CV} V / {datos.pB2CB} B</span></p>
          </div>

          <div className="border-2 border-indigo-800 rounded-xl p-5 bg-indigo-50/20 text-center flex flex-col justify-center shadow-sm">
            <p className="text-indigo-900 font-black text-[10px] uppercase mb-1 tracking-tighter italic">🚚 Despachos Totales</p>
            <p className="text-5xl font-black text-indigo-900 leading-none">{datos.despB} / {datos.despP}</p>
            <p className="text-[10px] font-bold text-indigo-700 mt-2 italic uppercase">Bultos / Pallets</p>
          </div>

          <div className="col-span-2 border-2 border-slate-300 rounded-xl overflow-hidden shadow-md">
            <div className="bg-slate-800 text-white font-black text-[10px] py-1.5 px-4 uppercase text-center tracking-[0.3em]">Descargas y Gestión de Stock</div>
            <div className="grid grid-cols-3 divide-x-2">
              <div className="p-4 bg-orange-50/30 text-[11px] font-bold">
                <p className="flex justify-between">PL4: <span>{datos.descPL4}</span></p>
                <p className="flex justify-between">TORTUGAS: <span>{datos.descTort}</span></p>
                <p className="flex justify-between">MCR: <span>{datos.descMCR}</span></p>
                <p className="flex justify-between text-red-600">ADUANA: <span>{datos.descAduana}</span></p>
              </div>
              <div className="p-4 text-center bg-white flex flex-col justify-center">
                <p className="text-[10px] font-black text-emerald-700 uppercase">Mov. Internos</p>
                <p className="text-3xl font-black">{datos.movInt}</p>
              </div>
              <div className="p-4 text-center bg-sky-50/30 flex flex-col justify-center">
                <p className="text-[10px] font-black text-sky-700 uppercase">Cíclico Realizado</p>
                <p className="text-xl font-black uppercase text-slate-700">{datos.ciclicoLoc || '---'}</p>
              </div>
            </div>
          </div>

          <div className="col-span-2 border-2 border-yellow-500 rounded-xl p-4 bg-yellow-50/10 italic text-sm text-slate-600">
            <p className="font-bold text-yellow-800 uppercase text-[10px] mb-1 not-italic tracking-widest">Novedades / Observaciones:</p>
            {datos.obs || "Sin novedades adicionales en el turno."}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
