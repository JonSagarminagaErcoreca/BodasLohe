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

const calendarTriggers = document.querySelectorAll('[data-modal-trigger="calendar"]');
const calendarModal = document.querySelector('[data-modal="calendar"]');

if (calendarTriggers.length && calendarModal) {
  const closeButtons = calendarModal.querySelectorAll('[data-modal-close]');
  const focusTarget =
    calendarModal.querySelector('[data-modal-focus]') || calendarModal.querySelector('.modal-dialog');
  let lastTrigger = null;

  const openModal = (trigger) => {
    calendarModal.classList.add('is-open');
    calendarModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    lastTrigger = trigger || null;
    if (focusTarget) {
      focusTarget.focus();
    }
  };

  const closeModal = () => {
    calendarModal.classList.remove('is-open');
    calendarModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastTrigger) {
      lastTrigger.focus();
    }
  };

  calendarTriggers.forEach((trigger) => {
    trigger.addEventListener('click', (event) => {
      event.preventDefault();
      openModal(trigger);
    });
  });

  closeButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      closeModal();
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && calendarModal.classList.contains('is-open')) {
      closeModal();
    }
  });
}
