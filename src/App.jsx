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
      {/* PANEL DE CONTROL */}
      <div className="max-w-4xl mx-auto bg-white p-6 shadow-xl rounded-lg mb-8 border-b-4 border-blue-600 print:hidden">
        <h2 className="font-bold mb-4 text-blue-800 flex items-center gap-2">📝 PANEL DE CARGA - CIERRE PL3</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex flex-col"><label className="text-[10px] font-bold text-gray-400">VIAJES B2B</label><input type="text" name="b2bV" placeholder="0" onChange={handleChange} className="border p-2 rounded text-sm bg-gray-50" /></div>
          <div className="flex flex-col"><label className="text-[10px] font-bold text-gray-400">BULTOS B2B</label><input type="text" name="b2bB" placeholder="0" onChange={handleChange} className="border p-2 rounded text-sm bg-gray-50" /></div>
          <div className="flex flex-col"><label className="text-[10px] font-bold text-gray-400">BULTOS DESP.</label><input type="text" name="despB" placeholder="0" onChange={handleChange} className="border p-2 rounded text-sm bg-gray-50" /></div>
          <div className="flex flex-col"><label className="text-[10px] font-bold text-gray-400">PALLETS DESP.</label><input type="text" name="despP" placeholder="0" onChange={handleChange} className="border p-2 rounded text-sm bg-gray-50" /></div>
          <div className="flex flex-col col-span-2"><label className="text-[10px] font-bold text-gray-400">LOC. CÍCLICO</label><input type="text" name="ciclicoLoc" placeholder="Ej: A11, B22" onChange={handleChange} className="border p-2 rounded text-sm bg-gray-50" /></div>
          <div className="flex flex-col"><label className="text-[10px] font-bold text-gray-400">MOV. INTERNOS</label><input type="text" name="movInt" placeholder="0" onChange={handleChange} className="border p-2 rounded text-sm bg-gray-50" /></div>
          <div className="flex flex-col col-span-2 md:col-span-4"><label className="text-[10px] font-bold text-gray-400">OBSERVACIONES</label><textarea name="obs" placeholder="Novedades..." onChange={handleChange} className="border p-2 rounded text-sm bg-gray-50 h-12"></textarea></div>
        </div>
      </div>

      {/* REPORTE VISUAL */}
      <div className="max-w-4xl mx-auto bg-white p-8 border border-gray-300 shadow-2xl relative" id="informe">
        <div className="flex justify-between items-center mb-6 border-b-4 border-cyan-500 pb-4">
          {/* USAMOS EL LOGO QUE SUBISTE */}
          <img src="../logo_ocasa.png" alt="OCASA" className="h-14 w-auto" />
          
          <div className="text-right">
            <h2 className="text-xl font-black tracking-tight text-slate-700 uppercase leading-none">Informe de Cierre de Operaciones</h2>
            <p className="text-[10px] font-bold text-slate-500 uppercase mt-1">Planta: PL3 — Turno: Tarde</p>
            <div className="mt-2 bg-slate-800 text-white px-3 py-1 inline-block font-bold text-xs rounded-sm">FECHA: {datos.fecha}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="border-2 border-emerald-700 rounded-xl p-4 relative bg-white">
            <span className="absolute -top-3 left-4 bg-white px-2 font-black text-emerald-800 text-[10px]">🛒 PREPARACIÓN (PICKING)</span>
            <div className="mt-1">
              <p className="flex justify-between border-b pb-1 text-sm font-bold">B2B: <span className="text-lg font-black">{datos.b2bV} V / {datos.b2bB} B</span></p>
              <p className="flex justify-between pt-1 text-sm font-bold">B2C: <span className="text-lg font-black">{datos.b2cV} V / {datos.b2cB} B</span></p>
            </div>
          </div>

          <div className="border-2 border-indigo-800 rounded-xl p-4 relative bg-indigo-50/30 text-center flex flex-col justify-center">
            <span className="absolute -top-3 left-4 bg-white px-2 font-black text-indigo-900 text-[10px]">🚚 DESPACHOS (SALIDAS)</span>
            <p className="text-4xl font-black text-indigo-900 leading-none">{datos.despB} / {datos.despP}</p>
            <p className="text-[10px] font-black uppercase mt-1 text-indigo-700 tracking-tighter">Bultos / Pallets Totales</p>
          </div>

          <div className="col-span-2 border-2 border-slate-300 rounded-xl overflow-hidden shadow-sm">
            <div className="bg-slate-800 text-white font-bold text-[10px] py-1 px-4 uppercase tracking-widest">Descargas y Movimientos Internos</div>
            <div className="grid grid-cols-3 divide-x-2">
              <div className="p-4 bg-orange-50/50">
                <p className="text-[9px] font-black text-orange-700 uppercase mb-1">Descargas</p>
                <p className="text-sm font-bold italic text-slate-700">MCR 2: <span className="text-xl font-black">{datos.descMCR}</span></p>
                <p className="text-[8px] text-slate-400 font-bold italic mt-2 border-t pt-1 text-right italic">SISTEMA SIN PL4</p>
              </div>
              <div className="p-4 text-center flex flex-col justify-center">
                <p className="text-[9px] font-black text-emerald-700 uppercase mb-1 font-bold">Mov. Stock</p>
                <p className="text-3xl font-black text-slate-800 leading-none">{datos.movInt}</p>
                <p className="text-[8px] font-bold text-slate-400 mt-1">BULTOS TOTALES</p>
              </div>
              <div className="p-4 text-center flex flex-col justify-center bg-sky-50/30">
                <p className="text-[9px] font-black text-sky-700 uppercase mb-1 italic">Cíclico</p>
                <p className="text-lg font-black uppercase text-slate-800 tracking-tight">{datos.ciclicoLoc || '---'}</p>
              </div>
            </div>
          </div>

          <div className="col-span-2 border-2 border-yellow-500 rounded-xl p-4 relative bg-yellow-50/20">
            <span className="absolute -top-3 left-4 bg-white px-2 font-black text-yellow-700 text-[10px] uppercase">📋 Observaciones</span>
            <p className="text-[11px] italic font-semibold text-slate-600 leading-tight">
              {datos.obs || 'Sin novedades de relevancia durante el turno tarde en Planta PL3.'}
            </p>
          </div>
        </div>
        
        <div className="mt-8 border-t pt-2 flex justify-between italic text-slate-300 font-bold text-[8px] uppercase tracking-[0.2em]">
            <span>Tesis: Optimización Logística PL3</span>
            <span>Generado por Sistema de Gestión de Turno</span>
        </div>
      </div>
    </div>
  );
};

export default App;
