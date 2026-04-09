import React, { useState, useEffect } from 'react';

const App = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [datos, setDatos] = useState({
    fecha: "", turno: "Mañana",
    pB2BV: '0', pB2BB: '0', pB2CV: '0', pB2CB: '0',
    despB: '0', despP: '0',
    descTort: '0', descMCR: '0', descAduana: '0',
    bultosTotal: '0',
    movInt: '0', ciclicoLoc: '0', rmaCant: '0', rendiciones: '0',
    obs: ''
  });

  // REEMPLAZÁ CON TU URL DE IMPLEMENTACIÓN RECIÉN GENERADA
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
      alert("✅ Guardado en Excel (Columnas A a Q)");
    } catch (error) {
      alert("❌ Error de conexión");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 font-sans text-slate-900">
      
      {/* FORMULARIO DE CARGA */}
      <div className="max-w-5xl mx-auto bg-white p-6 shadow-xl rounded-lg mb-8 border-b-4 border-blue-600 print:hidden">
        <h2 className="font-bold mb-6 text-blue-800 border-b pb-2">📦 CARGA DE DATOS PL3</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* SECCIÓN SALIDAS */}
          <div className="space-y-3">
            <h3 className="text-xs font-black text-emerald-700 uppercase italic">🛒 Salidas (B2B / B2C / Despachos)</h3>
            <div className="grid grid-cols-2 gap-2">
              <input type="text" name="pB2BV" placeholder="B2B Viajes" onChange={handleChange} className="border p-2 rounded text-sm" />
              <input type="text" name="pB2BB" placeholder="B2B Bultos" onChange={handleChange} className="border p-2 rounded text-sm" />
              <input type="text" name="despB" placeholder="Desp. Bultos" onChange={handleChange} className="border p-2 rounded text-sm bg-indigo-50 font-bold" />
              <input type="text" name="despP" placeholder="Desp. Pallets" onChange={handleChange} className="border p-2 rounded text-sm bg-indigo-50 font-bold" />
            </div>
          </div>

          {/* SECCIÓN DESCARGAS (SIN PL4) */}
          <div className="space-y-3">
            <h3 className="text-xs font-black text-orange-700 uppercase italic">🚛 Camiones y Bultos Descargados</h3>
            <div className="grid grid-cols-3 gap-2">
              <input type="text" name="descTort" placeholder="Tortugas" onChange={handleChange} className="border p-2 rounded text-sm" />
              <input type="text" name="descMCR" placeholder="MCR" onChange={handleChange} className="border p-2 rounded text-sm" />
              <input type="text" name="descAduana" placeholder="Aduana" onChange={handleChange} className="border p-2 rounded text-sm" />
            </div>
            <input type="text" name="bultosTotal" placeholder="BULTOS TOTALES DESCARGADOS" onChange={handleChange} className="w-full border-2 border-orange-200 p-2 rounded font-black text-center bg-orange-50" />
          </div>

          {/* CONTROL Y OBSERVACIONES */}
          <div className="md:col-span-2 space-y-4 pt-4 border-t">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <input type="text" name="rmaCant" placeholder="RMA Unid." onChange={handleChange} className="border p-2 rounded text-sm font-bold" />
              <input type="text" name="rendiciones" placeholder="Viajes Rend." onChange={handleChange} className="border p-2 rounded text-sm font-bold" />
              <input type="text" name="movInt" placeholder="Mov. Internos" onChange={handleChange} className="border p-2 rounded text-sm" />
              <input type="text" name="ciclicoLoc" placeholder="Loc. Cíclico" onChange={handleChange} className="border p-2 rounded text-sm" />
            </div>
            <textarea name="obs" placeholder="OBSERVACIONES (Columna Q)..." onChange={handleChange} className="w-full border-2 border-blue-100 p-3 rounded text-sm h-20" />
          </div>
        </div>

        <div className="mt-6 flex gap-4 justify-center">
          <button onClick={handleSave} className="bg-emerald-600 text-white px-10 py-2 rounded-lg font-black uppercase text-xs">{isSaving ? "Guardando..." : "Guardar en Sheet"}</button>
          <button onClick={() => window.print()} className="bg-slate-800 text-white px-10 py-2 rounded-lg font-black uppercase text-xs">Generar PDF</button>
        </div>
      </div>

      {/* REPORTE PARA IMPRIMIR */}
      <div className="max-w-5xl mx-auto bg-white p-10 border border-slate-200 shadow-2xl relative">
        <div className="flex justify-between items-center mb-8 border-b-4 border-blue-600 pb-5">
          <div className="flex items-center gap-3">
            <div className="bg-slate-900 text-white p-2 font-black text-xl">OCASA</div>
            <h1 className="text-xl font-black text-slate-800 uppercase tracking-tighter">Informe Operativo PL3</h1>
          </div>
          <div className="text-right bg-slate-100 p-2 rounded">
            <p className="text-[10px] font-bold text-blue-600 uppercase italic">Turno: {datos.turno}</p>
            <p className="font-black text-xs uppercase">{datos.fecha}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="border border-emerald-500 rounded-xl p-4 bg-emerald-50/10">
            <p className="text-[9px] font-black text-emerald-700 uppercase mb-2">🛒 Picking</p>
            <p className="text-xs">B2B: <strong>{datos.pB2BV} V / {datos.pB2BB} B</strong></p>
            <p className="text-xs">B2C: <strong>{datos.pB2CV} V / {datos.pB2CB} B</strong></p>
          </div>
          <div className="border border-indigo-600 rounded-xl p-4 bg-indigo-50/10 text-center">
            <p className="text-[9px] font-black text-indigo-700 uppercase mb-1">🚚 Despachos</p>
            <p className="text-3xl font-black">{datos.despB} / {datos.despP}</p>
            <p className="text-[8px] font-bold text-slate-400 uppercase">Bultos / Pallets</p>
          </div>
          <div className="border border-orange-500 rounded-xl p-4 bg-orange-50/10 text-center">
            <p className="text-[9px] font-black text-orange-700 uppercase mb-1">📦 Descargas Gral.</p>
            <p className="text-3xl font-black text-orange-900">{datos.bultosTotal}</p>
            <p className="text-[8px] font-bold text-slate-400 uppercase">Bultos Totales</p>
          </div>

          <div className="col-span-3 grid grid-cols-4 gap-4 py-4 border-t border-b border-slate-100">
            <div className="text-center">
              <p className="text-[8px] font-bold text-slate-400 uppercase">Tortugas</p>
              <p className="font-black">{datos.descTort}</p>
            </div>
            <div className="text-center">
              <p className="text-[8px] font-bold text-slate-400 uppercase">MCR</p>
              <p className="font-black">{datos.descMCR}</p>
            </div>
            <div className="text-center">
              <p className="text-[8px] font-bold text-slate-400 uppercase">Aduana</p>
              <p className="font-black">{datos.descAduana}</p>
            </div>
            <div className="text-center bg-slate-50 rounded p-1">
              <p className="text-[8px] font-bold text-slate-400 uppercase">RMA / Rend.</p>
              <p className="text-[10px] font-black">{datos.rmaCant} U / {datos.rendiciones} V</p>
            </div>
          </div>

          <div className="col-span-3">
             <p className="text-[9px] font-black text-slate-800 uppercase mb-1 italic">Observaciones:</p>
             <div className="border border-slate-200 p-3 rounded-lg text-xs italic text-slate-600 min-h-[50px] bg-slate-50">
               {datos.obs || "Sin novedades."}
             </div>
          </div>
        </div>

        <div className="mt-10 pt-4 border-t text-center text-[8px] font-bold text-slate-400 uppercase tracking-widest">
          Optimización Logística PL3 — OCASA 2026
        </div>
      </div>
    </div>
  );
};

export default App;
