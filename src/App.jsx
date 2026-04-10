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
  
  /* Botones de acción y compartir sutiles en la parte inferior */
  .share-section {
    padding: 10px; border-top: 1px solid var(--border); background: #fcfdfd;
    display: flex; flex-direction: column; align-items: center; gap: 6px;
  }
  .share-label {
    font-family: 'Barlow Condensed', sans-serif; font-size: 9px; font-weight: 800;
    color: var(--text-muted); letter-spacing: 0.15em; text-transform: uppercase;
  }
  .btn-subtle {
    padding: 5px 12px; font-size: 10px; font-family: 'Barlow Condensed', sans-serif;
    font-weight: 800; text-transform: uppercase; border: 1px solid; border-radius: 4px;
    background: transparent; cursor: pointer; transition: 0.2s;
  }
  .btn-wpp-subtle   { border-color: var(--wpp); color: var(--wpp); }
  .btn-slack-subtle { border-color: var(--slack); color: var(--slack); }
  .btn-gmail-subtle { border-color: var(--gmail); color: var(--gmail); }

  /* Estilos para los botones de acción principales */
  .action-section {
    padding: 10px 20px; border-top: 1px solid var(--border);
    background: #F8FAFA; display: flex; justify-content: center; gap: 10px;
  }
  .btn-action {
    padding: 8px 16px; font-size: 11px; font-family: 'Barlow Condensed', sans-serif;
    font-weight: 800; text-transform: uppercase; border-radius: 6px;
    cursor: pointer; border: none; transition: 0.2s;
  }
  .btn-action:active { transform: translateY(1px); }
  .btn-save-action { background: var(--teal); color: white; box-shadow: 0 2px 8px rgba(0,180,180,0.2); }
  .btn-print-action { background: var(--black); color: white; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
  
  .report-footer {
    border-top: 1px solid var(--border); padding: 8px 20px;
    display: flex; justify-content: space-between; font-size: 8px; font-weight: 700;
    text-transform: uppercase; color: var(--text-muted); background: #F8FAFA;
  }

  @media print {
    .panel-area, .share-section, .action-section { display: none !important; }
    .main-wrap { padding: 0; }
    .report-preview { border: none; }
    @page { size: auto; margin: 5mm; }
  }
  @media (max-width: 768px) {
    .two-col, .report-grid { grid-template-columns: 1fr; }
    .four-col { grid-template-columns: 1fr 1fr; }
    .desc-table-body { grid-template-columns: 1fr; }
    .header-inner { padding: 10px 16px; }
    .main-wrap { padding: 16px 12px 60px; }
  }
`;
document.head.appendChild(styleTag);

// ─── Constants ───────────────────────────────────────────────────────────────
const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbwMwYvjERyxcc4W9AzjFkkwPFfVrsAft6JeOW6g1b1hucnSItyrmc-vmI-BGPhjnyXk/exec';
const LOGO_URL = '/logo_ocasa.png'; 

const INIT = {
  fecha: '', turno: 'Mañana',
  pB2BV: '', pB2BB: '', pB2CV: '', pB2CB: '',
  despV: '', despB: '', despP: '',
  descPL4: '', descTort: '', descMCR: '', descAduana: '',
  bultosPL4: '', bultosTort: '', bultosMCR: '', bultosAduana: '',
  ciclicoLoc: '', ciclicoSKU: '', ciclicoBultos: '', movInt: '', obs: '',
  rmaCant: '', rendiciones: '',
};

const Field = ({ label, name, placeholder, value, onChange, center }) => (
  <div className="input-group">
    {label && <span className="input-label">{label}</span>}
    <input
      type="text" name={name} placeholder={placeholder}
      value={value} onChange={onChange} className="input-field"
      style={center ? { textAlign: 'center' } : {}}
    />
  </div>
);

// ─── App ─────────────────────────────────────────────────────────────────────
const App = () => {
  const [saving, setSaving] = useState(false);
  const [saved,  setSaved]  = useState(false);
  const [d, setD]           = useState(INIT);

  useEffect(() => {
    const now = new Date();
    setD(prev => ({
      ...prev,
      fecha: now.toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' }),
    }));
  }, []);

  const handle = e => setD({ ...d, [e.target.name]: e.target.value });

  const handleSave = async () => {
    setSaving(true);
    try {
      await fetch(WEB_APP_URL, {
        method: 'POST', mode: 'no-cors', body: JSON.stringify(d),
        headers: { 'Content-Type': 'application/json' },
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      alert('❌ Error al guardar. Verificá la conexión.');
    } finally { setSaving(false); }
  };

  const totalC = ['descPL4','descTort','descMCR','descAduana']
    .reduce((a, k) => a + (Number(d[k]) || 0), 0);
  const totalB = ['bultosPL4','bultosTort','bultosMCR','bultosAduana']
    .reduce((a, k) => a + (Number(d[k]) || 0), 0);
  const n = v => v || '0';

  // ── Funciones de Compartir ─────────────────────────────────────────────────
  const getShareText = () => {
    return `📊 *INFORME OPERATIVO PL3 - OCASA*%0A` +
           `📅 Fecha: ${d.fecha}%0A` +
           `🌅 Turno: ${d.turno}%0A%0A` +
           `🚛 *Descargas:* ${totalC} Camiones (${totalB} Bultos)%0A` +
           `🚚 *Despachos:* ${n(d.despV)} Viajes / ${n(d.despB)} Bultos%0A` +
           `📝 *Obs:* ${d.obs || 'Sin novedades'}`;
  };

  const shareWpp   = () => window.open(`https://wa.me/?text=${getShareText()}`, '_blank');
  const shareSlack = () => window.open(`slack://channel?team=TXXXX&id=CXXXX`, '_blank'); 
  const shareGmail  = () => window.location.href = `mailto:?subject=Reporte PL3 - ${d.turno}&body=${encodeURIComponent(getShareText().replace(/%0A/g, '\n').replace(/\*/g, ''))}`;

  return (
    <div>
      {/* HEADER */}
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
        {/* ══ PANEL DE CARGA COMPACTO ══ */}
        <div className="panel-area">
          <div className="panel-card">
            <div className="section-title" style={{color:'var(--green)'}}>Carga de Datos Operativos</div>
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
              {/* Resto de campos de carga - simplificados para compactar */}
              <Field label="RMA Realizados" name="rmaCant" placeholder="0" value={d.rmaCant} onChange={handle} center />
              <Field label="Localizadores Cíclicos" name="ciclicoLoc" placeholder="S/N" value={d.ciclicoLoc} onChange={handle} center />
            </div>
          </div>

          <div className="panel-card">
            <div className="section-title" style={{color:'var(--orange)'}}>🚛 Camiones y Bultos Descargados</div>
            <div className="input-grid" style={{gridTemplateColumns:'repeat(auto-fit, minmax(110px, 1fr))'}}>
              {['PL4','Tort','MCR','Aduana'].map(cn => (
                <div key={cn} className="desc-card-load" style={{padding:'8px', border:'1px solid var(--border)', borderRadius:'6px'}}>
                  <div style={{fontSize:'9px', fontWeight:800, textTransform:'uppercase', color:'var(--orange)', marginBottom:'5px', textAlign:'center'}}>{cn}</div>
                  <div style={{display:'flex', flexDirection:'column', gap:'4px'}}>
                    <input name={'desc'+cn} placeholder="Camiones" value={d['desc'+cn]} onChange={handle} className="input-field" style={{fontSize:'12px', textAlign:'center', padding:'4px 6px'}} />
                    <input name={'bultos'+cn} placeholder="Bultos" value={d['bultos'+cn]} onChange={handle} className="input-field" style={{fontSize:'12px', textAlign:'center', padding:'4px 6px'}} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="panel-card">
            <div className="section-title" style={{color:'var(--teal)'}}>📝 Observaciones del Turno</div>
            <textarea name="obs" rows={2} value={d.obs} onChange={handle}
              placeholder="Novedades, incidentes, comentarios relevantes del turno..." className="obs-area" style={{fontSize:'12px', padding:'6px 8px'}} />
          </div>
        </div>

        {/* ══ REPORTE (PREVISUALIZACIÓN) COMPACTO ══ */}
        <div className="report-preview">
          <div className="report-header">
            <div className="report-title">Informe Operativo · PL3</div>
            <div className="date-badge" style={{background:'var(--teal-light)', color:'var(--teal-dark)'}}>{d.turno}</div>
          </div>

          <div className="report-body">
            {/* Picking + Despachos */}
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

            {/* Descargas */}
            <div className="desc-table-wrap">
              <div className="desc-table-header">Descargas — Recepción de Stock</div>
              <div className="desc-table-body">
                <div className="desc-col">
                  <div className="desc-col-title" style={{fontSize:'9px', fontWeight:800, textTransform:'uppercase', color:'var(--text-muted)', marginBottom:'8px'}}>Resumen Total</div>
                  <div className="hero-number" style={{fontSize:'28px', color:'var(--black)'}}>{totalC}</div>
                  <div style={{fontSize:'8px', fontWeight:700, color:'var(--text-muted)'}}>CAMIONES OPERADOS</div>
                  <div className="hero-number" style={{fontSize:'22px', color:'var(--teal-dark)', marginTop:'8px'}}>{totalB.toLocaleString('es-AR')}</div>
                  <div style={{fontSize:'8px', fontWeight:700, color:'var(--text-muted)'}}>BULTOS RECIBIDOS</div>
                </div>
                <div className="desc-col">
                  <div className="desc-col-title" style={{fontSize:'9px', fontWeight:800, textTransform:'uppercase', color:'var(--text-muted)', marginBottom:'8px'}}>Detalle por Origen</div>
                  {[
                    {label:'PL4', key:'PL4'},
                    {label:'TORTUGAS', key:'Tort'},
                    {label:'MCR', key:'MCR'},
                    {label:'ADUANA', key:'Aduana'}
                  ].map(item => (
                    <div key={item.key} style={{display:'flex', justifyContent:'space-between', fontSize:'10px', marginBottom:'2px', paddingBottom:'2px', borderBottom:'1px solid #F0F4F4'}}>
                      <span style={{fontWeight:700, color: item.label === 'TORTUGAS' ? 'var(--teal-dark)' : 'var(--text-main)'}}>{item.label}</span>
                      <span>{n(d['desc'+item.key])} Camiones — {n(d['bultos'+item.key])} Bultos</span>
                    </div>
                  ))}
                </div>
                <div className="desc-col">
                  <div className="desc-col-title" style={{fontSize:'9px', fontWeight:800, textTransform:'uppercase', color:'var(--text-muted)', marginBottom:'8px'}}>Stock Interno</div>
                  <div className="metric-val" style={{fontSize:'20px', color:'var(--teal-dark)'}}>{n(d.movInt)}</div>
                  <div style={{fontSize:'8px', fontWeight:700, color:'var(--text-muted)'}}>MOVIMIENTOS INTERNOS</div>
                  
                  {/* REPORTE CICLICO CON LOS 3 DATOS - ACTUALIZADO */}
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'baseline', marginTop:'10px', borderTop:'1px solid #F0F4F4', paddingTop:'8px' }}>
                    <div className="stock-num" style={{ fontSize:18, color:'var(--teal)', fontWeight:900 }}>{n(d.ciclicoLoc)}</div>
                    <span style={{ fontSize:7, fontWeight:800, color:'var(--text-muted)' }}>LOC</span>
                    <span style={{ color:'#DDD' }}>/</span>
                    <div className="stock-num" style={{ fontSize:18, color:'var(--teal)', fontWeight:900 }}>{n(d.ciclicoSKU)}</div>
                    <span style={{ fontSize:7, fontWeight:800, color:'var(--text-muted)' }}>SKU</span>
                    <span style={{ color:'#DDD' }}>/</span>
                    <div className="stock-num" style={{ fontSize:18, color:'var(--teal)', fontWeight:900 }}>{n(d.ciclicoBultos)}</div>
                    <span style={{ fontSize:7, fontWeight:800, color:'var(--text-muted)' }}>BUL</span>
                  </div>
                  <div style={{fontSize:'8px', fontWeight:700, color:'var(--text-muted)'}}>LOCALIZADORES CÍCLICOS</div>
                </div>
              </div>
            </div>

            {/* RMA + Viajes */}
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
            
            {/* Observaciones (condicional) */}
            {d.obs && (
              <div style={{ marginTop:12, background:'#F0FAFA', border:'1px solid var(--teal-mid)', borderRadius:8, padding:'10px 15px' }}>
                <div style={{ fontFamily:'Barlow Condensed,sans-serif', fontSize:8, fontWeight:800, letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--teal-dark)', marginBottom:4 }}>
                  📝 Observaciones del Turno
                </div>
                <p style={{ fontFamily:'Barlow', fontSize:11, color:'var(--charcoal)', lineHeight:1.5 }}>{d.obs}</p>
              </div>
            )}
          </div>

          {/* SECCIÓN COMPARTIR - AL FINAL DEL REPORTE */}
          <div className="share-section">
            <div className="share-label">Compartir resumen sutil</div>
            <div style={{display:'flex', gap:'8px'}}>
              <button className="btn-subtle btn-wpp-subtle">WhatsApp</button>
              <button className="btn-subtle btn-slack-subtle">Slack</button>
              <button onClick={shareGmail} className="btn-subtle btn-gmail-subtle">Gmail</button>
            </div>
          </div>

          {/* SECCIÓN ACCIONES - MOVIDA AL FINAL DEL REPORTE */}
          <div className="action-section">
            <button onClick={handleSave} disabled={saving} className="btn-action btn-save-action">
              {saving ? '⏳ Guardando...' : '💾 Guardar en Sheet'}
            </button>
            <button onClick={() => window.print()} className="btn-action btn-print-action">
              🖨️ Imprimir / Exportar PDF
            </button>
          </div>

          <div className="report-footer">
            <span>Optimización Logística PL3 · Tesis 2026</span>
            <span>OCASA Logística · {d.fecha}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
