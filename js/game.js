// Player data (RAW) is loaded from data/players.js
// [name, ovr, pos, club, league, nation, continent, age, pac, sho, pas, dri, def, phy, str]
const P = RAW.map((r, i) => ({ i, name: r[0], ovr: r[1], pos: r[2], club: r[3], league: r[4], nation: r[5], cont: r[6], age: r[7],
  pac: r[8], sho: r[9], pas: r[10], dri: r[11], def: r[12], phy: r[13], str: r[14], full: r[15] || "", alias: r[16] || "" }));
{ const seen = {}; P.forEach(p => seen[p.name] = (seen[p.name] || 0) + 1); P.forEach(p => { if (seen[p.name] > 1) p.name += " (" + p.club + ")"; p.names = fold(p.name + " " + p.full + " " + p.alias).replace(/["']/g, ""); p.key = p.names + " " + fold(p.club); }); }
const MAX_NORMAL = 8, MAX_HARD = 5;
function maxG() { return S && S.hard ? MAX_HARD : MAX_NORMAL; }
const NEAR = 3;
const NUM = ["ovr", "age", "pac", "sho", "pas", "dri", "def", "phy", "str"];
const STATS = ["pac", "sho", "pas", "dri", "def", "phy"];
const GROUP = { CB: "DEF", LB: "DEF", RB: "DEF", CDM: "MID", CM: "MID", CAM: "MID", LM: "MID", RM: "MID", ST: "ATT", LW: "ATT", RW: "ATT" };
const FLAG = {"Albania": "🇦🇱", "Algeria": "🇩🇿", "Angola": "🇦🇴", "Argentina": "🇦🇷", "Armenia": "🇦🇲", "Australia": "🇦🇺", "Austria": "🇦🇹", "Belgium": "🇧🇪", "Benin": "🇧🇯", "Bosnia and Herzegovina": "🇧🇦", "Brazil": "🇧🇷", "Bulgaria": "🇧🇬", "Burkina Faso": "🇧🇫", "Burundi": "🇧🇮", "Cameroon": "🇨🇲", "Canada": "🇨🇦", "Cape Verde Islands": "🇨🇻", "Central African Republic": "🇨🇫", "Chile": "🇨🇱", "China PR": "🇨🇳", "Colombia": "🇨🇴", "Comoros": "🇰🇲", "Congo": "🇨🇬", "Congo DR": "🇨🇩", "Costa Rica": "🇨🇷", "Croatia": "🇭🇷", "Czech Republic": "🇨🇿", "Côte d'Ivoire": "🇨🇮", "Denmark": "🇩🇰", "Dominican Republic": "🇩🇴", "Ecuador": "🇪🇨", "Egypt": "🇪🇬", "Equatorial Guinea": "🇬🇶", "Finland": "🇫🇮", "France": "🇫🇷", "Gabon": "🇬🇦", "Gambia": "🇬🇲", "Georgia": "🇬🇪", "Germany": "🇩🇪", "Ghana": "🇬🇭", "Greece": "🇬🇷", "Guinea": "🇬🇳", "Guinea-Bissau": "🇬🇼", "Haiti": "🇭🇹", "Holland": "🇳🇱", "Hungary": "🇭🇺", "Iceland": "🇮🇸", "Indonesia": "🇮🇩", "Iraq": "🇮🇶", "Israel": "🇮🇱", "Italy": "🇮🇹", "Jamaica": "🇯🇲", "Japan": "🇯🇵", "Jordan": "🇯🇴", "Kenya": "🇰🇪", "Korea Republic": "🇰🇷", "Kosovo": "🇽🇰", "Libya": "🇱🇾", "Lithuania": "🇱🇹", "Luxembourg": "🇱🇺", "Mali": "🇲🇱", "Mauritania": "🇲🇷", "Mexico": "🇲🇽", "Montenegro": "🇲🇪", "Morocco": "🇲🇦", "Mozambique": "🇲🇿", "New Zealand": "🇳🇿", "Niger": "🇳🇪", "Nigeria": "🇳🇬", "North Macedonia": "🇲🇰", "Northern Ireland": "🇬🇧", "Norway": "🇳🇴", "Panama": "🇵🇦", "Paraguay": "🇵🇾", "Peru": "🇵🇪", "Philippines": "🇵🇭", "Poland": "🇵🇱", "Portugal": "🇵🇹", "Republic of Ireland": "🇮🇪", "Romania": "🇷🇴", "Russia": "🇷🇺", "Saudi Arabia": "🇸🇦", "Senegal": "🇸🇳", "Serbia": "🇷🇸", "Sierra Leone": "🇸🇱", "Slovakia": "🇸🇰", "Slovenia": "🇸🇮", "Spain": "🇪🇸", "Suriname": "🇸🇷", "Sweden": "🇸🇪", "Switzerland": "🇨🇭", "Tanzania": "🇹🇿", "Thailand": "🇹🇭", "Togo": "🇹🇬", "Tunisia": "🇹🇳", "Turkey": "🇹🇷", "Ukraine": "🇺🇦", "United States": "🇺🇸", "Uruguay": "🇺🇾", "Uzbekistan": "🇺🇿", "Venezuela": "🇻🇪", "Zambia": "🇿🇲", "England": "🏴󠁧󠁢󠁥󠁮󠁧󠁿", "Scotland": "🏴󠁧󠁢󠁳󠁣󠁴󠁿", "Wales": "🏴󠁧󠁢󠁷󠁬󠁳󠁿"};
const EPOCH = Date.UTC(2026, 9, 1);

function fold(s) { return s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/ø/g, "o").replace(/ß/g, "ss").replace(/ł/g, "l"); }
function esc(s) { return String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])); }
const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
};
function todayKey() { const d = new Date(); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); }
function dayNumber() { const d = new Date(); return Math.floor((Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) - EPOCH) / 864e5) + 1; }
function hash(s) { let h = 2166136261; for (const c of s) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return h >>> 0; }
function pool(min) { return P.filter(p => p.ovr >= min); }

let S; // game state

function newState(mode) {
  if (mode === "daily") {
    const k = todayKey(), saved = store.get("fcdle-daily", null);
    const pl = pool(80), target = pl[hash("fcdle:" + k) % pl.length].i;
    if (saved && saved.date === k && saved.target === target) return { mode, date: k, target, guesses: saved.guesses, forfeit: !!saved.forfeit, hard: !!saved.hard };
    return { mode, date: k, target, guesses: [], hard: document.getElementById("hard").checked };
  }
  const pl = pool(+document.getElementById("diff").value);
  return { mode, target: pl[Math.floor(Math.random() * pl.length)].i, guesses: [], hard: document.getElementById("hard").checked };
}
function status() {
  const won = S.guesses.includes(S.target);
  return { won, forfeit: !won && !!S.forfeit, over: won || !!S.forfeit || S.guesses.length >= maxG() };
}
function save() { if (S.mode === "daily") store.set("fcdle-daily", { date: S.date, target: S.target, guesses: S.guesses, forfeit: !!S.forfeit, hard: !!S.hard }); }

function compare(g, t) {
  const c = {};
  for (const k of NUM) {
    const d = t[k] - g[k];
    c[k] = { v: g[k], st: d === 0 ? "hit" : Math.abs(d) <= NEAR ? "near" : "miss", dir: d > 0 ? "up" : d < 0 ? "down" : "" };
  }
  c.pos = { v: g.pos, st: g.pos === t.pos ? "hit" : GROUP[g.pos] === GROUP[t.pos] ? "near" : "miss" };
  c.nation = { v: g.nation, st: g.nation === t.nation ? "hit" : g.cont === t.cont ? "near" : "miss" };
  c.club = { v: g.club, st: g.club === t.club ? "hit" : g.league === t.league ? "near" : "miss" };
  return c;
}

function knowledge() {
  const t = P[S.target], K = {};
  for (const k of NUM) K[k] = { lo: null, hi: null };
  const facts = { pos: null, group: null, nation: null, cont: null, league: null, club: null };
  for (const gi of S.guesses) {
    const g = P[gi], c = compare(g, t);
    for (const k of NUM) {
      if (c[k].st === "hit") K[k].lo = K[k].hi = g[k];
      else if (c[k].dir === "up") K[k].lo = Math.max(K[k].lo ?? 0, g[k] + 1);
      else K[k].hi = Math.min(K[k].hi ?? 99, g[k] - 1);
      if (c[k].st === "near") { if (c[k].dir === "up") K[k].hi = Math.min(K[k].hi ?? 99, g[k] + NEAR); else K[k].lo = Math.max(K[k].lo ?? 0, g[k] - NEAR); }
      if (c[k].st === "miss") { if (c[k].dir === "up") K[k].lo = Math.max(K[k].lo, g[k] + NEAR + 1); else K[k].hi = Math.min(K[k].hi, g[k] - NEAR - 1); }
    }
    if (c.pos.st === "hit") facts.pos = g.pos; else if (c.pos.st === "near") facts.group = GROUP[g.pos];
    if (c.nation.st === "hit") facts.nation = g.nation; else if (c.nation.st === "near") facts.cont = g.cont;
    if (c.club.st === "hit") { facts.club = g.club; facts.league = g.league; }
  }
  return { K, facts };
}
function range(r) {
  if (r.lo != null && r.lo === r.hi) return { txt: String(r.lo), known: true };
  return { txt: "?", known: false };
}

function renderCard() {
  const { won, over } = status(), t = P[S.target], el = document.getElementById("card");
  let ovr, pos, name, stats, meta;
  if (over) {
    ovr = `<div class="c-ovr known">${t.ovr}</div>`; pos = `<div class="c-pos known">${t.pos}</div>`;
    name = esc(t.name);
    stats = [...STATS, "str"].map(k => `<div class="c-stat known"><span>${k.toUpperCase()}</span><b>${t[k]}</b></div>`).join("");
    meta = `<span class="known">${esc(t.nation)}</span><span class="known">${esc(t.league)}</span><span class="known">${esc(t.club)}</span><span class="known">Age ${t.age}</span>`;
  } else {
    const { K, facts } = knowledge(), o = range(K.ovr);
    ovr = `<div class="c-ovr${o.known ? " known" : ""}">${o.txt}</div>`;
    pos = `<div class="c-pos${facts.pos ? " known" : ""}">${facts.pos || "POS ?"}</div>`;
    name = "? ? ?";
    stats = [...STATS, "str"].map(k => { const r = range(K[k]); return `<div class="c-stat${r.known ? " known" : ""}"><span>${k.toUpperCase()}</span><b>${r.txt}</b></div>`; }).join("");
    const a = range(K.age);
    meta = `<span class="${facts.nation ? "known" : ""}">${esc(facts.nation || "Nation ?")}</span>`
      + `<span class="${facts.league ? "known" : ""}">${esc(facts.league || "League ?")}</span>`
      + `<span class="${facts.club ? "known" : ""}">${esc(facts.club || "Club ?")}</span>`
      + `<span class="${a.known ? "known" : ""}">Age ${a.txt}</span>`;
  }
  el.innerHTML = `<div class="c-top"><div>${ovr}${pos}</div></div><div class="c-face" aria-hidden="true">${over ? "" : "?"}</div>
    <div class="c-name">${name}</div><div class="c-stats">${stats}</div><div class="c-meta">${meta}</div>`;
}

function cell(c, cls = "") {
  const arrow = c.dir === "up" ? "▲" : c.dir === "down" ? "▼" : "";
  const sr = c.st === "hit" ? "correct" : (c.dir === "up" ? "mystery card is higher" : c.dir === "down" ? "mystery card is lower" : c.st === "near" ? "close" : "wrong");
  return `<td class="${c.st} ${cls}" title="${sr}" aria-label="${esc(c.v)}, ${sr}">${esc(c.v)}${arrow ? `<span class="ar" aria-hidden="true">${arrow}</span>` : ""}</td>`;
}
function renderRows(freshIndex) {
  const t = P[S.target], tb = document.getElementById("rows");
  if (!S.guesses.length) { tb.innerHTML = `<tr class="empty"><td colspan="13">No guesses yet. Start with a big name to narrow down the league and nation, then use the arrows to close in on the stats.</td></tr>`; return; }
  tb.innerHTML = S.guesses.map((gi, n) => {
    const g = P[gi], c = compare(g, t);
    return `<tr class="${n === freshIndex ? "fresh" : ""}"><td class="name">${esc(g.name)}<small>${g.ovr} ${g.pos}</small></td>
      ${cell(c.ovr)}${cell(c.pos)}${cell(c.nation, "txt")}${cell(c.club, "txt")}${cell(c.age)}
      ${STATS.map(k => cell(c[k])).join("")}${cell(c.str)}</tr>`;
  }).reverse().join("");
  if (freshIndex != null) tb.querySelectorAll("tr.fresh td:not(.name)").forEach((td, i) => td.style.animationDelay = (i * 40) + "ms");
}

// Answer photo from Wikimedia Commons (freely licensed), looked up through Wikidata.
// Only used on the end-of-game panel. Fails silently: no match, no photo.
const PHOTO_CACHE = new Map();
const WD = "https://www.wikidata.org/w/api.php?format=json&origin=*&";
async function getJSON(url) { const r = await fetch(url); if (!r.ok) throw new Error(r.status); return r.json(); }
function ageAtSnapshot(time) {
  const m = /^[+]?(\d{4})-(\d{2})-(\d{2})/.exec(time || ""); if (!m) return null;
  const y = +m[1], mo = +m[2], d = +m[3];
  return 2026 - y - ((mo > 9 || (mo === 9 && d > 12)) ? 1 : 0);
}
async function findPhoto(p) {
  if (PHOTO_CACHE.has(p.i)) return PHOTO_CACHE.get(p.i);
  const job = (async () => {
    const tries = [...new Set([p.full, p.alias.replace(/"[^"]*"\s*/g, ""), p.name.replace(/ \(.*\)$/, "")].filter(Boolean))];
    for (const q of tries) {
      const s = await getJSON(WD + "action=wbsearchentities&type=item&language=en&limit=7&search=" + encodeURIComponent(q));
      const ids = (s.search || []).map(x => x.id); if (!ids.length) continue;
      const e = await getJSON(WD + "action=wbgetentities&props=claims&ids=" + ids.join("|"));
      for (const id of ids) {
        const c = (e.entities[id] || {}).claims || {};
        const isFootballer = (c.P106 || []).some(x => x.mainsnak?.datavalue?.value?.id === "Q937857");
        const file = c.P18?.[0]?.mainsnak?.datavalue?.value;
        const age = ageAtSnapshot(c.P569?.[0]?.mainsnak?.datavalue?.value?.time);
        if (!isFootballer || !file || age == null || Math.abs(age - p.age) > 1) continue;
        const info = await getJSON("https://commons.wikimedia.org/w/api.php?format=json&origin=*&action=query&prop=imageinfo&iiprop=url|extmetadata&iiurlwidth=600&titles=" + encodeURIComponent("File:" + file));
        const ii = Object.values(info.query.pages)[0]?.imageinfo?.[0]; if (!ii?.thumburl) continue;
        const strip = h => { const d = document.createElement("div"); d.innerHTML = h || ""; return d.textContent.trim().replace(/\s+/g, " "); };
        return { src: ii.thumburl, page: ii.descriptionurl, artist: strip(ii.extmetadata?.Artist?.value).slice(0, 60) || "Unknown author", license: strip(ii.extmetadata?.LicenseShortName?.value) || "see file page" };
      }
    }
    console.info("[FCdle photo] no Wikidata match with a photo for", p.name, tries);
    return null;
  })().catch(err => { console.warn("[FCdle photo] lookup failed for", p.name, err); return null; });
  PHOTO_CACHE.set(p.i, job);
  return job;
}
function showPhoto(t) {
  const fig = document.getElementById("endphoto"); if (!fig) return;
  const target = S.target;
  findPhoto(t).then(ph => {
    if (!ph || S.target !== target || !document.body.contains(fig)) return;
    const img = new Image();
    img.alt = t.name; img.referrerPolicy = "no-referrer";
    img.onerror = () => console.warn("[FCdle photo] image failed to load", ph.src);
    img.onload = () => {
      fig.innerHTML = "";
      fig.append(img);
      const cap = document.createElement("figcaption");
      const a = document.createElement("a"); a.href = ph.page; a.target = "_blank"; a.rel = "noopener";
      a.textContent = `Photo: ${ph.artist} · ${ph.license}`;
      cap.append(a); fig.append(cap); fig.hidden = false;
    };
    img.src = ph.src;
  });
}

function shareText() {
  const t = P[S.target], { won } = status();
  const sq = st => st === "hit" ? "🟩" : st === "near" ? "🟨" : "⬛";
  const hm = S.hard ? "*" : "";
  const head = (S.mode === "daily" ? `FCdle #${dayNumber()} ` : `FCdle · Unlimited `) + `${won ? S.guesses.length : "X"}/${maxG()}${hm}${status().forfeit ? " (forfeit)" : ""}`;
  return head + "\n" + S.guesses.map(gi => { const c = compare(P[gi], t); return ["ovr", "pos", "nation", "club", "age", ...STATS, "str"].map(k => sq(c[k].st)).join(""); }).join("\n");
}
function recordResult() {
  const key = S.mode === "daily" ? "fcdle-stats-daily" : "fcdle-stats-free";
  const st = store.get(key, { played: 0, wins: 0, streak: 0, best: 0, last: null });
  const id = S.mode === "daily" ? S.date : null;
  if (id && st.last === id) return st;
  const { won } = status();
  st.played++; if (won) { st.wins++; st.streak++; st.best = Math.max(st.best, st.streak); } else st.streak = 0;
  st.last = id; store.set(key, st); return st;
}
function renderEnd(justFinished) {
  const end = document.getElementById("end"), { won, over } = status();
  if (!over) { end.hidden = true; return; }
  const st = justFinished ? recordResult() : store.get(S.mode === "daily" ? "fcdle-stats-daily" : "fcdle-stats-free", { played: 0, wins: 0, streak: 0, best: 0 });
  const t = P[S.target];
  const { forfeit } = status();
  end.classList.toggle("lost", !won);
  const sub = won ? (S.guesses.length === 1 ? "First try. Unreal." : `Got it in ${S.guesses.length} of ${maxG()} guesses.`)
    : forfeit ? `You forfeited after ${S.guesses.length} ${S.guesses.length === 1 ? "guess" : "guesses"}.` : `All ${maxG()} guesses used.`;
  end.innerHTML = `<figure class="photo" id="endphoto" hidden></figure><div class="endtext"><h2 class="${won ? "win" : "loss"}">${won ? "Victory!" : "Defeat"}</h2><p class="sub">${sub}</p>
    <p>The card was <b>${esc(t.name)}</b>, ${t.ovr} ${t.pos}, ${esc(t.club)} (${esc(t.nation)}).</p>
    <div class="stats"><span><b>${st.played}</b>Played</span><span><b>${st.played ? Math.round(st.wins / st.played * 100) : 0}%</b>Won</span><span><b>${st.streak}</b>Streak</span><span><b>${st.best}</b>Best</span></div>
    <pre class="share" id="sharetxt">${shareText()}</pre>
    <div class="row"><button class="btn primary" id="copy">Copy result</button>${S.mode === "daily" ? `<button class="btn" id="tofree">Play unlimited</button>` : `<button class="btn" id="again">New card</button>`}</div></div>`;
  end.hidden = false;
  showPhoto(t);
  document.getElementById("copy").onclick = async (e) => {
    const b = e.currentTarget;
    try { await navigator.clipboard.writeText(shareText()); b.textContent = "Copied"; }
    catch (err) { const r = document.createRange(); r.selectNodeContents(document.getElementById("sharetxt")); const s = getSelection(); s.removeAllRanges(); s.addRange(r); b.textContent = "Selected. Copy it with your keyboard"; }
  };
  const tf = document.getElementById("tofree"); if (tf) tf.onclick = () => setMode("free");
  const ag = document.getElementById("again"); if (ag) ag.onclick = () => start("free");
}
function renderCount() {
  const ov = status().over;
  document.getElementById("ff").hidden = ov;
  document.getElementById("ff-ask").hidden = false; document.getElementById("ff-confirm").hidden = true;
  const { over } = status(), q = document.getElementById("q");
  document.getElementById("count").innerHTML = over ? `<b>${S.guesses.length}</b>/${maxG()} used` : `Guess <b>${S.guesses.length + 1}</b>/${maxG()}`;
  const hb = document.getElementById("hard"), locked = S.guesses.length > 0 && !over;
  hb.disabled = locked; hb.closest("label").classList.toggle("locked", locked);
  hb.closest("label").title = locked ? "Finish or forfeit this game to switch modes" : "Hard mode: 5 guesses and names only in search";
  q.disabled = over; q.placeholder = over ? (S.mode === "daily" ? "Come back tomorrow for a new card" : "Hit New card to play again") : "Type a player… e.g. Erling Haaland";
}
function render(fresh, justFinished) { renderCard(); renderRows(fresh); renderCount(); renderEnd(justFinished); }

function guess(i) {
  if (status().over || S.guesses.includes(i)) return;
  S.guesses.push(i); save();
  render(S.guesses.length - 1, status().over);
}

// Autocomplete
const q = document.getElementById("q"), sug = document.getElementById("sug");
let matches = [], sel = 0;
function search(text) {
  const f = fold(text.trim()); if (!f) return [];
  const taken = new Set(S.guesses), words = f.split(/\s+/);
  const res = [];
  for (const p of P) {
    if (taken.has(p.i)) continue;
    const hay = document.getElementById("hard").checked ? p.names : p.key;
    if (words.every(w => hay.includes(w))) res.push(p);
  }
  const nf = fold;
  const starts = p => nf(p.name).startsWith(f) || p.names.split(" ").some(w => w.startsWith(words[0]));
  res.sort((a, b) => (nf(b.name).startsWith(f) - nf(a.name).startsWith(f)) || (starts(b) - starts(a)) || b.ovr - a.ovr);
  return res.slice(0, 8);
}
function drawList() {
  if (!matches.length) { sug.hidden = true; q.setAttribute("aria-expanded", "false"); return; }
  const hard = document.getElementById("hard").checked;
  sug.classList.toggle("bare", hard);
  sug.innerHTML = matches.map((p, n) => `<li role="option" id="opt${n}" aria-selected="${n === sel}" data-i="${p.i}">${hard ? "" : `<span class="o">${p.ovr}</span>`}<span class="n">${hard ? "" : `<span class="f" aria-hidden="true">${FLAG[p.nation] || ""}</span>`}${esc(p.name)}${p.full && fold(p.full) !== fold(p.name) ? `<small class="full">${esc(p.full)}</small>` : ""}</span>${hard ? "" : `<span class="badge ${GROUP[p.pos]}" title="${GROUP[p.pos] === "DEF" ? "Defender" : GROUP[p.pos] === "MID" ? "Midfielder" : "Attacker"}">${GROUP[p.pos]}</span><span class="s">${p.pos} · ${esc(p.club)}</span>`}</li>`).join("");
  sug.hidden = false; q.setAttribute("aria-expanded", "true"); q.setAttribute("aria-activedescendant", "opt" + sel);
}
q.addEventListener("input", () => { matches = search(q.value); sel = 0; drawList(); });
q.addEventListener("keydown", e => {
  if (sug.hidden) return;
  if (e.key === "ArrowDown") { sel = (sel + 1) % matches.length; drawList(); e.preventDefault(); }
  else if (e.key === "ArrowUp") { sel = (sel - 1 + matches.length) % matches.length; drawList(); e.preventDefault(); }
  else if (e.key === "Enter") { pick(matches[sel]); e.preventDefault(); }
  else if (e.key === "Escape") { matches = []; drawList(); }
});
sug.addEventListener("mousedown", e => { const li = e.target.closest("li"); if (li) { e.preventDefault(); pick(P[+li.dataset.i]); } });
q.addEventListener("blur", () => setTimeout(() => { sug.hidden = true; }, 120));
function pick(p) { if (!p) return; q.value = ""; matches = []; drawList(); guess(p.i); q.focus(); }

// Modes
function setMode(mode) {
  document.getElementById("m-daily").setAttribute("aria-pressed", mode === "daily");
  document.getElementById("m-free").setAttribute("aria-pressed", mode === "free");
  document.getElementById("diff").hidden = mode === "daily";
  document.getElementById("newgame").hidden = mode === "daily";
  start(mode);
}
document.getElementById("ff-ask").onclick = () => { document.getElementById("ff-ask").hidden = true; document.getElementById("ff-confirm").hidden = false; document.getElementById("ff-no").focus(); };
document.getElementById("ff-no").onclick = () => { document.getElementById("ff-ask").hidden = false; document.getElementById("ff-confirm").hidden = true; };
document.getElementById("ff-yes").onclick = () => { if (status().over) return; S.forfeit = true; save(); render(null, true); };
function start(mode) { S = newState(mode); q.value = ""; matches = []; drawList(); render(null, false); }
document.getElementById("m-daily").onclick = () => setMode("daily");
document.getElementById("m-free").onclick = () => setMode("free");
document.getElementById("newgame").onclick = () => start("free");
document.getElementById("diff").onchange = () => start("free");
const hardBox = document.getElementById("hard");
hardBox.checked = store.get("fcdle-hard", false);
hardBox.onchange = () => {
  store.set("fcdle-hard", hardBox.checked);
  if (!S.guesses.length && !status().over) { S.hard = hardBox.checked; save(); render(null, false); }
  if (!sug.hidden) drawList(); q.focus();
};
setMode("daily");
