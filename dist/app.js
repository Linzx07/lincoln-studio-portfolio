const themeToggle = document.querySelector('#theme-toggle');
const themeMeta = document.querySelector('#theme-color-meta');
function applyThemeCaptures(dark = document.body.dataset.theme === 'dark') {
  document.querySelectorAll('img[data-theme-light][data-theme-dark]').forEach((capture) => {
    capture.src = dark ? capture.dataset.themeDark : capture.dataset.themeLight;
  });
}
function setTheme(theme, persist = true) {
  const dark = theme === 'dark';
  document.body.dataset.theme = dark ? 'dark' : 'light';
  if (themeToggle) {
    themeToggle.setAttribute('aria-pressed', String(dark));
    themeToggle.setAttribute('aria-label', dark ? 'Ativar tema claro' : 'Ativar tema escuro');
    const label = themeToggle.querySelector('.theme-label');
    if (label) label.textContent = dark ? 'Tema claro' : 'Tema escuro';
  }
  if (themeMeta) themeMeta.content = dark ? '#171327' : '#f3f0ff';
  applyThemeCaptures(dark);
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
    contribution: 'Durante meu vínculo CLT, planejei, implementei e publiquei o site institucional; hoje também participo da sua manutenção. As credenciais e a gestão de produção pertencem à Cassola.',
    description: 'A página inicial apresenta as soluções de logística reversa e reciclagem da Cassola, com caminhos para rastreabilidade, descarte eletrônico, conformidade e educação ambiental. O SRA e a área de projetos e parcerias aparecem como partes próprias do site.',
    technologies: ['TypeScript', 'Lovable'], link: 'https://cassolaambiental.com/',
    images: [
      ['assets/gallery/cassola/entry-light.webp', 'Primeira tela da página inicial do site da Cassola Ambiental', 'assets/gallery/cassola/entry-dark.webp']
    ]
  },
  aurum: {
    accent: '#a66c18', gradient: 'linear-gradient(105deg, #a66c18, #eed078)',
    category: 'Experiência profissional como CLT', status: 'Site institucional', title: 'Aurum Tech',
    summary: 'Site institucional criado dentro da empresa durante minha atuação como CLT.',
    contribution: 'Criei o site institucional durante meu vínculo CLT. As credenciais e a gestão do site ficam com a própria empresa.',
    description: 'A página inicial apresenta a atuação da Aurumtech em mineração urbana e materiais estratégicos, com acesso às áreas de soluções, tecnologia, educação e conformidade.',
    technologies: [], link: 'https://aurumtech.eco.br/',
    images: [
      ['assets/gallery/aurum/entry-light.webp', 'Primeira tela da página inicial do site da Aurumtech', 'assets/gallery/aurum/entry-dark.webp']
    ]
  },
  hype: {
    accent: '#7540bf', gradient: 'linear-gradient(105deg, #7540bf, #e46aaa)',
    category: 'Projeto autônomo', status: 'Fórum e comunidade', title: 'Hype Universo RP + Fórum',
    summary: 'Experiência web e UCP para a comunidade do Hype Universo RP.',
    contribution: 'Projeto autônomo. Desenvolvi a experiência web da comunidade e o fórum.',
    description: 'A página de entrada conecta a comunidade ao UCP, fórum, mapa e loja; o fórum organiza conversas em áreas próprias. O painel mostrado na galeria contém apenas dados demonstrativos fictícios. As tecnologias verificadas no projeto são Next.js, React, TypeScript e MySQL.',
    technologies: ['Next.js', 'React', 'TypeScript', 'MySQL'],
    link: 'https://hype-universo-rp.lincolnbcfreitas.workers.dev/',
    note: 'A tela do UCP foi preenchida com dados demonstrativos fictícios. Nenhuma conta ou informação real de jogador é exibida.',
    images: [
      ['assets/gallery/hype/entry-light.webp', 'Primeira tela do site Hype Universo RP ao entrar, com acesso ao UCP e ao fórum', 'assets/gallery/hype/entry-dark.webp'],
      ['assets/gallery/hype/ucp-preview.png', 'UCP do Hype Universo RP · painel com dados demonstrativos fictícios']
    ]
  },
  ebha: {
    accent: '#287cae', gradient: 'linear-gradient(105deg, #287cae, #5bd0c6)',
    category: 'Projeto autônomo', status: 'Loja em desenvolvimento', title: 'EBHA Store',
    summary: 'E-commerce para produtos de papelaria, brinquedos educativos e impressão 3D.',
    contribution: 'Desenvolvi a loja do zero, com catálogo e arquitetura preparada para organizar mais de uma loja.',
    description: 'Desenvolvi o front-end da loja com React, TypeScript, Vite e Tailwind CSS. A estrutura organiza a experiência de catálogo; os produtos e benefícios exibidos são demonstrativos. A integração com UpSeller aguarda a definição do cliente sobre a forma de conexão.',
    technologies: ['React', 'TypeScript', 'Vite', 'Tailwind CSS'],
    link: 'https://ebha.lincolnbcfreitas.workers.dev/',
    note: 'A imagem mostra a interface do projeto, não uma loja em produção. Os produtos e benefícios exibidos são demonstrativos.' ,
    images: [
      ['assets/covers/ebha-store-preview.jpg', 'Prévia da homepage em ambiente de desenvolvimento, com dados demonstrativos']
    ]
  },
  register: {
    accent: '#247a66', gradient: 'linear-gradient(105deg, #247a66, #9dc94f)',
    category: 'Projeto futuro', status: 'Ainda não iniciado', title: 'Registradora de Caixa e Administração',
    summary: 'Projeto autoral que começarei em breve.',
    contribution: 'A implementação ainda não começou. Minha participação será definida conforme o escopo ganhar forma.',
    description: 'O projeto terá foco em registradora de caixa e administração. As funcionalidades e as decisões técnicas serão definidas durante o desenvolvimento.',
    technologies: [],
    note: 'Esta é uma prévia conceitual. O trabalho ainda não foi iniciado.'
  },
  printx: {
    accent: '#355caa', gradient: 'linear-gradient(105deg, #355caa, #77a9ed)',
    category: 'Aplicativo Android', status: 'Versão 1.0.0 disponível', title: 'PrintX',
    summary: 'Aplicativo para calcular custo e lucro por impressão 3D.',
    contribution: 'Projeto autoral: identidade visual, interface e desenvolvimento do produto.',
    description: 'O aplicativo reúne material, energia, tempo de máquina e manutenção para estimar custo e lucro por peça. A interface foi construída com React e Vite e empacotada para Android com Capacitor; os dados ficam salvos no próprio dispositivo.',
    technologies: ['React', 'Vite', 'Capacitor', 'Android'],
    note: 'O Android pode solicitar permissão para instalar apps desta origem e exibir um aviso de desenvolvedor não verificado. O APK é assinado, não solicita acesso à internet e tem um SHA-256 público para conferência.',
    download: '/downloads/PrintX-1.0.0.apk',
    checksum: '/downloads/PrintX-1.0.0.sha256',
    images: [['assets/gallery/printx/printx-mobile.png', 'PrintX em execução no layout móvel do aplicativo, com dados demonstrativos']]
  }
};

const dialog = document.querySelector('.project-dialog');
let lockedPageScrollY = null;
function lockPageScroll() {
  if (lockedPageScrollY !== null) return;
  lockedPageScrollY = window.scrollY;
  document.body.style.top = `-${lockedPageScrollY}px`;
  document.body.classList.add('project-modal-open');
}
function unlockPageScroll() {
  if (lockedPageScrollY === null) return;
  const previousScrollY = lockedPageScrollY;
  lockedPageScrollY = null;
  document.body.classList.remove('project-modal-open');
  document.body.style.top = '';
  const previousBehavior = document.documentElement.style.scrollBehavior;
  document.documentElement.style.scrollBehavior = 'auto';
  window.scrollTo(0, previousScrollY);
  document.documentElement.style.scrollBehavior = previousBehavior;
}
const closeDialog = dialog?.querySelector('.detail-close');
const image = document.querySelector('#detail-image');
const caption = document.querySelector('#detail-caption');
const thumbs = document.querySelector('#detail-thumbnails');
let lastTrigger;
function renderImage(src, label, selected, darkSrc) {
  dialog.dataset.imageKind = src.includes('ucp-preview.png') ? 'ucp' : 'site';
  image.src = src;
  if (darkSrc) {
    image.dataset.themeLight = src;
    image.dataset.themeDark = darkSrc;
  } else {
    delete image.dataset.themeLight;
    delete image.dataset.themeDark;
  }
  image.alt = label;
  image.hidden = false;
  caption.textContent = label;
  applyThemeCaptures();
  thumbs.querySelectorAll('button').forEach((button) => button.setAttribute('aria-pressed', String(button === selected)));
}
function openProject(key, trigger) {
  const project = projectDetails[key];
  if (!project || !dialog) return;
  lastTrigger = trigger;
  dialog.dataset.project = key;
  dialog.style.setProperty('--project-accent', project.accent || '#17396f');
  dialog.style.setProperty('--project-gradient', project.gradient || 'linear-gradient(105deg, #17396f, #6ca2e8)');
  document.querySelector('#detail-category').textContent = project.category;
  document.querySelector('#detail-status').textContent = project.status;
  document.querySelector('#detail-title').textContent = project.title;
  document.querySelector('#detail-summary').textContent = project.summary;
  document.querySelector('#detail-contribution').textContent = project.contribution;
  document.querySelector('#detail-description').textContent = project.description;
  const list = document.querySelector('#detail-technologies');
  const stack = document.querySelector('.detail-stack');
  stack.hidden = !project.technologies?.length;
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
    project.images.forEach(([src, label, darkSrc], index) => {
      const button = document.createElement('button');
      button.type = 'button'; button.className = 'detail-thumb';
      button.setAttribute('aria-label', `Mostrar imagem ${index + 1}: ${label}`);
      button.setAttribute('aria-pressed', 'false');
      const thumbnail = document.createElement('img'); thumbnail.src = src; thumbnail.alt = ''; thumbnail.loading = 'lazy';
      if (darkSrc) { thumbnail.dataset.themeLight = src; thumbnail.dataset.themeDark = darkSrc; }
      button.append(thumbnail);
      button.addEventListener('click', () => renderImage(src, label, button, darkSrc));
      thumbs.append(button);
    });
    renderImage(project.images[0][0], project.images[0][1], thumbs.firstElementChild, project.images[0][2]);
  } else {
    image.hidden = true;
    image.removeAttribute('src');
    caption.textContent = 'Prévia ilustrativa do projeto';
    const panel = document.createElement('div'); panel.className = 'detail-placeholder';
    panel.textContent = project.title;
    thumbs.append(panel);
  }
  dialog.showModal();
  lockPageScroll();
  closeDialog.focus();
}
document.querySelectorAll('[data-project-open]').forEach((button) => button.addEventListener('click', () => openProject(button.dataset.projectOpen, button)));
closeDialog?.addEventListener('click', () => dialog.close());
dialog?.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
dialog?.addEventListener('close', () => {
  unlockPageScroll();
  lastTrigger?.focus();
});
