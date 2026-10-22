const patchbay = document.querySelector('.patchbay');
const routeStatus = document.querySelector('#route-status');
const routes = [...document.querySelectorAll('[data-route]')];

function activateRoute(route) {
  if (!patchbay) return;
  patchbay.dataset.active = route.dataset.route;
  routes.forEach((item) => item.setAttribute('aria-current', item === route ? 'true' : 'false'));
  routeStatus.textContent = `${route.querySelector('b').textContent}: ${route.querySelector('span').textContent}`;
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
