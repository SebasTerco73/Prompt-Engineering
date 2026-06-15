(function () {
  'use strict';

  /* ===== DOM REFERENCES ===== */
  const header = document.getElementById('header');
  const hamburger = document.getElementById('hamburgerBtn');
  const mainNav = document.getElementById('mainNav');
  const navOverlay = document.getElementById('navOverlay');
  const modal = document.getElementById('successModal');
  const modalOverlay = document.getElementById('modalOverlay');
  const modalClose = document.getElementById('modalCloseBtn');
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('formSubmitBtn');

  const fields = {
    name: {
      el: document.getElementById('formName'),
      error: document.getElementById('nameError'),
      validate: function (v) {
        return v.trim().length >= 2 ? '' : 'Ingresá tu nombre (mín. 2 caracteres).';
      },
    },
    phone: {
      el: document.getElementById('formPhone'),
      error: document.getElementById('phoneError'),
      validate: function (v) {
        return /^[\d\s\-+()]{7,20}$/.test(v.trim()) ? '' : 'Ingresá un teléfono válido.';
      },
    },
    email: {
      el: document.getElementById('formEmail'),
      error: document.getElementById('emailError'),
      validate: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? '' : 'Ingresá un correo electrónico válido.';
      },
    },
    message: {
      el: document.getElementById('formMessage'),
      error: document.getElementById('messageError'),
      validate: function (v) {
        return v.trim().length >= 10 ? '' : 'El mensaje debe tener al menos 10 caracteres.';
      },
    },
  };

  /* ===== HEADER SCROLL EFFECT ===== */
  function handleScroll() {
    header.classList.toggle('scrolled', window.scrollY > 50);
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  /* ===== HAMBURGER MENU ===== */
  function openMenu() {
    hamburger.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    mainNav.classList.add('open');
    navOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    mainNav.classList.remove('open');
    navOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', function () {
    if (mainNav.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  navOverlay.addEventListener('click', closeMenu);

  document.querySelectorAll('.header__nav-link').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mainNav.classList.contains('open')) {
      closeMenu();
    }
  });

  /* ===== INTERSECTION OBSERVER (FADE-IN) ===== */
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px',
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in-up').forEach(function (el) {
    observer.observe(el);
  });

  /* ===== FORM VALIDATION ===== */
  function validateField(key) {
    var field = fields[key];
    var value = field.el.value;
    var errorMsg = field.validate(value);

    field.error.textContent = errorMsg;
    field.el.classList.remove('error', 'success');

    if (errorMsg) {
      field.el.classList.add('error');
      return false;
    }
    if (value.trim()) {
      field.el.classList.add('success');
    }
    return true;
  }

  Object.keys(fields).forEach(function (key) {
    fields[key].el.addEventListener('input', function () {
      validateField(key);
    });

    fields[key].el.addEventListener('blur', function () {
      validateField(key);
    });
  });

  function isFormValid() {
    var valid = true;
    Object.keys(fields).forEach(function (key) {
      if (!validateField(key)) {
        valid = false;
      }
    });
    return valid;
  }

  /* ===== MODAL ===== */
  function openModal() {
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    modalClose.focus();
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    submitBtn.focus();
  }

  modalOverlay.addEventListener('click', closeModal);
  modalClose.addEventListener('click', function () {
    closeModal();
    form.reset();
    Object.keys(fields).forEach(function (key) {
      fields[key].el.classList.remove('error', 'success');
      fields[key].error.textContent = '';
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
      form.reset();
      Object.keys(fields).forEach(function (key) {
        fields[key].el.classList.remove('error', 'success');
        fields[key].error.textContent = '';
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  /* ===== FORM SUBMIT ===== */
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (!isFormValid()) {
      var firstError = document.querySelector('.contact__input.error');
      if (firstError) {
        firstError.focus();
      }
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';

    setTimeout(function () {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Enviar consulta';
      openModal();
    }, 1500);
  });

  /* ===== FOCUS TRAP (modal) ===== */
  modal.addEventListener('keydown', function (e) {
    if (e.key !== 'Tab') return;

    var focusable = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) return;

    var first = focusable[0];
    var last = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });

})();
