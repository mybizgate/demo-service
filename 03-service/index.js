/* My Service Company — service-01 behaviour. Prices, zones, windows and FAQ live here. */
(() => {
  'use strict';
  const SITE = { name: 'My Service Company', whatsapp: '601158121239', storageKey: 'service_jobs_v1', windows: [[8, 10], [10, 12], [13, 15], [15, 17], [17, 19]], workDays: [1, 2, 3, 4, 5, 6, 0] };
  const CATS = ['All', 'Aircond', 'Plumbing', 'Electrical', 'Handyman'];
  const PRICES = [
    { id: 'ac-service', cat: 'Aircond', name: 'Aircond normal service', price: 65, desc: 'Per unit. Filter, coil rinse, drain flush, gas check.', per: 'per unit' },
    { id: 'ac-chem', cat: 'Aircond', name: 'Chemical wash', price: 130, desc: 'Per unit. Full strip-down, chemical coil clean, blower.', per: 'per unit' },
    { id: 'ac-gas', cat: 'Aircond', name: 'Gas top-up R32 / R410A', price: 120, desc: 'Includes leak test. R22 units quoted on site.', per: 'per unit' },
    { id: 'ac-install', cat: 'Aircond', name: 'Aircond installation', price: 250, desc: 'Per unit, up to 3 m piping. Unit not included.', per: 'from', from: true },
    { id: 'pl-leak', cat: 'Plumbing', name: 'Leaking tap / pipe repair', price: 90, desc: 'Labour, first hour. Common parts on the van.', per: 'first hour' },
    { id: 'pl-choke', cat: 'Plumbing', name: 'Choked sink / toilet', price: 120, desc: 'Machine snaking up to 10 m.', per: 'per point' },
    { id: 'pl-heater', cat: 'Plumbing', name: 'Water heater replace', price: 180, desc: 'Labour. Unit quoted or bring your own.', per: 'labour' },
    { id: 'el-trip', cat: 'Electrical', name: 'Tripping / fault finding', price: 110, desc: 'Diagnose and isolate. Repairs quoted on site.', per: 'first hour' },
    { id: 'el-point', cat: 'Electrical', name: 'New power point / switch', price: 85, desc: 'Per point, surface wiring. Concealed quoted.', per: 'per point' },
    { id: 'el-fan', cat: 'Electrical', name: 'Ceiling fan / light install', price: 70, desc: 'Per unit, existing point.', per: 'per unit' },
    { id: 'hm-mount', cat: 'Handyman', name: 'TV / shelf wall mounting', price: 95, desc: 'Up to 65-inch, brick or concrete.', per: 'per item' },
    { id: 'hm-hour', cat: 'Handyman', name: 'General handyman hour', price: 80, desc: 'Door locks, hinges, silicone, small repairs.', per: 'per hour' }
  ];
  const ZONES = {
    1: ['petaling jaya', 'pj', 'subang', 'usj', 'shah alam', 'puchong', 'kuala lumpur', 'kl', 'cheras', 'ampang', 'bangsar', 'mont kiara', 'damansara', 'kota damansara', 'bandar utama', 'setapak', 'wangsa maju', 'sri petaling', 'kepong', '46', '47', '40', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '68'],
    2: ['klang', 'kajang', 'bangi', 'rawang', 'sungai buloh', 'seri kembangan', 'balakong', 'cyberjaya', 'putrajaya', 'selayang', 'gombak', 'batu caves', '41', '43', '48', '62', '63', '64'],
    3: ['semenyih', 'nilai', 'banting', 'kuala selangor', 'sepang', 'dengkil', 'jenjarom', '42', '45', '71']
  };
  const FAQ = [
    { keys: ['chemical', 'normal service', 'difference', 'which service'], tag: 'Aircond', title: 'Normal service every 3–4 months, chemical wash once a year', text: 'Normal service (RM 65) rinses filters and coils. Chemical wash (RM 130) strips the unit and dissolves the sludge that makes it smell or drip. If it is dripping or smells, go chemical.' },
    { keys: ['not cold', 'tak sejuk', 'warm', 'weak', 'blow'], tag: 'Aircond', title: 'Not cold is usually dirt, then gas', text: 'Dirty filter or coil first (service), then low gas (top-up with leak test, RM 120). If the outdoor fan is not spinning, switch it off and book the first window.' },
    { keys: ['trip', 'tripped', 'tripping', 'blackout', 'no power', 'elcb', 'rccb'], tag: 'Electrical', title: 'Tripping: switch off all appliances, reset once', text: 'Turn off every appliance, reset the breaker once. If it trips again, leave it off and book fault-finding (RM 110). Burning smell or buzzing: switch off the main and call us now.', action: 'book' },
    { keys: ['warranty', 'guarantee', 'come back', 'redo'], tag: 'Guarantee', title: '30-day workmanship guarantee, parts per manufacturer', text: 'If the same fault returns within 30 days we come back free. Parts we supply carry the manufacturer warranty, usually 12 months.' },
    { keys: ['holiday', 'public holiday', 'sunday', 'weekend', 'raya', 'cny', 'deepavali'], tag: 'Hours', title: 'Open Sundays, limited crew on public holidays', text: 'Monday to Sunday 8 am–7 pm. On public holidays one van runs emergency jobs only at a RM 50 surcharge, shown before you confirm.' },
    { keys: ['water heater', 'heater', 'shower', 'hot water'], tag: 'Plumbing', title: 'Water heater replacement RM 180 labour, same day', text: 'Storage and instant heaters. We carry Joven and Alpha instant units on the van, or bring your own. Heater tripping is usually a failed element.' },
    { keys: ['gas', 'top up', 'topup', 'refill', 'r32', 'r22'], tag: 'Aircond', title: 'Gas top-up RM 120 with leak test', text: 'A unit that needs gas every few months has a leak. We test first so you are not paying for gas that escapes.' },
    { keys: ['install', 'installation', 'new aircond', 'buy', 'supply'], tag: 'Install', title: 'Installation from RM 250 per unit, supply available', text: 'Bring your own unit or ask us for a supply-and-install quote on Daikin, Panasonic and Midea. Up to 3 m piping included.' },
    { keys: ['price', 'cost', 'how much', 'berapa', 'harga', 'rate'], tag: 'Price', title: 'Every price is on the list above, flat and inclusive', text: 'Labour and travel inside Zone 1 included. Parts are shown to you and quoted before fitting. No call-out fee if you proceed.' },
    { keys: ['area', 'cover', 'zone', 'travel', 'far', 'where'], tag: 'Coverage', title: 'Three zones across the Klang Valley', text: 'Use the coverage checker. Zone 1 free, Zone 2 plus RM 25, Zone 3 plus RM 60 with a minimum of two jobs.', action: 'coverage' },
    { keys: ['when', 'time', 'slot', 'window', 'today', 'tomorrow', 'available', 'bila'], tag: 'Booking', title: 'Two-hour windows, pick yours in the booking section', text: 'Windows come from the live dispatch board. Same-day is often possible before noon.', action: 'book' },
    { keys: ['cancel', 'reschedule', 'change', 'late'], tag: 'Policy', title: 'Free reschedule up to 2 hours before the window', text: 'Reply to your booking message or use the job number. Inside 2 hours, or a no-access visit, a RM 40 trip fee applies.' },
    { keys: ['pay', 'payment', 'cash', 'card', 'duitnow', 'tng', 'invoice', 'receipt'], tag: 'Payment', title: 'Cash, card, DuitNow QR, e-wallet, receipt on WhatsApp', text: 'Pay the technician after the job. An itemised receipt is sent to your WhatsApp within the hour. Company invoices available.' }
  ];
  const STAGES = ['Booked', 'Technician assigned', 'On the way', 'Working on it', 'Completed'];

  const $ = (s, r = document) => r.querySelector(s); const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const money = (n) => `RM ${Math.round(n).toLocaleString('en-MY')}`;
  const pad = (n) => String(n).padStart(2, '0'); const isoDate = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const hourLabel = (h) => `${((h + 11) % 12) + 1}${h >= 12 ? 'pm' : 'am'}`;
  const winLabel = (w) => `${hourLabel(w[0])}–${hourLabel(w[1])}`;
  const toastEl = $('#toast'); let toastTimer; const toast = (m) => { toastEl.textContent = m; toastEl.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2400); };

  /* header */
  const header = $('#siteHeader'); const navLinks = $('#navLinks'); const menuToggle = $('#menuToggle');
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 10); window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  menuToggle.addEventListener('click', () => { const open = navLinks.classList.toggle('open'); document.body.classList.toggle('menu-open', open); menuToggle.setAttribute('aria-expanded', String(open)); });
  navLinks.addEventListener('click', (e) => { if (e.target.closest('a')) { navLinks.classList.remove('open'); document.body.classList.remove('menu-open'); menuToggle.setAttribute('aria-expanded', 'false'); } });
  if ('IntersectionObserver' in window) { const spy = new IntersectionObserver((es) => es.forEach((en) => { if (en.isIntersecting) $$('.nav-links a').forEach((a) => a.classList.toggle('active', a.getAttribute('href') === `#${en.target.id}`)); }), { rootMargin: '-40% 0px -55% 0px' }); $$('main section[id]').forEach((s) => spy.observe(s)); }

  /* cart + prices */
  const state = { jobs: [], zone: null, travel: 0, day: 0, win: null };
  const priceGrid = $('#priceGrid'); const filters = $('#catFilters'); const addJob = $('#addJob');
  const renderPrices = (cat) => { priceGrid.innerHTML = PRICES.filter((p) => cat === 'All' || p.cat === cat).map((p) => `<button type="button" class="price-card${state.jobs.some((j) => j.id === p.id) ? ' added' : ''}" data-id="${p.id}"><span class="cat">${p.cat}</span><strong>${p.name}</strong><span class="amt">${p.from ? '<small>from</small>' : ''}${money(p.price)}</span><p>${p.desc}</p><span class="add">${state.jobs.some((j) => j.id === p.id) ? 'Added to booking' : '+ Add to booking'}</span></button>`).join(''); };
  CATS.forEach((c, i) => { const b = document.createElement('button'); b.type = 'button'; b.role = 'tab'; b.textContent = c; b.setAttribute('aria-selected', String(i === 0)); b.addEventListener('click', () => { $$('button', filters).forEach((x) => x.setAttribute('aria-selected', 'false')); b.setAttribute('aria-selected', 'true'); renderPrices(c); }); filters.append(b); });
  PRICES.forEach((p) => { const o = document.createElement('option'); o.value = p.id; o.textContent = `${p.name} · ${money(p.price)}`; addJob.append(o); });
  const cartList = $('#cartList'); const cartMeta = $('#cartMeta'); const cartTotal = $('#cartTotal'); const cartTravel = $('#cartTravel');
  const total = () => state.jobs.reduce((a, j) => a + j.price * j.qty, 0) + state.travel;
  const renderCart = () => {
    cartList.innerHTML = state.jobs.map((j) => `<li><div>${j.name}<br><span>${money(j.price)} ${j.per}${j.qty > 1 ? ` × ${j.qty}` : ''}</span></div><strong>${money(j.price * j.qty)}</strong><button type="button" data-remove="${j.id}" aria-label="Remove ${j.name}">✕</button></li>`).join('');
    cartMeta.textContent = state.jobs.length ? `${state.jobs.reduce((a, j) => a + j.qty, 0)} job${state.jobs.length > 1 ? 's' : ''}` : 'Nothing added yet';
    cartTravel.textContent = state.travel ? `· incl. ${money(state.travel)} travel` : (state.zone === 1 ? '· travel free' : '');
    cartTotal.textContent = money(total());
    $$('.price-card').forEach((c) => { const on = state.jobs.some((j) => j.id === c.dataset.id); c.classList.toggle('added', on); c.querySelector('.add').textContent = on ? 'Added to booking' : '+ Add to booking'; });
  };
  const add = (id) => { const p = PRICES.find((x) => x.id === id); if (!p) return; const ex = state.jobs.find((j) => j.id === id); if (ex) ex.qty++; else state.jobs.push({ ...p, qty: 1 }); renderCart(); toast(`${p.name} added${ex ? ` (×${ex.qty})` : ''}`); };
  priceGrid.addEventListener('click', (e) => { const c = e.target.closest('.price-card'); if (c) add(c.dataset.id); });
  cartList.addEventListener('click', (e) => { const b = e.target.closest('[data-remove]'); if (!b) return; state.jobs = state.jobs.filter((j) => j.id !== b.dataset.remove); renderCart(); });
  $('#addJobBtn').addEventListener('click', () => { if (addJob.value) { add(addJob.value); addJob.value = ''; } });
  renderPrices('All'); renderCart();

  /* coverage */
  const zoneResult = $('#zoneResult');
  const findZone = (q) => { const s = q.toLowerCase().trim(); if (!s) return null; for (const z of [1, 2, 3]) if (ZONES[z].some((k) => (/^\d+$/.test(k) ? s.replace(/\D/g, '').startsWith(k) : s.includes(k)))) return z; return 0; };
  $('#zoneForm').addEventListener('submit', (e) => {
    e.preventDefault(); const q = $('#zoneInput').value; const z = findZone(q); if (z === null) return;
    state.zone = z; state.travel = z === 1 ? 0 : z === 2 ? 25 : z === 3 ? 60 : 0; renderCart();
    zoneResult.innerHTML = z === 1 ? `<div class="res ok"><strong>✓ Yes, Zone 1. Travel is free.</strong><span>${q} · same-day windows usually available before noon.</span></div>` : z === 2 ? `<div class="res fee"><strong>✓ Yes, Zone 2. RM 25 travel added.</strong><span>${q} · shown in your booking total so there are no surprises.</span></div>` : z === 3 ? `<div class="res fee"><strong>✓ Yes, Zone 3. RM 60 travel, minimum two jobs.</strong><span>${q} · we batch Zone 3 on Tuesdays and Fridays.</span></div>` : `<div class="res no"><strong>✕ Not yet, sorry.</strong><span>${q} is outside our zones. Message us anyway and we will refer a trusted partner.</span></div>`;
  });

  /* windows (deterministic demo) */
  const seed = (str) => { let h = 2166136261; for (const c of str) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return () => { h += 0x6D2B79F5; let t = Math.imul(h ^ (h >>> 15), 1 | h); t ^= t + Math.imul(t ^ (t >>> 7), 61 | t); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; };
  const today = new Date(); today.setHours(0, 0, 0, 0); const now = new Date();
  const days = Array.from({ length: 7 }, (_, i) => { const d = new Date(today); d.setDate(today.getDate() + i); return d; });
  const schedule = days.map((d) => { const rnd = seed(isoDate(d)); return { date: d, wins: SITE.windows.map((w) => { const r = rnd(); let state2 = r < 0.5 ? 'open' : r < 0.7 ? 'limited' : 'full'; if (isoDate(d) === isoDate(now) && w[0] <= now.getHours() + 1) state2 = 'full'; return { w, state: state2 }; }) }; });
  const dayShort = (d) => d.toLocaleDateString('en-MY', { weekday: 'short' });
  const dayStrip = $('#dayStrip'); const slots = $('#slots');
  const renderWindows = () => {
    dayStrip.innerHTML = schedule.map((day, i) => { const n = day.wins.filter((w) => w.state !== 'full').length; return `<button type="button" role="tab" aria-selected="${i === state.day}"><small>${i === 0 ? 'Today' : dayShort(day.date)}</small><strong>${day.date.getDate()}</strong><em class="${!n ? 'none' : n <= 1 ? 'few' : ''}">${n ? `${n} open` : 'full'}</em></button>`; }).join('');
    const day = schedule[state.day];
    slots.innerHTML = day.wins.map((x, i) => `<button type="button" class="${x.state}" data-i="${i}" aria-pressed="${state.win === i}" ${x.state === 'full' ? 'disabled' : ''}><strong>${winLabel(x.w)}</strong><span>${x.state === 'full' ? 'Full' : x.state === 'limited' ? '1 van left' : 'Open'}</span></button>`).join('');
  };
  dayStrip.addEventListener('click', (e) => { const b = e.target.closest('button'); if (!b) return; state.day = [...dayStrip.children].indexOf(b); state.win = null; renderWindows(); });
  slots.addEventListener('click', (e) => { const b = e.target.closest('button:not(:disabled)'); if (!b) return; state.win = Number(b.dataset.i); $('#date').value = isoDate(schedule[state.day].date); $('#time').value = winLabel(schedule[state.day].wins[state.win].w); renderWindows(); toast(`${$('#time').value} window selected`); });
  renderWindows();
  const first = schedule.flatMap((d, i) => d.wins.filter((w) => w.state !== 'full').map((w) => ({ i, w })))[0];
  $('#heroWindow').textContent = first ? `Next window: ${first.i === 0 ? 'today' : dayShort(schedule[first.i].date)} ${winLabel(first.w.w)}` : 'Windows open next week';
  const hr = now.getHours(); $('#techsNow').textContent = hr >= 8 && hr < 19 ? `${5 + (hr % 3)} of 8 vans on jobs · ${8 - 5 - (hr % 3)} free` : 'Vans back at 8 am · book tonight for first window';

  /* booking */
  const form = $('#bookForm'); const status = $('#formStatus');
  const jobNo = () => `FM-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9000) + 1000)}`;
  const load = () => { try { return JSON.parse(localStorage.getItem(SITE.storageKey) || '[]'); } catch (_) { return []; } };
  const save = (list) => { try { localStorage.setItem(SITE.storageKey, JSON.stringify(list.slice(0, 8))); } catch (_) { /* no storage */ } };
  const compose = (d, no) => [`${SITE.name} — booking ${no}`, `Name: ${d.name} · WhatsApp: ${d.phone}`, `Address: ${d.address} (${d.property}) · ${state.zone ? `Zone ${state.zone}` : 'zone to confirm'}`, `Jobs: ${state.jobs.map((j) => `${j.name}${j.qty > 1 ? ` ×${j.qty}` : ''} (${money(j.price * j.qty)})`).join(', ')}`, `Estimated total: ${money(total())}${state.travel ? ` incl. ${money(state.travel)} travel` : ''}`, `Window: ${d.date && d.time ? `${d.date}, ${d.time}` : 'to be arranged'}`, `Access: ${d.access}`, `Problem: ${d.notes || '-'}`, '', 'Sent from the website. Reply "confirmed" with the technician name.'].join('\n');
  const validate = () => { status.classList.remove('error'); if (!state.jobs.length) { status.textContent = 'Add at least one job from the price list.'; status.classList.add('error'); return null; } if (!form.reportValidity()) { status.textContent = 'Please complete the highlighted fields.'; status.classList.add('error'); return null; } return Object.fromEntries(new FormData(form).entries()); };
  const persist = (d, no) => { const list = load(); list.unshift({ no, jobs: state.jobs.map((j) => j.name).join(', '), date: d.date || 'TBC', time: d.time || '', total: total(), createdAt: Date.now() }); save(list); renderRecentJobs(); };
  form.addEventListener('submit', (e) => { e.preventDefault(); const d = validate(); if (!d) return; const no = jobNo(); persist(d, no); status.textContent = `Job ${no} saved. Opening WhatsApp…`; window.open(`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(compose(d, no))}`, '_blank', 'noopener'); });
  $('#copyBooking').addEventListener('click', async () => { const d = validate(); if (!d) return; const no = jobNo(); try { await navigator.clipboard.writeText(compose(d, no)); persist(d, no); status.textContent = `Job ${no} copied. Paste it into any chat.`; } catch (_) { status.textContent = 'Copy is not available here. Use the WhatsApp button.'; status.classList.add('error'); } });

  /* tracking */
  const trackCard = $('#trackCard'); const trackHint = $('#trackHint');
  const renderRecentJobs = () => { const list = load(); if (!list.length) return; trackHint.innerHTML = `Recent on this device: <span class="recent-jobs">${list.map((j) => `<button type="button" data-track="${j.no}">${j.no}</button>`).join('')}</span>`; };
  const renderTrack = (no) => {
    const job = load().find((j) => j.no.toLowerCase() === no.toLowerCase());
    if (!job) { trackCard.innerHTML = `<div class="track-empty"><span>🔎</span><p>No job ${no} on this device. In production this looks up the dispatch board.</p></div>`; return; }
    const mins = (Date.now() - job.createdAt) / 60000; const stage = Math.min(STAGES.length - 1, Math.floor(mins / 0.5)); // demo: advances every 30 s
    trackCard.innerHTML = `<div class="job-head"><strong>${job.no}</strong><span class="chip">${STAGES[stage]}</span></div><p class="job-meta">${job.jobs} · ${job.date} ${job.time} · ${money(job.total)}</p><ol class="steps">${STAGES.map((s, i) => `<li class="${i < stage ? 'done' : i === stage ? 'now' : ''}">${s}<span>${i < stage ? 'done' : i === stage ? (i === 2 ? 'Technician Ravi · ETA 25 min (demo)' : 'in progress (demo)') : 'pending'}</span></li>`).join('')}</ol>`;
  };
  $('#trackForm').addEventListener('submit', (e) => { e.preventDefault(); const v = $('#trackInput').value.trim(); if (v) renderTrack(v); });
  trackHint.addEventListener('click', (e) => { const b = e.target.closest('[data-track]'); if (b) { $('#trackInput').value = b.dataset.track; renderTrack(b.dataset.track); $('#track').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' }); } });
  renderRecentJobs();

  /* ask */
  const askInput = $('#askInput'); const askResults = $('#askResults');
  const answer = (q) => { const lower = q.toLowerCase().trim(); if (lower.length < 2) return; const words = lower.replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter((w) => w.length > 2);
    const faqHits = FAQ.map((f) => ({ f, score: f.keys.reduce((a, k) => a + (lower.includes(k) ? (k.length > 5 ? 2 : 1) : 0), 0) })).filter((x) => x.score > 0).sort((a, b) => b.score - a.score).slice(0, 2);
    const priceHits = PRICES.map((p) => ({ p, score: words.reduce((a, w) => a + (p.name.toLowerCase().includes(w) ? 1 : 0), 0) })).filter((x) => x.score > 0).sort((a, b) => b.score - a.score).slice(0, 2);
    const cards = [...faqHits.map(({ f }) => `<div class="answer"><small>${f.tag}</small><strong>${f.title}</strong><p>${f.text}</p>${f.action ? `<div class="answer-actions"><a href="#${f.action}">Go there</a></div>` : ''}</div>`), ...priceHits.map(({ p }) => `<div class="answer"><small>${p.cat} · price</small><strong>${p.name} — ${p.from ? 'from ' : ''}${money(p.price)} ${p.per}</strong><p>${p.desc}</p><div class="answer-actions"><button type="button" data-pick="${p.id}">Add to booking</button></div></div>`)];
    askResults.innerHTML = cards.length ? cards.join('') : `<div class="answer"><small>Not found</small><strong>Dispatch will answer that one.</strong><p>Send it on WhatsApp and we add the answer here so nobody asks twice.</p><div class="answer-actions"><a href="https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent('Hi My Service Company, quick question: ' + q)}" target="_blank" rel="noopener">Ask on WhatsApp</a></div></div>`; };
  $('#askForm').addEventListener('submit', (e) => { e.preventDefault(); answer(askInput.value); });
  let askTimer; askInput.addEventListener('input', () => { clearTimeout(askTimer); askTimer = setTimeout(() => answer(askInput.value), 280); });
  $('#askSuggest').addEventListener('click', (e) => { const b = e.target.closest('[data-q]'); if (b) { askInput.value = b.dataset.q; answer(b.dataset.q); } });
  askResults.addEventListener('click', (e) => { const b = e.target.closest('[data-pick]'); if (b) { add(b.dataset.pick); $('#book').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' }); } });

  /* counters + reveal */
  const runCounter = (el) => { const end = Number(el.dataset.count); const suf = el.dataset.suffix || ''; if (reduceMotion) { el.textContent = end.toLocaleString('en-MY') + suf; return; } const t0 = performance.now(); const tick = (t) => { const p = Math.min(1, (t - t0) / 1300); el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))).toLocaleString('en-MY') + suf; if (p < 1) requestAnimationFrame(tick); }; requestAnimationFrame(tick); };
  const revealEls = $$('.reveal'); const counters = $$('[data-count]');
  if ('IntersectionObserver' in window && !reduceMotion) { const io = new IntersectionObserver((es) => es.forEach((en) => { if (!en.isIntersecting) return; en.target.classList.add('show'); if (en.target.dataset.count) runCounter(en.target); $$('[data-count]', en.target).forEach(runCounter); io.unobserve(en.target); }), { threshold: .1 }); revealEls.forEach((el) => io.observe(el)); counters.filter((c) => !c.closest('.reveal')).forEach((c) => io.observe(c)); }
  else { revealEls.forEach((el) => el.classList.add('show')); counters.forEach(runCounter); }
  $('#year').textContent = String(new Date().getFullYear());
})();
