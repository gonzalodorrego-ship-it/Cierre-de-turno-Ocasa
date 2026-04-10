import React, { useState, useEffect } from 'react';

// ─── Google Fonts ────────────────────────────────────────────────────────────
const fontLink = document.createElement('link');
fontLink.rel = 'stylesheet';
fontLink.href = 'https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Barlow:wght@400;500;600;700&family=Barlow+Semi+Condensed:wght@500;600;700&display=swap';
document.head.appendChild(fontLink);

// ─── Styles ──────────────────────────────────────────────────────────────────
const styleTag = document.createElement('style');
styleTag.textContent = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --teal:        #00B4B4;
    --teal-dark:   #008C8C;
    --teal-light:  #E0F7F7;
    --teal-mid:    #B2E8E8;
    --black:       #1A1A1A;
    --border:      #E0E0E0;
    --bg:          #F5F7F7;
    --white:       #FFFFFF;
    --text-main:   #1A1A1A;
    --text-muted:  #777777;
    --wpp:         #25D366;
    --slack:       #4A154B;
    --gmail:       #DB4437;
  }
  body {
    font-family: 'Barlow', sans-serif;
    background: var(--bg);
    color: var(--text-main);
  }
  
  /* ANCHO EXTENDIDO SOLICITADO */
  .main-wrap { 
    max-width: 95%; 
    margin: 0 auto; 
    padding: 15px; 
  }

  .app-header {
    background: var(--white);
    position: sticky; top: 0; z-index: 100;
    border-bottom: 2px solid var(--teal);
    padding: 8px 0;
  }
  .header-inner {
    display: flex; align-items: center; justify-content: space-between;
    max-width: 95%; margin: 0 auto; padding: 0 15px;
  }
  .header-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 18px; font-weight: 800; text-transform: uppercase;
  }
  .header-right { display: flex; align-items: center; gap: 10px; }
  .turno-select {
    background: var(--teal-light); border: 1px solid var(--teal-mid);
    color: var(--teal-dark); padding: 5px 10px; border-radius: 5px;
    font-family: 'Barlow Condensed', sans-serif; font-weight: 700; cursor: pointer;
  }
  .date-badge {
    background: var(--teal); color: var(--white);
    padding: 5px 12px; border-radius: 5px;
    font-family: 'Barlow Condensed', sans-serif; font-weight: 800;
  }

  /* PANELES DE CARGA */
  .panel-card {
    background: var(--white); border-radius: 8px; padding: 15px;
    border: 1px solid var(--border); margin-bottom: 12px;
  }
  .section-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 11px; font-weight: 800; text-transform: uppercase;
    display: flex; align-items: center; gap: 6px; margin-bottom: 12px;
  }
  .input-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; }
  .input-group { display: flex; flex-direction: column; gap: 4px; }
  .input-label { font-size: 9px; font-weight: 700; text-transform: uppercase; color: var(--text-muted); }
  .input-field {
    border: 1px solid var(--border); border-radius: 5px; padding: 8px;
    font-family: 'Barlow Semi Condensed', sans-serif; font-size: 13px; font-weight: 600; outline: none;
  }
  .obs-input { width: 100%; border: 1px solid var(--border); border-radius: 5px; padding: 10px; font-family: inherit; resize: vertical; }

  /* REPORTE */
  .report-preview {
    background: var(--white); border-radius: 8px; border: 1px solid var(--border);
    overflow: hidden; margin-top: 15px;
  }
  .report-header {
    padding: 12px 20px; display: flex; justify-content: space-between; align-items: center;
    border-bottom: 3px solid var(--teal);
  }
  .report-title { font-size: 20px; font-weight: 900; text-transform: uppercase; }
  .report-body { padding: 15px 20px; }
  
  .report-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px; }
  
  .metric-card {
    border: 1px solid var(--border); border-radius: 8px; padding: 12px; position: relative;
  }
  .metric-card-label {
    font-size: 9px; font-weight: 800; text-transform: uppercase;
    position: absolute; top: -6px; left: 12px; background: white; padding: 0 4px;
  }
  .metric-row { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 6px; }
  .metric-val { font-family: 'Barlow Condensed', sans-serif; font-size: 18px; font-weight: 900; }
  .hero-number { font-size: 32px; font-weight: 900; line-height: 1; color: var(--teal-dark); }
  
  .desc-table-wrap { border: 1px solid var(--border); border-radius: 8px; overflow: hidden; margin-bottom: 12px; }
  .desc-table-header { background: var(--black); color: white; padding: 6px 15px; font-size: 10px; font-weight: 800; text-transform: uppercase; }
  .desc-table-body { display: grid; grid-template-columns: 1fr 1.2fr 1fr; background: white; }
  .desc-col { padding: 12px; border-right: 1px solid var(--border); }
  .desc-col:last-child { border-right: none; }

  /* SECCION COMPARTIR Y ACCIONES AL FINAL */
  .share-section {
    padding: 15px; border-top: 1px solid var(--border); background: #fcfdfd;
    display: flex; flex-direction: column; align-items: center; gap: 10px;
  }
  .share-label { font-size: 10px; font-weight: 800; text-transform: uppercase; color: var(--text-muted); }
  .btn-group { display: flex; gap: 10px; }
  .btn-subtle {
    padding: 6px 14px; font-size: 10px; font-family: 'Barlow Condensed', sans-serif;
    font-weight: 800; text-transform: uppercase; border: 1px solid; border-radius: 4px;
    background: transparent; cursor: pointer; transition: 0.2s;
  }
  .btn-wpp { border-color: var(--wpp); color: var(--wpp); }
  .btn-slack { border-color: var(--slack); color: var(--slack); }
  .btn-gmail { border-color: var(--gmail); color: var(--gmail); }

  .action-footer {
    padding: 15px; display: flex; justify-content: center; gap: 12px;
    background: #f8fafa; border-top: 1px solid var(--border);
  }
  .btn-main {
    padding: 10px 20px; font-family: 'Barlow Condensed', sans-serif;
    font-weight: 800; text-transform: uppercase; border-radius: 6px;
    cursor: pointer; border: none; font-size: 12px;
  }
  .btn-save { background: var(--teal); color: white; }
  .btn-print { background: var(--black); color: white; }

  .report-footer {
    border-top: 1px solid var(--border); padding: 8px 20px;
    display: flex; justify-content: space-between; font-size: 8px; font-weight: 700;
    text-transform: uppercase; color: var(--text-muted);
  }

  @media print {
    .panel-area, .share-section, .action-footer { display: none !important; }
    .main-wrap { max-width: 100%; padding: 0; }
  }
`;
document.head.appendChild(styleTag);

// ─── App ─────────────────────────────────────────────────────────────────────
const App = () => {
  const [d, setD] = useState({
    fecha: new Date().toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' }),
    turno: 'Mañana', pB2BV: '', pB2BB: '', pB2CV: '', pB2CB: '',
    despV: '', despB: '', despP: '',
    descPL4: '', descTort: '', descMCR: '', descAduana: '',
    bultosPL4: '', bultosTort: '', bultosMCR: '', bultosAduana: '',
    ciclicoLoc: '', ciclicoSKU: '', ciclicoBultos: '', movInt: '', obs: '',
    rmaCant: '', rendiciones: '',
  });

  const handle = e => setD({ ...d, [e.target.name]: e.target.value });
  const n = v => v || '0';
  const totalC = [d.descPL4, d.descTort, d.descMCR, d.descAduana].reduce((a, b) => a + (Number(b) || 0), 0);
  const totalB = [d.bultosPL4, d.bultosTort, d.bultosMCR, d.bultosAduana].reduce((a, b) => a + (Number(b) || 0), 0);

  const handleSave = async () => {
    alert("Guardando en Google Sheets...");
  };

  return (
    <div>
      <div className="app-header">
        <div className="header-inner">
          <div className="header-title">PL3 — Cierre de Turno</div>
          <div className="header-right">
            <select name="turno" value={d.turno} onChange={handle} className="turno-select">
              <option>Mañana</option><option>Tarde</option><option>Noche</option>
            </select>
            <div className="date-badge">{d.fecha}</div>
          </div>
        </div>
      </div>

      <div className="main-wrap">
        <div className="panel-area">
          <div className="panel-card">
            <div className="section-title">📊 Datos del Turno</div>
            <div className="input-grid">
              <div className="input-group"><span className="input-label">B2B Viajes/Bultos</span>
                <div style={{display:'flex', gap:4}}>
                  <input name="pB2BV" placeholder="VJ" value={d.pB2BV} onChange={handle} className="input-field" />
                  <input name="pB2BB" placeholder="BLT" value={d.pB2BB} onChange={handle} className="input-field" />
                </div>
              </div>
              <div className="input-group"><span className="input-label">Despachos V/B/P</span>
                <div style={{display:'flex', gap:4}}>
                  <input name="despV" placeholder="V" value={d.despV} onChange={handle} className="input-field" />
                  <input name="despB" placeholder="B" value={d.despB} onChange={handle} className="input-field" />
                  <input name="despP" placeholder="P" value={d.despP} onChange={handle} className="input-field" />
                </div>
              </div>
              <div className="input-group"><span className="input-label">Cíclicos L/S/B</span>
                <div style={{display:'flex', gap:4}}>
                  <input name="ciclicoLoc" placeholder="Loc" value={d.ciclicoLoc} onChange={handle} className="input-field" />
                  <input name="ciclicoSKU" placeholder="SKU" value={d.ciclicoSKU} onChange={handle} className="input-field" />
                  <input name="ciclicoBultos" placeholder="Bultos" value={d.ciclicoBultos} onChange={handle} className="input-field" />
                </div>
              </div>
            </div>
          </div>

          <div className="panel-card">
            <div className="section-title">🚛 Descargas</div>
            <div className="input-grid">
              {['PL4', 'Tort', 'MCR', 'Aduana'].map(x => (
                <div key={x} className="input-group"><span className="input-label">{x} (C/B)</span>
                  <div style={{display:'flex', gap:4}}>
                    <input name={`desc${x}`} placeholder="Cam" value={d[`desc${x}`]} onChange={handle} className="input-field" />
                    <input name={`bultos${x}`} placeholder="Bult" value={d[`bultos${x}`]} onChange={handle} className="input-field" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="panel-card">
            <div className="section-title">📝 Observaciones</div>
            <textarea name="obs" value={d.obs} onChange={handle} className="obs-input" placeholder="Comentarios del turno..." />
          </div>
        </div>

        {/* REPORTE PARA CAPTURA */}
        <div className="report-preview">
          <div className="report-header">
            <div className="report-title">Informe Operativo PL3</div>
            <div className="date-badge" style={{background: 'var(--teal-light)', color: 'var(--teal-dark)'}}>{d.turno}</div>
          </div>

          <div className="report-body">
            <div className="report-grid">
              <div className="metric-card" style={{borderColor: 'var(--teal)'}}>
                <div className="metric-card-label">Preparación Picking</div>
                <div className="metric-row"><span>B2B</span><span className="metric-val">{n(d.pB2BV)} VJ / {n(d.pB2BB)} BLT</span></div>
                <div className="metric-row"><span>B2C</span><span className="metric-val">{n(d.pB2CV)} VJ / {n(d.pB2CB)} BLT</span></div>
              </div>
              <div className="metric-card" style={{borderColor: 'var(--teal)', background: 'var(--teal-light)', textAlign:'center'}}>
                <div className="metric-card-label">Despachos Finalizados</div>
                <div style={{display:'flex', justifyContent:'center', gap:10, marginTop:5}}>
                  <div><div className="hero-number">{n(d.despV)}</div><div style={{fontSize:8, fontWeight:700}}>VIAJES</div></div>
                  <div><div className="hero-number">{n(d.despB)}</div><div style={{fontSize:8, fontWeight:700}}>BULTOS</div></div>
                  <div><div className="hero-number">{n(d.despP)}</div><div style={{fontSize:8, fontWeight:700}}>PALLETS</div></div>
                </div>
              </div>
            </div>

            <div className="desc-table-wrap">
              <div className="desc-table-header">Recepción y Descargas</div>
              <div className="desc-table-body">
                <div className="desc-col">
                  <div className="hero-number" style={{fontSize: 28, color: 'var(--black)'}}>{totalC}</div>
                  <div style={{fontSize: 8, fontWeight: 700}}>CAMIONES TOTALES</div>
                </div>
                <div className="desc-col">
                  {['PL4', 'TORTUGAS', 'MCR', 'ADUANA'].map(lbl => (
                    <div key={lbl} style={{display:'flex', justifyContent:'space-between', fontSize: 10, marginBottom: 2}}>
                      <span style={{fontWeight: 700}}>{lbl}</span>
                      <span>{n(d['desc' + (lbl === 'TORTUGAS' ? 'Tort' : lbl)])} C / {n(d['bultos' + (lbl === 'TORTUGAS' ? 'Tort' : lbl)])} B</span>
                    </div>
                  ))}
                </div>
                <div className="desc-col">
                  <div style={{display:'flex', gap:10, alignItems:'baseline'}}>
                    <div className="metric-val">{n(d.ciclicoLoc)}</div><span style={{fontSize:7, fontWeight:800}}>LOC</span>
                    <div className="metric-val">{n(d.ciclicoSKU)}</div><span style={{fontSize:7, fontWeight:800}}>SKU</span>
                  </div>
                  <div style={{fontSize: 8, fontWeight: 700, marginTop: 4}}>CÍCLICOS REALIZADOS</div>
                </div>
              </div>
            </div>

            {d.obs && (
              <div style={{padding: 10, background: '#f9f9f9', border: '1px solid #eee', borderRadius: 6, marginTop: 10}}>
                <div style={{fontSize: 8, fontWeight: 800, color: 'var(--teal-dark)', marginBottom: 4}}>OBSERVACIONES:</div>
                <p style={{fontSize: 12}}>{d.obs}</p>
              </div>
            )}
          </div>

          {/* COMPARTIR Y BOTONES AL FONDO DEL REPORTE */}
          <div className="share-section">
            <div className="share-label">Compartir Informe</div>
            <div className="btn-group">
              <button className="btn-subtle btn-wpp">WhatsApp</button>
              <button className="btn-subtle btn-slack">Slack</button>
              <button className="btn-subtle btn-gmail">Gmail</button>
            </div>
          </div>

          <div className="action-footer">
            <button onClick={handleSave} className="btn-main btn-save">💾 Guardar en Sheet</button>
            <button onClick={() => window.print()} className="btn-main btn-print">🖨️ Imprimir / PDF</button>
          </div>

          <div className="report-footer">
            <span>PL3 Operaciones · 2026</span>
            <span>OCASA Logística · {d.fecha}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
