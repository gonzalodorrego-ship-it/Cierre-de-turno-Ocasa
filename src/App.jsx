import React, { useState, useEffect } from 'react';

const App = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [datos, setDatos] = useState({
    fecha: "", turno: "Mañana",
    pB2BV: '0', pB2BB: '0', pB2CV: '0', pB2CB: '0',
    despB: '0', despP: '0',
    // Detalle de Descargas (Camiones) - PL4 RESTAURADO
    descPL4: '0', descTort: '0', descMCR: '0', descAduana: '0',
    // Bultos por Descarga
    bultosPL4: '0', bultosTort: '0', bultosMCR: '0', bultosAduana: '0',
    ciclicoLoc: 'S/N', movInt: '0', obs: '',
    rmaCant: '0', rendiciones: '0' 
  });

  // URL DE IMPLEMENTACIÓN ACTUAL
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

  // Cálculo de totales para el informe
  const totalCamiones = Number(datos.descPL4) + Number(datos.descTort) + Number(datos.descMCR) + Number(datos.descAduana);
  const totalBultos = Number(datos.bultosPL4) + Number(datos.bultosTort) + Number(datos.bultosMCR) + Number(datos.bultosAduana);

  return (
    <div className="min-h-screen bg-slate-100 p-4 font-sans text-slate-900">
      
      {/* PANEL DE CONTROL (ENTRADA DE DATOS) */}
      <div className="max-w-5xl mx-auto bg-white p-6 shadow-xl rounded-lg mb-8 border-b-4 border-blue-600 print:hidden">
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h2 className="font-bold text-blue-800 text-lg">📝 REGISTRO COLABORATIVO PL3 - OCASA</h2>
          <div className="flex gap-4 items-center">
            <select name="turno" onChange={handleChange} className="border p-2 rounded font-bold bg-blue-50 text-blue-800 border-blue-200">
              <option value="Mañana">🌅 Turno Mañana</option>
              <option value="Tarde">🌇 Turno Tarde</option>
            </select>
            <span className="text-slate-400 font-bold text-sm">{datos.fecha}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* SECCIÓN OPERATIVA: PICKING Y DESPACHO */}
          <div className="space-y-4">
            <h3 className="text-xs font-black text-emerald-700 uppercase tracking-widest border-l-4 border-emerald-500 pl-2">🛒 Picking y Despachos</h3>
            <div className="grid grid-cols-2 gap-x-3 gap-y-2">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">B2B (Viajes / Bultos)</label>
                <div className="flex gap-1">
                  {/* AJUSTE: ACALRACIÓN DE CAMPOS VIAJES/BULTOS */}
                  <input type="text" name="pB2BV" placeholder="Viajes" onChange={handleChange} className="w-1/2 border p-2 rounded text-sm font-bold" />
                  <input type="text" name="pB2BB" placeholder="Bultos" onChange={handleChange} className="w-1/2 border p-2 rounded text-sm font-bold" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">B2C (Viajes / Bultos)</label>
                <div className="flex gap-1">
                  {/* AJUSTE: ACALRACIÓN DE CAMPOS VIAJES/BULTOS */}
                  <input type="text" name="pB2CV" placeholder="Viajes" onChange={handleChange} className="w-1/2 border p-2 rounded text-sm font-bold" />
                  <input type="text" name="pB2CB" placeholder="Bultos" onChange={handleChange} className="w-1/2 border p-2 rounded text-sm font-bold" />
                </div>
              </div>
              <input type="text" name="despB" placeholder="Desp. Bultos Totales" onChange={handleChange} className="border p-2 rounded text-sm bg-indigo-50 font-bold border-indigo-200 col-span-2" />
              <input type="text" name="despP" placeholder="Desp. Pallets" onChange={handleChange} className="border p-2 rounded text-sm bg-indigo-50 font-bold border-indigo-200 col-span-2" />
            </div>
          </div>

          {/* CONTROL Y RMA */}
          <div className="space-y-4">
            <h3 className="text-xs font-black text-purple-700 uppercase tracking-widest border-l-4 border-purple-500 pl-2">🔄 RMA y Control</h3>
            <div className="grid grid-cols-1 gap-3">
              <input type="text" name="rmaCant" placeholder="RMA Realizados (Unidades)" onChange={handleChange} className="border-2 border-purple-100 p-2 rounded text-sm font-bold focus:border-purple-400" />
              <input type="text" name="rendiciones" placeholder="Viajes Rendidos" onChange={handleChange} className="border-2 border-blue-100 p-2 rounded text-sm font-bold focus:border-blue-400" />
              <input type="text" name="movInt" placeholder="Mov. Internos Stock" onChange={handleChange} className="border p-2 rounded text-sm font-bold bg-slate-50" />
              <input type="text" name="ciclicoLoc" placeholder="Loc. Cíclico" onChange={handleChange} className="border p-2 rounded text-sm font-bold bg-slate-50" />
            </div>
          </div>
        </div>

        {/* DETALLE DE DESCARGAS: SECCIÓN CORREGIDA Y AMPLIADA */}
        <div className="border-t pt-5 bg-slate-50 p-4 rounded-lg border">
          {/* AJUSTE: TÍTULO RESTAURADO */}
          <h3 className="text-xs font-black text-orange-700 uppercase tracking-widest mb-4 border-b border-orange-200 pb-1">🚛 Camiones y Bultos Descargados</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* AJUSTE: CAMPO PL4 RESTAURADO */}
            <div className="bg-white p-3 rounded border border-orange-100 space-y-2">
                <p className="font-bold text-orange-800 text-xs text-center border-b pb-1">PL4</p>
                <input type="text" name="descPL4" placeholder="Cant. Camiones" onChange={handleChange} className="w-full border p-2 rounded text-sm font-bold text-center" />
                <input type="text" name="bultosPL4" placeholder="Total Bultos PL4" onChange={handleChange} className="w-full border p-2 rounded text-sm bg-orange-50 font-bold text-center border-orange-200" />
            </div>
            <div className="bg-white p-3 rounded border border-blue-100 space-y-2">
                <p className="font-bold text-blue-800 text-xs text-center border-b pb-1">TORTUGAS</p>
                <input type="text" name="descTort" placeholder="Cant. Camiones" onChange={handleChange} className="w-full border p-2 rounded text-sm font-bold text-center" />
                <input type="text" name="bultosTort" placeholder="Total Bultos Tort." onChange={handleChange} className="w-full border p-2 rounded text-sm bg-blue-50 font-bold text-center border-blue-200" />
            </div>
            <div className="bg-white p-3 rounded border border-slate-100 space-y-2">
                <p className="font-bold text-slate-800 text-xs text-center border-b pb-1">MCR</p>
                <input type="text" name="descMCR" placeholder="Cant. Camiones" onChange={handleChange} className="w-full border p-2 rounded text-sm font-bold text-center" />
                <input type="text" name="bultosMCR" placeholder="Total Bultos MCR" onChange={handleChange} className="w-full border p-2 rounded text-sm bg-slate-50 font-bold text-center border-slate-200" />
            </div>
            <div className="bg-white p-3 rounded border border-red-100 space-y-2">
                <p className="font-bold text-red-800 text-xs text-center border-b pb-1">ADUANA</p>
                <input type="text" name="descAduana" placeholder="Cant. Camiones" onChange={handleChange} className="w-full border p-2 rounded text-sm font-bold text-center" />
                <input type="text" name="bultosAduana" placeholder="Total Bultos Aduana" onChange={handleChange} className="w-full border p-2 rounded text-sm bg-red-50 font-bold text-center border-red-200" />
            </div>
          </div>
        </div>

        <div className="mt-8 flex gap-4 justify-center">
          <button onClick={handleSave} disabled={isSaving} className="bg-emerald-600 text-white px-10 py-3 rounded-xl font-black shadow-lg uppercase text-sm">
            {isSaving ? "Guardando..." : "💾 Guardar en Sheet"}
          </button>
          <button onClick={() => window.print()} className="bg-slate-800 text-white px-10 py-3 rounded-xl font-black shadow-lg uppercase text-sm">
            🖨️ Imprimir PDF
          </button>
        </div>
      </div>

      {/* REPORTE OPERATIVO (DISEÑO FINAL PARA PDF) */}
      <div className="max-w-5xl mx-auto bg-white p-10 border border-slate-200 shadow-2xl relative mb-20">
        <div className="flex justify-between items-center mb-8 border-b-4 border-blue-600 pb-5">
           {/* AJUSTE: LOGO DE OCASA RESTAURADO */}
           <img src="https://logodownload.org/wp-content/uploads/2019/08/ocasa-logo.png" alt="OCASA LOGISTICA" className="h-14 w-auto object-contain" />
           <div className="text-right">
             <h1 className="text-2xl font-black text-slate-800 uppercase leading-none tracking-tighter">Informe Operativo PL3</h1>
             <p className="text-xs font-bold text-blue-600 mt-1 uppercase tracking-widest italic">Turno: {datos.turno}</p>
             <div className="mt-2 bg-slate-900 text-white px-4 py-1.5 inline-block font-black text-[11px] rounded uppercase tracking-widest tracking-tighter">FECHA: {datos.fecha}</div>
           </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* PICKING */}
          <div className="border-2 border-emerald-700 rounded-2xl p-6 relative bg-white">
            <span className="absolute -top-3 left-6 bg-white px-3 font-black text-emerald-800 text-[11px] uppercase tracking-widest">🛒 Picking Preparado</span>
            <div className="space-y-3">
              <div className="flex justify-between items-end border-b pb-1">
                <span className="font-bold text-slate-500">B2B:</span>
                <span className="font-black text-xl text-slate-900">{datos.pB2BV} <small className="text-[10px] font-normal text-slate-400">VIAJES</small> / {datos.pB2BB} <small className="text-[10px] font-normal text-slate-400">BULTOS</small></span>
              </div>
              <div className="flex justify-between items-end">
                <span className="font-bold text-slate-500">B2C:</span>
                <span className="font-black text-xl text-slate-900">{datos.pB2CV} <small className="text-[10px] font-normal text-slate-400">VIAJES</small> / {datos.pB2CB} <small className="text-[10px] font-normal text-slate-400">BULTOS</small></span>
              </div>
            </div>
          </div>

          {/* DESPACHOS */}
          <div className="border-2 border-indigo-800 rounded-2xl p-6 bg-indigo-50/30 text-center flex flex-col justify-center relative shadow-inner">
            <span className="absolute -top-3 left-6 bg-white px-3 font-black text-indigo-900 text-[11px] uppercase tracking-widest">🚚 Despachos Realizados</span>
            <p className="text-6xl font-black text-indigo-950 leading-none">{datos.despB} / {datos.despP}</p>
            <p className="text-[10px] font-bold text-indigo-500 mt-2 uppercase tracking-widest">Bultos Totales / Pallets</p>
          </div>
        </div>

        {/* DETALLE DE DESCARGAS (SECCIÓN RESTAURADA Y COMPLETA) */}
        <div className="col-span-2 border-2 border-slate-300 rounded-2xl overflow-hidden bg-white mb-6 shadow-sm">
             <div className="bg-slate-900 text-white font-black text-[11px] py-2.5 px-6 uppercase text-center tracking-widest">Descargas, Recepción y Gestión de Stock</div>
             <div className="grid grid-cols-3 divide-x divide-slate-100 p-6 text-center">
                
                {/* Resumen Totales */}
                <div className="p-4 flex flex-col justify-center bg-white">
                    <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">Camiones Operados</p>
                    <p className="text-5xl font-black text-slate-900 leading-none">{totalCamiones}</p>
                    <div className="mt-3 pt-2 border-t border-slate-100">
                        <p className="text-[10px] font-black text-orange-700 uppercase">Total Bultos</p>
                        <p className="text-2xl font-black text-slate-800">{totalBultos.toLocaleString('es-AR')}</p>
                    </div>
                </div>

                {/* Detalle Orígenes (PL4 RESTAURADO) */}
                <div className="p-4 bg-orange-50/20 text-left">
                    <p className="text-[9px] font-black text-orange-700 uppercase mb-2 italic">Detalle Orígenes</p>
                    <div className="space-y-1.5 text-sm font-medium text-slate-700">
                        <p className="flex justify-between border-b pb-0.5">PL4: <span className="font-bold text-slate-900">{datos.descPL4} C / {datos.bultosPL4} B</span></p>
                        <p className="flex justify-between border-b pb-0.5 text-blue-700">TORTUGAS: <span className="font-bold text-blue-900">{datos.descTort} C / {datos.bultosTort} B</span></p>
                        <p className="flex justify-between border-b pb-0.5">MCR: <span className="font-bold text-slate-900">{datos.descMCR} C / {datos.bultosMCR} B</span></p>
                        <p className="flex justify-between text-red-600">ADUANA: <span className="font-bold text-red-900">{datos.descAduana} C / {datos.bultosAduana} B</span></p>
                    </div>
                </div>

                {/* Stock Interno */}
                <div className="p-4 space-y-3">
                   <div>
                       <p className="text-[10px] font-black text-emerald-700 uppercase leading-none mb-1">Mov. Stock</p>
                       <p className="text-2xl font-black text-slate-800">{datos.movInt}</p>
                   </div>
                   <div className="pt-2 border-t border-slate-100">
                       <p className="text-[10px] font-black text-sky-700 uppercase leading-none mb-1">Loc. Cíclico</p>
                       <p className="text-xl font-black text-slate-800">{datos.ciclicoLoc}</p>
                   </div>
                </div>

             </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* RMA */}
          <div className="bg-purple-50 border-2 border-purple-800 rounded-2xl p-5 flex justify-between items-center shadow-inner relative">
             <span className="absolute -top-3 left-6 bg-white px-3 font-black text-purple-900 text-[10px] uppercase tracking-widest">🔄 Logística Inversa</span>
             <div>
               <p className="text-4xl font-black text-purple-900 leading-none">{datos.rmaCant}</p>
               <p className="text-[10px] font-bold text-purple-500 uppercase mt-1">Unidades RMA Realizadas</p>
             </div>
             <div className="h-12 w-12 bg-purple-200 rounded-full flex items-center justify-center text-purple-800 font-black text-xl">R</div>
          </div>

          {/* VIAJES RENDIDOS */}
          <div className="bg-blue-50 border-2 border-blue-800 rounded-2xl p-5 flex justify-between items-center shadow-inner relative">
             <span className="absolute -top-3 left-6 bg-white px-3 font-black text-blue-900 text-[10px] uppercase tracking-widest">🧾 Control de Viajes</span>
             <div>
               <p className="text-4xl font-black text-blue-900 leading-none">{datos.rendiciones}</p>
               <p className="text-[10px] font-bold text-blue-500 uppercase mt-1">Viajes Rendidos</p>
             </div>
             <div className="h-12 w-12 bg-blue-200 rounded-full flex items-center justify-center text-blue-800 font-black text-xl">V</div>
          </div>
        </div>
        
        <div className="mt-12 pt-5 border-t border-slate-100 flex justify-between items-center italic text-slate-400 font-bold text-[9px] uppercase tracking-[0.4em]">
           <span>Optimización Logística PL3 — Tesis 2026</span>
           <span className="text-blue-500">OCASA LOGÍSTICA</span>
        </div>
      </div>
    </div>
  );
};

export default App;
