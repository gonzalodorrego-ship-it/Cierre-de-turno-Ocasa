import React, { useState, useEffect } from 'react';

const App = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [datos, setDatos] = useState({
    fecha: "", 
    turno: "Mañana", // Restaurado selector de turno
    pB2BV: '0', pB2BB: '0', 
    pB2CV: '0', pB2CB: '0', // Restaurados campos B2C
    despB: '0', despP: '0',
    descTort: '0', descMCR: '0', descAduana: '0',
    bultosTotal: '0',
    movInt: '0', ciclicoLoc: '0', rmaCant: '0', rendiciones: '0',
    obs: ''
  });

  // TU URL DE IMPLEMENTACIÓN ACTUAL
  const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbwMwYvjERyxcc4W9AzjFkkwPFfVrsAft6JeOW6g1b1hucnSItyrmc-vmI-BGPhjnyXk/exec";

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
      alert("✅ Datos guardados con éxito.");
    } catch (error) {
      alert("❌ Error al guardar.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 font-sans text-slate-900">
      
      {/* PANEL DE CONTROL (ENTRADA DE DATOS) */}
      <div className="max-w-5xl mx-auto bg-white p-6 shadow-xl rounded-lg mb-8 border-b-4 border-blue-600 print:hidden">
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h2 className="font-bold text-blue-800 text-lg">📝 REGISTRO PL3 - OCASA</h2>
          <div className="flex gap-4 items-center">
            {/* SELECTOR DE TURNO RESTAURADO */}
            <select name="turno" onChange={handleChange} className="border p-2 rounded font-bold bg-blue-50 text-blue-800 border-blue-200">
              <option value="Mañana">🌅 Turno Mañana</option>
              <option value="Tarde">🌇 Turno Tarde</option>
            </select>
            <span className="text-slate-400 font-bold text-sm">{datos.fecha}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* SECCIÓN SALIDAS: B2B Y B2C TOTALES */}
          <div className="space-y-4">
            <h3 className="text-xs font-black text-emerald-700 uppercase tracking-widest border-l-4 border-emerald-500 pl-2">🛒 Picking y Despachos</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">B2B (Viajes / Bultos)</label>
                <div className="flex gap-1">
                  <input type="text" name="pB2BV" placeholder="V" onChange={handleChange} className="w-1/2 border p-2 rounded text-sm font-bold" />
                  <input type="text" name="pB2BB" placeholder="B" onChange={handleChange} className="w-1/2 border p-2 rounded text-sm font-bold" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">B2C (Viajes / Bultos)</label>
                <div className="flex gap-1">
                  <input type="text" name="pB2CV" placeholder="V" onChange={handleChange} className="w-1/2 border p-2 rounded text-sm font-bold" />
                  <input type="text" name="pB2CB" placeholder="B" onChange={handleChange} className="w-1/2 border p-2 rounded text-sm font-bold" />
                </div>
              </div>
              <input type="text" name="despB" placeholder="Desp. Bultos" onChange={handleChange} className="border p-2 rounded text-sm bg-indigo-50 font-bold" />
              <input type="text" name="despP" placeholder="Desp. Pallets" onChange={handleChange} className="border p-2 rounded text-sm bg-indigo-50 font-bold" />
            </div>
          </div>

          {/* SECCIÓN DESCARGAS: SIN PL4 */}
          <div className="space-y-4">
            <h3 className="text-xs font-black text-orange-700 uppercase tracking-widest border-l-4 border-orange-500 pl-2">🚛 Camiones y Recepción</h3>
            <div className="grid grid-cols-3 gap-2">
              <div className="text-center">
                <label className="text-[9px] font-bold text-slate-400">TORTUGAS</label>
                <input type="text" name="descTort" placeholder="0" onChange={handleChange} className="w-full border p-2 rounded text-sm font-bold" />
              </div>
              <div className="text-center">
                <label className="text-[9px] font-bold text-slate-400">MCR</label>
                <input type="text" name="descMCR" placeholder="0" onChange={handleChange} className="w-full border p-2 rounded text-sm font-bold" />
              </div>
              <div className="text-center">
                <label className="text-[9px] font-bold text-slate-400">ADUANA</label>
                <input type="text" name="descAduana" placeholder="0" onChange={handleChange} className="w-full border p-2 rounded text-sm font-bold" />
              </div>
            </div>
            <div className="bg-orange-50 p-2 rounded border border-orange-100">
               <label className="text-[10px] font-black text-orange-800 uppercase block mb-1">Total Bultos Descargados</label>
               <input type="text" name="bultosTotal" placeholder="Suma total de bultos" onChange={handleChange} className="w-full border-2 border-orange-200 p-2 rounded font-black text-center text-lg" />
            </div>
          </div>

          {/* CONTROL Y RMA */}
          <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4 border-t pt-4">
            <input type="text" name="rmaCant" placeholder="RMA Unid." onChange={handleChange} className="border p-2 rounded text-sm font-bold border-purple-200" />
            <input type="text" name="rendiciones" placeholder="Viajes Rendidos" onChange={handleChange} className="border p-2 rounded text-sm font-bold border-blue-200" />
            <input type="text" name="movInt" placeholder="Mov. Internos" onChange={handleChange} className="border p-2 rounded text-sm font-bold bg-slate-50" />
            <input type="text" name="ciclicoLoc" placeholder="Loc. Cíclico" onChange={handleChange} className="border p-2 rounded text-sm font-bold bg-slate-50" />
          </div>

          {/* OBSERVACIONES RESTAURADAS */}
          <div className="md:col-span-2">
            <textarea name="obs" placeholder="Observaciones de relevancia (Columna Q)..." onChange={handleChange} className="w-full border p-3 rounded text-sm min-h-[80px] bg-yellow-50/20" />
          </div>
        </div>

        <div className="mt-8 flex gap-4 justify-center">
          <button onClick={handleSave} disabled={isSaving} className="bg-emerald-600 text-white px-12 py-3 rounded-xl font-black shadow-lg uppercase text-sm hover:bg-emerald-700">
            {isSaving ? "Guardando..." : "💾 Guardar en Excel"}
          </button>
          <button onClick={() => window.print()} className="bg-slate-800 text-white px-12 py-3 rounded-xl font-black shadow-lg uppercase text-sm hover:bg-slate-900">
            🖨️ Imprimir PDF
          </button>
        </div>
      </div>

      {/* REPORTE OPERATIVO (DISEÑO PARA PDF) */}
      <div className="max-w-5xl mx-auto bg-white p-10 border border-slate-200 shadow-2xl relative mb-20">
        <div className="flex justify-between items-center mb-8 border-b-4 border-blue-600 pb-5">
           <div className="bg-slate-900 text-white px-4 py-2 font-black text-2xl">OCASA</div>
           <div className="text-right">
             <h1 className="text-2xl font-black text-slate-800 uppercase leading-none">Informe Operativo</h1>
             <p className="text-xs font-bold text-blue-600 mt-1 uppercase tracking-widest italic">Planta: PL3 — Turno: {datos.turno}</p>
             <div className="mt-2 bg-slate-100 px-3 py-1 inline-block font-black text-[11px] rounded text-slate-600 uppercase">FECHA: {datos.fecha}</div>
           </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* PICKING RESTAURADO (B2B + B2C) */}
          <div className="border-2 border-emerald-700 rounded-2xl p-6">
            <p className="text-emerald-800 font-black text-[10px] uppercase mb-3 italic tracking-tighter">🛒 Picking y Preparación</p>
            <div className="space-y-3">
              <div className="flex justify-between items-end border-b pb-1">
                <span className="font-bold text-slate-500">B2B:</span>
                <span className="font-black text-xl">{datos.pB2BV} <small className="text-[10px]">VIAJES</small> / {datos.pB2BB} <small className="text-[10px]">BULTOS</small></span>
              </div>
              <div className="flex justify-between items-end">
                <span className="font-bold text-slate-500">B2C:</span>
                <span className="font-black text-xl">{datos.pB2CV} <small className="text-[10px]">VIAJES</small> / {datos.pB2CB} <small className="text-[10px]">BULTOS</small></span>
              </div>
            </div>
          </div>

          {/* DESPACHOS */}
          <div className="border-2 border-indigo-800 rounded-2xl p-6 bg-indigo-50/30 text-center flex flex-col justify-center">
            <p className="text-indigo-900 font-black text-[10px] uppercase mb-1">🚚 Despachos Realizados</p>
            <p className="text-5xl font-black text-indigo-950">{datos.despB} / {datos.despP}</p>
            <p className="text-[10px] font-bold text-indigo-500 mt-2 uppercase tracking-widest">Bultos Totales / Pallets</p>
          </div>

          {/* CUADRO DE DESCARGAS (DETALLADO) */}
          <div className="col-span-2 border-2 border-slate-300 rounded-2xl overflow-hidden">
             <div className="bg-slate-900 text-white font-black text-[10px] py-2 px-6 uppercase text-center tracking-widest">Descargas, Recepción y Control de Stock</div>
             <div className="grid grid-cols-4 divide-x divide-slate-100 p-6 text-center bg-white">
                <div>
                   <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">Camiones (T/M/A)</p>
                   <p className="text-3xl font-black">{Number(datos.descTort) + Number(datos.descMCR) + Number(datos.descAduana)}</p>
                </div>
                <div className="bg-orange-50/20">
                   <p className="text-[9px] font-bold text-orange-700 uppercase mb-1">Bultos Recibidos</p>
                   <p className="text-3xl font-black text-orange-900">{datos.bultosTotal}</p>
                </div>
                <div>
                   <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">Mov. Internos</p>
                   <p className="text-2xl font-black">{datos.movInt}</p>
                </div>
                <div>
                   <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">RMA / Rend.</p>
                   <p className="text-lg font-black text-purple-800">{datos.rmaCant} / {datos.rendiciones}</p>
                </div>
             </div>
          </div>

          {/* OBSERVACIONES PDF */}
          <div className="col-span-2 border-t pt-4">
             <p className="text-[10px] font-black text-slate-800 uppercase mb-1 italic">📋 Notas y Observaciones:</p>
             <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs italic text-slate-600 min-h-[60px]">
               {datos.obs || "Sin novedades adicionales reportadas durante el turno."}
             </div>
          </div>
        </div>

        <div className="mt-12 pt-5 border-t text-slate-400 font-bold text-[8px] uppercase tracking-[0.4em] flex justify-between">
           <span>Optimización Logística PL3 — Tesis 2026</span>
           <span className="text-blue-500">OCASA LOGÍSTICA</span>
        </div>
      </div>
    </div>
  );
};

export default App;
