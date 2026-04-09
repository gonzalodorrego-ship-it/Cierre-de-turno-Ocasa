import React, { useState, useEffect } from 'react';

const App = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [datos, setDatos] = useState({
    fecha: "", turno: "Mañana",
    pB2BV: '0', pB2BB: '0', pB2CV: '0', pB2CB: '0',
    despB: '0', despP: '0',
    descTort: '0', descMCR: '0', descAduana: '0',
    bultosTotal: '0', // Columna L: Bultos desc.
    movInt: '0', ciclicoLoc: 'S/N', rmaCant: '0', rendiciones: '0',
    obs: '' // Columna Q: Observaciones
  });

  // URL DE IMPLEMENTACIÓN ACTUALIZADA
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
      alert("✅ ¡Cierre guardado correctamente en las columnas A-Q!");
      window.scrollTo({ top: 900, behavior: 'smooth' });
    } catch (error) {
      alert("❌ Error al guardar datos");
    } finally {
      setIsSaving(false);
    }
  };

  const totalCamiones = Number(datos.descTort) + Number(datos.descMCR) + Number(datos.descAduana);

  return (
    <div className="min-h-screen bg-slate-100 p-4 font-sans text-slate-900">
      
      {/* PANEL DE CARGA */}
      <div className="max-w-5xl mx-auto bg-white p-6 shadow-xl rounded-lg mb-8 border-b-4 border-blue-600 print:hidden">
        <h2 className="font-bold mb-6 text-blue-800 border-b pb-2 tracking-tight">📝 CIERRE OPERATIVO PL3</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* PICKING Y DESPACHO */}
          <div className="space-y-4">
            <h3 className="text-xs font-black text-emerald-700 uppercase border-l-4 border-emerald-500 pl-2">🛒 Salidas</h3>
            <div className="grid grid-cols-2 gap-2">
              <input type="text" name="pB2BV" placeholder="B2B Viajes" onChange={handleChange} className="border p-2 rounded text-sm font-bold" />
              <input type="text" name="pB2BB" placeholder="B2B Bultos" onChange={handleChange} className="border p-2 rounded text-sm font-bold" />
              <input type="text" name="despB" placeholder="Desp. Bultos" onChange={handleChange} className="border p-2 rounded text-sm bg-indigo-50 font-bold" />
              <input type="text" name="despP" placeholder="Desp. Pallets" onChange={handleChange} className="border p-2 rounded text-sm bg-indigo-50 font-bold" />
            </div>
          </div>

          {/* DESCARGAS (Tortugas, MCR, Aduana) */}
          <div className="space-y-4">
            <h3 className="text-xs font-black text-orange-700 uppercase border-l-4 border-orange-500 pl-2">📦 Descargas</h3>
            <div className="grid grid-cols-3 gap-2">
              <input type="text" name="descTort" placeholder="Tortugas" onChange={handleChange} className="border p-2 rounded text-sm font-bold" />
              <input type="text" name="descMCR" placeholder="MCR" onChange={handleChange} className="border p-2 rounded text-sm font-bold" />
              <input type="text" name="descAduana" placeholder="Aduana" onChange={handleChange} className="border p-2 rounded text-sm font-bold" />
            </div>
            <input type="text" name="bultosTotal" placeholder="BULTOS DESCARGADOS (Gral.)" onChange={handleChange} className="w-full border-2 border-orange-200 p-2 rounded font-black text-orange-900 bg-orange-50 text-center" />
          </div>

          {/* CONTROL Y STOCK */}
          <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4 border-t pt-4">
            <input type="text" name="rmaCant" placeholder="RMA Unid." onChange={handleChange} className="border p-2 rounded text-sm font-bold border-purple-200" />
            <input type="text" name="rendiciones" placeholder="Viajes Rendidos" onChange={handleChange} className="border p-2 rounded text-sm font-bold border-blue-200" />
            <input type="text" name="movInt" placeholder="Mov. Internos" onChange={handleChange} className="border p-2 rounded text-sm font-bold" />
            <input type="text" name="ciclicoLoc" placeholder="Loc. Cíclico" onChange={handleChange} className="border p-2 rounded text-sm font-bold" />
          </div>

          {/* OBSERVACIONES */}
          <div className="md:col-span-2">
            <textarea name="obs" placeholder="Observaciones del turno (Columna Q)..." onChange={handleChange} className="w-full border p-3 rounded text-sm font-medium bg-yellow-50/20 border-yellow-100" />
          </div>
        </div>

        <div className="mt-8 flex gap-4 justify-center">
            <button onClick={handleSave} disabled={isSaving} className="bg-emerald-600 text-white px-10 py-3 rounded-lg font-black shadow-lg uppercase text-sm">
              {isSaving ? "⏳ Guardando..." : "💾 Guardar en Excel"}
            </button>
            <button onClick={() => window.print()} className="bg-slate-800 text-white px-10 py-3 rounded-lg font-black shadow-lg uppercase text-sm">
              🖨️ Imprimir PDF
            </button>
        </div>
      </div>

      {/* INFORME PARA PDF */}
      <div className="max-w-5xl mx-auto bg-white p-10 border border-slate-200 shadow-2xl relative mb-20">
        <div className="flex justify-between items-center mb-8 border-b-4 border-blue-600 pb-5">
          <img src="/logo_ocasa.png" alt="OCASA" className="h-16 w-auto object-contain" />
          <div className="text-right">
            <h1 className="text-2xl font-black text-slate-800 uppercase leading-none">Cierre Operativo Diálogo</h1>
            <p className="text-xs font-bold text-blue-600 mt-1 uppercase tracking-widest">Planta: PL3 — Turno: {datos.turno}</p>
            <div className="mt-2 bg-slate-900 text-white px-4 py-1 inline-block font-black text-[11px] rounded uppercase tracking-widest tracking-tighter">FECHA: {datos.fecha}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="border-2 border-emerald-700 rounded-2xl p-6">
            <p className="text-emerald-800 font-black text-[10px] uppercase mb-2">🛒 Picking Realizado</p>
            <p className="flex justify-between font-bold border-b pb-1 text-sm">B2B: <span className="font-black text-lg">{datos.pB2BV} V / {datos.pB2BB} B</span></p>
            <p className="flex justify-between font-bold pt-1 text-sm">B2C: <span className="font-black text-lg">{datos.pB2CV} V / {datos.pB2CB} B</span></p>
          </div>

          <div className="border-2 border-indigo-800 rounded-2xl p-6 bg-indigo-50/30 text-center flex flex-col justify-center">
            <p className="text-indigo-900 font-black text-[10px] uppercase mb-1">🚚 Despachos Realizados</p>
            <p className="text-5xl font-black text-indigo-950 leading-none">{datos.despB} / {datos.despP}</p>
            <p className="text-[10px] font-bold text-indigo-600 mt-2 uppercase">Bultos / Pallets</p>
          </div>

          <div className="col-span-2 border-2 border-slate-300 rounded-2xl overflow-hidden bg-white">
            <div className="bg-slate-900 text-white font-black text-[11px] py-2 px-6 uppercase text-center tracking-widest">Descargas y Gestión de Stock</div>
            <div className="grid grid-cols-3 divide-x-2 divide-slate-100 p-6 text-center">
              <div>
                <p className="text-[10px] font-black text-slate-500 uppercase">Camiones (T/M/A)</p>
                <p className="text-4xl font-black">{totalCamiones}</p>
              </div>
              <div className="bg-orange-50/20">
                <p className="text-[10px] font-black text-orange-700 uppercase">Total Bultos</p>
                <p className="text-4xl font-black text-orange-900">{datos.bultosTotal}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black text-emerald-700 uppercase">Stock / Cíclico</p>
                <p className="font-black text-slate-800 text-sm">Mov: {datos.movInt}</p>
                <p className="font-black text-slate-800 text-sm">Loc: {datos.ciclicoLoc}</p>
              </div>
            </div>
          </div>

          <div className="col-span-2 grid grid-cols-2 gap-4 border-t pt-4">
            <div className="bg-purple-50 p-4 rounded-xl border-2 border-purple-200">
               <p className="text-[10px] font-black text-purple-700 uppercase">RMA Realizados</p>
               <p className="text-3xl font-black">{datos.rmaCant}</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-xl border-2 border-blue-200">
               <p className="text-[10px] font-black text-blue-700 uppercase">Rendiciones</p>
               <p className="text-3xl font-black">{datos.rendiciones}</p>
            </div>
            <div className="col-span-2 bg-yellow-50/30 p-4 rounded-xl border-2 border-yellow-200">
               <p className="text-[10px] font-black text-yellow-800 uppercase mb-1">📋 Observaciones:</p>
               <p className="text-sm font-medium italic text-slate-600">{datos.obs || "Sin novedades en el turno."}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
