// Progressive enhancement for the portfolio page. Every effect is optional:
// without JS the page renders fully (reveal styles are scoped to `.js`).

const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = matchMedia('(pointer: fine)').matches;

/* ---------- Scroll reveal (with sibling stagger) ---------- */
document.querySelectorAll<HTMLElement>('[data-stagger]').forEach((group) => {
  const step = Number(group.dataset.stagger) || 90;
  group.querySelectorAll<HTMLElement>(':scope > [data-reveal]').forEach((el, i) => {
    el.style.setProperty('--d', `${i * step}ms`);
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('is-in');
      revealObserver.unobserve(entry.target);
    }
  },
  { rootMargin: '0px 0px -12% 0px' },
);
document.querySelectorAll('[data-reveal], [data-inview]').forEach((el) => revealObserver.observe(el));

/* ---------- Count-up stats ---------- */
const countObserver = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      countObserver.unobserve(entry.target);
      const el = entry.target as HTMLElement;
      const target = Number(el.dataset.count);
      if (reduceMotion) continue;
      const duration = 1600;
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 4);
        el.textContent = Math.round(target * eased).toLocaleString('en-IN');
        if (t < 1) requestAnimationFrame(tick);
      };
      el.textContent = '0';
      requestAnimationFrame(tick);
    }
  },
  { threshold: 0.6 },
);
document.querySelectorAll('[data-count]').forEach((el) => countObserver.observe(el));

/* ---------- Header: progress bar, scrolled state, timeline fill ---------- */
const header = document.querySelector<HTMLElement>('.site-header');
const progress = document.querySelector<HTMLElement>('.scroll-progress');
const timeline = document.querySelector<HTMLElement>('[data-timeline]');

let ticking = false;
const onScroll = () => {
  ticking = false;
  const max = document.documentElement.scrollHeight - innerHeight;
  progress?.style.setProperty('--progress', String(max > 0 ? scrollY / max : 0));
  header?.toggleAttribute('data-scrolled', scrollY > 24);
  if (timeline) {
    const rect = timeline.getBoundingClientRect();
    const p = (innerHeight * 0.6 - rect.top) / rect.height;
    timeline.style.setProperty('--p', String(Math.min(Math.max(p, 0), 1)));
  }
};
addEventListener(
  'scroll',
  () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(onScroll);
    }
  },
  { passive: true },
);
onScroll();

/* ---------- Active nav link ---------- */
const navLinks = [...document.querySelectorAll<HTMLAnchorElement>('[data-nav] a[href^="#"]')];
const sectionObserver = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const id = `#${entry.target.id}`;
      navLinks.forEach((a) => a.setAttribute('aria-current', String(a.hash === id)));
    }
  },
  { rootMargin: '-45% 0px -50% 0px' },
);
new Set(navLinks.map((a) => a.hash)).forEach((hash) => {
  const section = document.querySelector(hash);
  if (section) sectionObserver.observe(section);
});

/* ---------- Mobile menu ---------- */
const menuButton = document.querySelector<HTMLButtonElement>('[data-menu-button]');
const menu = document.querySelector<HTMLElement>('[data-menu]');
const setMenu = (open: boolean) => {
  menu?.toggleAttribute('data-open', open);
  menuButton?.setAttribute('aria-expanded', String(open));
};
menuButton?.addEventListener('click', () => setMenu(!menu?.hasAttribute('data-open')));
menu?.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
addEventListener('keydown', (e) => e.key === 'Escape' && setMenu(false));

/* ---------- FAQ accordion height animation ---------- */
document.querySelectorAll<HTMLDetailsElement>('details.faq').forEach((details) => {
  const summary = details.querySelector('summary')!;
  const body = details.querySelector<HTMLElement>('.faq-body')!;
  let animation: Animation | undefined;
  summary.addEventListener('click', (e) => {
    if (reduceMotion) return;
    e.preventDefault();
    animation?.cancel();
    const opening = !details.open;
    if (opening) details.open = true;
    const full = `${body.scrollHeight}px`;
    animation = body.animate(
      { height: opening ? ['0px', full] : [full, '0px'], opacity: opening ? [0, 1] : [1, 0] },
      { duration: 450, easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)' },
    );
    animation.onfinish = () => {
      if (!opening) details.open = false;
      animation = undefined;
    };
  });
});

/* ---------- Pointer effects (desktop only) ---------- */
if (finePointer && !reduceMotion) {
  // Portrait tilts toward the cursor.
  document.querySelectorAll<HTMLElement>('[data-tilt]').forEach((el) => {
    const area = el.closest('section') ?? el;
    area.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const x = ((e as PointerEvent).clientX - (r.left + r.width / 2)) / innerWidth;
      const y = ((e as PointerEvent).clientY - (r.top + r.height / 2)) / innerHeight;
      el.style.setProperty('--rx', `${x * 18}deg`);
      el.style.setProperty('--ry', `${-y * 18}deg`);
    });
    area.addEventListener('pointerleave', () => {
      el.style.setProperty('--rx', '0deg');
      el.style.setProperty('--ry', '0deg');
    });
  });

  // Cards light up under the cursor.
  document.querySelectorAll<HTMLElement>('.spotlight').forEach((el) => {
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--x', `${e.clientX - r.left}px`);
      el.style.setProperty('--y', `${e.clientY - r.top}px`);
    });
  });

  // Buttons lean toward the cursor.
  document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${(e.clientX - r.left - r.width / 2) * 0.25}px`);
      el.style.setProperty('--my', `${(e.clientY - r.top - r.height / 2) * 0.35}px`);
    });
    el.addEventListener('pointerleave', () => {
      el.style.setProperty('--mx', '0px');
      el.style.setProperty('--my', '0px');
    });
  });
}
