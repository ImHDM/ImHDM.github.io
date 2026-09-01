
(function(){
  const page = document.body.dataset.cmsPage;
  if (!page) return;

  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
  const text = (el, value) => { if (el && value != null) el.textContent = value; };
  const html = (el, value) => { if (el && value != null) el.innerHTML = value; };

  async function get(path){
    const r = await fetch(path + '?v=' + Date.now(), {cache:'no-store'});
    if(!r.ok) throw new Error(path + ' ' + r.status);
    return r.json();
  }

  function hero(data){
    const sec = document.querySelector('main .hero');
    if(!sec) return;
    text(sec.querySelector('.eyebrow'), data.hero_eyebrow);
    const h1 = sec.querySelector('h1');
    if(h1){
      h1.innerHTML = `${esc(data.hero_title_before)} <span>${esc(data.hero_title_highlight)}</span> ${esc(data.hero_title_after)}`;
    }
    text(sec.querySelector('p'), data.hero_text);
    const btns = sec.querySelectorAll('.buttons .btn');
    if(btns[0] && data.primary_button) text(btns[0], data.primary_button);
    if(btns[1] && data.secondary_button) text(btns[1], data.secondary_button);
  }

  function services(data){
    const grid = document.querySelector('[data-cms-services]');
    if(!grid || !Array.isArray(data.services)) return;
    grid.innerHTML = data.services.map(s => `
      <a class="card" href="${esc(s.link || '#')}">
        <div class="icon">${esc(s.icon || '◈')}</div>
        <h3>${esc(s.title)}</h3>
        <p>${esc(s.description)}</p>
      </a>`).join('');
  }

  function home(data){
    hero(data);
    const sec = document.querySelector('[data-cms-services-section]');
    if(sec){
      text(sec.querySelector('.eyebrow'), data.services_eyebrow);
      text(sec.querySelector('h2'), data.services_title);
      text(sec.querySelector('.lead'), data.services_lead);
    }
    services(data);
    const feature = document.querySelector('[data-cms-development]');
    if(feature){
      text(feature.querySelector('.eyebrow'), data.development_eyebrow);
      text(feature.querySelector('h2'), data.development_title);
      text(feature.querySelector('.lead'), data.development_lead);
      const list = feature.querySelector('.list');
      if(list && Array.isArray(data.steps)){
        list.innerHTML = data.steps.map(s => `<div><b>${esc(s.number)}</b> ${esc(s.text)}</div>`).join('');
      }
      text(feature.querySelector('.featurebox .eyebrow'), data.focus_eyebrow);
      text(feature.querySelector('.featurebox h3'), data.focus_title);
      text(feature.querySelector('.featurebox p'), data.focus_text);
    }
    const projSec = document.querySelector('[data-cms-projects]');
    if(projSec){
      text(projSec.querySelector('.eyebrow'), data.projects_eyebrow);
      text(projSec.querySelector('h2'), data.projects_title);
      text(projSec.querySelector('.lead'), data.projects_lead);
      loadProjects(projSec.querySelector('.projects'));
    }
    const contact = document.querySelector('[data-cms-contact]');
    if(contact){
      text(contact.querySelector('.eyebrow'), data.contact_eyebrow);
      text(contact.querySelector('h2'), data.contact_title);
      text(contact.querySelector('.lead'), data.contact_text);
    }
    footer(data);
  }

  function standard(data){
    hero(data);
    services(data);
    const dev = document.querySelector('[data-cms-development]');
    if(dev){
      text(dev.querySelector('.eyebrow'), data.development_eyebrow);
      text(dev.querySelector('h2'), data.development_title);
      text(dev.querySelector('.lead'), data.development_lead);
      text(dev.querySelector('.featurebox h3'), data.focus_title);
      const list = dev.querySelector('.list');
      if(list && Array.isArray(data.focus_items)){
        list.innerHTML = data.focus_items.map(x => `<div>${esc(typeof x === 'string' ? x : (x.item || ''))}</div>`).join('');
      }
    }
    footer(data);
  }

  function footer(data){
    const f = document.querySelector('footer');
    if(!f) return;
    const divs = f.querySelectorAll('.footer-flex > div');
    if(divs[0] && data.footer_company) text(divs[0], data.footer_company);
    if(divs[1] && data.footer_cvr) text(divs[1], data.footer_cvr);
  }

  async function loadProjects(target){
    if(!target) return;
    try{
      const data = await get('content/projects.json');
      const list = Array.isArray(data.projects) ? data.projects : [];
      target.innerHTML = list.map(p => `
        <article class="project">
          ${p.image ? `<img class="project-img" loading="lazy" src="${esc(p.image)}" alt="${esc(p.alt || p.title)}">` : ''}
          <div class="project-body">
            <div class="tag">${esc(p.tag || '')}</div>
            <h3>${esc(p.title || '')}</h3>
            <p>${esc(p.description || '')}</p>
          </div>
        </article>`).join('');
    }catch(e){ console.warn('CMS projects could not be loaded', e); }
  }

  get('content/' + page + '.json').then(data => {
    if(page === 'index') home(data);
    else standard(data);
  }).catch(e => console.warn('CMS content could not be loaded', e));
})();
