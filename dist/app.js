const themeToggle = document.querySelector('#theme-toggle');
const themeMeta = document.querySelector('#theme-color-meta');
function setTheme(theme, persist = true) {
  const dark = theme === 'dark';
  document.body.dataset.theme = dark ? 'dark' : 'light';
  if (themeToggle) {
    themeToggle.setAttribute('aria-pressed', String(dark));
    themeToggle.setAttribute('aria-label', dark ? 'Ativar tema claro' : 'Ativar tema escuro');
    const label = themeToggle.querySelector('.theme-label');
    if (label) label.textContent = dark ? 'Tema claro' : 'Tema escuro';
  }
  if (themeMeta) themeMeta.content = dark ? '#101a29' : '#f2f5f3';
  if (persist) {
    try { localStorage.setItem('portfolio-theme', dark ? 'dark' : 'light'); } catch {}
  }
}
const systemTheme = window.matchMedia?.('(prefers-color-scheme: dark)');
let savedTheme = null;
try {
  const preference = localStorage.getItem('portfolio-theme');
  if (preference === 'light' || preference === 'dark') savedTheme = preference;
} catch {}
let initialTheme = savedTheme || (systemTheme?.matches ? 'dark' : 'light');
setTheme(initialTheme, false);
systemTheme?.addEventListener('change', (event) => {
  if (!savedTheme) setTheme(event.matches ? 'dark' : 'light', false);
});
themeToggle?.addEventListener('click', () => {
  savedTheme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
  setTheme(savedTheme);
});

const projectDetails = {
  cassola: {
    accent: '#357a54', gradient: 'linear-gradient(105deg, #357a54, #98c96a)',
    category: 'Experiência profissional como CLT', status: 'Site institucional', title: 'Cassola Ambiental',
    summary: 'Site institucional para uma empresa de logística reversa e reciclagem.',
    contribution: 'Criei o site enquanto trabalhava na empresa como CLT. As credenciais e a gestão do site pertencem à empresa.',
    description: 'A página organiza as informações sobre logística reversa, rastreabilidade ambiental, educação e projetos. As primeiras imagens mostram a homepage pública e elementos visuais do site.',
    technologies: ['TypeScript', 'Lovable'], link: 'https://cassolaambiental.com/',
    images: [
      ['assets/covers/cassola-homepage.jpg', 'Captura da homepage pública da Cassola Ambiental'],
      ['assets/gallery/cassola/hero-mural.webp', 'Mural da Cassola Ambiental'],
      ['assets/gallery/cassola/hero-desmonte.webp', 'Estação de desmonte de eletrônicos'],
      ['assets/gallery/cassola/ecobot-mascot.webp', 'Mascote Ecobot usado no site']
    ]
  },
  aurum: {
    accent: '#a66c18', gradient: 'linear-gradient(105deg, #a66c18, #eed078)',
    category: 'Experiência profissional como CLT', status: 'Site institucional', title: 'Aurum Tech',
    summary: 'Site institucional criado dentro da empresa durante minha atuação como CLT.',
    contribution: 'Desenvolvi o site da empresa. As credenciais e a gestão do site ficam com a própria empresa.',
    description: 'A página apresenta a atuação da Aurumtech em materiais críticos e mineração urbana. As imagens mostram a homepage pública, a fachada e elementos publicados no site.',
    technologies: ['Tecnologias não informadas'], link: 'https://aurumtech.eco.br/',
    images: [
      ['assets/covers/aurum-homepage.jpg', 'Captura da homepage pública da Aurumtech'],
      ['assets/gallery/aurum/hero-fachada.webp', 'Fachada da Aurumtech'],
      ['assets/gallery/aurum/reactors-array.webp', 'Fileira de reatores da planta'],
      ['assets/gallery/aurum/mineral-site.webp', 'Conteúdo da página sobre materiais estratégicos']
    ]
  },
  hype: {
    accent: '#7540bf', gradient: 'linear-gradient(105deg, #7540bf, #e46aaa)',
    category: 'Projeto autônomo', status: 'Fórum e comunidade', title: 'Hype Universo RP + Fórum',
    summary: 'Experiência web para a comunidade do Hype Universo RP, com fórum, mapa e loja.',
    contribution: 'Projeto autônomo. Desenvolvi o fórum e a experiência web da comunidade.',
    description: 'O fórum foi construído em Next.js com áreas de discussão, tópicos, respostas e recursos de comunidade. A página pública informa que a conexão com o servidor está em preparação. As imagens mostram o fórum e a identidade do projeto, não os sistemas dentro da gamemode.',
    technologies: ['Next.js', 'React', 'TypeScript', 'MySQL'],
    note: 'As capturas da gamemode serão adicionadas manualmente por mim. Esta galeria mostra apenas o fórum, a marca e o mapa.',
    images: [
      ['assets/covers/hype-forum-homepage.jpg', 'Captura da homepage pública do Hype Universo RP e Fórum'],
      ['assets/gallery/hype/hype-banner.webp', 'Banner do Hype Universo RP'],
      ['assets/gallery/hype/hype-logo.webp', 'Símbolo do Hype Universo RP'],
      ['assets/gallery/hype/hype-wordmark.png', 'Identidade visual do servidor'],
      ['assets/gallery/hype/san-andreas-map.svg', 'Mapa do universo de roleplay']
    ]
  },
  ebha: {
    accent: '#287cae', gradient: 'linear-gradient(105deg, #287cae, #5bd0c6)',
    category: 'Projeto autônomo', status: 'Loja em desenvolvimento', title: 'EBHA Store',
    summary: 'E-commerce para produtos de papelaria, brinquedos educativos e impressão 3D.',
    contribution: 'Desenvolvi a loja do zero, com catálogo e arquitetura preparada para organizar mais de uma loja.',
    description: 'A captura mostra uma prévia em ambiente de desenvolvimento. O catálogo e o conteúdo usam dados de demonstração. A integração real com a API do UpSeller aguarda a definição do cliente sobre como deseja conectar a operação.',
    technologies: ['React', 'TypeScript', 'Vite', 'Tailwind CSS'],
    note: 'A imagem mostra a interface do projeto, não uma loja em produção. Os produtos e benefícios exibidos são demonstrativos.' ,
    images: [
      ['assets/covers/ebha-store-preview.jpg', 'Prévia da homepage em ambiente de desenvolvimento, com dados demonstrativos']
    ]
  },
  register: {
    accent: '#247a66', gradient: 'linear-gradient(105deg, #247a66, #9dc94f)',
    category: 'Projeto autônomo', status: 'Conceito em definição', title: 'Registradora para MEIs',
    summary: 'Conceito de caixa local para cadastro de produtos e cálculo de vendas.',
    contribution: 'Projeto autônomo em definição. O escopo conhecido prevê uma operação simples para pequenos negócios.',
    description: 'A proposta é registrar produtos, adicionar itens à venda e atualizar o total automaticamente. O armazenamento local com SQLite faz parte do escopo previsto.',
    technologies: ['Python', 'SQLite'],
    note: 'A prévia visual é um esquema conceitual. As telas finais ainda não foram fornecidas.'
  },
  finance: {
    accent: '#4059c8', gradient: 'linear-gradient(105deg, #4059c8, #4ebdd7)',
    category: 'Projeto autônomo', status: 'Conceito em desenvolvimento', title: 'Aplicativo financeiro para Android',
    summary: 'Conceito para reunir receitas, transferências e dívidas em uma visão financeira.',
    contribution: 'Projeto autônomo em desenvolvimento. Nome, implementação e integração bancária ainda estão sendo definidos.',
    description: 'A proposta é facilitar a leitura das movimentações financeiras em um só lugar. A conexão bancária ainda é uma ideia do projeto, sem integração confirmada.',
    technologies: ['Tecnologias ainda não definidas'],
    note: 'A prévia visual é um esquema conceitual. As telas finais ainda não foram fornecidas.'
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
  thumbs.querySelectorAll('button').forEach((button) => button.setAttribute('aria-pressed', String(button === selected)));
}
function openProject(key, trigger) {
  const project = projectDetails[key];
  if (!project || !dialog) return;
  lastTrigger = trigger;
  dialog.style.setProperty('--project-accent', project.accent || '#17396f');
  dialog.style.setProperty('--project-gradient', project.gradient || 'linear-gradient(105deg, #17396f, #6ca2e8)');
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
document.querySelectorAll('[data-project-open]').forEach((button) => button.addEventListener('click', () => openProject(button.dataset.projectOpen, button)));
closeDialog?.addEventListener('click', () => dialog.close());
dialog?.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
dialog?.addEventListener('close', () => lastTrigger?.focus());
