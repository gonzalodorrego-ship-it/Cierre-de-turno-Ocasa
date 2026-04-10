import React, { useState, useEffect } from 'react';

// ─── Google Fonts ────────────────────────────────────────────────────────────
const fontLink = document.createElement('link');
fontLink.rel = 'stylesheet';
fontLink.href = 'https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Barlow:wght@400;500;600;700&family=Barlow+Semi+Condensed:wght@500;600;700&display=swap';
document.head.appendChild(fontLink);

// ─── Styles Ajustados (Ancho Extendido) ──────────────────────────────────────
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
    --green:       #0A7A4A;
    --purple:      #6B3FBF;
    --orange:      #D97706;
    --red:         #C0392B;
    --blue:        #1B5EBF;
    --wpp:         #25D366;
    --slack:       #4A154B;
    --gmail:       #DB4437;
  }
  body {
    font-family: 'Barlow', sans-serif;
    background: var(--bg);
    color: var(--text-main);
  }
  .app-header {
    background: var(--white);
    position: sticky;
    top: 0;
    z-index: 100;
    border-bottom: 2px solid var(--teal);
  }
  .header-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 6px 20px;
    max-width: 1400px; /* Alineado al nuevo ancho */
    margin: 0 auto;
  }
  .header-brand { display: flex; align-items: center; gap: 12px; }
  .header-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 16px; font-weight: 800;
    color: var(--black); letter-spacing: 0.03em; text-transform: uppercase;
  }
  .header-right { display: flex; align-items: center; gap: 8px; }
  .turno-select {
    background: var(--teal-light); border: 1px solid var(--teal-mid);
    color: var(--teal-dark); padding: 4px 8px; border-radius: 5px;
    font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 12px;
    cursor: pointer; outline: none;
  }
  .date-badge {
    background: var(--teal); color: var(--white);
    padding: 4px 10px; border-radius: 5px;
    font-family: 'Barlow Condensed', sans-serif; font-weight: 800; font-size: 11px;
    text-transform: uppercase;
  }
  
  /* ANCHO AJUSTADO SEGÚN CAPTURA */
  .main-wrap { 
    max-width: 1400px; 
    margin: 0 auto; 
    padding: 12px 20px; 
  }
  
  /* PANEL DE CARGA */
  .panel-card {
    background: var(--white); border-radius: 8px; padding: 12px;
    border: 1px solid var(--border); margin-bottom: 10px;
  }
  .section-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 10px; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase;
    display: flex; align-items: center; gap: 6px; margin-bottom: 8px;
  }
  .section-title::before { content: ''; width: 3px; height: 12px; border-radius: 1px; background: currentColor; }
  
  .input-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 10px; }
  .input-group { display: flex; flex-direction: column; gap: 3px; }
  .input-label { font-size: 9px; font-weight: 700; text-transform: uppercase; color: var(--text-muted); }
  .input-field {
    border: 1px solid var(--border); border-radius: 5px; padding: 6px 10px;
    font-family: 'Barlow Semi Condensed', sans-serif; font-size: 13px; font-weight: 600;
    outline: none; width: 100%;
  }
  .obs-area {
    width: 100%; border: 1px solid var(--border); border-radius: 5px;
    padding: 8px; font-family: inherit; resize: vertical; outline: none;
  }

  /* REPORTE PREVIEW */
  .report-preview {
    background: var(--white); border-radius: 8px; border: 1px solid var(--border);
    overflow: hidden; margin-top: 10px;
  }
  .report-header {
    padding: 15px 25px; display: flex; justify-content: space-between; align-items: center;
    border-bottom: 3px solid var(--teal);
  }
  .report-title { font-size: 20px; font-weight: 900; text-transform: uppercase; line-height: 1; }
  .report-body { padding: 20px 25px; }
  
  .report-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px; }
  
  .metric-card {
    border: 1px solid var(--border); border-radius: 8px; padding: 15px; position: relative;
  }
  .metric-card-label {
    font-size: 9px; font-weight: 800; text-transform: uppercase;
    position: absolute; top: -6px; left: 12px; background: white; padding: 0 4px;
  }
  
  .metric-row { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 8px; }
  .metric-val { font-family: 'Barlow Condensed', sans-serif; font-size: 20px; font-weight: 900; }
  .hero-number { font-size: 36px; font-weight: 900; line-height: 1; color: var(--teal-dark); }
  
  .desc-table-wrap { border: 1px solid var(--border); border-radius: 8px; overflow: hidden; margin-bottom: 15px; }
  .desc-table-header { background: var(--black); color: white; padding: 8px 15px; font-size: 10px; font-weight: 800; text-transform: uppercase; }
  .desc-table-body { display: grid; grid-template-columns: 1fr 1.2fr 1fr; background: white; }
  .desc-col { padding: 15px; border-right: 1px solid var(--border); }
  .desc-col:last-child { border-right: none; }
  
  .share-section {
    padding: 12px; border-top: 1px solid var(--border); background: #fcfdfd;
    display: flex; flex-direction: column; align-items: center; gap: 8px;
  }
  .btn-subtle {
    padding: 6px 14px; font-size: 10px; font-family: 'Barlow Condensed', sans-serif;
    font-weight: 800; text-transform: uppercase; border: 1px solid; border-radius: 4px;
    background: transparent; cursor: pointer; transition: 0.2s;
  }
  .btn-wpp-subtle   { border-color: var(--wpp); color: var(--wpp); }
  .btn-slack-subtle { border-color: var(--slack); color: var(--slack); }
  .btn-gmail-subtle { border-color: var(--gmail); color: var(--gmail); }

  .action-section {
    padding: 12px 25px; border-top: 1px solid var(--border);
    background: #F8FAFA; display: flex; justify-content: center; gap: 12px;
  }
  .btn-action {
    padding: 10px 20px; font-size: 11px; font-family: 'Barlow Condensed', sans-serif;
    font-weight: 800; text-transform: uppercase; border-radius: 6px;
    cursor: pointer; border: none; transition: 0.2s;
  }
  .btn-save-action { background: var(--teal); color: white; }
  .btn-print-action { background: var(--black); color: white; }
  
  .report-footer {
    border-top: 1px solid var(--border); padding: 10px 25px;
    display: flex; justify-content: space-between; font-size: 8px; font-weight: 700;
    text-transform: uppercase; color: var(--text-muted); background: #F8FAFA;
  }

  @media print {
    .panel-area, .share-section, .action-section { display: none !important; }
    .main-wrap { max-width: 100%; padding: 0; }
    .report-preview { border: none; }
  }
`;
document.head.appendChild(styleTag);

const INIT = {
  fecha: '', turno: 'Mañana',
  pB2BV: '', pB2BB: '', pB2CV: '', pB2CB: '',
  despV: '', despB: '', despP: '',
  descPL4: '', descTort: '', descMCR: '', descAduana: '',
  bultosPL4: '', bultosTort: '', bultosMCR: '', bultosAduana: '',
  ciclicoLoc: '', ciclicoSKU: '', ciclicoBultos: '', movInt: '', obs: '',
  rmaCant: '', rendiciones: '',
};

const App = () => {
  const [d, setD] = useState(INIT);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setD(prev => ({
      ...prev,
      fecha: new Date().toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' }),
    }));
  }, []);

  const handle = e => setD({ ...d, [e.target.name]: e.target.value });
  const n = v => v || '0';
  const totalC = ['descPL4','descTort','descMCR','descAduana'].reduce((a, k) => a + (Number(d[k]) || 0), 0);
  const totalB = ['bultosPL4','bultosTort','bultosMCR','bultosAduana'].reduce((a, k) => a + (Number(d[k]) || 0), 0);

  return (
    <div>
      <div className="app-header">
        <div className="header-inner">
          <div className="header-brand"><div className="header-title">Cierre de Turno — PL3</div></div>
          <div className="header-right">
            <select name="turno" value={d.turno} onChange={handle} className="turno-select">
              <option value="Mañana">Turno Mañana</option>
              <option value="Tarde">Turno Tarde</option>
              <option value="Noche">Turno Noche</option>
            </select>
            <div className="date-badge">{d.fecha}</div>
          </div>
        </div>
      </div>

      <div className="main-wrap">
        <div className="panel-area">
          <div className="panel-card">
            <div className="section-title" style={{color:'var(--green)'}}>Carga de Datos</div>
            <div className="input-grid">
              <div className="input-group">
                <span className="input-label">B2B Viajes / Bultos</span>
                <div style={{display:'flex', gap:'4px'}}>
                  <input name="pB2BV" placeholder="VJ" value={d.pB2BV} onChange={handle} className="input-field" />
                  <input name="pB2BB" placeholder="BLT" value={d.pB2BB} onChange={handle} className="input-field" />
                </div>
              </div>
              <div className="input-group">
                <span className="input-label">Despachos V / B / P</span>
                <div style={{display:'flex', gap:'4px'}}>
                  <input name="despV" placeholder="V" value={d.despV} onChange={handle} className="input-field" />
                  <input name="despB" placeholder="B" value={d.despB} onChange={handle} className="input-field" />
                  <input name="despP" placeholder="P" value={d.despP} onChange={handle} className="input-field" />
                </div>
              </div>
              <div className="input-group">
                <span className="input-label">Stock / Cíclicos</span>
                <div style={{display:'flex', gap:'4px'}}>
                  <input name="movInt" placeholder="Mov. Int" value={d.movInt} onChange={handle} className="input-field" />
                  <input name="ciclicoLoc" placeholder="Loc" value={d.ciclicoLoc} onChange={handle} className="input-field" />
                </div>
              </div>
            </div>
          </div>

          <div className="panel-card">
            <div className="section-title" style={{color:'var(--teal)'}}>Observaciones</div>
            <textarea name="obs" rows={2} value={d.obs} onChange={handle} placeholder="Novedades del turno..." className="obs-area" />
          </div>
        </div>

        <div className="report-preview">
          <div className="report-header">
            <div className="report-title">Informe Operativo · PL3</div>
            <div className="date-badge" style={{background:'var(--teal-light)', color:'var(--teal-dark)'}}>{d.turno}</div>
          </div>

          <div className="report-body">
            <div className="report-grid">
              <div className="metric-card" style={{borderColor:'var(--teal)'}}>
                <div className="metric-card-label">Picking Preparado</div>
                <div className="metric-row"><span>B2B</span><span className="metric-val">{n(d.pB2BV)} VJ / {n(d.pB2BB)} BLT</span></div>
                <div className="metric-row"><span>B2C</span><span className="metric-val">{n(d.pB2CV)} VJ / {n(d.pB2CB)} BLT</span></div>
              </div>
              <div className="metric-card" style={{borderColor:'var(--teal)', background:'var(--teal-light)', textAlign:'center'}}>
                <div className="metric-card-label">Despachos Realizados</div>
                <div style={{display:'flex', justifyContent:'center', gap:'15px', marginTop:'5px'}}>
                  <div><div className="hero-number">{n(d.despV)}</div><div style={{fontSize:'8px', fontWeight:700}}>VIAJES</div></div>
                  <div><div className="hero-number">{n(d.despB)}</div><div style={{fontSize:'8px', fontWeight:700}}>BULTOS</div></div>
                  <div><div className="hero-number">{n(d.despP)}</div><div style={{fontSize:'8px', fontWeight:700}}>PALLETS</div></div>
                </div>
              </div>
            </div>

            <div className="desc-table-wrap">
              <div className="desc-table-header">Descargas — Recepción de Stock</div>
              <div className="desc-table-body">
                <div className="desc-col">
                  <div className="hero-number" style={{fontSize:'32px', color:'var(--black)'}}>{totalC}</div>
                  <div style={{fontSize:'8px', fontWeight:700, color:'var(--text-muted)'}}>CAMIONES OPERADOS</div>
                </div>
                <div className="desc-col">
                  {['PL4','Tort','MCR','Aduana'].map(k => (
                    <div key={k} style={{display:'flex', justifyContent:'space-between', fontSize:'11px', marginBottom:'3px'}}>
                      <span style={{fontWeight:700}}>{k.toUpperCase()}</span>
                      <span>{n(d['desc'+k])} Cam — {n(d['bultos'+k])} Bul</span>
                    </div>
                  ))}
                </div>
                <div className="desc-col">
                  <div style={{display:'flex', gap:'10px'}}>
                    <div><div className="metric-val">{n(d.movInt)}</div><div style={{fontSize:'7px', fontWeight:800}}>MOV. INT</div></div>
                    <div><div className="metric-val">{n(d.ciclicoLoc)}</div><div style={{fontSize:'7px', fontWeight:800}}>CÍCLICOS</div></div>
                  </div>
                </div>
              </div>
            </div>

            {d.obs && (
              <div style={{ marginTop:12, background:'#F0FAFA', border:'1px solid var(--teal-mid)', borderRadius:8, padding:'12px' }}>
                <div style={{ fontSize:8, fontWeight:800, textTransform:'uppercase', color:'var(--teal-dark)', marginBottom:4 }}>📝 Observaciones</div>
                <p style={{ fontSize:12, lineHeight:1.4 }}>{d.obs}</p>
              </div>
            )}
          </div>

          <div className="share-section">
            <div style={{fontSize:'9px', fontWeight:800, color:'var(--text-muted)', textTransform:'uppercase'}}>Compartir reporte</div>
            <div style={{display:'flex', gap:'8px'}}>
              <button className="btn-subtle btn-wpp-subtle">WhatsApp</button>
              <button className="btn-subtle btn-slack-subtle">Slack</button>
              <button className="btn-subtle btn-gmail-subtle">Gmail</button>
            </div>
          </div>

          <div className="action-section">
            <button className="btn-action btn-save-action">💾 Guardar en Sheet</button>
            <button onClick={() => window.print()} className="btn-action btn-print-action">🖨️ Imprimir / PDF</button>
          </div>

          <div className="report-footer">
            <span>Optimización Logística PL3 · 2026</span>
            <span>OCASA Logística · {d.fecha}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
