const patchbay = document.querySelector('.patchbay');
const routeStatus = document.querySelector('#route-status');
const routes = [...document.querySelectorAll('[data-route]')];
function activateRoute(route) {
  if (!patchbay) return;
  patchbay.dataset.active = route.dataset.route;
  routes.forEach((item) => item.setAttribute('aria-current', item === route ? 'true' : 'false'));
  if (routeStatus) routeStatus.textContent = `${route.querySelector('b').textContent}: ${route.querySelector('span').textContent}`;
}
routes.forEach((route) => {
  route.addEventListener('mouseenter', () => activateRoute(route));
  route.addEventListener('focus', () => activateRoute(route));
  route.addEventListener('click', () => activateRoute(route));
});
if (routes[0]) activateRoute(routes[0]);
if ('IntersectionObserver' in window) {
  const sections = [...document.querySelectorAll('[data-project]')];
  const observer = new IntersectionObserver((entries) => {
    const visible = entries.find((entry) => entry.isIntersecting);
    if (!visible) return;
    const route = routes.find((item) => item.dataset.route === visible.target.dataset.project);
    if (route) activateRoute(route);
  }, { rootMargin: '-35% 0px -50%' });
  sections.forEach((section) => observer.observe(section));
}

const projectDetails = {
  cassola: {
    category: 'Experiência CLT', status: 'Site institucional', title: 'Cassola Ambiental',
    summary: 'Site institucional para uma empresa de logística reversa e reciclagem.',
    contribution: 'Criei o site enquanto trabalhava na empresa como CLT. As credenciais de acesso pertencem à empresa.',
    description: 'A apresentação organiza serviços, rastreabilidade ambiental e iniciativas de educação e impacto. As imagens mostram partes do site público.',
    technologies: ['Tecnologias não informadas'], link: 'https://cassolaambiental.com/',
    images: [
      ['assets/gallery/cassola/hero-mural.webp', 'Apresentação de iniciativas ambientais'],
      ['assets/gallery/cassola/hero-desmonte.webp', 'Conteúdo sobre serviços ambientais'],
      ['assets/gallery/cassola/ecobot-mascot.webp', 'Mascote Ecobot usado no site']
    ]
  },
  aurum: {
    category: 'Experiência CLT', status: 'Site institucional', title: 'Aurum Tech',
    summary: 'Site institucional criado dentro da empresa durante minha atuação como CLT.',
    contribution: 'Desenvolvi o site da empresa. As credenciais de acesso são mantidas pela própria empresa.',
    description: 'A página apresenta a atuação da Aurum Tech em materiais críticos e mineração urbana. As imagens mostram elementos publicados no site.',
    technologies: ['Tecnologias não informadas'], link: 'https://aurumtech.eco.br/',
    images: [
      ['assets/gallery/aurum/hero-fachada.webp', 'Imagem de apresentação do site'],
      ['assets/gallery/aurum/reactors-array.webp', 'Imagem de equipamentos e processo'],
      ['assets/gallery/aurum/mineral-site.webp', 'Imagem relacionada à operação mineral']
    ]
  },
  hype: {
    category: 'Projeto autônomo', status: 'Servidor e fórum', title: 'Hype Universo RP + Fórum',
    summary: 'Ecossistema de roleplay com servidor SA:MP, fórum e loja para a comunidade.',
    contribution: 'Projeto autônomo que reúne o universo do servidor e a plataforma web da comunidade.',
    description: 'O fórum foi estruturado em Next.js com áreas de discussão, tópicos, respostas e recursos de comunidade. O projeto prevê integração de dados com MySQL. A galeria inclui identidade visual e mapa do universo.',
    technologies: ['Next.js', 'React', 'TypeScript', 'MySQL'],
    images: [
      ['assets/gallery/hype/hype-banner.webp', 'Banner do Hype Universo RP'],
      ['assets/gallery/hype/hype-logo.webp', 'Símbolo do Hype Universo RP'],
      ['assets/gallery/hype/hype-wordmark.png', 'Identidade visual do servidor'],
      ['assets/gallery/hype/san-andreas-map.svg', 'Mapa do universo de roleplay']
    ]
  },
  ebha: {
    category: 'Projeto autônomo', status: 'E-commerce em desenvolvimento', title: 'EBHA Store',
    summary: 'Loja online para produtos de papelaria, brinquedos educativos e impressão 3D.',
    contribution: 'Desenvolvi a loja do zero, com catálogo e arquitetura preparada para organizar mais de uma operação de venda.',
    description: 'A aplicação usa dados de demonstração para o catálogo. A integração real com a API do UpSeller ainda aguarda a definição do cliente sobre como deseja conectar a operação.',
    technologies: ['React', 'TypeScript', 'Vite', 'Tailwind CSS'],
    note: 'As imagens reais dos produtos ainda não foram fornecidas. A ilustração do projeto é um esquema visual, não uma fotografia de produto.'
  },
  register: {
    category: 'Projeto autônomo', status: 'Em definição', title: 'Registradora para MEIs',
    summary: 'Conceito de sistema de caixa local para cadastro de produtos e cálculo de vendas.',
    contribution: 'Projeto autônomo em definição. O escopo conhecido prevê uma operação simples para pequenos negócios.',
    description: 'A proposta prevê registrar produtos, adicionar itens à venda e atualizar o total automaticamente. O armazenamento local com SQLite faz parte do escopo previsto.',
    technologies: ['Python', 'SQLite'],
    note: 'A imagem é um esquema conceitual, pois as telas finais ainda não foram fornecidas.'
  },
  finance: {
    category: 'Projeto autônomo', status: 'Em desenvolvimento', title: 'Aplicativo financeiro para Android',
    summary: 'Conceito de aplicativo para reunir receitas, transferências e dívidas em uma visão financeira.',
    contribution: 'Projeto autônomo em desenvolvimento. Nome, implementação e integração bancária ainda estão sendo definidos.',
    description: 'A proposta é facilitar a leitura das movimentações financeiras em um só lugar. A conexão bancária ainda é uma ideia do projeto, sem integração confirmada.',
    technologies: ['Tecnologias ainda não definidas'],
    note: 'A imagem é um esquema conceitual, pois as telas finais ainda não foram fornecidas.'
  }
};

const dialog = document.querySelector('.project-dialog');
const closeDialog = dialog?.querySelector('.detail-close');
const image = document.querySelector('#detail-image');
const caption = document.querySelector('#detail-caption');
const thumbs = document.querySelector('#detail-thumbnails');
let lastTrigger;
function renderImage(src, label, selected) {
  image.src = src;
  image.alt = label;
  image.hidden = false;
  caption.textContent = label;
  thumbs.querySelectorAll('button').forEach((button) => {
    const active = button === selected;
    button.setAttribute('aria-pressed', String(active));
  });
}
function openProject(key, trigger) {
  const project = projectDetails[key];
  if (!project || !dialog) return;
  lastTrigger = trigger;
  document.querySelector('#detail-category').textContent = project.category;
  document.querySelector('#detail-status').textContent = project.status;
  document.querySelector('#detail-title').textContent = project.title;
  document.querySelector('#detail-summary').textContent = project.summary;
  document.querySelector('#detail-contribution').textContent = project.contribution;
  document.querySelector('#detail-description').textContent = project.description;
  const list = document.querySelector('#detail-technologies');
  list.replaceChildren(...project.technologies.map((technology) => {
    const item = document.createElement('li'); item.textContent = technology; return item;
  }));
  const note = document.querySelector('#detail-note');
  note.textContent = project.note || '';
  note.hidden = !project.note;
  const link = document.querySelector('#detail-link');
  link.hidden = !project.link;
  if (project.link) link.href = project.link;
  thumbs.replaceChildren();
  if (project.images?.length) {
    project.images.forEach(([src, label], index) => {
      const button = document.createElement('button');
      button.type = 'button'; button.className = 'detail-thumb';
      button.setAttribute('aria-label', `Mostrar imagem ${index + 1}: ${label}`);
      button.setAttribute('aria-pressed', 'false');
      const thumbnail = document.createElement('img'); thumbnail.src = src; thumbnail.alt = ''; thumbnail.loading = 'lazy';
      button.append(thumbnail);
      button.addEventListener('click', () => renderImage(src, label, button));
      thumbs.append(button);
    });
    renderImage(...project.images[0], thumbs.firstElementChild);
  } else {
    image.hidden = true;
    image.removeAttribute('src');
    caption.textContent = 'Prévia ilustrativa do projeto';
    const panel = document.createElement('div'); panel.className = 'detail-placeholder';
    panel.textContent = project.title;
    thumbs.append(panel);
  }
  dialog.showModal();
  closeDialog.focus();
}
document.querySelectorAll('[data-project-open]').forEach((button) => {
  button.addEventListener('click', () => openProject(button.dataset.projectOpen, button));
});
closeDialog?.addEventListener('click', () => dialog.close());
dialog?.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
dialog?.addEventListener('close', () => lastTrigger?.focus());
