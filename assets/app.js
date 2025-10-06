// Utilities
const TELEGRAM_URL = 'https://t.me/roman_khristin';
const tpl = (html) =>
  Object.assign(document.createElement("template"), { innerHTML: html });
const $ = (root, sel) => root.querySelector(sel);

// 1) <app-header>
customElements.define(
  "app-header",
  class extends HTMLElement {
    connectedCallback() {
      const brand = this.getAttribute("brand") || "Бренд";
      const cta = this.getAttribute("cta") || "Записатися";
      const href = this.getAttribute("cta-href") || TELEGRAM_URL;
      this.attachShadow({ mode: "open" }).append(
        tpl(`<style>
        :host{display:block;position:relative;padding-bottom:120px}
        .nav{position:fixed;top:16px;left:50%;transform:translateX(-50%);z-index:120;background:rgba(241,255,254,.6);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border:1px solid var(--line);border-radius:56px;width:min(100% - 32px,var(--maxw));box-shadow:0 14px 38px rgba(17,17,17,.08);color:var(--text);transition:background .3s ease, box-shadow .3s ease}
        .nav:hover{background:rgba(241,255,254,.8);box-shadow:0 18px 42px rgba(17,17,17,.12)}
        .nav a{text-decoration:none;color:inherit}
        .inner{display:flex;align-items:center;justify-content:space-between;gap:16px;width:90%;padding:14px 24px 14px 4px;flex-wrap:wrap}
        .brand{display:flex;align-items:center;gap:12px;font-weight:900}
        .brand span{font-size:1rem;font-weight:900;line-height:1.1}
        .avatar{width:44px;height:44px;border-radius:50%;object-fit:cover;border:2px solid rgba(255,255,255,.8);box-shadow:0 6px 18px rgba(17,17,17,.15)}
        .nav-list{display:none;gap:18px;font-weight:700;margin-left:auto}
        .nav-list a{white-space:nowrap;font-size:.92rem;font-weight:600}
        @media (min-width:860px){.nav-list{display:flex}}
      </style>
      <nav class="nav">
        <div class="inner">
          <div class="brand"><img class="avatar" src="assets/img/roman.jpg" alt="${brand}" loading="lazy"><span>${brand}</span></div>
          <div class="nav-list">
            <a href="#about">Про гру</a>
            <a href="#layers">5 шарів</a>
            <a href="#format">Формат</a>
            <a href="#pricing">Умови</a>
            <a href="#faq">Питання</a>
          </div>
        </div>
      </nav>`).content
      );
    }
  }
);

// 2) <hero-section>
customElements.define(
  "hero-section",
  class extends HTMLElement {
    connectedCallback() {
      const ey = this.getAttribute("eyebrow") || "";
      const title = this.getAttribute("title") || "";
      const subtitle = this.getAttribute("subtitle") || "";
      const sub2 = this.getAttribute("sub2") || "";
      const pt = this.getAttribute("primary-text") || "Подати заявку";
      const ph = this.getAttribute("primary-href") || "#apply";
      const st = this.getAttribute("secondary-text") || "Детальніше";
      const sh = this.getAttribute("secondary-href") || "#about";
      this.innerHTML = `
      <section class="container" style="padding:64px 24px 48px;display:flex;flex-direction:column;align-items:center;text-align:center">
        <div class="tag">${ey}</div>
        <h1 class="h1" style="margin-top:12px">${title}</h1>
        <p class="lead" style="max-width:640px">${subtitle}</p>
        <p class="lead" style="opacity:.9;max-width:640px">${sub2}</p>
        <div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:24px;justify-content:center">
          <a class="btn" href="${ph}" target="_blank" rel="noopener">🌱 ${pt}</a>
          <a class="btn outline" href="${sh}">${st}</a>
        </div>
      </section>`;
    }
  }
);

// 3) <section-block>
customElements.define('section-block', class extends HTMLElement{
  connectedCallback(){
    if (this.shadowRoot) return;
    const title = this.getAttribute('title')||'';
    const subtitle = this.getAttribute('subtitle')||'';
    const isAbout = this.id === 'about';
    const root = this.attachShadow({mode:'open'});
    root.append(tpl(`
      <style>
        .wrap{max-width:var(--maxw);margin:auto;padding:52px 24px}
        .title{font-weight:900;font-size:clamp(22px,3.2vw,36px);margin:0 0 8px}
        .subtitle{color:var(--muted);margin:0 0 18px}
        .slot{display:grid;gap:16px}
        .section-about{position:relative;padding-top:40px;padding-bottom:36px;border-radius:20px;background:linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.02));border:1px solid rgba(255,255,255,.10);box-shadow:0 12px 30px rgba(0,0,0,.28), inset 0 1px 0 rgba(255,255,255,.06)}
        .section-about .title{display:flex;align-items:center;gap:10px;margin-top:0;margin-bottom:6px}
        .section-about .subtitle{font-size:1.05rem;color:var(--muted);margin-bottom:18px}
        .section-about ::slotted(bullets-block){display:block}
        .section-about ::slotted(p:last-of-type){margin-top:18px;color:var(--text)}
        .section-about ::slotted(p:last-of-type) b{background:linear-gradient(135deg,var(--brand-2),var(--brand));-webkit-background-clip:text;background-clip:text;color:transparent}
      </style>
      <section class="wrap ${isAbout? 'section-about' : ''}">
        ${title?`<h2 class="title">${title}</h2>`:''}
        ${subtitle?`<p class="subtitle">${subtitle}</p>`:''}
        <div class="slot"><slot></slot></div>
      </section>
    `).content);
  }
});

// 4) <story-block>
const STORY_ICON_MAP = [
  { keywords: ['втратити смак', 'смак'], label: 'Втрачений смак до життя', svg: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" fill="none"><circle cx="12" cy="12" r="10"/><path d="M16 16s-1.5-2-4-2-4 2-4 2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>` },
  { keywords: ['масштабував', 'перемог', 'статус'], label: 'Статус і перемоги', svg: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" fill="none"><path d="M4 5h16"/><path d="M4 9h16"/><path d="M9 13v8l3-2 3 2v-8"/><path d="M7 5a5 5 0 0 1-2-4"/><path d="M17 5a5 5 0 0 0 2-4"/></svg>` },
  { keywords: ['спустош'], label: 'Внутрішня порожнеча', svg: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" fill="none"><rect x="2" y="7" width="16" height="10" rx="2"/><line x1="22" y1="11" x2="22" y2="13"/><line x1="6" y1="11" x2="6" y2="13"/></svg>` },
  { keywords: ['банкрут', 'борг', 'розбит'], label: 'Банкрутства і розриви', svg: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" fill="none"><circle cx="12" cy="12" r="10"/><path d="M16 8h-5a2 2 0 1 0 0 4h2a2 2 0 1 1 0 4H8"/><path d="M12 18V6"/></svg>` },
  { keywords: ['чесно подивився', 'подивився в дзеркало'], label: 'Чесний погляд у дзеркало', svg: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" fill="none"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z"/><circle cx="12" cy="12" r="3"/></svg>` },
  { keywords: ['справжнього себе'], label: 'Справжній я', svg: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" fill="none"><path d="M12 3v2"/><path d="M5.22 5.22 6.64 6.64"/><path d="M1 12h2"/><path d="M21 12h2"/><path d="M17.36 6.64 18.78 5.22"/><path d="M12 19v2"/><path d="M4.93 19.07 7.76 16.24"/><path d="m19.07 19.07-2.83-2.83"/><circle cx="12" cy="12" r="3"/></svg>` },
  { keywords: ['гра в повноті', 'з цього почалася'], label: 'Початок гри', svg: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" fill="none"><path d="M7 20h10"/><path d="M10 20c5.5-2.5 6.5-8.5 6.5-14.5 0-.5 0-1 0-1.5C12.5 7 10 11.5 10 16"/><path d="M9.5 9C8 7 7 5 7 3"/></svg>` }
];

customElements.define('story-block', class extends HTMLElement{
  connectedCallback(){
    if (this.shadowRoot) return;
    const raw = Array.from(this.querySelectorAll('p'));
    const items = [];
    const splitMarker = 'З цього почалася';
    raw.forEach((p, baseIdx) => {
      const html = p.innerHTML.trim();
      if (!html) return;
      const idx = html.indexOf(splitMarker);
      if (idx > -1){
        const before = html.slice(0, idx).trim();
        const after = html.slice(idx).trim();
        if (before) items.push(before);
        if (after) items.push(after);
      } else {
        items.push(html);
      }
    });
    this.innerHTML = '';
    const cards = items.map((html, idx) => {
      const lower = html.toLowerCase();
      const icon = STORY_ICON_MAP.find(({ keywords }) => keywords.some((k) => lower.includes(k))) || STORY_ICON_MAP[STORY_ICON_MAP.length - 1];
      const accent = idx % 2 === 1;
      return `
        <article class="card${accent ? ' accent' : ''}">
          <div class="icon" aria-label="${icon.label}">${icon.svg}</div>
          <div class="copy">${html}</div>
        </article>`;
    }).join('');
    this.attachShadow({mode:'open'}).append(
      tpl(`<style>
        .grid{display:grid;gap:18px;grid-template-columns:repeat(3,minmax(0,1fr));justify-items:center}
        @media (max-width:1100px){.grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
        @media (max-width:720px){.grid{grid-template-columns:1fr}}
        .card{width:100%;max-width:280px;background:#EEEDE5;border-radius:32px;padding:28px 26px;box-shadow:0 20px 40px rgba(17,17,17,.08);display:flex;flex-direction:column;gap:16px;min-height:200px;border:1px solid rgba(17,17,17,.06);transition:transform .2s ease, box-shadow .2s ease}
        .card.accent{background:#FEF7D7;border-color:rgba(240,198,98,.38)}
        .card:hover{transform:translateY(-2px);box-shadow:0 26px 46px rgba(17,17,17,.12)}
        .icon{width:58px;height:58px;display:flex;align-items:center;justify-content:center;border-radius:18px;background:#fff;box-shadow:0 10px 20px rgba(17,17,17,.12)}
        .icon svg{width:42px;height:42px}
        .copy{color:var(--muted);line-height:1.6;font-size:1rem}
        .copy b{color:var(--text)}
        @media (max-width:620px){.card{padding:20px 18px;gap:12px;min-height:160px}.icon{width:52px;height:52px}.icon svg{width:36px;height:36px}}
      </style>
      <div class="grid">${cards}</div>`).content
    );
  }
});

// 5) <bullets-block bullets='["a","b"]'>
customElements.define('bullets-block', class extends HTMLElement{
  connectedCallback(){
    let items=[]; try{items=JSON.parse(this.getAttribute('bullets')||'[]')}catch{items=[]}
    const list = items.map(it=>`<li>${it}</li>`).join('');
    this.innerHTML = `
      <style>
        .list{margin:0;padding:0;list-style:none;display:grid;gap:10px}
        .list-check li{position:relative;padding-left:34px}
        .list-check li::before{content:'';position:absolute;left:0;top:6px;width:20px;height:20px;border-radius:7px;background:linear-gradient(135deg,var(--brand),var(--brand-2));box-shadow:0 4px 12px rgba(43,217,159,.32);-webkit-mask:url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fill="%23fff" d="M7.6 13.2l-3-3 1.4-1.4 1.6 1.6 5.4-5.4 1.4 1.4z"/></svg>') center/70% no-repeat;mask:url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fill="%23fff" d="M7.6 13.2l-3-3 1.4-1.4 1.6 1.6 5.4-5.4 1.4 1.4z"/></svg>') center/70% no-repeat}
      </style>
      <ul class="list list-check">${list}</ul>
    `;
  }
});

// 6) <layers-accordion>
const LAYERS = [
  {
    title: "1. Справжній Я",
    body: `Ми чесно подивимось: хто ти без ролей і броні.<br>👉 Ти створиш карту своїх суперсил і вперше відчуєш себе без чужих сценаріїв.`,
  },
  {
    title: "2. Внутрішні опори",
    body: `Ми сформуємо твою Конституцію: місію, цінності, принципи, які більше не дозволять тобі зраджувати себе.`,
  },
  {
    title: "3. Енергія і системи",
    body: `Твоя енергія — головна валюта.<br>👉 Ти створиш екосистему відновлення, ритми і практики, які підживлюють. І список «легких грошей».`,
  },
  {
    title: "4. Відмова і завершення",
    body: `Ми визнаємо те, що більше не твоє: проєкти, борги, токсичні зв’язки.<br>👉 І ти завершиш ці ігри, відкривши простір для нових.`,
  },
  {
    title: "5. Прояв і вплив",
    body: `Ми виведемо тебе на твою арену.<br>👉 Ти створиш новий прояв: продукт, контент, партнерство, і покажеш світові чесного себе.`,
  },
];
customElements.define(
  "layers-accordion",
  class extends HTMLElement {
    connectedCallback() {
      this.attachShadow({ mode: "open" }).append(
        tpl(`<style>
        details{background:#EEEDE5;border:1px solid rgba(17,17,17,.08);border-radius:28px;padding:18px 20px;transition:transform .2s ease, box-shadow .2s ease}
        details:nth-of-type(2n){background:#FEF7D7;border-color:rgba(240,198,98,.35)}
        details+details{margin-top:12px}
        details[open]{box-shadow:0 16px 32px rgba(17,17,17,.08);transform:translateY(-1px)}
        summary{cursor:pointer;font-weight:800;list-style:none;display:flex;justify-content:space-between;align-items:center;gap:14px}
        summary::after{content:'+';font-size:1.4rem;line-height:1;color:var(--text);transition:transform .2s ease}
        details[open] summary::after{transform:rotate(45deg)}
        summary::-webkit-details-marker{display:none}
        p{margin:.6rem 0 0;color:var(--muted);line-height:1.6}
      </style>
      <div>${LAYERS.map(
        (l) => `
        <details><summary>${l.title}</summary><p>${l.body}</p></details>
      `
      ).join("")}</div>`).content
      );
    }
  }
);

// 7) <features-grid>
const FEATURES = [
  "До <b>10 учасників</b> — камерне поле довіри",
  "<b>Ритуал входу</b> — символічна церемонія початку",
  "<b>1:1 стратегічна сесія</b> на старті",
  "<b>10 групових майстермайндів</b> (2 на місяць)",
  "<b>20 уроків повернення до себе</b>",
  "<b>Телеграм-чат</b> — живе поле підтримки",
  "<b>Щотижневі ритуали інтеграції</b>",
  "<b>Фінальний прояв</b> — публічна презентація",
  "<b>Ритуал подяки</b> — завершення циклу",
];
customElements.define(
  "features-grid",
  class extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `<div class="grid cols-2">${FEATURES.map(
        (f) => `<div class="card" style="padding:16px 14px">${f}</div>`
      ).join("")}</div>`;
    }
  }
);

// 8) <outcomes-list>
const OUTCOMES = [
  "Свою карту суперсил",
  "Внутрішню Конституцію (місія, цінності, принципи)",
  "Екосистему енергії й відновлення",
  "Простір довіри, без чужих ігор",
  "Вектор реалізації й прояву",
  "Відчуття: <b>«Я граю у свою гру…»</b>",
];
customElements.define(
  "outcomes-list",
  class extends HTMLElement {
    connectedCallback() {
      const items = OUTCOMES.map((o) => `
        <li class="item">
          <span class="icon">✔</span>
          <span class="text">${o}</span>
        </li>`
      ).join("");
      this.attachShadow({ mode: "open" }).append(
        tpl(`<style>
        ul{margin:0;padding:0;list-style:none;display:grid;gap:14px}
        .item{display:flex;align-items:flex-start;gap:12px;padding:16px 18px;background:#EEEDE5;border-radius:24px;border:1px solid rgba(17,17,17,.06);box-shadow:0 12px 28px rgba(17,17,17,.06)}
        .item:nth-of-type(2n){background:#FEF7D7;border-color:rgba(240,198,98,.32)}
        .icon{width:28px;height:28px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;background:linear-gradient(135deg,var(--brand),var(--brand-2));color:#05261c;font-weight:800;font-size:16px;flex-shrink:0}
        .text{color:var(--text);line-height:1.55;font-size:1rem}
        .text b{color:var(--text)}
        @media (max-width:620px){.item{padding:14px 14px}}
      </style>
      <ul>${items}</ul>`).content
      );
    }
  }
);

// 9) <pricing-card>
customElements.define(
  "pricing-card",
  class extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
      <div class="card" style="padding:20px">
        <div style="display:flex;align-items:end;justify-content:space-between;gap:12px;flex-wrap:wrap">
          <div>
            <div class="eyebrow">Вартість</div>
            <h3 style="margin:.2rem 0 0;font-size:34px">1500$ <span class="muted" style="font-size:16px">за 5 місяців</span></h3>
          </div>
          <a class="btn" href="${TELEGRAM_URL}" target="_blank" rel="noopener">Піти в гру</a>
        </div>
        <div class="grid cols-2" style="margin-top:14px">
          <div>
            <div class="eyebrow">Перші 3 учасники</div>
            <p class="muted">Бонуси та знижена ціна</p>
          </div>
          <div>
            <div class="eyebrow">Розстрочка</div>
            <p class="muted">Від банку чи особиста</p>
          </div>
        </div>
        <hr style="border:none;border-top:1px solid var(--line);margin:16px 0">
        <div class="eyebrow">Партнерка</div>
        <ul style="margin:.5rem 0 0;padding-left:1.1rem;display:grid;gap:6px">
          <li>150$ за першого приведеного</li>
          <li>200$ за другого</li>
          <li>250$ за третього</li>
          <li>300$ за четвертого і далі</li>
          <li><b>5 учасників = безкоштовна участь</b></li>
        </ul>
      </div>`;
    }
  }
);

// 10) <faq-dialogue>
const QA = [
  {
    q: "😮‍💨 «Я зараз виснажений. Просто не маю сил ні на що…»",
    a: `Я розумію. Ми звикли відкладати себе «на потім», поки тіло й душа не вимикаються. Але саме в такі моменти й народжується новий цикл. <b>«Гра в Повноті» — це не ще одне навантаження. Це пауза, у якій ти згадуєш, як дихати.</b>`,
  },
  {
    q: "💭 «Я не до кінця розумію, що це. Це коучинг, терапія, бізнес-програма?»",
    a: `Це не формат — це досвід. Не про те, щоб вивчити, а про те, щоб згадати. Ми не додаємо ще один метод. Ми допомагаємо зняти зайве, щоб ти знову відчув себе живим. <b>Тут ти не об’єкт навчання — ти творець власної гри.</b>`,
  },
  {
    q: "💰 «1500 $ — зараз не час, дорого…»",
    a: `Я бачу тебе. «Дорого» іноді означає «я не дозволяю собі». Це про те, щоб знову стати джерелом енергії, з якої приходить і прибуток, і спокій. Якщо серце каже «так», ми знайдемо шлях. <b>Справжня інвестиція — в себе.</b>`,
  },
  {
    q: "🕰️ «Я просто не маю часу…»",
    a: `Гра — про якість моменту. Навіть 15 хвилин чесності можуть змінити усе. <b>Гра не забирає час. Вона повертає присутність.</b>`,
  },
  {
    q: "😶‍🌫️ «Я боюся. Це глибоко…»",
    a: `Страх приходить, коли поруч правда. Ми не ведемо у біль — ми йдемо у присутність. Ти задаєш темп, і я поруч. <b>Твоя глибина більша за страх.</b>`,
  },
  {
    q: "🤔 «Я не впевнений, що мені це потрібно…»",
    a: `Можливо, й ні. Але якщо є втома і відчуття «не на повну» — це поклик. <b>Гра кличе тих, хто готовий почути.</b>`,
  },
  {
    q: "💫 «Хочу, але не відчуваю впевненості…»",
    a: `Не потрібно бути впевненим — достатньо бути чесним. Прислухайся до серця: тихе «так» — достатньо, щоб почати.`,
  },
  {
    q: "🧘‍♂️ «Може, почекаю, поки буду готовий…»",
    a: `Готовність — це момент, коли ти перестаєш тікати. Іноді найкраща підготовка — зробити перший крок. <b>Достатньо бути справжнім.</b>`,
  },
];
customElements.define(
  "faq-dialogue",
  class extends HTMLElement {
    connectedCallback() {
      this.attachShadow({ mode: "open" }).append(
        tpl(`<style>
        details{background:#EEEDE5;border:1px solid rgba(17,17,17,.08);border-radius:28px;padding:18px 20px;transition:transform .2s ease, box-shadow .2s ease}
        details:nth-of-type(2n){background:#FEF7D7;border-color:rgba(240,198,98,.35)}
        details+details{margin-top:12px}
        details[open]{box-shadow:0 16px 32px rgba(17,17,17,.08);transform:translateY(-1px)}
        summary{cursor:pointer;font-weight:800;list-style:none;display:flex;justify-content:space-between;align-items:center;gap:14px}
        summary::after{content:'+';font-size:1.4rem;line-height:1;color:var(--text);transition:transform .2s ease}
        details[open] summary::after{transform:rotate(45deg)}
        summary::-webkit-details-marker{display:none}
        p{margin:.6rem 0 0;color:var(--muted);line-height:1.6}
      </style>
      <div>${QA.map(
        (item) => `
        <details><summary>${item.q}</summary><p>${item.a}</p></details>
      `
      ).join("")}</div>`).content
      );
    }
  }
);

// 11) <cta-banner>
customElements.define(
  "cta-banner",
  class extends HTMLElement {
    connectedCallback() {
      if (this._timerId) {
        clearInterval(this._timerId);
      }
      const text = this.getAttribute("cta-text") || "Подати заявку";
      const href = this.getAttribute("cta-href") || TELEGRAM_URL;
      const note = this.getAttribute("note") || "";
      this.innerHTML = `
      <section class="container" style="padding:40px 24px 64px;position:relative">
        <style>
          .cta-card{padding:28px 24px;display:flex;flex-direction:column;gap:18px;align-items:flex-start}
          .cta-card__top{display:flex;align-items:center;gap:24px;flex-wrap:wrap;width:100%;justify-content:space-between}
          .cta-copy{display:flex;flex-direction:column;gap:8px;max-width:520px;flex:1 1 280px}
          .cta-timer{width:100%;display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:14px;margin-top:8px;align-items:start}
          .cta-timer__label{grid-column:1 / -1;font-size:.9rem;font-weight:700;color:var(--text)}
          .cta-time{background:#EEEDE5;border-radius:24px;padding:18px 16px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;border:1px solid rgba(17,17,17,.06)}
          .cta-time.highlight{background:#FEF7D7;border-color:rgba(240,198,98,.38)}
          .cta-value{font-size:clamp(28px,6vw,40px);font-weight:800;color:var(--text)}
          .cta-label{font-size:.82rem;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:var(--muted)}
          @media (max-width:620px){.cta-card{padding:22px 20px;align-items:center;text-align:center}
            .cta-card__top{justify-content:center}
            .cta-copy{align-items:center}
            .cta-timer{grid-template-columns:repeat(3,minmax(90px,1fr))}
            .cta-timer__label{text-align:center}
            .cta-time{padding:14px 12px}
          }
        </style>
        <div class="card cta-card">
          <div class="cta-card__top">
            <div class="cta-copy">
              <div class="eyebrow">Фінальний крок</div>
              <div class="lead" style="margin:.2rem 0 0">${note}</div>
            </div>
            <a class="btn" href="${href}" target="_blank" rel="noopener">🌱 ${text}</a>
          </div>
          <div class="cta-timer" role="group" aria-label="Залишилось до старту">
            <div class="cta-timer__label">🔥 Залишилось:</div>
            <div class="cta-time" data-cta-time="days">
              <span class="cta-value" data-cta-days>00</span>
              <span class="cta-label">днів</span>
            </div>
            <div class="cta-time highlight" data-cta-time="hours">
              <span class="cta-value" data-cta-hours>00</span>
              <span class="cta-label">годин</span>
            </div>
            <div class="cta-time" data-cta-time="minutes">
              <span class="cta-value" data-cta-minutes>00</span>
              <span class="cta-label">хвилин</span>
            </div>
          </div>
        </div>
      </section>`;

      const deadline = new Date("2025-10-16T00:00:00+03:00").getTime();
      const daysEl = this.querySelector("[data-cta-days]");
      const hoursEl = this.querySelector("[data-cta-hours]");
      const minutesEl = this.querySelector("[data-cta-minutes]");

      const update = () => {
        const now = Date.now();
        let diff = deadline - now;
        if (diff < 0) diff = 0;
        const dayMs = 24 * 60 * 60 * 1000;
        const hourMs = 60 * 60 * 1000;
        const minuteMs = 60 * 1000;
        const days = Math.floor(diff / dayMs);
        diff -= days * dayMs;
        const hours = Math.floor(diff / hourMs);
        diff -= hours * hourMs;
        const minutes = Math.floor(diff / minuteMs);
        daysEl.textContent = String(days).padStart(2, "0");
        hoursEl.textContent = String(hours).padStart(2, "0");
        minutesEl.textContent = String(minutes).padStart(2, "0");
      };

      update();
      this._timerId = setInterval(update, 60 * 1000);
    }

    disconnectedCallback() {
      if (this._timerId) {
        clearInterval(this._timerId);
        this._timerId = null;
      }
    }
  }
);

// 12) <site-footer>
customElements.define(
  "site-footer",
  class extends HTMLElement {
    connectedCallback() {
      const year = new Date().getFullYear();
      this.innerHTML = `
      <footer class="footer-shell">
        <style>
          .footer-shell{padding:0 0 48px;margin-top:48px}
          .footer-card{max-width:var(--maxw);margin:0 auto;padding:24px 26px;background:#EEEDE5;border:1px solid rgba(17,17,17,.06);border-radius:32px;box-shadow:0 18px 36px rgba(17,17,17,.08);display:flex;flex-direction:column;gap:18px}
          .footer-top{display:flex;flex-wrap:wrap;gap:16px;align-items:center;justify-content:space-between}
          .footer-copy{font-weight:600;color:var(--text)}
          .footer-links{display:flex;gap:18px;font-weight:600;color:var(--muted)}
          .footer-links a{text-decoration:none;color:inherit;transition:color .2s ease}
          .footer-links a:hover{color:var(--text)}
          .footer-dev{display:flex;align-items:center;gap:12px;padding:16px 18px;background:#FEF7D7;border-radius:24px;border:1px solid rgba(240,198,98,.38);align-self:flex-start}
          .footer-dev span{font-size:.82rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--muted)}
          .footer-dev img{width:120px;height:auto;filter:brightness(0) saturate(100%)}
          @media (max-width:640px){
            .footer-card{padding:20px 22px}
            .footer-links{width:100%;justify-content:flex-start;flex-wrap:wrap}
            .footer-dev{width:100%;justify-content:space-between}
            .footer-dev img{width:100px}
          }
        </style>
        <div class="footer-card">
          <div class="footer-top">
            <span class="footer-copy">© ${year} Роман Хрістін</span>
            <nav class="footer-links">
              <a href="#faq">Питання</a>
              <a href="#pricing">Умови</a>
            </nav>
          </div>
          <div class="footer-dev">
            <span>Developer</span>
            <img src="assets/img/developer.svg" alt="Developer" loading="lazy">
          </div>
        </div>
      </footer>`;
    }
  }
);
// Reveal on view
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
      }
    });
  },
  { threshold: 0.08 }
);
document.querySelectorAll("section").forEach((s) => io.observe(s));
