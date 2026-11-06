/* My Service Company — corporate-01 behaviour
   Services, rates, projects and the survey calendar live in the data below. */
(() => {
  'use strict';
  const SITE = { name: 'My Service Company', whatsapp: '601158121239', storageKey: 'service_corporate_rfq', surveyHours: [9, 11, 14, 16], workDays: [1, 2, 3, 4, 5] };

  const SERVICES = [
    { key: 'pm', ico: '🛠️', name: 'Preventive maintenance contracts', desc: 'Scheduled servicing of HVAC, electrical, plumbing and fire systems with an asset register and monthly reports.', tags: ['Comprehensive', 'Labour-only', 'SLA-backed'], rate: 'from RM 0.08 /sqft /month', unit: 'comprehensive, typical office tower' },
    { key: 'hvac', ico: '❄️', name: 'Chiller & HVAC', desc: 'Chiller overhaul, cooling tower, AHU and FCU servicing, refrigerant management, energy tuning.', tags: ['Carrier', 'Trane', 'Daikin', 'York'], rate: 'from RM 18,000', unit: 'per 500 RT chiller overhaul' },
    { key: 'elec', ico: '⚡', name: 'LV electrical & switchgear', desc: 'Switchboard servicing, thermal imaging, earthing tests, genset load tests, ST compliance.', tags: ['ST Class A', 'Chargeman AO/BO'], rate: 'from RM 2,800', unit: 'per MSB annual service' },
    { key: 'fire', ico: '🧯', name: 'Fire protection', desc: 'Sprinkler, hose reel, hydrant, fire alarm and suppression maintenance with Bomba certification support.', tags: ['Bomba class B', 'Annual cert'], rate: 'from RM 1,200', unit: 'per monthly visit, mid-size building' },
    { key: 'bms', ico: '🖥️', name: 'BMS & energy', desc: 'Building management system tuning, sensor calibration, energy audits and savings programmes.', tags: ['Siemens', 'Honeywell', 'Schneider'], rate: 'from RM 6,500', unit: 'per energy audit' },
    { key: 'fm', ico: '🏢', name: 'Integrated facilities management', desc: 'Resident engineers and technicians, helpdesk, vendor management and compliance calendar.', tags: ['Resident team', '24/7 helpdesk'], rate: 'from RM 14,000 /month', unit: 'resident technician team of 3' }
  ];
  const PROJECTS = [
    { sector: 'Commercial', name: 'Menara Selatan, KL Sentral', scope: 'Comprehensive M&E contract, 42 floors, 3 × 600 RT chillers', band: 'RM 1–3m/yr', year: '2021–present', img: 'images/corp-chiller-plant.webp' },
    { sector: 'Healthcare', name: 'Private hospital, Petaling Jaya', scope: 'Medical gas-adjacent HVAC, isolation-room pressure, 24/7 resident team', band: 'RM 3–5m/yr', year: '2019–present', img: 'images/corp-switchboard.webp' },
    { sector: 'Industrial', name: 'Electronics plant, Bayan Lepas FTZ', scope: 'Cleanroom AHU and chilled-water upgrade, zero-downtime cutover', band: 'RM 1–3m', year: '2023', img: 'images/corp-site-meeting.webp' },
    { sector: 'Government', name: 'State administrative complex, Shah Alam', scope: 'Preventive maintenance, fire protection recertification, 9 blocks', band: 'RM 500k–1m/yr', year: '2020–2024', img: 'images/corp-proj-gov-complex.webp' },
    { sector: 'Commercial', name: 'Suburban shopping mall, Puchong', scope: 'Chiller overhaul and BMS retuning, 21% energy reduction', band: 'RM 500k–1m', year: '2022', img: 'images/corp-proj-mall-puchong.webp' },
    { sector: 'Healthcare', name: 'Dialysis centre network, Klang Valley', scope: 'Twelve sites, labour-only PM, monthly compliance reports', band: 'RM 100k–500k/yr', year: '2022–present', img: 'images/corp-proj-dialysis.webp' },
    { sector: 'Industrial', name: 'Cold-chain warehouse, Port Klang', scope: 'Ammonia-adjacent refrigeration support and LV switchgear service', band: 'RM 100k–500k', year: '2024', img: 'images/corp-proj-coldchain.webp' },
    { sector: 'Government', name: 'Public university, Bangi', scope: 'Campus-wide fire protection maintenance, 60 buildings', band: 'RM 500k–1m/yr', year: '2023–present', img: 'images/corp-proj-university.webp' }
  ];
  const SECTORS = ['All', 'Commercial', 'Healthcare', 'Industrial', 'Government'];

  const $ = (s, r = document) => r.querySelector(s); const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const pad = (n) => String(n).padStart(2, '0'); const isoDate = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const hourLabel = (h) => `${((h + 11) % 12) + 1}:00 ${h >= 12 ? 'PM' : 'AM'}`;
  const toastEl = $('#toast'); let toastTimer; const toast = (m) => { toastEl.textContent = m; toastEl.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2400); };

  /* header */
  const header = $('#siteHeader'); const navLinks = $('#navLinks'); const menuToggle = $('#menuToggle');
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 10); window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  menuToggle.addEventListener('click', () => { const open = navLinks.classList.toggle('open'); document.body.classList.toggle('menu-open', open); menuToggle.setAttribute('aria-expanded', String(open)); });
  navLinks.addEventListener('click', (e) => { if (e.target.closest('a')) { navLinks.classList.remove('open'); document.body.classList.remove('menu-open'); menuToggle.setAttribute('aria-expanded', 'false'); } });
  if ('IntersectionObserver' in window) { const spy = new IntersectionObserver((es) => es.forEach((en) => { if (en.isIntersecting) $$('.nav-links a').forEach((a) => a.classList.toggle('active', a.getAttribute('href') === `#${en.target.id}`)); }), { rootMargin: '-40% 0px -55% 0px' }); $$('main section[id]').forEach((s) => spy.observe(s)); }
  $('#printProfile').addEventListener('click', () => window.print());

  /* services */
  $('#serviceGrid').innerHTML = SERVICES.map((s) => `<article class="svc"><span class="ico">${s.ico}</span><h3>${s.name}</h3><p>${s.desc}</p><ul>${s.tags.map((t) => `<li>${t}</li>`).join('')}</ul><div class="rate"><div><strong>${s.rate}</strong><br><span>${s.unit}</span></div><button type="button" data-scope="${s.key}">Add to RFQ</button></div></article>`).join('');

  /* projects */
  const projectGrid = $('#projectGrid'); const filters = $('#projectFilters');
  const renderProjects = (sector) => { projectGrid.innerHTML = PROJECTS.filter((p) => sector === 'All' || p.sector === sector).map((p) => `<article class="project">${p.img ? `<img src="${p.img}" alt="" loading="lazy">` : `<div class="ph">${p.sector}</div>`}<div class="project-body"><small>${p.sector}</small><strong>${p.name}</strong><p>${p.scope}</p><div class="meta"><span>${p.band}</span><span>${p.year}</span></div></div></article>`).join(''); };
  SECTORS.forEach((s, i) => { const b = document.createElement('button'); b.type = 'button'; b.role = 'tab'; b.textContent = s; b.setAttribute('aria-selected', String(i === 0)); b.addEventListener('click', () => { $$('button', filters).forEach((x) => x.setAttribute('aria-selected', 'false')); b.setAttribute('aria-selected', 'true'); renderProjects(s); }); filters.append(b); });
  renderProjects('All');

  /* survey calendar (deterministic demo) */
  const seed = (str) => { let h = 2166136261; for (const c of str) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return () => { h += 0x6D2B79F5; let t = Math.imul(h ^ (h >>> 15), 1 | h); t ^= t + Math.imul(t ^ (t >>> 7), 61 | t); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; };
  const today = new Date(); today.setHours(0, 0, 0, 0); const now = new Date();
  const days = Array.from({ length: 10 }, (_, i) => { const d = new Date(today); d.setDate(today.getDate() + i); return d; }).filter((d) => SITE.workDays.includes(d.getDay())).slice(0, 7);
  const schedule = days.map((d) => { const rnd = seed(isoDate(d)); return { date: d, slots: SITE.surveyHours.map((h) => { let state = rnd() < 0.6 ? 'open' : 'full'; if (isoDate(d) === isoDate(now) && h <= now.getHours() + 2) state = 'full'; return { hour: h, state }; }) }; });
  const openCount = (day) => day.slots.filter((s) => s.state !== 'full').length;
  const dayShort = (d) => d.toLocaleDateString('en-MY', { weekday: 'short' });
  const state = { scope: new Set(), day: 0, hour: null, step: 1 };
  const dayStrip = $('#dayStrip'); const slots = $('#slots');
  const renderSurvey = () => {
    dayStrip.innerHTML = schedule.map((day, i) => { const n = openCount(day); return `<button type="button" role="tab" aria-selected="${i === state.day}"><small>${i === 0 ? 'Today' : dayShort(day.date)}</small><strong>${day.date.getDate()}</strong><em class="${n === 0 ? 'none' : n <= 1 ? 'few' : ''}">${n ? `${n} open` : 'full'}</em></button>`; }).join('');
    const day = schedule[state.day];
    slots.innerHTML = day.slots.map((s) => `<button type="button" class="${s.state}" data-hour="${s.hour}" aria-pressed="${state.hour === s.hour}" ${s.state === 'full' ? 'disabled' : ''}>${hourLabel(s.hour)}</button>`).join('');
  };
  dayStrip.addEventListener('click', (e) => { const b = e.target.closest('button'); if (!b) return; state.day = [...dayStrip.children].indexOf(b); state.hour = null; renderSurvey(); updateSummary(); });
  slots.addEventListener('click', (e) => { const b = e.target.closest('button:not(:disabled)'); if (!b) return; state.hour = Number(b.dataset.hour); $('#date').value = isoDate(schedule[state.day].date); $('#time').value = hourLabel(state.hour); renderSurvey(); updateSummary(); });
  renderSurvey();
  const firstOpen = schedule.flatMap((d, i) => d.slots.filter((s) => s.state !== 'full').map((s) => ({ i, s }))) [0];
  $('#standby').textContent = firstOpen ? `2 teams · next survey ${firstOpen.i === 0 ? 'today' : dayShort(schedule[firstOpen.i].date)} ${hourLabel(firstOpen.s.hour)}` : '2 teams · surveys fully booked this week';

  /* wizard */
  const wizard = $('#wizard'); const stepsNav = $('#wizardSteps'); const status = $('#formStatus');
  const scopeChips = $('#scopeChips');
  scopeChips.innerHTML = SERVICES.map((s) => `<button type="button" data-key="${s.key}" aria-pressed="false"><strong>${s.name}</strong><span>${s.rate}</span></button>`).join('');
  const toggleScope = (key, on) => { if (on === undefined) on = !state.scope.has(key); if (on) state.scope.add(key); else state.scope.delete(key); $$('button', scopeChips).forEach((b) => b.setAttribute('aria-pressed', String(state.scope.has(b.dataset.key)))); updateSummary(); };
  scopeChips.addEventListener('click', (e) => { const b = e.target.closest('button'); if (b) toggleScope(b.dataset.key); });
  document.addEventListener('click', (e) => { const b = e.target.closest('[data-scope]'); if (!b) return; toggleScope(b.dataset.scope, true); toast(`${SERVICES.find((s) => s.key === b.dataset.scope).name} added to your RFQ`); $('#rfq').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' }); });
  const showStep = (n) => {
    state.step = n;
    $$('.step', wizard).forEach((f) => f.classList.toggle('active', Number(f.dataset.step) === n));
    $$('button', stepsNav).forEach((b) => { const s = Number(b.dataset.step); b.classList.toggle('active', s === n); b.classList.toggle('done', s < n); });
    $('#prevStep').hidden = n === 1; $('#nextStep').hidden = n === 3; $('#submitRfq').hidden = n !== 3; $('#copyRfq').hidden = n !== 3;
  };
  stepsNav.addEventListener('click', (e) => { const b = e.target.closest('button'); if (b) showStep(Number(b.dataset.step)); });
  $('#nextStep').addEventListener('click', () => { if (state.step === 1 && !state.scope.size) { toast('Choose at least one service'); return; } showStep(state.step + 1); });
  $('#prevStep').addEventListener('click', () => showStep(state.step - 1));
  const ref = () => { const d = new Date(); return `RFQ-${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}-${String(Math.floor(Math.random() * 9000) + 1000)}`; };
  let currentRef = ref();
  function updateSummary() {
    $('#sumRef').textContent = currentRef;
    $('#sumScope').textContent = state.scope.size ? [...state.scope].map((k) => SERVICES.find((s) => s.key === k).name).join(', ') : 'Nothing selected';
    const area = $('#area').value; $('#sumSite').textContent = `${$('#building').value}${area ? ` · ${Number(area).toLocaleString('en-MY')} sqft` : ''} · ${$('#state').value}`;
    $('#sumSurvey').textContent = state.hour !== null ? `${dayShort(schedule[state.day].date)} ${schedule[state.day].date.getDate()} · ${hourLabel(state.hour)}` : 'Pick a slot';
  }
  ['#building', '#area', '#state'].forEach((s) => $(s).addEventListener('input', updateSummary));
  updateSummary();
  const compose = (d) => [`${SITE.name} — quotation request ${currentRef}`, `Scope: ${[...state.scope].map((k) => SERVICES.find((s) => s.key === k).name).join(', ')}`, `Contract type: ${d.contract}`, `Building: ${d.building}${d.area ? `, ${Number(d.area).toLocaleString('en-MY')} sqft` : ''}, ${d.state}`, `Urgency: ${d.urgency}`, `Site notes: ${d.scopeNotes || '-'}`, `Site survey: ${d.date && d.time ? `${d.date} at ${d.time}` : 'to be arranged'}`, `Contact: ${d.name}${d.role ? ` (${d.role})` : ''}, ${d.company}`, `WhatsApp: ${d.phone} · Email: ${d.email || '-'}`, '', 'Sent from the corporate website. Please acknowledge with the reference number.'].join('\n');
  const validate = () => { status.classList.remove('error'); if (!state.scope.size) { showStep(1); status.textContent = 'Choose at least one service.'; status.classList.add('error'); return null; } if (!wizard.reportValidity()) { status.textContent = 'Please complete the highlighted fields.'; status.classList.add('error'); return null; } return Object.fromEntries(new FormData(wizard).entries()); };
  const load = () => { try { return JSON.parse(localStorage.getItem(SITE.storageKey) || '[]'); } catch (_) { return []; } };
  const renderRecent = () => { const list = load(); $('#recentWrap').hidden = !list.length; $('#recentList').innerHTML = list.map((r) => `<li><span>${r.ref}</span>${r.scope}</li>`).join(''); };
  const remember = (d) => { try { const list = load(); list.unshift({ ref: currentRef, scope: $('#sumScope').textContent, createdAt: new Date().toISOString() }); localStorage.setItem(SITE.storageKey, JSON.stringify(list.slice(0, 5))); } catch (_) { /* no storage */ } renderRecent(); };
  renderRecent();
  wizard.addEventListener('submit', (e) => { e.preventDefault(); const d = validate(); if (!d) return; remember(d); status.textContent = `Request ${currentRef} saved. Opening WhatsApp…`; window.open(`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(compose(d))}`, '_blank', 'noopener'); currentRef = ref(); });
  $('#copyRfq').addEventListener('click', async () => { const d = validate(); if (!d) return; try { await navigator.clipboard.writeText(compose(d)); remember(d); status.textContent = `Request ${currentRef} copied. Paste it into email or chat.`; currentRef = ref(); } catch (_) { status.textContent = 'Copy is not available here. Use the WhatsApp button.'; status.classList.add('error'); } });
  showStep(1);

  /* counters + reveal */
  const runCounter = (el) => { const end = Number(el.dataset.count); const dec = Number(el.dataset.decimals || 0); const suf = el.dataset.suffix || ''; if (reduceMotion) { el.textContent = end.toFixed(dec) + suf; return; } const t0 = performance.now(); const tick = (t) => { const p = Math.min(1, (t - t0) / 1300); el.textContent = (end * (1 - Math.pow(1 - p, 3))).toFixed(dec) + suf; if (p < 1) requestAnimationFrame(tick); }; requestAnimationFrame(tick); };
  const revealEls = $$('.reveal'); const counters = $$('[data-count]');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const io = new IntersectionObserver((es) => es.forEach((en) => { if (!en.isIntersecting) return; en.target.classList.add('show'); if (en.target.dataset.count) runCounter(en.target); $$('[data-count]', en.target).forEach(runCounter); io.unobserve(en.target); }), { threshold: .1 });
    revealEls.forEach((el) => io.observe(el)); counters.filter((c) => !c.closest('.reveal')).forEach((c) => io.observe(c));
  } else { revealEls.forEach((el) => el.classList.add('show')); counters.forEach(runCounter); }
  $('#year').textContent = String(new Date().getFullYear());
})();
