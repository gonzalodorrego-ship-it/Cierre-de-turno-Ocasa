import React, { useState, useEffect } from 'react';

// ─── Google Fonts ────────────────────────────────────────────────────────────
const fontLink = document.createElement('link');
fontLink.rel = 'stylesheet';
fontLink.href = 'https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Barlow:wght@400;500;600;700&family=Barlow+Semi+Condensed:wght@500;600;700&display=swap';
document.head.appendChild(fontLink);

// ─── Styles Compactos ────────────────────────────────────────────────────────
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
  }
  .header-brand { display: flex; align-items: center; gap: 12px; }
  .header-logo  { height: 30px; width: auto; }
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
  
  .main-wrap { max-width: 1000px; margin: 0 auto; padding: 12px 15px; }
  
  /* PANEL DE CARGA COMPACTO */
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
  
  .input-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 10px; }
  .input-group { display: flex; flex-direction: column; gap: 3px; }
  .input-label { font-size: 9px; font-weight: 700; text-transform: uppercase; color: var(--text-muted); }
  .input-field {
    border: 1px solid var(--border); border-radius: 5px; padding: 6px 10px;
    font-family: 'Barlow Semi Condensed', sans-serif; font-size: 13px; font-weight: 600;
    outline: none; width: 100%;
  }
  .input-field:focus { border-color: var(--teal); }

  /* REPORTE COMPACTO */
  .report-preview {
    background: var(--white); border-radius: 8px; border: 1px solid var(--border);
    overflow: hidden; margin-top: 10px;
  }
  .report-header {
    padding: 12px 20px; display: flex; justify-content: space-between; align-items: center;
    border-bottom: 3px solid var(--teal);
  }
  .report-title { font-size: 20px; font-weight: 900; text-transform: uppercase; line-height: 1; }
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
  
  .share-section {
    padding: 10px; border-top: 1px solid var(--border); background: #fcfdfd;
    display: flex; flex-direction: column; align-items: center; gap: 6px;
  }
  .btn-subtle {
    padding: 5px 12px; font-size: 10px; font-family: 'Barlow Condensed', sans-serif;
    font-weight: 800; text-transform: uppercase; border: 1px solid; border-radius: 4px;
    background: transparent; cursor: pointer; transition: 0.2s;
  }
  .btn-wpp-subtle   { border-color: var(--wpp); color: var(--wpp); }
  .btn-slack-subtle { border-color: var(--slack); color: var(--slack); }
  .btn-gmail-subtle { border-color: var(--gmail); color: var(--gmail); }
  
  .report-footer {
    border-top: 1px solid var(--border); padding: 8px 20px;
    display: flex; justify-content: space-between; font-size: 8px; font-weight: 700;
    text-transform: uppercase; color: var(--text-muted); background: #F8FAFA;
  }

  @media print {
    .panel-area, .share-section { display: none !important; }
    .main-wrap { padding: 0; }
    .report-preview { border: none; }
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

  const shareGmail = () => {
    const body = `INFORME OPERATIVO PL3\nFecha: ${d.fecha}\nTurno: ${d.turno}\nDescargas: ${totalC} Camiones\nDespachos: ${d.despV} Viajes`;
    window.location.href = `mailto:?subject=Reporte PL3 - ${d.turno}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div>
      <div className="app-header">
        <div className="header-inner">
          <div className="header-brand">
            <div className="header-title">Cierre de Turno — PL3</div>
          </div>
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
            </div>
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
                <div className="metric-card-label" style={{color:'var(--teal-dark)'}}>Picking Preparado</div>
                <div className="metric-row"><span style={{fontSize:'11px'}}>B2B</span><span className="metric-val">{n(d.pB2BV)} <small style={{fontSize:'9px'}}>VJ</small> / {n(d.pB2BB)} <small style={{fontSize:'9px'}}>BLT</small></span></div>
                <div className="metric-row"><span style={{fontSize:'11px'}}>B2C</span><span className="metric-val">{n(d.pB2CV)} <small style={{fontSize:'9px'}}>VJ</small> / {n(d.pB2CB)} <small style={{fontSize:'9px'}}>BLT</small></span></div>
              </div>
              <div className="metric-card" style={{borderColor:'var(--teal)', background:'var(--teal-light)', textAlign:'center'}}>
                <div className="metric-card-label" style={{color:'var(--teal-dark)', background:'var(--teal-light)'}}>Despachos Realizados</div>
                <div style={{display:'flex', justifyContent:'center', gap:'10px', marginTop:'4px'}}>
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
                  <div className="hero-number" style={{fontSize:'24px', color:'var(--black)'}}>{totalC}</div>
                  <div style={{fontSize:'8px', fontWeight:700, color:'var(--text-muted)'}}>CAMIONES OPERADOS</div>
                </div>
                <div className="desc-col">
                  {['PL4','TORTUGAS','MCR','ADUANA'].map(label => (
                    <div key={label} style={{display:'flex', justifyContent:'space-between', fontSize:'10px', marginBottom:'2px'}}>
                      <span style={{fontWeight:700}}>{label}</span>
                      <span>{n(d['desc'+label])} C / {n(d['bultos'+label])} B</span>
                    </div>
                  ))}
                </div>
                <div className="desc-col">
                  <div className="metric-val" style={{fontSize:'16px'}}>{n(d.movInt)}</div>
                  <div style={{fontSize:'8px', fontWeight:700, color:'var(--text-muted)'}}>MOV. INTERNOS</div>
                </div>
              </div>
            </div>

            <div className="report-grid">
              <div className="metric-card" style={{borderColor:'var(--purple)', background:'#F3EEFF'}}>
                <div className="metric-card-label" style={{color:'var(--purple)', background:'#F3EEFF'}}>Logística Inversa — RMA</div>
                <div className="hero-number" style={{color:'var(--purple)'}}>{n(d.rmaCant)}</div>
                <div style={{fontSize:'8px', fontWeight:700}}>UNIDADES RMA</div>
              </div>
              <div className="metric-card" style={{borderColor:'var(--blue)', background:'#EEF4FF'}}>
                <div className="metric-card-label" style={{color:'var(--blue)', background:'#EEF4FF'}}>Control de Viajes</div>
                <div className="hero-number" style={{color:'var(--blue)'}}>{n(d.rendiciones)}</div>
                <div style={{fontSize:'8px', fontWeight:700}}>VIAJES RENDIDOS</div>
              </div>
            </div>
          </div>

          <div className="share-section">
            <div style={{fontSize:'9px', fontWeight:800, color:'var(--text-muted)', textTransform:'uppercase'}}>Compartir reporte</div>
            <div style={{display:'flex', gap:'8px'}}>
              <button className="btn-subtle btn-wpp-subtle">WhatsApp</button>
              <button className="btn-subtle btn-slack-subtle">Slack</button>
              <button onClick={shareGmail} className="btn-subtle btn-gmail-subtle">Gmail</button>
            </div>
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
