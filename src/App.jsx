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
    --charcoal:    #2D2D2D;
    --gray-dark:   #555555;
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
    min-height: 100vh;
  }
  .app-header {
    background: var(--white);
    position: sticky;
    top: 0;
    z-index: 100;
    box-shadow: 0 2px 12px rgba(0,0,0,0.10);
    border-bottom: 3px solid var(--teal);
  }
  .header-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 32px;
  }
  .header-brand { display: flex; align-items: center; gap: 20px; }
  .header-logo  { height: 38px; width: auto; object-fit: contain; }
  .header-divider { width: 1px; height: 34px; background: var(--border); }
  .header-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 18px; font-weight: 800;
    color: var(--black); letter-spacing: 0.05em; text-transform: uppercase; line-height: 1.1;
  }
  .header-sub {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 11px; font-weight: 600;
    color: var(--teal); letter-spacing: 0.12em; text-transform: uppercase;
  }
  .header-right { display: flex; align-items: center; gap: 12px; }
  .turno-select {
    background: var(--teal-light); border: 1.5px solid var(--teal-mid);
    color: var(--teal-dark); padding: 7px 14px; border-radius: 7px;
    font-family: 'Barlow Condensed', sans-serif; font-weight: 800; font-size: 13px;
    letter-spacing: 0.05em; cursor: pointer; outline: none;
  }
  .turno-select:focus { border-color: var(--teal); }
  .date-badge {
    background: var(--teal); color: var(--white);
    padding: 7px 16px; border-radius: 7px;
    font-family: 'Barlow Condensed', sans-serif; font-weight: 800; font-size: 12px;
    letter-spacing: 0.06em; text-transform: uppercase; white-space: nowrap;
  }
  .main-wrap { max-width: 1100px; margin: 0 auto; padding: 28px 24px 60px; }
  .section-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 11px; font-weight: 800; letter-spacing: 0.16em; text-transform: uppercase;
    display: flex; align-items: center; gap: 8px; margin-bottom: 14px;
  }
  .section-title::before {
    content: ''; display: block; width: 4px; height: 16px; border-radius: 2px; flex-shrink: 0;
  }
  .section-title.teal   { color: var(--teal-dark); }
  .section-title.teal::before   { background: var(--teal); }
  .section-title.green  { color: var(--green); }
  .section-title.green::before  { background: var(--green); }
  .section-title.orange { color: var(--orange); }
  .section-title.orange::before { background: var(--orange); }
  .section-title.purple { color: var(--purple); }
  .section-title.purple::before { background: var(--purple); }
  .section-title.blue   { color: var(--blue); }
  .section-title.blue::before   { background: var(--blue); }
  .panel-card {
    background: var(--white); border-radius: 12px; padding: 24px;
    box-shadow: 0 1px 4px rgba(0,0,0,0.07), 0 4px 16px rgba(0,0,0,0.05);
    border: 1px solid var(--border); margin-bottom: 16px;
  }
  .input-group { display: flex; flex-direction: column; gap: 5px; }
  .input-label {
    font-family: 'Barlow Condensed', sans-serif; font-size: 10px; font-weight: 700;
    letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-muted);
  }
  .input-field {
    border: 1.5px solid var(--border); border-radius: 7px; padding: 9px 12px;
    font-family: 'Barlow Semi Condensed', sans-serif; font-size: 14px; font-weight: 600;
    color: var(--text-main); background: var(--white);
    transition: border-color 0.15s, box-shadow 0.15s; outline: none; width: 100%;
  }
  .input-field:focus { border-color: var(--teal); box-shadow: 0 0 0 3px rgba(0,180,180,0.14); }
  .input-field::placeholder { color: #C8D0D0; font-weight: 500; }
  .two-col  { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .four-col { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
  .pair     { display: flex; gap: 8px; }
  .pair .input-field { flex: 1; min-width: 0; }
  .desc-card {
    background: #FAFBFB; border: 1.5px solid var(--border); border-radius: 10px; padding: 14px;
  }
  .desc-card-title {
    font-family: 'Barlow Condensed', sans-serif; font-size: 11px; font-weight: 800;
    letter-spacing: 0.1em; text-transform: uppercase; text-align: center;
    padding-bottom: 10px; margin-bottom: 10px; border-bottom: 1.5px solid var(--border);
    color: var(--teal-dark);
  }
  .desc-card.tort   { border-color: var(--teal-mid); }
  .desc-card.tort   .desc-card-title { color: var(--teal-dark); border-color: var(--teal-mid); }
  .desc-card.mcr    { border-color: #D0D7D7; }
  .desc-card.mcr    .desc-card-title { color: var(--charcoal); }
  .desc-card.aduana { border-color: #F5B8B8; }
  .desc-card.aduana .desc-card-title { color: var(--red); border-color: #F5B8B8; }
  .obs-area {
    width: 100%; border: 1.5px solid var(--border); border-radius: 7px; padding: 10px 12px;
    font-family: 'Barlow', sans-serif; font-size: 13px; color: var(--text-main);
    resize: none; outline: none; transition: border-color 0.15s;
  }
  .obs-area:focus { border-color: var(--teal); box-shadow: 0 0 0 3px rgba(0,180,180,0.12); }
  
  .btn-row { display: flex; gap: 12px; justify-content: center; margin-top: 8px; flex-wrap: wrap; }
  .btn {
    display: inline-flex; align-items: center; gap: 8px; padding: 12px 24px;
    border-radius: 8px; font-family: 'Barlow Condensed', sans-serif; font-size: 13px;
    font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase;
    cursor: pointer; border: none; transition: transform 0.1s;
  }
  .btn:active { transform: translateY(1px); }
  .btn-save { background: var(--teal); color: var(--white); box-shadow: 0 4px 16px rgba(0,180,180,0.35); }
  .btn-print { background: var(--black); color: var(--white); box-shadow: 0 4px 14px rgba(0,0,0,0.2); }
  
  .share-section {
    margin-top: 32px; padding: 16px; border-top: 1px solid var(--border);
    background: #fcfdfd; border-radius: 8px;
    display: flex; flex-direction: column; align-items: center; gap: 12px;
  }
  .share-label {
    font-family: 'Barlow Condensed', sans-serif; font-size: 9px; font-weight: 800;
    color: var(--text-muted); letter-spacing: 0.15em; text-transform: uppercase;
  }
  .btn-subtle {
    padding: 8px 16px; font-size: 11px; background: transparent; border: 1.5px solid transparent;
  }
  .btn-wpp-subtle   { border-color: var(--wpp); color: var(--wpp); }
  .btn-wpp-subtle:hover { background: #e9fbf1; }
  .btn-slack-subtle { border-color: var(--slack); color: var(--slack); }
  .btn-slack-subtle:hover { background: #f5f0f6; }
  .btn-gmail-subtle  { border-color: var(--gmail); color: var(--gmail); }
  .btn-gmail-subtle:hover { background: #fdf2f1; }

  .report-preview {
    background: var(--white); border-radius: 12px;
    box-shadow: 0 4px 30px rgba(0,0,0,0.10);
    overflow: hidden; border: 1px solid var(--border); margin-top: 28px;
  }
  .report-header {
    background: var(--white); padding: 22px 32px;
    display: flex; justify-content: space-between; align-items: center;
    border-bottom: 4px solid var(--teal);
  }
  .report-logo { height: 42px; width: auto; object-fit: contain; }
  .report-title {
    font-family: 'Barlow Condensed', sans-serif; font-size: 26px; font-weight: 900;
    color: var(--black); letter-spacing: 0.04em; text-transform: uppercase;
    line-height: 1; text-align: right;
  }
  .report-subtitle {
    font-family: 'Barlow Condensed', sans-serif; font-size: 11px; font-weight: 700;
    color: var(--teal); letter-spacing: 0.14em; text-transform: uppercase;
    margin-top: 4px; text-align: right;
  }
  .report-date-pill {
    display: inline-block; background: var(--teal); color: var(--white);
    padding: 4px 14px; border-radius: 5px;
    font-family: 'Barlow Condensed', sans-serif; font-size: 11px; font-weight: 700;
    letter-spacing: 0.1em; text-transform: uppercase; margin-top: 8px;
  }
  .report-body { padding: 28px 32px; }
  .report-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }
  .metric-card {
    border: 2px solid var(--border); border-radius: 10px;
    padding: 18px 20px; position: relative; background: var(--white);
  }
  .metric-card-label {
    font-family: 'Barlow Condensed', sans-serif; font-size: 9px; font-weight: 800;
    letter-spacing: 0.15em; text-transform: uppercase;
    position: absolute; top: 0; left: 16px;
    background: var(--white); padding: 0 6px; transform: translateY(-50%);
  }
  .metric-card.teal-c    { border-color: var(--teal); }
  .metric-card.teal-c    .metric-card-label { color: var(--teal-dark); }
  .metric-card.teal-hero { border-color: var(--teal); background: var(--teal-light); }
  .metric-card.teal-hero .metric-card-label { color: var(--teal-dark); background: var(--teal-light); }
  .metric-card.purple-c  { border-color: var(--purple); background: #F3EEFF; }
  .metric-card.purple-c  .metric-card-label { color: var(--purple); background: #F3EEFF; }
  .metric-card.blue-c    { border-color: var(--blue); background: #EEF4FF; }
  .metric-card.blue-c    .metric-card-label { color: var(--blue); background: #EEF4FF; }
  .metric-row {
    display: flex; justify-content: space-between; align-items: flex-end;
    margin-bottom: 10px; padding-bottom: 10px; border-bottom: 1px solid var(--border);
  }
  .metric-row:last-child { margin-bottom: 0; padding-bottom: 0; border-bottom: none; }
  .metric-key {
    font-family: 'Barlow Condensed', sans-serif; font-size: 13px;
    font-weight: 600; color: var(--text-muted);
  }
  .metric-val {
    font-family: 'Barlow Condensed', sans-serif; font-size: 22px;
    font-weight: 900; color: var(--text-main); line-height: 1;
  }
  .metric-unit {
    font-family: 'Barlow Condensed', sans-serif; font-size: 9px; font-weight: 700;
    color: var(--text-muted); letter-spacing: 0.1em; text-transform: uppercase; margin-left: 3px;
  }
  .hero-number {
    font-family: 'Barlow Condensed', sans-serif; font-size: 52px; font-weight: 900;
    color: var(--teal-dark); line-height: 1;
  }
  .hero-sub {
    font-family: 'Barlow Condensed', sans-serif; font-size: 10px; font-weight: 700;
    color: var(--teal); text-transform: uppercase; letter-spacing: 0.12em; margin-top: 4px;
  }
  .desc-table-wrap {
    border: 2px solid var(--border); border-radius: 10px; overflow: hidden; margin-bottom: 20px;
  }
  .desc-table-header {
    background: var(--black); padding: 10px 20px;
    font-family: 'Barlow Condensed', sans-serif; font-size: 11px; font-weight: 800;
    letter-spacing: 0.14em; text-transform: uppercase; color: var(--white);
    border-bottom: 3px solid var(--teal);
  }
  .desc-table-body {
    display: grid; grid-template-columns: 1fr 1fr 1fr; background: var(--white);
  }
  .desc-col { padding: 20px; border-right: 1px solid var(--border); }
  .desc-col:last-child { border-right: none; }
  .desc-col-title {
    font-family: 'Barlow Condensed', sans-serif; font-size: 9px; font-weight: 800;
    letter-spacing: 0.14em; text-transform: uppercase; color: var(--text-muted); margin-bottom: 12px;
  }
  .desc-total-num {
    font-family: 'Barlow Condensed', sans-serif; font-size: 46px; font-weight: 900;
    color: var(--black); line-height: 1;
  }
  .desc-total-label {
    font-family: 'Barlow Condensed', sans-serif; font-size: 9px; font-weight: 700;
    color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.1em; margin-top: 2px;
  }
  .bultos-big {
    font-family: 'Barlow Condensed', sans-serif; font-size: 24px; font-weight: 900;
    color: var(--teal-dark); margin-top: 8px; line-height: 1;
  }
  .origen-row {
    display: flex; justify-content: space-between; align-items: center;
    padding: 7px 0; border-bottom: 1px solid #F0F4F4;
    font-family: 'Barlow Semi Condensed', sans-serif; font-size: 12px; color: var(--text-muted);
  }
  .origen-row:last-child { border-bottom: none; }
  .origen-row .val {
    font-family: 'Barlow Condensed', sans-serif; font-size: 13px;
    font-weight: 800; color: var(--text-main);
  }
  .stock-num {
    font-family: 'Barlow Condensed', sans-serif; font-size: 30px;
    font-weight: 900; line-height: 1; color: var(--teal-dark);
  }
  .stock-label {
    font-family: 'Barlow Condensed', sans-serif; font-size: 9px; font-weight: 700;
    color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.1em;
    margin-top: 2px; margin-bottom: 16px;
  }
  .report-footer {
    border-top: 1px solid var(--border); padding: 14px 32px;
    display: flex; justify-content: space-between; align-items: center; background: #F8FAFA;
  }
  .footer-text {
    font-family: 'Barlow Condensed', sans-serif; font-size: 9px; font-weight: 700;
    letter-spacing: 0.12em; text-transform: uppercase; color: var(--text-muted);
  }

  @media print {
    body { background: white; }
    .panel-area { display: none !important; }
    .share-section { display: none !important; }
    .report-preview { box-shadow: none; border: none; border-radius: 0; margin: 0; }
    .desc-table-header, .report-date-pill {
      -webkit-print-color-adjust: exact; print-color-adjust: exact;
    }
    @page { margin: 0; size: A4; }
  }
  @media (max-width: 768px) {
    .two-col, .report-grid-2 { grid-template-columns: 1fr; }
    .four-col { grid-template-columns: 1fr 1fr; }
    .desc-table-body { grid-template-columns: 1fr; }
    .header-inner { padding: 10px 16px; }
    .main-wrap { padding: 16px 12px 60px; }
  }
`;
document.head.appendChild(styleTag);

// ─── Constants ───────────────────────────────────────────────────────────────
const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbyowOTTVkwNffoRnl4JXqen3CXlbjxMqWQkI_9g3YouhZXp8d7KKqlM-IewSDKIdaI19A/exec';
const LOGO_URL = '/logo_ocasa.png'; 

const INIT = {
  fecha: '', turno: 'Mañana',
  pB2BV: '', pB2BB: '', pB2CV: '', pB2CB: '',
  despV: '', despB: '', despP: '',
  descTort: '', bultosTort: '',
  descMCR: '', bultosMCR: '',
  descAduana: '', bultosAduana: '',
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

  const totalC = ['descTort','descMCR','descAduana']
    .reduce((a, k) => a + (Number(d[k]) || 0), 0);
  const totalB = ['bultosTort','bultosMCR','bultosAduana']
    .reduce((a, k) => a + (Number(d[k]) || 0), 0);
  const n = v => v || '0';

  const getShareText = () => {
    return `📊 *INFORME OPERATIVO PL3 - OCASA*%0A` +
           `📅 Fecha: ${d.fecha}%0A` +
           `🌅 Turno: ${d.turno}%0A%0A` +
           `🚛 *Descargas:* ${totalC} Camiones (${totalB} Bultos)%0A` +
           `🚚 *Despachos:* ${n(d.despV)} Viajes / ${n(d.despB)} Bultos%0A` +
           `✅ *RMA:* ${n(d.rmaCant)} unidades%0A` +
           `📝 *Obs:* ${d.obs || 'Sin novedades'}`;
  };

  const shareWpp   = () => window.open(`https://wa.me/?text=${getShareText()}`, '_blank');
  const shareSlack = () => window.open(`slack://channel?team=TXXXX&id=CXXXX`, '_blank');
  const shareGmail  = () => window.location.href = `mailto:?subject=Informe Operativo PL3 - ${d.turno}&body=${getShareText().replace(/%0A/g, '\n').replace(/\*/g, '')}`;

  return (
    <div>
      {/* HEADER */}
      <div className="app-header">
        <div className="header-inner">
          <div className="header-brand">
            <img src={LOGO_URL} alt="OCASA" className="header-logo" />
            <div className="header-divider" />
            <div>
              <div className="header-title">Cierre de Turno — PL3</div>
              <div className="header-sub">Registro Operativo Colaborativo</div>
            </div>
          </div>
          <div className="header-right">
            <select name="turno" value={d.turno} onChange={handle} className="turno-select">
              <option value="Mañana">🌅 Turno Mañana</option>
              <option value="Tarde">🌇 Turno Tarde</option>
              <option value="Noche">🌙 Turno Noche</option>
            </select>
            <div className="date-badge">{d.fecha}</div>
          </div>
        </div>
      </div>

      <div className="main-wrap">

        {/* PANEL DE CARGA */}
        <div className="panel-area">

          <div className="two-col">
            {/* Picking */}
            <div className="panel-card">
              <div className="section-title green">🛒 Picking Preparado</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div className="input-group">
                  <span className="input-label">B2B — Viajes / Bultos</span>
                  <div className="pair">
                    <input type="text" name="pB2BV" placeholder="Viajes" value={d.pB2BV} onChange={handle} className="input-field" />
                    <input type="text" name="pB2BB" placeholder="Bultos" value={d.pB2BB} onChange={handle} className="input-field" />
                  </div>
                </div>
                <div className="input-group">
                  <span className="input-label">B2C — Viajes / Bultos</span>
                  <div className="pair">
                    <input type="text" name="pB2CV" placeholder="Viajes" value={d.pB2CV} onChange={handle} className="input-field" />
                    <input type="text" name="pB2CB" placeholder="Bultos" value={d.pB2CB} onChange={handle} className="input-field" />
                  </div>
                </div>
                <div className="input-group" style={{ gridColumn: 'span 2' }}>
                    <span className="input-label">Despachos — Viajes / Bultos / Pallets</span>
                    <div className="pair" style={{ gap: '5px' }}>
                        <input type="text" name="despV" placeholder="Viajes" value={d.despV} onChange={handle} className="input-field" />
                        <input type="text" name="despB" placeholder="Bultos" value={d.despB} onChange={handle} className="input-field" />
                        <input type="text" name="despP" placeholder="Pallets" value={d.despP} onChange={handle} className="input-field" />
                    </div>
                </div>
              </div>
            </div>

            {/* RMA */}
            <div className="panel-card">
              <div className="section-title purple">🔄 RMA y Control Operativo</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <Field label="RMA Realizados (Unidades)"     name="rmaCant"     placeholder="0"   value={d.rmaCant}      onChange={handle} />
                <Field label="Viajes Rendidos"                name="rendiciones" placeholder="0"   value={d.rendiciones} onChange={handle} />
                <Field label="Movimientos Internos de Stock" name="movInt"      placeholder="0"   value={d.movInt}      onChange={handle} />
                <div className="input-group">
                    <span className="input-label">Cíclicos — Loc. / SKU / Bultos</span>
                    <div className="pair" style={{ gap: '5px' }}>
                        <input type="text" name="ciclicoLoc" placeholder="Loc." value={d.ciclicoLoc} onChange={handle} className="input-field" />
                        <input type="text" name="ciclicoSKU" placeholder="SKU" value={d.ciclicoSKU} onChange={handle} className="input-field" />
                        <input type="text" name="ciclicoBultos" placeholder="Bult." value={d.ciclicoBultos} onChange={handle} className="input-field" />
                    </div>
                </div>
              </div>
            </div>
          </div>

          {/* Descargas */}
          <div className="panel-card">
            <div className="section-title orange">🚛 Camiones y Bultos Descargados</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
              {[
                { key:'TORTUGAS', cls:'tort',   cn:'descTort',   bn:'bultosTort'   },
                { key:'MCR',      cls:'mcr',    cn:'descMCR',    bn:'bultosMCR'    },
                { key:'ADUANA',   cls:'aduana', cn:'descAduana', bn:'bultosAduana' },
              ].map(({ key, cls, cn, bn }) => (
                <div key={key} className={`desc-card ${cls}`}>
                  <div className="desc-card-title">{key}</div>
                  <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                    <input type="text" name={cn} placeholder="Camiones" value={d[cn]} onChange={handle} className="input-field" style={{ textAlign:'center' }} />
                    <input type="text" name={bn} placeholder="Bultos"   value={d[bn]} onChange={handle} className="input-field" style={{ textAlign:'center' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Observaciones */}
          <div className="panel-card">
            <div className="section-title teal">📝 Observaciones del Turno</div>
            <textarea name="obs" rows={3} value={d.obs} onChange={handle}
              placeholder="Novedades, incidentes, comentarios relevantes del turno..." className="obs-area" />
          </div>

          {/* Acciones Principales */}
          <div className="btn-row">
            <button onClick={handleSave} disabled={saving} className="btn btn-save">
              {saving ? '⏳ Guardando...' : saved ? '✅ ¡Guardado!' : '💾 Guardar en Sheet'}
            </button>
            <button onClick={() => window.print()} className="btn btn-print">
              🖨️ Imprimir / Exportar PDF
            </button>
          </div>
        </div>

        {/* REPORTE */}
        <div className="report-preview">
          <div className="report-header">
            <img src={LOGO_URL} alt="OCASA" className="report-logo" />
            <div>
              <div className="report-title">Informe Operativo · PL3</div>
              <div className="report-subtitle">Turno {d.turno}</div>
              <div className="report-date-pill">📅 {d.fecha}</div>
            </div>
          </div>

          <div className="report-body">
            <div className="report-grid-2">
              <div className="metric-card teal-c" style={{ paddingTop:22 }}>
                <div className="metric-card-label">🛒 Picking Preparado</div>
                <div className="metric-row">
                  <span className="metric-key">B2B</span>
                  <span>
                    <span className="metric-val">{n(d.pB2BV)}</span><span className="metric-unit">Viajes</span>
                    {' '}<span style={{ color:'#CCC', fontSize:14, margin:'0 4px' }}>/</span>{' '}
                    <span className="metric-val">{n(d.pB2BB)}</span><span className="metric-unit">Bultos</span>
                  </span>
                </div>
                <div className="metric-row">
                  <span className="metric-key">B2C</span>
                  <span>
                    <span className="metric-val">{n(d.pB2CV)}</span><span className="metric-unit">Viajes</span>
                    {' '}<span style={{ color:'#CCC', fontSize:14, margin:'0 4px' }}>/</span>{' '}
                    <span className="metric-val">{n(d.pB2CB)}</span><span className="metric-unit">Bultos</span>
                  </span>
                </div>
              </div>

              <div className="metric-card teal-hero" style={{ paddingTop:22, textAlign:'center' }}>
                <div className="metric-card-label">🚚 Despachos Realizados</div>
                <div style={{ display:'flex', justifyContent:'center', alignItems:'baseline', gap:12 }}>
                  <div>
                    <div className="hero-number" style={{ fontSize:38 }}>{n(d.despV)}</div>
                    <div className="hero-sub">Viajes</div>
                  </div>
                  <div style={{ fontSize:24, color:'var(--teal)', fontWeight:300 }}>/</div>
                  <div>
                    <div className="hero-number" style={{ fontSize:38 }}>{n(d.despB)}</div>
                    <div className="hero-sub">Bultos</div>
                  </div>
                  <div style={{ fontSize:24, color:'var(--teal)', fontWeight:300 }}>/</div>
                  <div>
                    <div className="hero-number" style={{ fontSize:38 }}>{n(d.despP)}</div>
                    <div className="hero-sub">Pallets</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="desc-table-wrap">
              <div className="desc-table-header">🚛 Descargas — Recepción de Stock</div>
              <div className="desc-table-body">
                <div className="desc-col">
                  <div className="desc-col-title">Resumen Total</div>
                  <div className="desc-total-num">{totalC}</div>
                  <div className="desc-total-label">Camiones Operados</div>
                  <div className="bultos-big">{totalB.toLocaleString('es-AR')}</div>
                  <div className="desc-total-label">Bultos Recibidos</div>
                </div>
                <div className="desc-col">
                  <div className="desc-col-title">Detalle por Origen</div>
                  {[
                    { label:'TORTUGAS', c:d.descTort,   b:d.bultosTort,   color:'var(--teal-dark)' },
                    { label:'MCR',      c:d.descMCR,    b:d.bultosMCR,    color:'var(--charcoal)' },
                    { label:'ADUANA',   c:d.descAduana, b:d.bultosAduana, color:'var(--red)' },
                  ].map(({ label, c, b, color }) => (
                    <div key={label} className="origen-row">
                      <span style={{ color, fontWeight:700, fontSize:11, letterSpacing:'0.06em' }}>{label}</span>
                      <span className="val">{n(c)} Camiones — {n(b)} Bultos</span>
                    </div>
                  ))}
                </div>
                <div className="desc-col">
                  <div className="desc-col-title">Stock Interno</div>
                  <div className="stock-num">{n(d.movInt)}</div>
                  <div className="stock-label">Movimientos Internos</div>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'baseline' }}>
                    <div className="stock-num" style={{ fontSize:22, color:'var(--teal)' }}>{n(d.ciclicoLoc)}</div>
                    <span style={{ fontSize:8, fontWeight:700, color:'var(--text-muted)' }}>LOC</span>
                    <span style={{ color:'#DDD' }}>/</span>
                    <div className="stock-num" style={{ fontSize:22, color:'var(--teal)' }}>{n(d.ciclicoSKU)}</div>
                    <span style={{ fontSize:8, fontWeight:700, color:'var(--text-muted)' }}>SKU</span>
                    <span style={{ color:'#DDD' }}>/</span>
                    <div className="stock-num" style={{ fontSize:22, color:'var(--teal)' }}>{n(d.ciclicoBultos)}</div>
                    <span style={{ fontSize:8, fontWeight:700, color:'var(--text-muted)' }}>BUL</span>
                  </div>
                  <div className="stock-label">Localizadores Cíclicos</div>
                </div>
              </div>
            </div>

            <div className="report-grid-2">
              <div className="metric-card purple-c" style={{ paddingTop:22, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <div className="metric-card-label">🔄 Logística Inversa — RMA</div>
                <div>
                  <div style={{ fontFamily:'Barlow Condensed,sans-serif', fontSize:52, fontWeight:900, color:'var(--purple)', lineHeight:1 }}>{n(d.rmaCant)}</div>
                  <div style={{ fontFamily:'Barlow Condensed,sans-serif', fontSize:9, fontWeight:700, color:'#9B6EE0', textTransform:'uppercase', letterSpacing:'0.12em', marginTop:2 }}>Unidades RMA Realizadas</div>
                </div>
                <div style={{ width:52, height:52, borderRadius:'50%', background:'#EDE0FF', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Barlow Condensed', fontSize:22, fontWeight:900, color:'var(--purple)' }}>R</div>
              </div>

              <div className="metric-card blue-c" style={{ paddingTop:22, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <div className="metric-card-label">🧾 Control de Viajes</div>
                <div>
                  <div style={{ fontFamily:'Barlow Condensed,sans-serif', fontSize:52, fontWeight:900, color:'var(--blue)', lineHeight:1 }}>{n(d.rendiciones)}</div>
                  <div style={{ fontFamily:'Barlow Condensed,sans-serif', fontSize:9, fontWeight:700, color:'#4A80D4', textTransform:'uppercase', letterSpacing:'0.12em', marginTop:2 }}>Viajes Rendidos</div>
                </div>
                <div style={{ width:52, height:52, borderRadius:'50%', background:'#D8E8FF', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Barlow Condensed', fontSize:22, fontWeight:900, color:'var(--blue)' }}>V</div>
              </div>
            </div>

            {d.obs && (
              <div style={{ marginTop:20, background:'#F0FAFA', border:'1.5px solid var(--teal-mid)', borderRadius:10, padding:'16px 20px' }}>
                <div style={{ fontFamily:'Barlow Condensed,sans-serif', fontSize:9, fontWeight:800, letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--teal-dark)', marginBottom:6 }}>
                  📝 Observaciones del Turno
                </div>
                <p style={{ fontFamily:'Barlow', fontSize:13, color:'var(--charcoal)', lineHeight:1.6, whiteSpace:'pre-wrap' }}>{d.obs}</p>
              </div>
            )}
          </div>

          {/* COMPARTIR */}
          <div className="share-section">
            <div className="share-label">Compartir Resumen por Canales Sutiles</div>
            <div className="btn-row">
              <button onClick={shareWpp} className="btn btn-subtle btn-wpp-subtle">
                <span>WhatsApp</span>
              </button>
              <button onClick={shareSlack} className="btn btn-subtle btn-slack-subtle">
                <span>Slack</span>
              </button>
              <button onClick={shareGmail} className="btn btn-subtle btn-gmail-subtle">
                <span>Gmail</span>
              </button>
            </div>
          </div>

          <div className="report-footer">
            <span className="footer-text">Optimización Logística PL3 · Tesis 2026</span>
            <span className="footer-text" style={{ color:'var(--teal-dark)' }}>OCASA LOGÍSTICA · Generado {d.fecha}</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default App;

