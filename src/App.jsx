import React, { useState, useEffect } from 'react';

const App = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [datos, setDatos] = useState({
    fecha: "", turno: "Mañana",
    pB2BV: '0', pB2BB: '0', pB2CV: '0', pB2CB: '0',
    despB: '0', despP: '0',
    descPL4: '0', descTort: '0', descMCR: '0', descAduana: '0',
    ciclicoLoc: '', movInt: '0', obs: '',
    rmaCant: '0', rendiciones: '0' 
  });

  // NUEVA URL DE IMPLEMENTACIÓN
  const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxRdKyCr7e4wRopnxHkL4N5JjrE7Kepz_V7C4v28zV0A_4aBUIcuCLGqRfQldB9D8EA/exec";

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
      alert("✅ ¡Cierre guardado con éxito!");
      window.scrollTo({ top: 900, behavior: 'smooth' });
    } catch (error) {
      alert("❌ Error al conectar con el servidor");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 font-sans text-slate-900">
      
      {/* PANEL DE CARGA - OCULTO EN IMPRESIÓN */}
      <div className="max-w-4xl mx-auto bg-white p-6 shadow-xl rounded-lg mb-8 border-b-4 border-blue-600 print:hidden">
        <h2 className="font-bold mb-6 text-blue-800 flex items-center gap-2 text-lg border-b pb-2">📋 CIERRE COLABORATIVO - PL3</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <select name="turno" onChange={handleChange} className="border-2 border-blue-100 p-2 rounded font-bold outline-none focus:border-blue-500">
            <option value="Mañana">🌅 Turno Mañana</option>
            <option value="Tarde">🌇 Turno Tarde</option>
          </select>
          <input type="text" name="fecha" value={datos.fecha} readOnly className="border-2 border-slate-50 p-2 rounded font-bold text-slate-400 bg-slate-50 cursor-not-allowed" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* SECCIÓN OPERATIVA (Picking y Despacho) */}
          <div className="space-y-4">
            <h3 className="text-xs font-black text-emerald-700 uppercase border-l-4 border-emerald-500 pl-2 tracking-widest">🛒 Picking y Despachos</h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">B2B Viajes</label>
                <input type="text" name="pB2BV" placeholder="0" onChange={handleChange} className="w-full border p-2 rounded text-sm font-bold" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">B2B Bultos</label>
                <input type="text" name="pB2BB" placeholder="0" onChange={handleChange} className="w-full border p-2 rounded text-sm font-bold" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Desp. Bultos</label>
                <input type="text" name="despB" placeholder="0" onChange={handleChange} className="w-full border p-2 rounded text-sm bg-indigo-50 font-bold border-indigo-200" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Desp. Pallets</label>
                <input type="text" name="despP" placeholder="0" onChange={handleChange} className="w-full border p-2 rounded text-sm bg-indigo-50 font-bold border-indigo-200" />
              </div>
            </div>
          </div>

          {/* SECCIÓN ADMINISTRATIVA (RMA y Rendiciones) */}
          <div className="space-y-4">
            <h3 className="text-xs font-black text-purple-700 uppercase border-l-4 border-purple-500 pl-2 tracking-widest">🔄 RMA y Control</h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">RMA Realizados (Unidades)</label>
                <input type="text" name="rmaCant" placeholder="0" onChange={handleChange} className="w-full border-2 border-purple-100 p-2 rounded text-sm font-bold focus:border-purple-400" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Viajes Rendidos</label>
                <input type="text" name="rendiciones" placeholder="0" onChange={handleChange} className="w-full border-2 border-blue-100 p-2 rounded text-sm font-bold focus:border-blue-400" />
              </div>
            </div>
          </div>

          {/* STOCK Y DESCARGAS */}
          <div className="space-y-4 md:col-span-2 border-t pt-4">
            <h3 className="text-xs font-black text-orange-700 uppercase border-l-4 border-orange-500 pl-2 tracking-widest">📦 Descargas y Gestión de Stock</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <input type="text" name="descPL4" placeholder="PL4" onChange={handleChange} className="border p-2 rounded text-sm" />
              <input type="text" name="descTort" placeholder="Tortugas" onChange={handleChange} className="border p-2 rounded text-sm" />
              <input type="text" name="movInt" placeholder="Mov. Internos" onChange={handleChange} className="border p-2 rounded text-sm font-bold bg-slate-50" />
              <input type="text" name="ciclicoLoc" placeholder="Loc. Cíclico" onChange={handleChange} className="border p-2 rounded text-sm font-bold bg-slate-50" />
            </div>
          </div>
        </div>

        <div className="mt-8 flex gap-4 justify-center">
            <button onClick={handleSave} disabled={isSaving} className={`${isSaving ? 'bg-gray-400' : 'bg-emerald-600 hover:bg-emerald-700'} text-white px-8 py-3 rounded-lg font-black shadow-lg transition-all uppercase text-sm`}>
              {isSaving ? "Guardando..." : "💾 Guardar en Sheet"}
            </button>
            <button onClick={() => window.print()} className="bg-slate-800 text-white px-8 py-3 rounded-lg font-black shadow-lg hover:bg-slate-900 transition-all uppercase text-sm">
              🖨️ Generar PDF
            </button>
        </div>
      </div>

      {/* INFORME DE CIERRE PROFESIONAL */}
      <div className="max-w-4xl mx-auto bg-white p-10 border border-gray-300 shadow-2xl relative mb-20">
        <div className="flex justify-between items-center mb-6 border-b-4 border-blue-600 pb-4">
          <img src="/logo_ocasa.png" alt="OCASA" className="h-14 w-auto object-contain" />
          <div className="text-right">
            <h2 className="text-xl font-black text-slate-800 uppercase leading-none tracking-tighter">Informe Operativo</h2>
            <p className="text-[10px] font-black text-blue-600 mt-1 uppercase tracking-[0.2em]">Planta: PL3 — Turno: {datos.turno}</p>
            <div className="mt-2 bg-slate-900 text-white px-3 py-1 inline-block font-bold text-[10px] rounded uppercase tracking-widest">FECHA: {datos.fecha}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* COLUMNA IZQUIERDA: PICKING Y RMA */}
          <div className="space-y-6">
            <div className="border-2 border-emerald-700 rounded-xl p-4 shadow-sm">
              <p className="text-emerald-800 font-black text-[10px] uppercase mb-2 italic">🛒 Picking Realizado</p>
              <div className="space-y-1">
                <p className="flex justify-between text-xs font-bold border-b pb-1">B2B: <span className="text-base font-black text-slate-800">{datos.pB2BV} V / {datos.pB2BB} B</span></p>
                <p className="flex justify-between text-xs font-bold pt-1">B2C: <span className="text-base font-black text-slate-800">{datos.pB2CV} V / {datos.pB2CB} B</span></p>
              </div>
            </div>

            <div className="bg-purple-50 border-2 border-purple-800 rounded-xl p-4 flex justify-between items-center shadow-sm">
              <div>
                <p className="text-purple-900 font-black text-[10px] uppercase tracking-tighter">🔄 Logística Inversa (RMA)</p>
                <p className="text-3xl font-black text-purple-900">{datos.rmaCant} <span className="text-xs font-bold text-purple-400 uppercase">Unid.</span></p>
              </div>
              <div className="h-10 w-10 bg-purple-200 rounded-full flex items-center justify-center text-purple-700 font-black">R</div>
            </div>
          </div>

          {/* COLUMNA DERECHA: DESPACHOS Y RENDICIONES */}
          <div className="space-y-6">
            <div className="border-2 border-indigo-800 bg-indigo-50/20 rounded-xl p-4 text-center shadow-sm">
              <p className="text-indigo-900 font-black text-[10px] uppercase mb-1 italic">🚚 Despachos Realizados</p>
              <p className="text-5xl font-black text-indigo-950 leading-none">{datos.despB} / {datos.despP}</p>
              <p className="text-[9px] font-bold text-indigo-500 mt-2 uppercase tracking-widest">Bultos Totales / Pallets</p>
            </div>

            <div className="bg-blue-50 border-2 border-blue-800 rounded-xl p-4 flex justify-between items-center shadow-sm">
              <div>
                <p className="text-blue-900 font-black text-[10px] uppercase tracking-tighter">🧾 Viajes Rendidos</p>
                <p className="text-3xl font-black text-blue-900">{datos.rendiciones}</p>
              </div>
              <div className="h-10 w-10 bg-blue-200 rounded-full flex items-center justify-center text-blue-700 font-black">V</div>
            </div>
          </div>

          {/* PIE DEL INFORME: STOCK Y MOVIMIENTOS */}
          <div className="col-span-2 bg-slate-900 text-white rounded-xl p-5 grid grid-cols-3 divide-x divide-slate-700 shadow-xl">
            <div className="text-center">
              <p className="text-[9px] uppercase font-bold text-slate-500 mb-1">Descargas Totales</p>
              <p className="text-xl font-black">{(Number(datos.descPL4) + Number(datos.descTort) + Number(datos.descMCR) + Number(datos.descAduana))} <span className="text-[10px] text-slate-400 font-normal">Bultos</span></p>
            </div>
            <div className="text-center">
              <p className="text-[9px] uppercase font-bold text-slate-500 mb-1">Mov. Internos Stock</p>
              <p className="text-xl font-black text-emerald-400">{datos.movInt}</p>
            </div>
            <div className="text-center">
              <p className="text-[9px] uppercase font-bold text-slate-500 mb-1">Ubicación Cíclico</p>
              <p className="text-lg font-black text-sky-400 uppercase tracking-widest">{datos.ciclicoLoc || 'S/N'}</p>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t border-slate-200 flex justify-between items-center italic text-[9px] text-slate-400 font-bold uppercase tracking-[0.3em]">
          <span>Optimización Logística PL3</span>
          <span className="text-blue-500">OCASA Logística 2026</span>
        </div>
      </div>
    </div>
  );
};

export default App;
