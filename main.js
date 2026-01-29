const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealItems = document.querySelectorAll('[data-reveal]');

if (prefersReduced) {
  revealItems.forEach((item) => item.classList.add('is-visible'));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  revealItems.forEach((item) => observer.observe(item));
}

const modalTriggers = document.querySelectorAll('[data-modal-trigger]');
const modals = document.querySelectorAll('[data-modal]');
const lastTriggerMap = new WeakMap();

const toggleBodyLock = () => {
  const hasOpenModal = document.querySelector('.modal.is-open');
  document.body.style.overflow = hasOpenModal ? 'hidden' : '';
};

const openModal = (modal, trigger) => {
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  lastTriggerMap.set(modal, trigger || null);
  toggleBodyLock();

  const focusTarget = modal.querySelector('[data-modal-focus]') || modal.querySelector('.modal-dialog');
  if (focusTarget) {
    focusTarget.focus();
  }
};

const closeModal = (modal) => {
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  toggleBodyLock();

  const lastTrigger = lastTriggerMap.get(modal);
  if (lastTrigger) {
    lastTrigger.focus();
  }
};

modalTriggers.forEach((trigger) => {
  const target = trigger.getAttribute('data-modal-trigger');
  const modal = document.querySelector(`[data-modal="${target}"]`);
  if (!modal) {
    return;
  }

  trigger.addEventListener('click', (event) => {
    event.preventDefault();
    openModal(modal, trigger);
  });
});

modals.forEach((modal) => {
  const closeButtons = modal.querySelectorAll('[data-modal-close]');
  closeButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      closeModal(modal);
    });
  });
});

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') {
    return;
  }

  document.querySelectorAll('.modal.is-open').forEach((modal) => {
    closeModal(modal);
  });
});
