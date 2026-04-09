import React, { useState, useEffect } from 'react';

// ─── Google Fonts (Barlow family) ───────────────────────────────────────────
const fontLink = document.createElement('link');
fontLink.rel = 'stylesheet';
fontLink.href = 'https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Barlow:wght@400;500;600;700&family=Barlow+Semi+Condensed:wght@500;600;700&display=swap';
document.head.appendChild(fontLink);

// ─── Styles ─────────────────────────────────────────────────────────────────
const styleTag = document.createElement('style');
styleTag.textContent = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --navy: #0A1628;
    --navy-mid: #132240;
    --navy-light: #1E3A5F;
    --blue: #1D5BE3;
    --blue-light: #3B7CF6;
    --amber: #F59E0B;
    --amber-light: #FCD34D;
    --emerald: #059669;
    --red: #DC2626;
    --purple: #7C3AED;
    --slate: #64748B;
    --slate-light: #F1F5F9;
    --white: #FFFFFF;
    --border: #E2E8F0;
    --text-main: #0F172A;
    --text-muted: #64748B;
  }
  body {
    font-family: 'Barlow', sans-serif;
    background: #EEF2F7;
    color: var(--text-main);
    min-height: 100vh;
  }
  .app-header {
    background: var(--navy);
    position: sticky;
    top: 0;
    z-index: 100;
    box-shadow: 0 4px 20px rgba(10,22,40,0.4);
  }
  .header-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 32px;
    border-bottom: 3px solid var(--amber);
  }
  .header-brand { display: flex; align-items: center; gap: 16px; }
  .header-logo {
    height: 36px;
    width: auto;
    filter: brightness(0) invert(1);
    object-fit: contain;
  }
  .header-divider { width: 1px; height: 32px; background: rgba(255,255,255,0.2); }
  .header-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 18px;
    font-weight: 800;
    color: white;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }
  .header-sub {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 11px;
    font-weight: 600;
    color: var(--amber);
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }
  .header-right { display: flex; align-items: center; gap: 12px; }
  .turno-select {
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.2);
    color: white;
    padding: 6px 12px;
    border-radius: 6px;
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 700;
    font-size: 13px;
    letter-spacing: 0.05em;
    cursor: pointer;
    outline: none;
  }
  .turno-select option { background: var(--navy); color: white; }
  .date-badge {
    background: var(--amber);
    color: var(--navy);
    padding: 6px 14px;
    border-radius: 6px;
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 800;
    font-size: 12px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    white-space: nowrap;
  }
  .main-wrap { max-width: 1100px; margin: 0 auto; padding: 28px 24px 60px; }
  .section-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 14px;
  }
  .section-title::before {
    content: '';
    display: block;
    width: 4px;
    height: 16px;
    border-radius: 2px;
    flex-shrink: 0;
  }
  .section-title.green { color: var(--emerald); }
  .section-title.green::before { background: var(--emerald); }
  .section-title.blue { color: var(--blue); }
  .section-title.blue::before { background: var(--blue); }
  .section-title.orange { color: #D97706; }
  .section-title.orange::before { background: var(--amber); }
  .section-title.purple { color: var(--purple); }
  .section-title.purple::before { background: var(--purple); }
  .panel-card {
    background: white;
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.06);
    border: 1px solid var(--border);
    margin-bottom: 16px;
  }
  .input-group { display: flex; flex-direction: column; gap: 5px; }
  .input-label {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--text-muted);
  }
  .input-field {
    border: 1.5px solid var(--border);
    border-radius: 7px;
    padding: 9px 12px;
    font-family: 'Barlow Semi Condensed', sans-serif;
    font-size: 14px;
    font-weight: 600;
    color: var(--text-main);
    background: white;
    transition: border-color 0.15s, box-shadow 0.15s;
    outline: none;
    width: 100%;
  }
  .input-field:focus { border-color: var(--blue); box-shadow: 0 0 0 3px rgba(29,91,227,0.12); }
  .input-field::placeholder { color: #CBD5E1; font-weight: 500; }
  .input-field.accent-green:focus { border-color: var(--emerald); box-shadow: 0 0 0 3px rgba(5,150,105,0.12); }
  .input-field.accent-orange:focus { border-color: var(--amber); box-shadow: 0 0 0 3px rgba(245,158,11,0.12); }
  .input-field.accent-purple:focus { border-color: var(--purple); box-shadow: 0 0 0 3px rgba(124,58,237,0.12); }
  .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
  .four-col { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
  .pair { display: flex; gap: 8px; }
  .pair .input-field { flex: 1; min-width: 0; }
  .desc-card {
    background: #FAFBFC;
    border: 1.5px solid var(--border);
    border-radius: 10px;
    padding: 14px;
  }
  .desc-card-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    text-align: center;
    padding-bottom: 10px;
    margin-bottom: 10px;
    border-bottom: 1.5px solid var(--border);
  }
  .desc-card.pl4 { border-color: #FCD34D; }
  .desc-card.pl4 .desc-card-title { color: #B45309; border-color: #FCD34D; }
  .desc-card.tort { border-color: #BFDBFE; }
  .desc-card.tort .desc-card-title { color: #1D4ED8; border-color: #BFDBFE; }
  .desc-card.mcr { border-color: #E2E8F0; }
  .desc-card.mcr .desc-card-title { color: #334155; }
  .desc-card.aduana { border-color: #FECACA; }
  .desc-card.aduana .desc-card-title { color: #991B1B; border-color: #FECACA; }
  .btn-row { display: flex; gap: 12px; justify-content: center; margin-top: 8px; }
  .btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 28px;
    border-radius: 8px;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 14px;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    cursor: pointer;
    border: none;
    transition: transform 0.1s, box-shadow 0.1s;
  }
  .btn:active { transform: translateY(1px); }
  .btn-save { background: var(--emerald); color: white; box-shadow: 0 4px 14px rgba(5,150,105,0.35); }
  .btn-save:hover { background: #047857; box-shadow: 0 6px 18px rgba(5,150,105,0.45); }
  .btn-save:disabled { background: #94A3B8; box-shadow: none; cursor: not-allowed; }
  .btn-print { background: var(--navy); color: white; box-shadow: 0 4px 14px rgba(10,22,40,0.3); }
  .btn-print:hover { background: var(--navy-mid); }
  .obs-area {
    width: 100%;
    border: 1.5px solid var(--border);
    border-radius: 7px;
    padding: 10px 12px;
    font-family: 'Barlow', sans-serif;
    font-size: 13px;
    color: var(--text-main);
    resize: none;
    outline: none;
    margin-top: 4px;
    transition: border-color 0.15s;
  }
  .obs-area:focus { border-color: var(--blue); box-shadow: 0 0 0 3px rgba(29,91,227,0.1); }

  /* ── REPORT ── */
  .report-preview {
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 30px rgba(10,22,40,0.12);
    overflow: hidden;
    border: 1px solid var(--border);
    margin-top: 28px;
  }
  .report-header {
    background: var(--navy);
    padding: 24px 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 4px solid var(--amber);
  }
  .report-logo { height: 40px; width: auto; filter: brightness(0) invert(1); object-fit: contain; }
  .report-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 26px;
    font-weight: 900;
    color: white;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    line-height: 1;
    text-align: right;
  }
  .report-subtitle {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 11px;
    font-weight: 700;
    color: var(--amber);
    letter-spacing: 0.14em;
    text-transform: uppercase;
    margin-top: 4px;
    text-align: right;
  }
  .report-date-pill {
    display: inline-block;
    background: rgba(255,255,255,0.12);
    border: 1px solid rgba(255,255,255,0.25);
    color: white;
    padding: 4px 14px;
    border-radius: 4px;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-top: 8px;
  }
  .report-body { padding: 28px 32px; }
  .report-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }
  .metric-card {
    border: 2px solid var(--border);
    border-radius: 10px;
    padding: 18px 20px;
    position: relative;
    background: white;
  }
  .metric-card-label {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 9px;
    font-weight: 800;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    position: absolute;
    top: -1px;
    left: 16px;
    background: white;
    padding: 0 6px;
    transform: translateY(-50%);
  }
  .metric-card.green { border-color: var(--emerald); }
  .metric-card.green .metric-card-label { color: var(--emerald); }
  .metric-card.indigo { border-color: #4F46E5; background: #F5F3FF; }
  .metric-card.indigo .metric-card-label { color: #4338CA; background: #F5F3FF; }
  .metric-card.purple { border-color: var(--purple); background: #FAF5FF; }
  .metric-card.purple .metric-card-label { color: var(--purple); background: #FAF5FF; }
  .metric-card.blue-c { border-color: var(--blue); background: #EFF6FF; }
  .metric-card.blue-c .metric-card-label { color: var(--blue); background: #EFF6FF; }
  .metric-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid var(--border);
  }
  .metric-row:last-child { margin-bottom: 0; padding-bottom: 0; border-bottom: none; }
  .metric-key {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 13px;
    font-weight: 600;
    color: var(--text-muted);
  }
  .metric-val {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 22px;
    font-weight: 900;
    color: var(--text-main);
    line-height: 1;
  }
  .metric-unit {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 9px;
    font-weight: 700;
    color: var(--text-muted);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-left: 3px;
  }
  .hero-number {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 52px;
    font-weight: 900;
    color: #4338CA;
    line-height: 1;
    letter-spacing: -0.01em;
  }
  .hero-sub {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 10px;
    font-weight: 700;
    color: #6366F1;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    margin-top: 4px;
  }
  .desc-table-wrap {
    background: white;
    border: 2px solid var(--border);
    border-radius: 10px;
    overflow: hidden;
    margin-bottom: 20px;
  }
  .desc-table-header {
    background: var(--navy);
    padding: 10px 20px;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: white;
    border-bottom: 2px solid var(--amber);
  }
  .desc-table-body {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    min-height: 120px;
  }
  .desc-col { padding: 20px; border-right: 1px solid var(--border); }
  .desc-col:last-child { border-right: none; }
  .desc-col-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 9px;
    font-weight: 800;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--text-muted);
    margin-bottom: 12px;
  }
  .desc-total-num {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 46px;
    font-weight: 900;
    color: var(--text-main);
    line-height: 1;
  }
  .desc-total-label {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 9px;
    font-weight: 700;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-top: 2px;
  }
  .bultos-big {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 22px;
    font-weight: 900;
    color: #D97706;
    margin-top: 8px;
    line-height: 1;
  }
  .origen-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 6px 0;
    border-bottom: 1px solid #F1F5F9;
    font-family: 'Barlow Semi Condensed', sans-serif;
    font-size: 12px;
    font-weight: 500;
    color: var(--text-muted);
  }
  .origen-row:last-child { border-bottom: none; }
  .origen-row .val {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 13px;
    font-weight: 800;
    color: var(--text-main);
  }
  .stock-num {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 28px;
    font-weight: 900;
    line-height: 1;
  }
  .stock-label {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 9px;
    font-weight: 700;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-top: 2px;
    margin-bottom: 14px;
  }
  .report-footer {
    border-top: 1px solid var(--border);
    padding: 14px 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #FAFBFC;
  }
  .footer-text {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--text-muted);
  }

  @media print {
    body { background: white; }
    .panel-area { display: none !important; }
    .report-preview {
      display: block !important;
      box-shadow: none;
      border: none;
      border-radius: 0;
      margin: 0;
    }
    .report-header,
    .desc-table-header,
    .metric-card.indigo,
    .metric-card.purple,
    .metric-card.blue-c {
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    @page { margin: 0; size: A4; }
  }

  @media (max-width: 768px) {
    .two-col { grid-template-columns: 1fr; }
    .four-col { grid-template-columns: 1fr 1fr; }
    .report-grid-2 { grid-template-columns: 1fr; }
    .desc-table-body { grid-template-columns: 1fr; }
    .header-inner { padding: 10px 16px; }
    .main-wrap { padding: 16px 12px 60px; }
  }
`;
document.head.appendChild(styleTag);

// ─── Constants ───────────────────────────────────────────────────────────────
const WEB_APP_URL =
  'https://script.google.com/macros/s/AKfycbwMwYvjERyxcc4W9AzjFkkwPFfVrsAft6JeOW6g1b1hucnSItyrmc-vmI-BGPhjnyXk/exec';

const INIT = {
  fecha: '', turno: 'Mañana',
  pB2BV: '', pB2BB: '', pB2CV: '', pB2CB: '',
  despB: '', despP: '',
  descPL4: '', descTort: '', descMCR: '', descAduana: '',
  bultosPL4: '', bultosTort: '', bultosMCR: '', bultosAduana: '',
  ciclicoLoc: '', movInt: '', obs: '',
  rmaCant: '', rendiciones: '',
};

// ─── Helpers ─────────────────────────────────────────────────────────────────
const Field = ({ label, name, placeholder, value, onChange, accent, center }) => (
  <div className="input-group">
    {label && <span className="input-label">{label}</span>}
    <input
      type="text"
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`input-field${accent ? ` accent-${accent}` : ''}`}
      style={center ? { textAlign: 'center' } : {}}
    />
  </div>
);

// ─── App ─────────────────────────────────────────────────────────────────────
const App = () => {
  const [saving, setSaving]   = useState(false);
  const [saved, setSaved]     = useState(false);
  const [d, setD]             = useState(INIT);

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
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify(d),
        headers: { 'Content-Type': 'application/json' },
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      alert('❌ Error al guardar. Verificá la conexión.');
    } finally {
      setSaving(false);
    }
  };

  // ── Totals
  const totalC = ['descPL4','descTort','descMCR','descAduana'].reduce((a, k) => a + (Number(d[k]) || 0), 0);
  const totalB = ['bultosPL4','bultosTort','bultosMCR','bultosAduana'].reduce((a, k) => a + (Number(d[k]) || 0), 0);
  const n = v => v || '—';

  return (
    <div>
      {/* ── HEADER ── */}
      <div className="app-header">
        <div className="header-inner">
          <div className="header-brand">
            <img
              src="https://logodownload.org/wp-content/uploads/2019/08/ocasa-logo.png"
              alt="OCASA"
              className="header-logo"
            />
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
        {/* ══════════════════════════════
            PANEL DE CARGA
        ══════════════════════════════ */}
        <div className="panel-area">

          {/* ROW 1 */}
          <div className="two-col">

            {/* Picking */}
            <div className="panel-card">
              <div className="section-title green">🛒 Picking Preparado</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div className="input-group">
                  <span className="input-label">B2B — Viajes / Bultos</span>
                  <div className="pair">
                    <input type="text" name="pB2BV" placeholder="Viajes" value={d.pB2BV} onChange={handle} className="input-field accent-green" />
                    <input type="text" name="pB2BB" placeholder="Bultos" value={d.pB2BB} onChange={handle} className="input-field accent-green" />
                  </div>
                </div>
                <div className="input-group">
                  <span className="input-label">B2C — Viajes / Bultos</span>
                  <div className="pair">
                    <input type="text" name="pB2CV" placeholder="Viajes" value={d.pB2CV} onChange={handle} className="input-field accent-green" />
                    <input type="text" name="pB2CB" placeholder="Bultos" value={d.pB2CB} onChange={handle} className="input-field accent-green" />
                  </div>
                </div>
                <Field label="Despachos — Bultos Totales" name="despB" placeholder="0" value={d.despB} onChange={handle} />
                <Field label="Despachos — Pallets"        name="despP" placeholder="0" value={d.despP} onChange={handle} />
              </div>
            </div>

            {/* RMA y Control */}
            <div className="panel-card">
              <div className="section-title purple">🔄 RMA y Control Operativo</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <Field label="RMA Realizados (Unidades)"    name="rmaCant"     placeholder="0"   value={d.rmaCant}     onChange={handle} accent="purple" />
                <Field label="Viajes Rendidos"              name="rendiciones" placeholder="0"   value={d.rendiciones} onChange={handle} />
                <Field label="Movimientos Internos de Stock" name="movInt"     placeholder="0"   value={d.movInt}      onChange={handle} />
                <Field label="Localizadores Cíclicos"       name="ciclicoLoc" placeholder="S/N" value={d.ciclicoLoc}  onChange={handle} />
              </div>
            </div>
          </div>

          {/* ROW 2 — Descargas */}
          <div className="panel-card">
            <div className="section-title orange">🚛 Camiones y Bultos Descargados</div>
            <div className="four-col">
              {[
                { key: 'PL4',      cls: 'pl4',    cn: 'descPL4',    bn: 'bultosPL4'    },
                { key: 'TORTUGAS', cls: 'tort',   cn: 'descTort',   bn: 'bultosTort'   },
                { key: 'MCR',      cls: 'mcr',    cn: 'descMCR',    bn: 'bultosMCR'    },
                { key: 'ADUANA',   cls: 'aduana', cn: 'descAduana', bn: 'bultosAduana' },
              ].map(({ key, cls, cn, bn }) => (
                <div key={key} className={`desc-card ${cls}`}>
                  <div className="desc-card-title">{key}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <input type="text" name={cn} placeholder="Cant. Camiones" value={d[cn]} onChange={handle} className="input-field" style={{ textAlign: 'center' }} />
                    <input type="text" name={bn} placeholder="Total Bultos"   value={d[bn]} onChange={handle} className="input-field" style={{ textAlign: 'center' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ROW 3 — Observaciones */}
          <div className="panel-card">
            <div className="section-title blue">📝 Observaciones del Turno</div>
            <textarea
              name="obs"
              rows={3}
              value={d.obs}
              onChange={handle}
              placeholder="Novedades, incidentes, comentarios relevantes del turno..."
              className="obs-area"
            />
          </div>

          {/* Acciones */}
          <div className="btn-row">
            <button onClick={handleSave} disabled={saving} className="btn btn-save">
              {saving ? '⏳ Guardando...' : saved ? '✅ ¡Guardado!' : '💾 Guardar en Sheet'}
            </button>
            <button onClick={() => window.print()} className="btn btn-print">
              🖨️ Imprimir / Exportar PDF
            </button>
          </div>
        </div>

        {/* ══════════════════════════════
            REPORTE (preview + print)
        ══════════════════════════════ */}
        <div className="report-preview">

          {/* Header del reporte */}
          <div className="report-header">
            <img
              src="https://logodownload.org/wp-content/uploads/2019/08/ocasa-logo.png"
              alt="OCASA"
              className="report-logo"
            />
            <div>
              <div className="report-title">Informe Operativo · PL3</div>
              <div className="report-subtitle">Turno {d.turno}</div>
              <div className="report-date-pill">📅 {d.fecha}</div>
            </div>
          </div>

          {/* Body del reporte */}
          <div className="report-body">

            {/* Picking + Despachos */}
            <div className="report-grid-2">
              <div className="metric-card green" style={{ paddingTop: 22 }}>
                <div className="metric-card-label">🛒 Picking Preparado</div>
                <div className="metric-row">
                  <span className="metric-key">B2B</span>
                  <span>
                    <span className="metric-val">{n(d.pB2BV)}</span><span className="metric-unit">VJ</span>
                    {' '}<span style={{ color: '#CBD5E1', fontSize: 14, margin: '0 4px' }}>/</span>{' '}
                    <span className="metric-val">{n(d.pB2BB)}</span><span className="metric-unit">BLT</span>
                  </span>
                </div>
                <div className="metric-row">
                  <span className="metric-key">B2C</span>
                  <span>
                    <span className="metric-val">{n(d.pB2CV)}</span><span className="metric-unit">VJ</span>
                    {' '}<span style={{ color: '#CBD5E1', fontSize: 14, margin: '0 4px' }}>/</span>{' '}
                    <span className="metric-val">{n(d.pB2CB)}</span><span className="metric-unit">BLT</span>
                  </span>
                </div>
              </div>

              <div className="metric-card indigo" style={{ paddingTop: 22, textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div className="metric-card-label">🚚 Despachos Realizados</div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline', gap: 16 }}>
                  <div>
                    <div className="hero-number">{n(d.despB)}</div>
                    <div className="hero-sub">Bultos</div>
                  </div>
                  <div style={{ fontSize: 28, color: '#A5B4FC', fontWeight: 300 }}>/</div>
                  <div>
                    <div className="hero-number" style={{ fontSize: 40 }}>{n(d.despP)}</div>
                    <div className="hero-sub">Pallets</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Descargas */}
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
                    { label: 'PL4',      c: d.descPL4,    b: d.bultosPL4,    color: '#B45309' },
                    { label: 'TORTUGAS', c: d.descTort,   b: d.bultosTort,   color: '#1D4ED8' },
                    { label: 'MCR',      c: d.descMCR,    b: d.bultosMCR,    color: '#334155' },
                    { label: 'ADUANA',   c: d.descAduana, b: d.bultosAduana, color: '#991B1B' },
                  ].map(({ label, c, b, color }) => (
                    <div key={label} className="origen-row">
                      <span style={{ color, fontWeight: 700, fontSize: 11, letterSpacing: '0.06em' }}>{label}</span>
                      <span className="val">{n(c)} C · {n(b)} B</span>
                    </div>
                  ))}
                </div>
                <div className="desc-col">
                  <div className="desc-col-title">Stock Interno</div>
                  <div className="stock-num" style={{ color: 'var(--emerald)' }}>{n(d.movInt)}</div>
                  <div className="stock-label">Movimientos Internos</div>
                  <div className="stock-num" style={{ color: 'var(--blue)', fontSize: 22 }}>{n(d.ciclicoLoc)}</div>
                  <div className="stock-label">Localizadores Cíclicos</div>
                </div>
              </div>
            </div>

            {/* RMA + Viajes */}
            <div className="report-grid-2">
              <div className="metric-card purple" style={{ paddingTop: 22, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="metric-card-label">🔄 Logística Inversa — RMA</div>
                <div>
                  <div style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: 52, fontWeight: 900, color: 'var(--purple)', lineHeight: 1 }}>{n(d.rmaCant)}</div>
                  <div style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: 9, fontWeight: 700, color: '#8B5CF6', textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: 2 }}>Unidades RMA Realizadas</div>
                </div>
                <div style={{ width: 52, height: 52, borderRadius: '50%', background: '#EDE9FE', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Barlow Condensed', fontSize: 22, fontWeight: 900, color: 'var(--purple)' }}>R</div>
              </div>

              <div className="metric-card blue-c" style={{ paddingTop: 22, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="metric-card-label">🧾 Control de Viajes</div>
                <div>
                  <div style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: 52, fontWeight: 900, color: 'var(--blue)', lineHeight: 1 }}>{n(d.rendiciones)}</div>
                  <div style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: 9, fontWeight: 700, color: 'var(--blue-light)', textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: 2 }}>Viajes Rendidos</div>
                </div>
                <div style={{ width: 52, height: 52, borderRadius: '50%', background: '#DBEAFE', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Barlow Condensed', fontSize: 22, fontWeight: 900, color: 'var(--blue)' }}>V</div>
              </div>
            </div>

            {/* Observaciones (solo si hay contenido) */}
            {d.obs && (
              <div style={{ marginTop: 20, background: '#FFFBEB', border: '1.5px solid #FCD34D', borderRadius: 10, padding: '16px 20px' }}>
                <div style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: 9, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#B45309', marginBottom: 6 }}>📝 Observaciones del Turno</div>
                <p style={{ fontFamily: 'Barlow', fontSize: 13, color: '#78350F', lineHeight: 1.6 }}>{d.obs}</p>
              </div>
            )}
          </div>

          {/* Footer del reporte */}
          <div className="report-footer">
            <span className="footer-text">Optimización Logística PL3 · Tesis 2026</span>
            <span className="footer-text" style={{ color: 'var(--blue)' }}>OCASA LOGÍSTICA · Generado {d.fecha}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

