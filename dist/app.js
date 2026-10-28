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

const siteNav = document.querySelector('.site-header nav');
const menuToggle = document.querySelector('#menu-toggle');
function closeMobileMenu() {
  siteNav?.removeAttribute('data-open');
  menuToggle?.setAttribute('aria-expanded', 'false');
  menuToggle?.setAttribute('aria-label', 'Abrir menu');
}
menuToggle?.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  if (isOpen) siteNav?.removeAttribute('data-open');
  else siteNav?.setAttribute('data-open', 'true');
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Abrir menu' : 'Fechar menu');
});
siteNav?.querySelectorAll('.nav-links a').forEach((link) => link.addEventListener('click', closeMobileMenu));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMobileMenu();
});
document.addEventListener('click', (event) => {
  if (siteNav && !siteNav.contains(event.target)) closeMobileMenu();
});
window.matchMedia('(min-width: 721px)').addEventListener('change', closeMobileMenu);

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
    link: 'https://hype-universo-rp.lincolnbcfreitas.workers.dev/',
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
    description: 'Esta página está publicada como prévia pública, mas o catálogo e os conteúdos ainda usam dados demonstrativos. A integração com UpSeller aguarda a definição do cliente sobre a forma de conexão.',
    technologies: ['React', 'TypeScript', 'Vite', 'Tailwind CSS'],
    link: 'https://ebha.lincolnbcfreitas.workers.dev/',
    note: 'A imagem mostra a interface do projeto, não uma loja em produção. Os produtos e benefícios exibidos são demonstrativos.' ,
    images: [
      ['assets/covers/ebha-store-preview.jpg', 'Prévia da homepage em ambiente de desenvolvimento, com dados demonstrativos']
    ]
  },
  register: {
    accent: '#247a66', gradient: 'linear-gradient(105deg, #247a66, #9dc94f)',
    category: 'Projeto autônomo', status: 'A iniciar em breve', title: 'Registradora de Caixa e Administração',
    summary: 'Projeto autoral que começarei em breve.',
    contribution: 'A implementação ainda não começou. Minha participação será definida conforme o escopo ganhar forma.',
    description: 'O projeto terá foco em registradora de caixa e administração. As funcionalidades e as decisões técnicas serão definidas durante o desenvolvimento.',
    technologies: ['A definir'],
    note: 'Esta é uma prévia conceitual. O trabalho ainda não foi iniciado.'
  },
  printx: {
    accent: '#355caa', gradient: 'linear-gradient(105deg, #355caa, #77a9ed)',
    category: 'Aplicativo Android', status: 'Versão 1.0.0 disponível', title: 'PrintX',
    summary: 'Aplicativo para calcular custo e lucro por impressão 3D.',
    contribution: 'Projeto autoral: identidade visual, interface e desenvolvimento do produto.',
    description: 'O PrintX reúne os custos de filamento, energia, tempo de máquina e manutenção para estimar o custo total e o lucro de cada impressão. Os dados ficam salvos no próprio dispositivo.',
    technologies: ['React', 'Vite', 'Capacitor', 'Android'],
    note: 'O Android pode solicitar permissão para instalar apps desta origem e exibir um aviso de desenvolvedor não verificado. O APK é assinado, não solicita acesso à internet e tem um SHA-256 público para conferência.',
    download: '/downloads/PrintX-1.0.0.apk',
    checksum: '/downloads/PrintX-1.0.0.sha256'
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
  const downloadRow = document.querySelector('#detail-download-row');
  const download = document.querySelector('#detail-download');
  const checksum = document.querySelector('#detail-checksum');
  downloadRow.hidden = !project.download;
  if (project.download) {
    download.href = project.download;
    checksum.href = project.checksum;
  }
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
