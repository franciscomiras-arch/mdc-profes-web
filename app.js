/* MdC Profes · IES Miguel de Cervantes · app web instalable (iPhone y Android) */
(() => {
'use strict';

// Accesos de la Zona Profesorado (los mismos que la app Android). No cambies los id.
const DEFAULTS = [
  {"id": "d_sda", "section": "Espacios web", "icon": "🧩", "title": "Creador de SdA", "url": "https://sites.google.com/murciaeduca.es/creadordesituacionesdeaprendiz/inicio"},
  {"id": "d_actas", "section": "Espacios web", "icon": "✍️", "title": "Firma de actas", "url": "http://firma.murciaeduca.es/"},
  {"id": "d_aula", "section": "Espacios web", "icon": "🎓", "title": "Aula Virtual", "url": "https://aulavirtual.murciaeduca.es/login/index.php"},
  {"id": "d_intranet", "section": "Espacios web", "icon": "📁", "title": "Intranet Drive", "url": "https://drive.google.com/drive/folders/1pqgkQKZsCsZAWvNuJIbW0mC33BMz1spF?usp=drive_link"},
  {"id": "d_plumier", "section": "Espacios web", "icon": "🏛️", "title": "Plumier XXI", "url": "https://profesores.murciaeduca.es/GICWeb/"},
  {"id": "d_correo", "section": "Espacios web", "icon": "✉️", "title": "Correo web", "url": "https://gmail.com/"},
  {"id": "d_clip", "section": "Espacios web", "icon": "🛠️", "title": "Incidencias CLIP", "url": "https://soporte.murciaeduca.es/"},
  {"id": "d_firma", "section": "Espacios web", "icon": "🔏", "title": "Firma digital", "url": "https://pase.carm.es/pase/login?service=https%3A%2F%2Fportafirmas.carm.es"},
  {"id": "d_anota", "section": "Espacios web", "icon": "📝", "title": "Anota", "url": "http://anota.murciaeduca.es"},
  {"id": "d_faltas", "section": "Gestión del centro", "icon": "📋", "title": "Faltas profesorado", "url": "https://main.iesmigueldecervantes.com/gestor-de-faltas-de-asistencia-del-profesorado"},
  {"id": "d_rmi", "section": "Gestión del centro", "icon": "💻", "title": "Incidencias RMI", "url": "https://forms.gle/vsNWKMLuFivEEew48"},
  {"id": "d_fotocop", "section": "Gestión del centro", "icon": "🖨️", "title": "Alta fotocopiadora", "url": "https://forms.gle/XUt9KptBGXWNKkuAA"},
  {"id": "d_material", "section": "Gestión del centro", "icon": "📦", "title": "Material Secretaría", "url": "https://main.iesmigueldecervantes.com/peticion-de-material-a-secretario-del-centro"},
  {"id": "d_calendario", "section": "Gestión del centro", "icon": "🗓️", "title": "Calendario 26/27", "url": "https://drive.google.com/file/d/179ck8AE7fhSKnWSplEMndQSq8d5RFCcb/view?usp=sharing"},
  {"id": "d_lazarus", "section": "Gestión del centro", "icon": "📱", "title": "IMT Lazarus", "url": "https://iesmigueldecervantes.imtlazarus.com/lazarus/access.php"},
  {"id": "d_redar", "section": "Gestión del centro", "icon": "📚", "title": "REDAR", "url": "https://main.iesmigueldecervantes.com/redar"},
  {"id": "d_formacion", "section": "Formación", "icon": "🧑‍🏫", "title": "Formación profesorado", "url": "https://sites.google.com/murciaeduca.es/mdcformaciontic/inicio"},
  {"id": "d_fem", "section": "Formación", "icon": "🏢", "title": "Plataforma FEM", "url": "https://educas.murciaeduca.es/cas/login?service=https%3A%2F%2Ffct.murciaeduca.es%2Ffctcarm%2Fshiro-cas#/home"},
  {"id": "d_erasmus", "section": "Formación", "icon": "🇪🇺", "title": "Curso Erasmus+", "url": "https://www.schooleducationgateway.eu/es/pub/index.htm"},
  {"id": "d_orientacion", "section": "Legislación", "icon": "🧭", "title": "Orientación educativa", "url": "https://www.carm.es/web/pagina?IDCONTENIDO=22298&IDTIPO=100&RASTRO=c148%24m"},
  {"id": "d_legprof", "section": "Legislación", "icon": "⚖️", "title": "Leg. profesorado", "url": "https://main.iesmigueldecervantes.com/legislacion-profesorado"},
  {"id": "d_legedu", "section": "Legislación", "icon": "📜", "title": "Leg. educativa", "url": "https://main.iesmigueldecervantes.com/legislacion-educativa"},
];
const ICONS = ["🔗", "🌐", "📁", "📄", "📊", "📝", "🗓️", "✉️", "💬", "🎓", "📚", "🧪", "🧮", "🗺️", "🎨", "🎵", "⚽", "🧑‍🏫", "🏫", "🖥️", "📱", "🔒", "⭐", "📢", "🧾", "🗂️", "🎥", "🎧", "🧠", "🌍", "🔬", "📐"];

const VERSION = '0.2.0';
const MINE = 'Mis enlaces';
const SECTIONS = ['Espacios web', 'Gestión del centro', 'Formación', 'Legislación'];
const EXPORT_HEADER = '# MdC Profes · enlaces';
const $ = (s, r = document) => r.querySelector(s);

/* ------------------------------------------------------------ utilidades */

function el(tag, attrs = {}, ...kids) {
  const n = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v == null || v === false) continue;
    if (k === 'class') n.className = v;
    else if (k === 'text') n.textContent = v;
    else if (k.startsWith('on')) n.addEventListener(k.slice(2), v);
    else n.setAttribute(k, v === true ? '' : v);
  }
  for (const k of kids.flat()) if (k != null) n.append(k.nodeType ? k : document.createTextNode(k));
  return n;
}

const norm = (s) => String(s).normalize('NFD').replace(/\p{M}/gu, '').toLowerCase();

function urlKey(u) {
  let s = String(u).trim().toLowerCase().replace(/^https?:\/\//, '').replace(/^www\./, '');
  return s.endsWith('/') ? s.slice(0, -1) : s;
}

/** Devuelve una dirección válida (añade https:// si falta) o null. */
function normalizeUrl(raw) {
  let s = String(raw || '').trim();
  if (!s || /\s/.test(s)) return null;
  if (/^(mailto:|tel:)./i.test(s)) return s;
  if (!/^https?:\/\//i.test(s)) s = 'https://' + s;
  try {
    const u = new URL(s);
    if (!u.hostname.includes('.') || u.hostname.startsWith('.') || u.hostname.endsWith('.')) return null;
    return s;
  } catch { return null; }
}

function firstUrl(text) {
  const m = String(text || '').match(/https?:\/\/[^\s<>"']+|(?:www\.)[^\s<>"']+/i);
  return m ? normalizeUrl(m[0].replace(/[).,;]+$/, '')) : null;
}

const isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent) ||
  (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
const isStandalone = () => window.matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;

/* ------------------------------------------------------------ almacenamiento */

const mem = {};
const store = {
  get(k, def) {
    try { const v = localStorage.getItem('mdc.' + k); return v == null ? def : JSON.parse(v); }
    catch { return k in mem ? mem[k] : def; }
  },
  set(k, v) {
    mem[k] = v;
    try { localStorage.setItem('mdc.' + k, JSON.stringify(v)); } catch { /* modo privado: solo en memoria */ }
  }
};

const data = {
  custom: () => (store.get('custom', []) || []).filter((x) => x && x.url && x.title),
  saveCustom: (list) => store.set('custom', list),
  favs: () => store.get('favs', []) || [],
  hidden: () => new Set(store.get('hidden', []) || []),
  isFav: (id) => data.favs().includes(id),
  toggleFav(id) {
    const f = data.favs(); const i = f.indexOf(id);
    if (i >= 0) f.splice(i, 1); else f.push(id);
    store.set('favs', f);
  },
  removeFav(id) { store.set('favs', data.favs().filter((x) => x !== id)); },
  upsert(item) {
    const list = data.custom(); const i = list.findIndex((x) => x.id === item.id);
    if (i >= 0) list[i] = item; else list.push(item);
    data.saveCustom(list);
  },
  remove(id) { data.saveCustom(data.custom().filter((x) => x.id !== id)); data.removeFav(id); },
  hide(id) { const h = data.hidden(); h.add(id); store.set('hidden', [...h]); data.removeFav(id); },
  restoreHidden() { store.set('hidden', []); }
};

function allLinks() {
  const hidden = data.hidden();
  return [
    ...DEFAULTS.filter((x) => !hidden.has(x.id)),
    ...data.custom().map((x) => ({ ...x, custom: true }))
  ];
}

function urlExists(url, exceptId) {
  const k = urlKey(url);
  return DEFAULTS.some((x) => urlKey(x.url) === k) ||
    data.custom().some((x) => x.id !== exceptId && urlKey(x.url) === k);
}

/* La foto del horario va en IndexedDB (cabe una imagen grande y no sale del dispositivo). */
const idb = {
  db: null,
  open() {
    if (this.db) return Promise.resolve(this.db);
    return new Promise((res, rej) => {
      if (!('indexedDB' in window)) { rej(new Error('Sin IndexedDB')); return; }
      const r = indexedDB.open('mdc-profes', 1);
      r.onupgradeneeded = () => r.result.createObjectStore('files');
      r.onsuccess = () => { this.db = r.result; res(this.db); };
      r.onerror = () => rej(r.error);
    });
  },
  async op(mode, fn) {
    const db = await this.open();
    return new Promise((res, rej) => {
      const tx = db.transaction('files', mode); const st = tx.objectStore('files');
      const req = fn(st);
      tx.oncomplete = () => res(req && req.result);
      tx.onerror = () => rej(tx.error);
      tx.onabort = () => rej(tx.error);
    });
  },
  get: (k) => idb.op('readonly', (s) => s.get(k)),
  put: (k, v) => idb.op('readwrite', (s) => s.put(v, k)),
  del: (k) => idb.op('readwrite', (s) => s.delete(k))
};

let scheduleUrl = null; // object URL de la foto actual
async function loadSchedule() {
  try {
    const rec = await idb.get('horario');
    if (scheduleUrl) URL.revokeObjectURL(scheduleUrl);
    scheduleUrl = rec && rec.buf ? URL.createObjectURL(new Blob([rec.buf], { type: rec.type || 'image/jpeg' })) : null;
  } catch { scheduleUrl = null; }
  return scheduleUrl;
}

/* ------------------------------------------------------------ apertura de enlaces */

function openLink(url) {
  if (/^(mailto:|tel:)/i.test(url)) { location.href = url; return; }
  // Un enlace real con target=_blank: en el iPhone instalado se abre en una hoja de Safari
  // encima de la app, y al cerrarla se vuelve a MdC Profes.
  const a = el('a', { href: url, target: '_blank', rel: 'noopener noreferrer', style: 'display:none' });
  document.body.append(a); a.click(); a.remove();
}

/* ------------------------------------------------------------ pintado */

const content = $('#content');
let query = '';

function render() {
  content.replaceChildren();
  const all = allLinks();
  const q = norm(query.trim());

  if (q) {
    const hits = all.filter((it) => norm(`${it.title} ${it.section} ${it.url}`).includes(q));
    content.append(el('h2', { class: 'sec', text: `Resultados (${hits.length})` }));
    if (!hits.length) content.append(el('div', { class: 'empty', text: 'No hay accesos que coincidan. Puedes añadirlo tú con el menú ⋮.' }));
    else content.append(grid(hits, false));
    return;
  }

  const b = installBanner();
  if (b) content.append(b);
  content.append(scheduleCard());

  const byId = new Map(all.map((x) => [x.id, x]));
  const favs = data.favs().map((id) => byId.get(id)).filter(Boolean);
  if (favs.length) { content.append(el('h2', { class: 'sec', text: '★ Favoritos' })); content.append(grid(favs, false)); }

  const groups = new Map(SECTIONS.map((s) => [s, []]));
  const mine = [];
  for (const it of all) {
    const s = (it.section || MINE).trim();
    if (s.toLowerCase() === MINE.toLowerCase()) { mine.push(it); continue; }
    if (!groups.has(s)) groups.set(s, []);
    groups.get(s).push(it);
  }
  for (const [s, list] of groups) {
    if (!list.length) continue;
    content.append(el('h2', { class: 'sec', text: s }));
    content.append(grid(list, false));
  }
  content.append(el('h2', { class: 'sec', text: MINE }));
  content.append(grid(mine, true));

  content.append(el('p', { class: 'tip', text:
    'Consejo: mantén pulsado un acceso para fijarlo en favoritos, compartirlo u ocultarlo. ' +
    'Tus enlaces y tu horario se guardan solo en este dispositivo.' }));
}

function grid(items, withAdd) {
  const g = el('div', { class: 'grid' });
  for (const it of items) g.append(tile(it));
  if (withAdd) g.append(el('button', { class: 'tile add', 'aria-label': 'Añadir enlace', onclick: () => editDialog(null) },
    el('span', { class: 'ic', 'aria-hidden': 'true', text: '+' }), el('span', { class: 'lb', text: 'Añadir enlace' })));
  return g;
}

function tile(it) {
  const t = el('button', { class: 'tile', 'aria-label': it.title, title: it.url },
    el('span', { class: 'ic', 'aria-hidden': 'true', text: it.icon || '🔗' }),
    el('span', { class: 'lb', text: it.title }),
    data.isFav(it.id) ? el('span', { class: 'star', 'aria-hidden': 'true', text: '★' }) : null);
  longPress(t, () => tileMenu(it), () => openLink(it.url));
  return t;
}

/** Pulsación corta = abrir; pulsación larga o clic derecho = menú. */
function longPress(node, onLong, onClick) {
  let timer = null, sx = 0, sy = 0, fired = false;
  const cancel = () => { clearTimeout(timer); timer = null; };
  node.addEventListener('pointerdown', (e) => {
    if (e.button !== 0) return;
    fired = false; sx = e.clientX; sy = e.clientY;
    timer = setTimeout(() => { fired = true; timer = null; if (navigator.vibrate) navigator.vibrate(15); onLong(); }, 520);
  });
  node.addEventListener('pointermove', (e) => { if (timer && Math.hypot(e.clientX - sx, e.clientY - sy) > 10) cancel(); });
  node.addEventListener('pointerup', cancel);
  node.addEventListener('pointercancel', cancel);
  node.addEventListener('pointerleave', cancel);
  node.addEventListener('contextmenu', (e) => { e.preventDefault(); cancel(); if (!fired) { fired = true; onLong(); } });
  node.addEventListener('click', (e) => { if (fired) { e.preventDefault(); fired = false; return; } onClick(); });
}

function scheduleCard() {
  const has = !!scheduleUrl;
  const thumb = el('span', { class: 'thumb', 'aria-hidden': 'true' });
  if (has) thumb.style.backgroundImage = `url("${scheduleUrl}")`; else thumb.textContent = '🗓️';
  return el('button', { class: 'card', 'aria-label': has ? 'Mi horario' : 'Añadir foto de mi horario', onclick: openViewer },
    thumb,
    el('span', {}, el('span', { class: 't1', text: 'Mi horario' }),
      el('span', { class: 't2', text: has ? 'Toca para verlo a pantalla completa' : 'Añade una foto de tu horario' })),
    el('span', { class: 'arrow', 'aria-hidden': 'true', text: '›' }));
}

/* ------------------------------------------------------------ instalación */

let deferredPrompt = null;
window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); deferredPrompt = e; render(); });
window.addEventListener('appinstalled', () => { deferredPrompt = null; render(); toast('App instalada'); });

function installBanner() {
  if (isStandalone()) return null;
  const until = store.get('bannerHiddenUntil', 0);
  if (until && Date.now() < until) return null;
  const close = () => { store.set('bannerHiddenUntil', Date.now() + 7 * 864e5); render(); };

  if (isIOS) {
    return el('div', { class: 'banner', role: 'note' },
      el('b', { text: 'Instálala en tu iPhone' }),
      el('ol', {},
        el('li', {}, 'Abre esta página en ', el('b', { text: 'Safari' }), '.'),
        el('li', {}, 'Toca ', el('b', {}, 'Compartir ', el('span', { class: 'shareico', 'aria-label': 'icono compartir' })), ' (abajo o arriba, según el iPhone).'),
        el('li', {}, 'Elige ', el('b', { text: '«Añadir a pantalla de inicio»' }), ' y pulsa ', el('b', { text: 'Añadir' }), '.'),
        el('li', {}, 'Abre ', el('b', { text: 'MdC Profes' }), ' desde el icono nuevo.')),
      el('p', { style: 'margin:8px 0 0;font-size:13px;color:var(--sub)',
        text: 'Importante: añade tu horario y tus enlaces desde el icono, no desde Safari. En iPhone son espacios separados.' }),
      el('div', { class: 'row' }, el('button', { class: 'btn', onclick: close, text: 'Ahora no' })));
  }
  if (deferredPrompt) {
    return el('div', { class: 'banner', role: 'note' },
      el('b', { text: 'Instala MdC Profes' }),
      el('p', { style: 'margin:6px 0 0', text: 'Tendrás un icono en la pantalla de inicio y funcionará también sin conexión.' }),
      el('div', { class: 'row' },
        el('button', { class: 'btn', onclick: close, text: 'Ahora no' }),
        el('button', { class: 'btn primary', text: 'Instalar', onclick: async () => {
          const p = deferredPrompt; deferredPrompt = null;
          p.prompt(); try { await p.userChoice; } catch {} render();
        } })));
  }
  return null;
}

/* ------------------------------------------------------------ capas */

/* Tras una pulsación larga, el dedo se levanta ya con el menú abierto: se ignoran
   los toques de los primeros 450 ms para no cerrar el menú ni elegir una opción sin querer. */
let overlayOpenedAt = 0;
const tooSoon = () => Date.now() - overlayOpenedAt < 450;

function overlay(child, center) {
  const o = el('div', { class: 'overlay' + (center ? ' center' : '') }, child);
  const close = () => { o.remove(); document.removeEventListener('keydown', onKey); };
  const onKey = (e) => { if (e.key === 'Escape') close(); };
  overlayOpenedAt = Date.now();
  o.addEventListener('click', (e) => { if (e.target === o && !tooSoon()) close(); });
  document.addEventListener('keydown', onKey);
  document.body.append(o);
  return close;
}

function sheet(title, items) {
  let close;
  const s = el('div', { class: 'sheet', role: 'menu' },
    el('div', { class: 'grab', 'aria-hidden': 'true' }),
    title ? el('div', { class: 'stitle', text: title }) : null,
    items.filter(Boolean).map((it) => el('button', {
      class: 'item' + (it.danger ? ' danger' : ''), role: 'menuitem', disabled: it.disabled,
      onclick: () => { if (tooSoon()) return; close(); it.run(); }
    }, el('span', { class: 'e', 'aria-hidden': 'true', text: it.e || '' }), it.label)));
  close = overlay(s, false);
  const first = s.querySelector('button.item'); if (first) first.focus({ preventScroll: true });
}

function confirmBox(title, text, okLabel, onOk) {
  let close;
  const d = el('div', { class: 'dialog', role: 'dialog', 'aria-modal': 'true' },
    el('h3', { text: title }), el('p', { text }),
    el('div', { class: 'actions' },
      el('button', { class: 'btn', text: 'Cancelar', onclick: () => close() }),
      el('button', { class: 'btn danger', text: okLabel, onclick: () => { close(); onOk(); } })));
  close = overlay(d, true);
}

let toastTimer = null;
function toast(msg, actionLabel, action, ms = 2600) {
  document.querySelectorAll('.toast').forEach((t) => t.remove());
  const t = el('div', { class: 'toast', role: 'status' }, el('span', { text: msg }),
    actionLabel ? el('button', { text: actionLabel, onclick: () => { t.remove(); action(); } }) : null);
  document.body.append(t);
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.remove(), actionLabel ? 12000 : ms);
}

/* ------------------------------------------------------------ menús */

function mainMenu() {
  const hidden = data.hidden().size;
  sheet('MdC Profes', [
    { e: '➕', label: 'Añadir enlace', run: () => editDialog(null) },
    { e: '🗓️', label: 'Mi horario', run: openViewer },
    { e: '📤', label: 'Compartir mis enlaces', run: exportLinks },
    { e: '📥', label: 'Importar enlaces', run: () => importDialog('') },
    { e: '↩️', label: 'Restaurar accesos ocultos' + (hidden ? ` (${hidden})` : ''), disabled: !hidden,
      run: () => { data.restoreHidden(); render(); toast('Accesos restaurados'); } },
    !isStandalone() ? { e: '📲', label: 'Cómo instalar la app', run: () => { store.set('bannerHiddenUntil', 0); query = ''; $('#q').value = ''; render(); window.scrollTo({ top: 0, behavior: 'smooth' }); } } : null,
    { e: 'ℹ️', label: 'Acerca de', run: about }
  ]);
}

function tileMenu(it) {
  sheet(it.title, [
    { e: data.isFav(it.id) ? '☆' : '★', label: data.isFav(it.id) ? 'Quitar de favoritos' : 'Añadir a favoritos',
      run: () => { data.toggleFav(it.id); render(); } },
    { e: '🔗', label: 'Copiar enlace', run: () => copy(it.url) },
    navigator.share ? { e: '📤', label: 'Compartir', run: () => navigator.share({ title: it.title, url: it.url }).catch(() => {}) } : null,
    it.custom ? { e: '✏️', label: 'Editar', run: () => editDialog(it) } : null,
    it.custom ? { e: '🗑️', label: 'Eliminar', danger: true,
      run: () => confirmBox(`Eliminar «${it.title}»`, 'Se quitará de la app en este dispositivo.', 'Eliminar', () => { data.remove(it.id); render(); }) } : null,
    !it.custom ? { e: '🙈', label: 'Ocultar', run: () => { data.hide(it.id); render(); toast('Oculto. Recupéralo en ⋮ › Restaurar accesos ocultos'); } } : null
  ]);
}

async function copy(text) {
  try { await navigator.clipboard.writeText(text); toast('Enlace copiado'); }
  catch {
    const ta = el('textarea', { style: 'position:fixed;opacity:0' }); ta.value = text; document.body.append(ta);
    ta.select(); try { document.execCommand('copy'); toast('Enlace copiado'); } catch { toast('No se pudo copiar'); }
    ta.remove();
  }
}

/* ------------------------------------------------------------ alta y edición */

function editDialog(editing, preTitle = '', preUrl = '') {
  let icon = editing ? editing.icon : '🔗';
  const preview = el('div', { class: 'preview', 'aria-label': 'Icono elegido', text: icon });
  const iconRow = el('div', { class: 'icons', role: 'listbox', 'aria-label': 'Iconos' });
  for (const e of ICONS) {
    const b = el('button', { type: 'button', text: e, 'aria-pressed': String(e === icon), onclick: () => {
      icon = e; preview.textContent = e;
      iconRow.querySelectorAll('button').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    } });
    iconRow.append(b);
  }
  const fTitle = field('Nombre', 'p. ej. Moodle de Lengua', editing ? editing.title : preTitle, 'text');
  const fUrl = field('Dirección web', 'https://…', editing ? editing.url : preUrl, 'url');
  const sections = new Set([MINE, ...SECTIONS, ...data.custom().map((x) => x.section).filter(Boolean)]);
  const dl = el('datalist', { id: 'secs' }, [...sections].map((s) => el('option', { value: s })));
  const fSec = field('Sección', 'Mis enlaces', editing ? editing.section : MINE, 'text', 'secs');

  let close;
  const save = () => {
    const t = fTitle.input.value.trim();
    const u = normalizeUrl(fUrl.input.value);
    const s = fSec.input.value.trim() || MINE;
    fTitle.error(''); fUrl.error('');
    if (!t) { fTitle.error('Escribe un nombre'); fTitle.input.focus(); return; }
    if (!u) { fUrl.error('Dirección no válida'); fUrl.input.focus(); return; }
    if (urlExists(u, editing ? editing.id : '')) { fUrl.error('Este enlace ya está en la app'); return; }
    data.upsert({ id: editing ? editing.id : 'c_' + Date.now(), section: s, icon, title: t, url: u });
    close(); render(); toast(editing ? 'Enlace actualizado' : 'Enlace añadido');
  };
  const form = el('form', { class: 'dialog', role: 'dialog', 'aria-modal': 'true', novalidate: true, onsubmit: (e) => { e.preventDefault(); save(); } },
    el('h3', { text: editing ? 'Editar enlace' : 'Nuevo enlace' }),
    preview, iconRow, fTitle.node, fUrl.node, fSec.node, dl,
    el('p', { class: 'help', text: 'Se guarda solo en este dispositivo. Elige una sección o escribe una nueva.' }),
    el('div', { class: 'actions' },
      el('button', { type: 'button', class: 'btn', text: 'Cancelar', onclick: () => close() }),
      el('button', { type: 'submit', class: 'btn primary', text: 'Guardar' })));
  close = overlay(form, true);
  setTimeout(() => (fTitle.input.value ? fUrl.input : fTitle.input).focus(), 50);
}

function field(label, placeholder, value, type, list) {
  const input = el('input', { type: type === 'url' ? 'url' : 'text', placeholder, list,
    autocapitalize: type === 'url' ? 'off' : 'sentences', autocorrect: type === 'url' ? 'off' : 'on',
    inputmode: type === 'url' ? 'url' : null, spellcheck: type === 'url' ? 'false' : null });
  input.value = value || '';
  const msg = el('div', { class: 'msg', 'aria-live': 'polite' });
  const node = el('label', { class: 'field' }, el('span', { text: label }), input, msg);
  return { node, input, error: (t) => { msg.textContent = t; node.classList.toggle('err', !!t); } };
}

/* ------------------------------------------------------------ exportar / importar */

function exportText() {
  return [EXPORT_HEADER, ...data.custom().map((it) =>
    [it.icon, it.title.replace(/\|/g, '/'), it.url, (it.section || MINE).replace(/\|/g, '/')].join(' | '))].join('\n');
}

async function exportLinks() {
  if (!data.custom().length) { toast('Aún no has añadido enlaces propios'); return; }
  const text = exportText();
  if (navigator.share) {
    try { await navigator.share({ title: 'Mis enlaces de MdC Profes', text }); return; }
    catch (e) { if (e && e.name === 'AbortError') return; }
  }
  try { await navigator.clipboard.writeText(text); toast('Lista copiada: pégala en WhatsApp o en un correo'); }
  catch { importDialog(text, true); }
}

function importDialog(prefill, readOnly) {
  const ta = el('textarea', { placeholder: 'Pega aquí la lista: icono | nombre | dirección | sección', 'aria-label': 'Lista de enlaces' });
  ta.value = prefill || '';
  let close;
  const d = el('div', { class: 'dialog', role: 'dialog', 'aria-modal': 'true' },
    el('h3', { text: readOnly ? 'Mis enlaces' : 'Importar enlaces' }),
    el('p', { text: readOnly ? 'Copia este texto y envíalo a tus compañeros.' :
      'Pega la lista que te ha pasado un compañero (desde «Compartir mis enlaces»).' }),
    el('label', { class: 'field' }, ta),
    el('div', { class: 'actions' },
      el('button', { class: 'btn', text: readOnly ? 'Cerrar' : 'Cancelar', onclick: () => close() }),
      readOnly ? null : el('button', { class: 'btn primary', text: 'Importar', onclick: () => { close(); importLines(ta.value); } })));
  close = overlay(d, true);
  setTimeout(() => (readOnly ? ta.select() : ta.focus()), 50);
}

function importLines(text) {
  const list = data.custom(); const seen = new Set(); let added = 0, skipped = 0; const base = Date.now();
  for (const raw of String(text).split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;
    const p = line.split('|').map((x) => x.trim());
    let icon = '🔗', title, url, section = MINE;
    if (p.length === 2) [title, url] = p;
    else if (p.length === 3) [icon, title, url] = p;
    else if (p.length >= 4) [icon, title, url, section] = p;
    else { const u = firstUrl(line); if (!u) { skipped++; continue; } title = u; url = u; }
    const n = normalizeUrl(url);
    if (!n || !title || urlExists(n, '') || seen.has(urlKey(n))) { skipped++; continue; }
    seen.add(urlKey(n));
    if (!icon || icon.length > 16) icon = '🔗';
    list.push({ id: 'c_' + (base + added), section: section || MINE, icon, title, url: n });
    added++;
  }
  data.saveCustom(list); render();
  toast(`Importados: ${added}` + (skipped ? ` · omitidos: ${skipped}` : ''));
}

function about() {
  let close;
  const d = el('div', { class: 'dialog', role: 'dialog', 'aria-modal': 'true' },
    el('h3', { text: 'MdC Profes ' + VERSION }),
    el('p', { text: 'Accesos rápidos de la Zona Profesorado de iesmigueldecervantes.com.' }),
    el('p', { text: 'Tus enlaces, favoritos y la foto de tu horario se guardan solo en este dispositivo: no se envían a ningún servidor. Si borras la app o los datos del navegador, se pierden.' }),
    el('p', { text: 'Incidencias: formulario de Incidencias RMI.' }),
    el('div', { class: 'actions' }, el('button', { class: 'btn', text: 'Cerrar', onclick: () => close() })));
  close = overlay(d, true);
}

/* ------------------------------------------------------------ horario */

const MAX_SIDE = 2400;

async function processImage(file) {
  const url = URL.createObjectURL(file);
  try {
    const img = new Image();
    img.src = url;
    await img.decode(); // Safari y Chrome aplican ya la orientación EXIF
    const w = img.naturalWidth, h = img.naturalHeight;
    if (!w || !h) throw new Error('Imagen no válida');
    const scale = Math.min(1, MAX_SIDE / Math.max(w, h));
    const c = document.createElement('canvas');
    c.width = Math.round(w * scale); c.height = Math.round(h * scale);
    const ctx = c.getContext('2d');
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, c.width, c.height);
    ctx.drawImage(img, 0, 0, c.width, c.height);
    const blob = await new Promise((res, rej) => c.toBlob((b) => (b ? res(b) : rej(new Error('toBlob'))), 'image/jpeg', 0.88));
    c.width = c.height = 0; // libera memoria en iOS
    return blob;
  } finally { URL.revokeObjectURL(url); }
}

async function saveSchedule(file) {
  const spin = viewerEl && viewerEl.querySelector('.spinner');
  if (spin) spin.classList.remove('hidden');
  try {
    const blob = await processImage(file);
    await idb.put('horario', { buf: await blob.arrayBuffer(), type: 'image/jpeg', ts: Date.now() });
    if (navigator.storage && navigator.storage.persist) navigator.storage.persist().catch(() => {});
    await loadSchedule();
    toast('Horario guardado');
  } catch (e) {
    console.error(e);
    toast('No se pudo guardar la imagen');
  } finally {
    if (spin) spin.classList.add('hidden');
    refreshViewer(); render();
  }
}

['#fileCam', '#fileLib'].forEach((sel) => $(sel).addEventListener('change', (e) => {
  const f = e.target.files && e.target.files[0];
  e.target.value = '';
  if (f) saveSchedule(f);
}));

let viewerEl = null;
const zoom = { s: 1, base: 1, x: 0, y: 0, iw: 0, ih: 0 };

function openViewer() {
  if (viewerEl) return;
  const img = el('img', { alt: 'Foto de mi horario', draggable: 'false' });
  const delBtn = el('button', { class: 'iconbtn', 'aria-label': 'Eliminar horario', text: '🗑️', onclick: () =>
    confirmBox('Eliminar horario', 'Se borrará la foto de tu horario de este dispositivo.', 'Eliminar', async () => {
      try { await idb.del('horario'); } catch {}
      await loadSchedule(); refreshViewer(); render(); toast('Horario eliminado');
    }) });
  viewerEl = el('div', { class: 'viewer', role: 'dialog', 'aria-modal': 'true', 'aria-label': 'Mi horario' },
    img,
    el('div', { class: 'vempty hidden' },
      el('div', { class: 'big', 'aria-hidden': 'true', text: '🗓️' }),
      el('h3', { text: 'Aún no has añadido tu horario' }),
      el('p', { text: 'Hazle una foto a tu horario impreso o elige una captura de Plumier. Se guarda solo en este dispositivo.' }),
      el('button', { class: 'btn', text: '📷  Hacer foto', onclick: () => $('#fileCam').click() }),
      el('button', { class: 'btn', text: '🖼️  Elegir de la galería', onclick: () => $('#fileLib').click() })),
    el('div', { class: 'vbar' },
      el('button', { class: 'back', 'aria-label': 'Volver', text: '‹  Mi horario', onclick: closeViewer }),
      el('button', { class: 'iconbtn', 'aria-label': 'Hacer foto', text: '📷', onclick: () => $('#fileCam').click() }),
      el('button', { class: 'iconbtn', 'aria-label': 'Elegir de la galería', text: '🖼️', onclick: () => $('#fileLib').click() }),
      delBtn),
    el('div', { class: 'vhint', text: 'Pellizca o toca dos veces para ampliar' }),
    el('div', { class: 'spinner hidden', 'aria-label': 'Cargando' }));
  document.body.append(viewerEl);
  document.body.style.overflow = 'hidden';
  history.pushState({ viewer: 1 }, '');
  attachZoom(viewerEl, img);
  refreshViewer();
}

function closeViewer(fromPop) {
  if (!viewerEl) return;
  viewerEl.remove(); viewerEl = null; document.body.style.overflow = '';
  if (fromPop !== true && history.state && history.state.viewer) history.back();
}
window.addEventListener('popstate', () => { if (viewerEl) closeViewer(true); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && viewerEl && !document.querySelector('.overlay')) closeViewer(); });

function refreshViewer() {
  if (!viewerEl) return;
  const img = viewerEl.querySelector('img');
  const has = !!scheduleUrl;
  viewerEl.querySelector('.vempty').classList.toggle('hidden', has);
  viewerEl.querySelector('.vhint').classList.toggle('hidden', !has);
  viewerEl.querySelector('[aria-label="Eliminar horario"]').classList.toggle('hidden', !has);
  img.classList.toggle('hidden', !has);
  if (!has) { img.removeAttribute('src'); return; }
  img.onload = () => { zoom.iw = img.naturalWidth; zoom.ih = img.naturalHeight; img.style.width = zoom.iw + 'px'; img.style.height = zoom.ih + 'px'; fit(); };
  img.src = scheduleUrl;
}

function fit() {
  if (!viewerEl || !zoom.iw) return;
  const W = viewerEl.clientWidth, H = viewerEl.clientHeight;
  zoom.base = Math.min(W / zoom.iw, H / zoom.ih);
  zoom.s = zoom.base;
  zoom.x = (W - zoom.iw * zoom.s) / 2; zoom.y = (H - zoom.ih * zoom.s) / 2;
  applyZoom();
}
window.addEventListener('resize', () => fit());

function applyZoom() {
  if (!viewerEl) return;
  const W = viewerEl.clientWidth, H = viewerEl.clientHeight;
  const sw = zoom.iw * zoom.s, sh = zoom.ih * zoom.s;
  zoom.x = sw <= W ? (W - sw) / 2 : Math.min(0, Math.max(W - sw, zoom.x));
  zoom.y = sh <= H ? (H - sh) / 2 : Math.min(0, Math.max(H - sh, zoom.y));
  viewerEl.querySelector('img').style.transform = `translate(${zoom.x}px, ${zoom.y}px) scale(${zoom.s})`;
}

function zoomAt(target, fx, fy) {
  const s = Math.max(zoom.base, Math.min(zoom.base * 6, target));
  const k = s / zoom.s;
  zoom.x = fx - (fx - zoom.x) * k; zoom.y = fy - (fy - zoom.y) * k; zoom.s = s;
  applyZoom();
}

function attachZoom(root, img) {
  const pts = new Map(); let startDist = 0, startScale = 1, lastTap = 0, lastX = 0, lastY = 0, moved = false;
  const inBar = (e) => e.target.closest('.vbar, .vempty, .overlay');
  root.addEventListener('pointerdown', (e) => {
    if (inBar(e) || !scheduleUrl) return;
    root.setPointerCapture(e.pointerId);
    pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
    moved = false;
    if (pts.size === 2) {
      const [a, b] = [...pts.values()];
      startDist = Math.hypot(a.x - b.x, a.y - b.y); startScale = zoom.s;
    }
  });
  root.addEventListener('pointermove', (e) => {
    const p = pts.get(e.pointerId); if (!p) return;
    const dx = e.clientX - p.x, dy = e.clientY - p.y;
    if (Math.abs(dx) + Math.abs(dy) > 3) moved = true;
    if (pts.size === 1) { zoom.x += dx; zoom.y += dy; applyZoom(); }
    p.x = e.clientX; p.y = e.clientY;
    if (pts.size === 2) {
      const [a, b] = [...pts.values()];
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      if (startDist > 0) zoomAt(startScale * d / startDist, (a.x + b.x) / 2, (a.y + b.y) / 2);
    }
  });
  const end = (e) => {
    if (!pts.has(e.pointerId)) return;
    pts.delete(e.pointerId);
    if (pts.size === 1) { startDist = 0; moved = true; } // de dos dedos a uno: no cuenta como toque
    if (e.type === 'pointerup' && !moved && pts.size === 0) {
      const now = Date.now();
      if (now - lastTap < 320 && Math.hypot(e.clientX - lastX, e.clientY - lastY) < 30) {
        zoomAt(zoom.s > zoom.base * 1.1 ? zoom.base : zoom.base * 2.5, e.clientX, e.clientY); lastTap = 0;
      } else { lastTap = now; lastX = e.clientX; lastY = e.clientY; }
    }
  };
  root.addEventListener('pointerup', end);
  root.addEventListener('pointercancel', end);
  root.addEventListener('wheel', (e) => { if (!scheduleUrl) return; e.preventDefault(); zoomAt(zoom.s * (e.deltaY < 0 ? 1.15 : 1 / 1.15), e.clientX, e.clientY); }, { passive: false });
  // Evita el gesto de zoom de página de Safari dentro del visor
  ['gesturestart', 'gesturechange'].forEach((t) => root.addEventListener(t, (e) => e.preventDefault()));
}

/* ------------------------------------------------------------ arranque */

$('#menuBtn').addEventListener('click', mainMenu);
const qInput = $('#q'), qClear = $('#qClear');
qInput.addEventListener('input', () => { query = qInput.value; qClear.classList.toggle('hidden', !query); render(); });
qInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') qInput.blur(); });
qClear.addEventListener('click', (e) => { e.preventDefault(); qInput.value = ''; query = ''; qClear.classList.add('hidden'); render(); });

function handleParams() {
  const p = new URLSearchParams(location.search);
  const abrir = p.get('abrir');
  const shared = p.get('url') || firstUrl(p.get('text')) ;
  if ([...p.keys()].length) history.replaceState(null, '', location.pathname);
  if (abrir === 'horario') openViewer();
  else if (abrir === 'nuevo') editDialog(null);
  else if (shared) {
    const text = p.get('text') || '';
    if (text.startsWith(EXPORT_HEADER)) importDialog(text);
    else { const u = normalizeUrl(shared); if (u) editDialog(null, (p.get('title') || '').trim(), u); }
  }
}

if ('serviceWorker' in navigator && location.protocol !== 'file:') {
  const hadController = !!navigator.serviceWorker.controller; // en la primera visita no se recarga
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').then((reg) => {
      const ask = (w) => toast('Hay una versión nueva', 'Actualizar', () => w.postMessage('skipWaiting'));
      if (reg.waiting && navigator.serviceWorker.controller) ask(reg.waiting);
      reg.addEventListener('updatefound', () => {
        const w = reg.installing; if (!w) return;
        w.addEventListener('statechange', () => { if (w.state === 'installed' && navigator.serviceWorker.controller) ask(w); });
      });
      setInterval(() => reg.update().catch(() => {}), 60 * 60 * 1000);
    }).catch(() => {});
    let reloaded = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (!hadController || reloaded) return;
      reloaded = true; location.reload();
    });
  });
}

loadSchedule().then(() => { render(); handleParams(); });
render();
})();
