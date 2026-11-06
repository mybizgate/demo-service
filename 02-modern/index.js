/* My Service Company — modern-01 behaviour. Calculator constants, packages, areas and FAQ live here. */
(() => {
  'use strict';
  const SITE = { name: 'My Service Company', whatsapp: '601158121239', storageKey: 'service_modern_v1', surveyHours: [10, 12, 15, 17], workDays: [1, 2, 3, 4, 5, 6] };
  const MODEL = { tariff: 0.52, kwhPerKwpMonth: 115, panelKw: 0.55, rmPerKwpHome: 3300, rmPerKwpBiz: 2900, minHome: 13000, maxOffsetHome: 0.85, maxOffsetBiz: 0.7, co2PerKwh: 0.58, treesPerTonne: 45, instalmentMonths: 60 };
  const PACKAGES = [
    { name: 'Starter', kwp: 4.4, panels: 8, price: 14500, for: 'Bills RM 150–300', items: ['8 × 550 W panels', '5 kW hybrid-ready inverter', 'NEM application', 'Monitoring app'] },
    { name: 'Family', kwp: 6.6, panels: 12, price: 20900, for: 'Bills RM 300–450', featured: true, items: ['12 × 550 W panels', '6 kW inverter', 'NEM application', 'Monitoring app', 'Bird mesh'] },
    { name: 'Max', kwp: 9.9, panels: 18, price: 29800, for: 'Bills RM 450–700', items: ['18 × 550 W panels', '10 kW inverter', 'NEM application', 'EV-charger ready', 'Bird mesh'] },
    { name: 'Commercial', kwp: 50, panels: 92, price: 145000, from: true, for: 'Shop lots, factories', items: ['From 50 kWp', 'String inverters', 'NEM NOVA / SELCO', 'O&M plan', 'Green financing support'] }
  ];
  const AREAS = ['Shah Alam / Klang', 'Petaling Jaya / Subang', 'KL / Cheras', 'Puchong / Seri Kembangan', 'Kajang / Bangi', 'Rawang / Sungai Buloh'];
  const FAQ = [
    { keys: ['nem', 'net metering', 'export', 'tnb credit', 'sell'], tag: 'NEM', title: 'NEM lets your excess daytime power offset your night usage', text: 'Net Energy Metering credits the energy you export to TNB against what you import, one-to-one at tariff. We handle the SEDA and TNB applications and the meter change.' },
    { keys: ['rain', 'cloud', 'cloudy', 'night', 'dark', 'monsoon'], tag: 'Weather', title: 'Yes, it still generates on cloudy days, just less', text: 'Panels produce 10–30% on overcast days and nothing at night, which is why NEM matters: daytime surplus is credited against your night usage.' },
    { keys: ['warranty', 'guarantee', 'last', 'lifespan', 'degrade'], tag: 'Warranty', title: '25-year panel performance, 10-year inverter, 5-year workmanship', text: 'Tier-1 panels guaranteed to 84.8% output at year 25. Inverter 10 years, extendable. Our installation workmanship is covered for 5 years.' },
    { keys: ['condo', 'apartment', 'strata', 'flat', 'rooftop rights'], tag: 'Condos', title: 'Condos need management approval and roof rights', text: 'Possible on low-rise strata with JMB approval and a dedicated roof area. Most high-rise units cannot, but the building itself can install for common-area supply.' },
    { keys: ['instalment', 'installment', 'loan', 'finance', 'financing', 'pay', 'bank', 'monthly'], tag: 'Financing', title: '0% instalments up to 60 months through partner banks', text: 'Most families pay less per month than they used to pay TNB. Green financing for businesses is available through the Green Technology Financing Scheme.' },
    { keys: ['price', 'cost', 'how much', 'berapa', 'harga'], tag: 'Price', title: 'From RM 14,500 installed for a terrace house', text: 'Use the calculator with your actual bill for a size and price in seconds. The survey confirms the final number within 48 hours.' },
    { keys: ['install', 'how long', 'time', 'day', 'week', 'duration'], tag: 'Timeline', title: 'One day on site, about six weeks to switch-on', text: 'Installation is usually 9 am–4 pm. NEM approval and the TNB meter change take four to six weeks, which we chase for you.' },
    { keys: ['maintenance', 'clean', 'cleaning', 'service'], tag: 'Maintenance', title: 'Rain does most of the cleaning', text: 'We recommend a rinse once or twice a year and a free remote health check from the monitoring app. Optional annual service RM 250.' },
    { keys: ['ev', 'car', 'charger', 'tesla', 'byd'], tag: 'EV', title: 'Yes, we pair solar with EV chargers', text: 'The Max package is EV-charger ready. A 7 kW charger adds about RM 3,200 installed, and daytime charging runs almost free.' },
    { keys: ['roof', 'tile', 'metal', 'flat', 'shade', 'direction', 'face'], tag: 'Roof', title: 'Tile, metal deck and flat roofs all work', text: 'South-facing or flat is best; east and west lose about 5%. Shading from trees or a neighbour\'s tank is checked at the survey with a shade map.' },
    { keys: ['battery', 'storage', 'blackout', 'backup'], tag: 'Battery', title: 'Batteries are optional, and usually not worth it yet under NEM', text: 'NEM already credits your surplus. We fit hybrid-ready inverters so you can add a battery later for backup during outages.' },
    { keys: ['survey', 'visit', 'slot', 'when', 'book', 'appointment'], tag: 'Survey', title: 'Free 45-minute survey, pick a slot by area', text: 'Choose your area and day above. The surveyor measures the roof, checks the DB and confirms the design on a tablet.', action: 'survey' }
  ];

  const $ = (s, r = document) => r.querySelector(s); const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const money = (n) => `RM ${Math.round(n).toLocaleString('en-MY')}`;
  const pad = (n) => String(n).padStart(2, '0'); const isoDate = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const hourLabel = (h) => `${((h + 11) % 12) + 1}:00 ${h >= 12 ? 'PM' : 'AM'}`;
  const toastEl = $('#toast'); let toastTimer; const toast = (m) => { toastEl.textContent = m; toastEl.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2400); };

  /* header */
  const header = $('#siteHeader'); const navLinks = $('#navLinks'); const menuToggle = $('#menuToggle');
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 10); window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  menuToggle.addEventListener('click', () => { const open = navLinks.classList.toggle('open'); document.body.classList.toggle('menu-open', open); menuToggle.setAttribute('aria-expanded', String(open)); });
  navLinks.addEventListener('click', (e) => { if (e.target.closest('a')) { navLinks.classList.remove('open'); document.body.classList.remove('menu-open'); menuToggle.setAttribute('aria-expanded', 'false'); } });
  if ('IntersectionObserver' in window) { const spy = new IntersectionObserver((es) => es.forEach((en) => { if (en.isIntersecting) $$('.nav-links a').forEach((a) => a.classList.toggle('active', a.getAttribute('href') === `#${en.target.id}`)); }), { rootMargin: '-40% 0px -55% 0px' }); $$('main section[id]').forEach((s) => spy.observe(s)); }

  /* sun now */
  const h = new Date().getHours() + new Date().getMinutes() / 60; const pct = h < 7 || h > 19 ? 0 : Math.round(Math.sin(((h - 7) / 12) * Math.PI) * 100);
  $('#sunPct').textContent = `${pct}%`; $('.sun-ring').style.setProperty('--pct', `${pct}%`);
  $('#sunLabel').textContent = pct === 0 ? 'Sun is down' : pct > 75 ? 'Peak sun right now' : pct > 35 ? 'Good sun right now' : 'Low sun right now';
  $('#sunNote').textContent = pct === 0 ? 'A 6.6 kWp roof made ~26 kWh today (illustrative)' : `A 6.6 kWp roof is making ~${(6.6 * pct / 100 * 0.8).toFixed(1)} kW (illustrative)`;

  /* calculator */
  const bill = $('#bill'); const roof = $('#roof'); let ptype = 'home'; const calc = {};
  const runCalc = () => {
    const B = Number(bill.value); const factor = Number(roof.value); const home = ptype === 'home';
    const kwhMonth = B / MODEL.tariff; const offset = home ? MODEL.maxOffsetHome : MODEL.maxOffsetBiz;
    let kwp = (kwhMonth * offset) / (MODEL.kwhPerKwpMonth * factor); kwp = Math.max(3.3, Math.round(kwp / MODEL.panelKw) * MODEL.panelKw);
    const panels = Math.round(kwp / MODEL.panelKw); const price = Math.max(home ? MODEL.minHome : 0, kwp * (home ? MODEL.rmPerKwpHome : MODEL.rmPerKwpBiz));
    const gen = kwp * MODEL.kwhPerKwpMonth * factor; const saving = Math.min(B * offset, gen * MODEL.tariff); const newBill = B - saving;
    const payback = price / (saving * 12); const lifetime = saving * 12 * 25 - price; const co2 = gen * 12 * MODEL.co2PerKwh / 1000;
    Object.assign(calc, { B, kwp, panels, price, saving, newBill, payback });
    $('#billOut').textContent = money(B);
    $('#outKwp').textContent = `${kwp.toFixed(1)} kWp`; $('#outPanels').textContent = `${panels} × 550 W panels · ~${Math.round(panels * 2.6)} m² of roof`;
    $('#outPrice').textContent = money(price); $('#outFinance').textContent = `or ~${money(price / MODEL.instalmentMonths)}/month over ${MODEL.instalmentMonths} months at 0%`;
    $('#outNewBill').textContent = money(newBill); $('#outSaving').textContent = `saves ~${money(saving)} every month`;
    $('#outPayback').textContent = `${payback.toFixed(1)} years`; $('#outLifetime').textContent = `~${money(lifetime)} net over 25 years`;
    $('#outCo2').textContent = `${co2.toFixed(1)} t/year`; $('#outTrees').textContent = `like planting ${Math.round(co2 * MODEL.treesPerTonne)} trees a year`;
    $('#sumSystem').textContent = `${kwp.toFixed(1)} kWp · ${money(price)} · bill ${money(B)} → ${money(newBill)}`;
  };
  bill.addEventListener('input', runCalc); roof.addEventListener('change', runCalc);
  $$('.seg button').forEach((b) => b.addEventListener('click', () => { $$('.seg button').forEach((x) => x.classList.toggle('active', x === b)); ptype = b.dataset.type; runCalc(); }));
  runCalc();
  $('#calcToQuote').addEventListener('click', () => { $('#survey').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' }); toast('Your system is in the quotation summary'); });

  /* packages */
  $('#packGrid').innerHTML = PACKAGES.map((p) => `<article class="pack${p.featured ? ' featured' : ''}"><span class="chip ${p.featured ? 'chip-sun' : 'chip-sky'}">${p.featured ? 'Most popular' : p.for}</span><h3>${p.name}</h3><span class="kw">${p.kwp} kWp · ${p.panels} panels${p.featured ? ` · ${p.for}` : ''}</span><div class="price">${p.from ? 'from ' : ''}${money(p.price)}<small>installed · ~${money(p.price / MODEL.instalmentMonths)}/month at 0%</small></div><ul>${p.items.map((i) => `<li>${i}</li>`).join('')}</ul><button class="button ${p.featured ? 'button-sun' : 'button-outline'}" type="button" data-pack="${p.name}">Quote this package</button></article>`).join('');
  document.addEventListener('click', (e) => { const b = e.target.closest('[data-pack]'); if (!b) return; const p = PACKAGES.find((x) => x.name === b.dataset.pack); $('#sumSystem').textContent = `${p.name} package · ${p.kwp} kWp · ${p.from ? 'from ' : ''}${money(p.price)}`; calc.pack = p.name; toast(`${p.name} package added to your request`); $('#survey').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' }); });

  /* survey slots by area */
  const seed = (str) => { let h2 = 2166136261; for (const c of str) { h2 ^= c.charCodeAt(0); h2 = Math.imul(h2, 16777619); } return () => { h2 += 0x6D2B79F5; let t = Math.imul(h2 ^ (h2 >>> 15), 1 | h2); t ^= t + Math.imul(t ^ (t >>> 7), 61 | t); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; };
  const today = new Date(); today.setHours(0, 0, 0, 0); const now = new Date();
  const days = Array.from({ length: 10 }, (_, i) => { const d = new Date(today); d.setDate(today.getDate() + i); return d; }).filter((d) => SITE.workDays.includes(d.getDay())).slice(0, 7);
  const scheduleFor = (area) => days.map((d) => { const rnd = seed(area + isoDate(d)); const routed = rnd() < 0.7; return { date: d, slots: routed ? SITE.surveyHours.map((hr) => { let state = rnd() < 0.6 ? 'open' : 'full'; if (isoDate(d) === isoDate(now) && hr <= now.getHours() + 2) state = 'full'; return { hour: hr, state }; }) : [] }; });
  const state = { area: 0, day: 0, hour: null, sched: scheduleFor(AREAS[0]) };
  const areaPills = $('#areaPills'); const dayStrip = $('#dayStrip'); const slots = $('#slots');
  const dayShort = (d) => d.toLocaleDateString('en-MY', { weekday: 'short' });
  const renderSurvey = () => {
    areaPills.innerHTML = AREAS.map((a, i) => `<button type="button" role="tab" aria-selected="${i === state.area}">${a}</button>`).join('');
    dayStrip.innerHTML = state.sched.map((day, i) => { const n = day.slots.filter((s) => s.state !== 'full').length; return `<button type="button" role="tab" aria-selected="${i === state.day}"><small>${i === 0 ? 'Today' : dayShort(day.date)}</small><strong>${day.date.getDate()}</strong><em class="${!day.slots.length || !n ? 'none' : n <= 1 ? 'few' : ''}">${!day.slots.length ? 'no route' : n ? `${n} open` : 'full'}</em></button>`; }).join('');
    const day = state.sched[state.day];
    slots.innerHTML = day.slots.length ? day.slots.map((s) => `<button type="button" class="${s.state}" data-hour="${s.hour}" aria-pressed="${state.hour === s.hour}" ${s.state === 'full' ? 'disabled' : ''}>${hourLabel(s.hour)}</button>`).join('') : '<span class="empty">The van is not routed to this area that day. Try another day.</span>';
    $('#sumArea').textContent = AREAS[state.area];
    $('#sumSurvey').textContent = state.hour !== null ? `${dayShort(day.date)} ${day.date.getDate()} · ${hourLabel(state.hour)}` : 'Pick a slot';
  };
  areaPills.addEventListener('click', (e) => { const b = e.target.closest('button'); if (!b) return; state.area = [...areaPills.children].indexOf(b); state.sched = scheduleFor(AREAS[state.area]); state.day = 0; state.hour = null; renderSurvey(); });
  dayStrip.addEventListener('click', (e) => { const b = e.target.closest('button'); if (!b) return; state.day = [...dayStrip.children].indexOf(b); state.hour = null; renderSurvey(); });
  slots.addEventListener('click', (e) => { const b = e.target.closest('button:not(:disabled)'); if (!b) return; state.hour = Number(b.dataset.hour); $('#date').value = isoDate(state.sched[state.day].date); $('#time').value = hourLabel(state.hour); renderSurvey(); toast(`${hourLabel(state.hour)} survey slot selected`); });
  renderSurvey();
  const first = state.sched.flatMap((d, i) => d.slots.filter((s) => s.state !== 'full').map((s) => ({ i, s })))[0];
  $('#heroSlot').textContent = first ? `Next survey slot: ${first.i === 0 ? 'today' : dayShort(state.sched[first.i].date)} ${hourLabel(first.s.hour)}` : 'Survey slots open next week';

  /* ask us */
  const askInput = $('#askInput'); const askResults = $('#askResults');
  const answer = (q) => { const lower = q.toLowerCase().trim(); if (lower.length < 2) return; const hits = FAQ.map((f) => ({ f, score: f.keys.reduce((a, k) => a + (lower.includes(k) ? (k.length > 5 ? 2 : 1) : 0), 0) })).filter((x) => x.score > 0).sort((a, b) => b.score - a.score).slice(0, 3);
    askResults.innerHTML = hits.length ? hits.map(({ f }) => `<div class="answer"><small>${f.tag}</small><strong>${f.title}</strong><p>${f.text}</p>${f.action ? `<div class="answer-actions"><a href="#${f.action}">Open survey slots</a></div>` : ''}</div>`).join('') : `<div class="answer"><small>Not found</small><strong>A human will answer that one.</strong><p>Send it on WhatsApp and we add the answer here so nobody has to ask twice.</p><div class="answer-actions"><a href="https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent('Hi My Service Company, quick question: ' + q)}" target="_blank" rel="noopener">Ask on WhatsApp</a></div></div>`; };
  $('#askForm').addEventListener('submit', (e) => { e.preventDefault(); answer(askInput.value); });
  let askTimer; askInput.addEventListener('input', () => { clearTimeout(askTimer); askTimer = setTimeout(() => answer(askInput.value), 280); });
  $('#askSuggest').addEventListener('click', (e) => { const b = e.target.closest('[data-q]'); if (b) { askInput.value = b.dataset.q; answer(b.dataset.q); } });

  /* quote form */
  const form = $('#quoteForm'); const status = $('#formStatus');
  const compose = (d) => [`${SITE.name} — quotation request`, `Name: ${d.name} · WhatsApp: ${d.phone}`, `Property: ${d.ptype}${d.address ? `, ${d.address}` : ''} · Area: ${AREAS[state.area]}`, `Calculator: bill ${money(calc.B)} → ${calc.kwp.toFixed(1)} kWp, est. ${money(calc.price)}, new bill ~${money(calc.newBill)}, payback ${calc.payback.toFixed(1)} yrs${calc.pack ? ` · Package: ${calc.pack}` : ''}`, `Survey: ${d.date && d.time ? `${d.date} at ${d.time}` : 'to be arranged'}`, `Payment: ${d.finance}`, `Notes: ${d.notes || '-'}`, '', 'Sent from the website calculator. Please confirm the survey slot.'].join('\n');
  const validate = () => { status.classList.remove('error'); if (!form.reportValidity()) { status.textContent = 'Please complete the highlighted fields.'; status.classList.add('error'); return null; } return Object.fromEntries(new FormData(form).entries()); };
  const remember = (d) => { try { const list = JSON.parse(localStorage.getItem(SITE.storageKey) || '[]'); list.unshift({ ...d, kwp: calc.kwp, createdAt: new Date().toISOString() }); localStorage.setItem(SITE.storageKey, JSON.stringify(list.slice(0, 5))); } catch (_) { /* no storage */ } };
  form.addEventListener('submit', (e) => { e.preventDefault(); const d = validate(); if (!d) return; remember(d); status.textContent = 'Saved on this device. Opening WhatsApp with your request…'; window.open(`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(compose(d))}`, '_blank', 'noopener'); });
  $('#copyQuote').addEventListener('click', async () => { const d = validate(); if (!d) return; try { await navigator.clipboard.writeText(compose(d)); remember(d); status.textContent = 'Message copied. Paste it into any chat.'; } catch (_) { status.textContent = 'Copy is not available here. Use the WhatsApp button.'; status.classList.add('error'); } });

  /* counters + reveal */
  const runCounter = (el) => { const end = Number(el.dataset.count); const suf = el.dataset.suffix || ''; if (reduceMotion) { el.textContent = end.toLocaleString('en-MY') + suf; return; } const t0 = performance.now(); const tick = (t) => { const p = Math.min(1, (t - t0) / 1300); el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))).toLocaleString('en-MY') + suf; if (p < 1) requestAnimationFrame(tick); }; requestAnimationFrame(tick); };
  const revealEls = $$('.reveal'); const counters = $$('[data-count]');
  if ('IntersectionObserver' in window && !reduceMotion) { const io = new IntersectionObserver((es) => es.forEach((en) => { if (!en.isIntersecting) return; en.target.classList.add('show'); if (en.target.dataset.count) runCounter(en.target); $$('[data-count]', en.target).forEach(runCounter); io.unobserve(en.target); }), { threshold: .1 }); revealEls.forEach((el) => io.observe(el)); counters.filter((c) => !c.closest('.reveal')).forEach((c) => io.observe(c)); }
  else { revealEls.forEach((el) => el.classList.add('show')); counters.forEach(runCounter); }
  $('#year').textContent = String(new Date().getFullYear());
})();
