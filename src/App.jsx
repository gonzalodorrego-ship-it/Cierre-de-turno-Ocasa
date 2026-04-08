import React, { useState } from 'react';

const App = () => {
  const [datos, setDatos] = useState({
    fecha: "8 de abril de 2026",
    b2bV: '0', b2bB: '0',
    b2cV: '0', b2cB: '0',
    despB: '0', despP: '0',
    descMCR: '2', descTort: '0',
    ciclicoLoc: '', movInt: '0', obs: ''
  });

  const handleChange = (e) => setDatos({...datos, [e.target.name]: e.target.value});

  return (
    <div className="min-h-screen bg-slate-100 p-4 font-sans text-slate-900">
      {/* PANEL DE CONTROL - Solo se ve en la web, no sale en la captura si encuadrás bien */}
      <div className="max-w-4xl mx-auto bg-white p-6 shadow-xl rounded-lg mb-8 border-b-4 border-blue-600 print:hidden">
        <h2 className="font-bold mb-4 text-blue-800 flex items-center gap-2">
          📝 PANEL DE CARGA - CIERRE PL3
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex flex-col">
            <label className="text-[10px] font-bold text-gray-500 uppercase">B2B Viajes</label>
            <input type="text" name="b2bV" placeholder="0" onChange={handleChange} className="border p-2 rounded text-sm bg-gray-50" />
          </div>
          <div className="flex flex-col">
            <label className="text-[10px] font-bold text-gray-500 uppercase">B2B Bultos</label>
            <input type="text" name="b2bB" placeholder="0" onChange={handleChange} className="border p-2 rounded text-sm bg-gray-50" />
          </div>
          <div className="flex flex-col">
            <label className="text-[10px] font-bold text-gray-500 uppercase">Total Bultos Despacho</label>
            <input type="text" name="despB" placeholder="0" onChange={handleChange} className="border p-2 rounded text-sm bg-gray-50" />
          </div>
          <div className="flex flex-col">
            <label className="text-[10px] font-bold text-gray-500 uppercase">Total Pallets Despacho</label>
            <input type="text" name="despP" placeholder="0" onChange={handleChange} className="border p-2 rounded text-sm bg-gray-50" />
          </div>
          <div className="flex flex-col col-span-2">
            <label className="text-[10px] font-bold text-gray-500 uppercase">Localizadores Cíclico</label>
            <input type="text" name="ciclicoLoc" placeholder="Ej: A11, B22, C04" onChange={handleChange} className="border p-2 rounded text-sm bg-gray-50" />
          </div>
          <div className="flex flex-col">
            <label className="text-[10px] font-bold text-gray-500 uppercase">Movimientos Internos</label>
            <input type="text" name="movInt" placeholder="0" onChange={handleChange} className="border p-2 rounded text-sm bg-gray-50" />
          </div>
          <div className="flex flex-col col-span-2 md:col-span-4">
            <label className="text-[10px] font-bold text-gray-500 uppercase">Observaciones</label>
            <textarea name="obs" placeholder="Novedades del turno..." onChange={handleChange} className="border p-2 rounded text-sm bg-gray-50 h-16"></textarea>
          </div>
        </div>
      </div>

      {/* REPORTE VISUAL - ESTO ES LO QUE CAPTURÁS */}
      <div className="max-w-4xl mx-auto bg-white p-8 border border-gray-300 shadow-2xl relative overflow-hidden" id="informe">
        
        {/* ENCABEZADO */}
        <div className="flex justify-between items-start mb-6 border-b-4 border-cyan-500 pb-4">
          <div className="flex flex-col">
            <h1 className="text-6xl font-black italic text-slate-800 tracking-tighter">OCASA <span className="text-cyan-500 text-5xl">↗</span></h1>
          </div>
          <div className="text-right">
            <h2 className="text-xl font-black tracking-tight text-slate-700">INFORME DE CIERRE DE OPERACIONES</h2>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">PLANTA: PL3 — TURNO: TARDE</p>
            <div className="mt-2 bg-slate-800 text-white px-4 py-1 inline-block font-bold text-sm rounded-sm">
              FECHA: {datos.fecha}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          
          {/* SECCIÓN PICKING */}
          <div className="border-2 border-emerald-700 rounded-xl p-4 relative bg-white shadow-sm">
            <span className="absolute -top-3 left-4 bg-white px-2 font-black text-emerald-800 text-xs tracking-tighter">🛒 RESUMEN DE PREPARACIÓN (PICKING)</span>
            <div className="mt-2 space-y-2">
                <div className="flex justify-between items-center border-b pb-1">
                    <span className="text-sm font-bold text-slate-600">B2B:</span>
                    <span className="text-lg font-black text-slate-800">{datos.b2bV} V / {datos.b2bB} Bultos</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-slate-600">B2C:</span>
                    <span className="text-lg font-black text-slate-800">{datos.b2cV} V / {datos.b2cB} Bultos</span>
                </div>
            </div>
          </div>

          {/* SECCIÓN DESPACHOS */}
          <div className="border-2 border-indigo-800 rounded-xl p-4 relative bg-indigo-50/30 shadow-sm text-center flex flex-col justify-center">
            <span className="absolute -top-3 left-4 bg-white px-2 font-black text-indigo-900 text-xs tracking-tighter">🚚 DESPACHOS (SALIDAS)</span>
            <p className="text-4xl font-black text-indigo-900 leading-none">{datos.despB} / {datos.despP}</p>
            <p className="text-[10px] font-black uppercase mt-2 text-indigo-700 tracking-widest">Total Bultos / Pallets</p>
          </div>

          {/* SECCIÓN DESCARGAS Y MOVIMIENTOS */}
          <div className="col-span-2 border-2 border-slate-300 rounded-xl overflow-hidden shadow-sm">
            <div className="bg-slate-800 text-white font-bold text-[10px] py-1.5 px-4 uppercase tracking-widest">Descargas y Movimientos Internos</div>
            <div className="grid grid-cols-3 divide-x-2 divide-slate-200">
              <div className="p-4 bg-orange-50/50">
                <p className="text-[10px] font-black text-orange-700 uppercase mb-2">Descargas</p>
                <p className="text-sm font-bold text-slate-700 italic">MCR 2: <span className="text-lg font-black ml-2">{datos.descMCR}</span></p>
                <div className="mt-2 border-t border-orange-200 pt-1">
                    <p className="text-[10px] font-bold text-slate-500 uppercase italic text-right">Sin PL4</p>
                </div>
              </div>
              <div className="p-4 flex flex-col justify-center items-center bg-white">
                <p className="text-[10px] font-black text-emerald-700 uppercase mb-1">Movimientos Stock</p>
                <p className="text-4xl font-black text-slate-800 leading-none">{datos.movInt}</p>
                <p className="text-[9px] font-bold uppercase text-slate-400 mt-1">Bultos Totales</p>
              </div>
              <div className="p-4 bg-sky-50/50 flex flex-col justify-center items-center text-center">
                <p className="text-[10px] font-black text-sky-700 uppercase mb-1 italic">Cíclico (Auditado)</p>
                <p className="text-xl font-black text-slate-800 uppercase tracking-tighter">{datos.ciclicoLoc || '---'}</p>
              </div>
            </div>
          </div>

          {/* SECCIÓN OBSERVACIONES */}
          <div className="col-span-2 border-2 border-yellow-500 rounded-xl p-4 relative bg-yellow-50/30">
            <span className="absolute -top-3 left-4 bg-white px-2 font-black text-yellow-700 text-xs tracking-tighter">📋 OBSERVACIONES Y NOTAS DEL TURNO</span>
            <p className="text-[12px] leading-tight text-slate-700 font-medium italic">
               {datos.obs || 'Sin novedades de relevancia durante el turno tarde en Planta PL3.'}
            </p>
          </div>
        </div>

        {/* PIE DE REPORTE */}
        <div className="mt-8 flex justify-between items-end border-t pt-2">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Tesis: Optimización Logística PL3</p>
            <p className="text-[9px] font-bold text-slate-300 italic uppercase">Generado por Sistema de Gestión de Turno</p>
        </div>
      </div>
    </div>
  );
};

export default App;
