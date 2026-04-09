import React, { useState, useEffect } from 'react';

const App = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [datos, setDatos] = useState({
    fecha: "", turno: "Mañana",
    pB2BV: '0', pB2BB: '0', pB2CV: '0', pB2CB: '0',
    despB: '0', despP: '0',
    descTort: '0', descMCR: '0', descAduana: '0',
    bultosTotal: '0', // Columna L: Bultos desc. (General)
    movInt: '0',      // Columna M
    ciclicoLoc: '0',  // Columna N
    rmaCant: '0',     // Columna O
    rendiciones: '0', // Columna P
    obs: ''           // Columna Q: Observaciones
  });

  // NUEVA URL DE IMPLEMENTACIÓN ACTUALIZADA
  const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbzcIJR85XpxSELu5u5vCCgtrWcwUDWO7oZOIEnemUFQEGEautvYf2AquztT4gIKoxKb/exec";

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
      alert("✅ Datos guardados correctamente en el Excel (Columnas A a Q)");
      window.scrollTo({ top: 900, behavior: 'smooth' });
    } catch (error) {
      alert("❌ Error al conectar con el servidor");
    } finally {
      setIsSaving(false);
    }
  };

  const totalCamiones = Number(datos.descTort) + Number(datos.descMCR) + Number(datos.descAduana);

  return (
    <div className="min-h-screen bg-slate-100 p-4 font-sans text-slate-900">
      
      {/* --- PANEL DE CARGA --- */}
      <div className="max-w-5xl mx-auto bg-white p-6 shadow-xl rounded-lg mb-8 border-b-4 border-blue-600 print:hidden">
        <h2 className="font-bold mb-6 text-blue-800 border-b pb-2 text-lg">📝 SISTEMA DE CARGA PL3 - OCASA</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* OPERACIÓN SALIENTE */}
          <div className="space-y-4 bg-emerald-50/30 p-4 rounded-lg border border-emerald-100">
            <h3 className="text-xs font-black text-emerald-700 uppercase border-l-4 border-emerald-500 pl-2">🛒 Picking y Despacho</h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400">B2B VIAJES / BULTOS</label>
                <div className="flex gap-1">
                  <input type="text" name="pB2BV" placeholder="V" onChange={handleChange} className="w-1/2 border p-2 rounded text-sm font-bold" />
                  <input type="text" name="pB2BB" placeholder="B" onChange={handleChange} className="w-1/2 border p-2 rounded text-sm font-bold" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400">B2C VIAJES / BULTOS</label>
                <div className="flex gap-1">
                  <input type="text" name="pB2CV" placeholder="V" onChange={handleChange} className="w-1/2 border p-2 rounded text-sm font-bold" />
                  <input type="text" name="pB2CB" placeholder="B" onChange={handleChange} className="w-1/2 border p-2 rounded text-sm font-bold" />
                </div>
              </div>
              <input type="text" name="despB" placeholder="Despacho Bultos" onChange={handleChange} className="border p-2 rounded text-sm bg-indigo-50 font-bold col-span-1" />
              <input type="text" name="despP" placeholder="Despacho Pallets" onChange={handleChange} className="border p-2 rounded text-sm bg-indigo-50 font-bold col-span-1" />
            </div>
          </div>

          {/* DESCARGAS (SIN PL4) */}
          <div className="space-y-4 bg-orange-50/30 p-4 rounded-lg border border-orange-100">
            <h3 className="text-xs font-black text-orange-700 uppercase border-l-4 border-orange-500 pl-2">📦 Recepción y Stock</h3>
            <div className="grid grid-cols-3 gap-2">
              <div className="text-center">
                <label className="text-[9px] font-bold text-slate-400">TORTUGAS</label>
                <input type="text" name="descTort" placeholder="0" onChange={handleChange} className="w-full border p-2 rounded text-sm font-bold text-center" />
              </div>
              <div className="text-center">
                <label className="text-[9px] font-bold text-slate-400">MCR</label>
                <input type="text" name="descMCR" placeholder="0" onChange={handleChange} className="w-full border p-2 rounded text-sm font-bold text-center" />
              </div>
              <div className="text-center">
                <label className="text-[9px] font-bold text-slate-400">ADUANA</label>
                <input type="text" name="descAduana" placeholder="0" onChange={handleChange} className="w-full border p-2 rounded text-sm font-bold text-center" />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-orange-800">TOTAL BULTOS DESCARGADOS (Gral.)</label>
              <input type="text" name="bultosTotal" placeholder="Suma total de bultos" onChange={handleChange} className="w-full border-2 border-orange-200 p-2 rounded font-black text-orange-900 bg-white text-center" />
            </div>
          </div>

          {/* RMA Y CONTROL */}
          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4 border-t pt-4">
            <div className="grid grid-cols-2 gap-2">
              <input type="text" name="rmaCant" placeholder="RMA Unid." onChange={handleChange} className="border p-2 rounded text-sm font-bold border-purple-200" />
              <input type="text" name="rendiciones" placeholder="Viajes Rend." onChange={handleChange} className="border p-2 rounded text-sm font-bold border-blue-200" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <input type="text" name="movInt" placeholder="Mov. Stock" onChange={handleChange} className="border p-2 rounded text-sm font-bold bg-slate-50" />
              <input type="text" name="ciclicoLoc" placeholder="Loc. Cíclico" onChange={handleChange} className="border p-2 rounded text-sm font-bold bg-slate-50" />
            </div>
            <textarea name="obs" placeholder="Observaciones (Columna Q)..." onChange={handleChange} className="border p-2 rounded text-sm w-full h-10 resize-none" />
          </div>
        </div>

        <div className="mt-8 flex gap-4 justify-center">
          <button onClick={handleSave} disabled={isSaving} className="bg-emerald-600 text-white px-10 py-3 rounded-lg font-black shadow-lg uppercase text-sm hover:bg-emerald-700 transition-colors">
            {isSaving ? "Guardando..." : "💾 Guardar en Excel"}
          </button>
          <button onClick={() => window.print()} className="bg-slate-800 text-white px-10 py-3 rounded-lg font-black shadow-lg uppercase text-sm hover:bg-slate-900 transition-colors">
            🖨️ Imprimir Informe
          </button>
        </div>
      </div>

      {/* --- INFORME OPERATIVO (ESTILO PDF) --- */}
      <div className="max-w-5xl mx-auto bg-white p-10 border border-slate-200 shadow-2xl relative mb-20">
        <div className="flex justify-between items-center mb-8 border-b-4 border-blue-600 pb-5">
          <img src="/logo_ocasa.png" alt="OCASA" className="h-16 w-auto object-contain" />
          <div className="text-right">
            <h1 className="text-2xl font-black text-slate-800 uppercase leading-none">Informe Operativo Diario</h1>
            <p className="text-xs font-bold text-blue-600 mt-1 uppercase tracking-widest">Planta: PL3 — Turno: {datos.turno}</p>
            <div className="mt-2 bg-slate-900 text-white px-4 py-1 inline-block font-black text-[11px] rounded uppercase tracking-widest">FECHA: {datos.fecha}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="border-2 border-emerald-700 rounded-2xl p-6">
            <p className="text-emerald-800 font-black text-[10px] uppercase mb-2 italic">🛒 Picking Preparado</p>
            <p className="flex justify-between font-bold border-b pb-1 text-sm">B2B: <span className="font-black text-lg">{datos.pB2BV} V / {datos.pB2BB} B</span></p>
            <p className="flex justify-between font-bold pt-1 text-sm">B2C: <span className="font-black text-lg">{datos.pB2CV} V / {datos.pB2CB} B</span></p>
          </div>

          <div className="border-2 border-indigo-800 rounded-2xl p-6 bg-indigo-50/30 text-center">
            <p className="text-indigo-900 font-black text-[10px] uppercase mb-1 italic">🚚 Despachos Realizados</p>
            <p className="text-5xl font-black text-indigo-950">{datos.despB} / {datos.despP}</p>
            <p className="text-[10px] font-bold text-indigo-500 mt-2 uppercase">Bultos Totales / Pallets</p>
          </div>

          <div className="col-span-2 border-2 border-slate-300 rounded-2xl overflow-hidden bg-white">
            <div className="bg-slate-900 text-white font-black text-[11px] py-2.5 px-6 uppercase text-center tracking-widest">Descargas, Gestión de Bultos y Stock</div>
            <div className="grid grid-cols-3 divide-x-2 divide-slate-100 p-6 text-center">
              <div>
                <p className="text-[10px] font-black text-slate-500 uppercase">Camiones Operados</p>
                <p className="text-4xl font-black">{totalCamiones}</p>
                <p className="text-[9px] font-bold text-slate-400 mt-1 uppercase">Tort / MCR / Aduana</p>
              </div>
              <div className="bg-orange-50/20">
                <p className="text-[10px] font-black text-orange-700 uppercase">Total Bultos Recibidos</p>
                <p className="text-4xl font-black text-slate-800">{datos.bultosTotal}</p>
                <p className="text-[9px] font-bold text-slate-400 mt-1 uppercase italic">(Columna L del Excel)</p>
              </div>
              <div className="space-y-2">
                <div>
                  <p className="text-[10px] font-black text-emerald-700 uppercase leading-none">Mov. Internos</p>
                  <p className="text-xl font-black text-slate-800">{datos.movInt}</p>
                </div>
                <div className="pt-2 border-t border-slate-100">
                  <p className="text-[10px] font-black text-sky-700 uppercase leading-none">Loc. Cíclico</p>
                  <p className="text-xl font-black text-slate-800">{datos.ciclicoLoc || '---'}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-2 grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
            <div className="flex gap-4">
              <div className="bg-purple-50 p-3 rounded-xl border border-purple-200 flex-1">
                <p className="text-[9px] font-black text-purple-700 uppercase">RMA Realizados</p>
                <p className="text-2xl font-black">{datos.rmaCant}</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-xl border border-blue-200 flex-1">
                <p className="text-[9px] font-black text-blue-700 uppercase">Rendiciones</p>
                <p className="text-2xl font-black">{datos.rendiciones}</p>
              </div>
            </div>
            <div className="bg-yellow-50/30 p-3 rounded-xl border border-yellow-200 flex flex-col justify-center">
              <p className="text-[9px] font-black text-yellow-800 uppercase italic">Observaciones del Turno:</p>
              <p className="text-xs font-medium text-slate-600">{datos.obs || "Sin novedades adicionales."}</p>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-5 border-t text-slate-400 font-bold text-[9px] uppercase tracking-[0.4em] flex justify-between italic">
          <span>Optimización Logística PL3 — Tesis 2026</span>
          <span className="text-blue-500">OCASA Logística</span>
        </div>
      </div>
    </div>
  );
};

export default App;
