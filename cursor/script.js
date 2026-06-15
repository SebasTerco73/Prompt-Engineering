/**
 * Caña Seca y Un Membrillo — Landing Page
 * Script principal envuelto en IIFE
 */
(function () {
  'use strict';

  /* =============================================
     REFERENCIAS DOM
     ============================================= */
  const header = document.getElementById('header');
  const burger = document.getElementById('burger');
  const mobilePanel = document.getElementById('mobile-panel');
  const mobileOverlay = document.getElementById('mobile-overlay');
  const contactForm = document.getElementById('contact-form');
  const formSubmit = document.getElementById('form-submit');
  const successModal = document.getElementById('success-modal');
  const modalOverlay = document.getElementById('modal-overlay');
  const modalAccept = document.getElementById('modal-accept');

  let previousFocus = null;

  const formFields = {
    nombre: {
      input: document.getElementById('nombre'),
      error: document.getElementById('error-nombre'),
      validate: validateNombre
    },
    telefono: {
      input: document.getElementById('telefono'),
      error: document.getElementById('error-telefono'),
      validate: validateTelefono
    },
    correo: {
      input: document.getElementById('correo'),
      error: document.getElementById('error-correo'),
      validate: validateCorreo
    },
    mensaje: {
      input: document.getElementById('mensaje'),
      error: document.getElementById('error-mensaje'),
      validate: validateMensaje
    }
  };

  /* =============================================
     HEADER — SCROLL
     ============================================= */
  function handleHeaderScroll() {
    if (window.scrollY > 50) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  }

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();

  /* =============================================
     MENÚ MOBILE
     ============================================= */
  function openMobileMenu() {
    burger.classList.add('is-active');
    mobilePanel.classList.add('is-active');
    mobileOverlay.classList.add('is-active');
    burger.setAttribute('aria-expanded', 'true');
    burger.setAttribute('aria-label', 'Cerrar menú de navegación');
    mobilePanel.setAttribute('aria-hidden', 'false');
    mobileOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    burger.classList.remove('is-active');
    mobilePanel.classList.remove('is-active');
    mobileOverlay.classList.remove('is-active');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Abrir menú de navegación');
    mobilePanel.setAttribute('aria-hidden', 'true');
    mobileOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function toggleMobileMenu() {
    if (mobilePanel.classList.contains('is-active')) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }

  burger.addEventListener('click', toggleMobileMenu);
  mobileOverlay.addEventListener('click', closeMobileMenu);

  document.querySelectorAll('.mobile-panel__link').forEach(function (link) {
    link.addEventListener('click', closeMobileMenu);
  });

  /* =============================================
     MODAL DE ÉXITO
     ============================================= */

  /** Obtiene elementos enfocables dentro del modal */
  function getModalFocusableElements() {
    return successModal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
  }

  /** Limpia el formulario y sus estados de validación */
  function resetContactForm() {
    contactForm.reset();

    Object.keys(formFields).forEach(function (key) {
      const field = formFields[key];
      field.input.classList.remove('is-invalid', 'is-valid');
      field.error.textContent = '';
    });
  }

  /** Abre el modal de confirmación con focus trap básico */
  function openSuccessModal() {
    previousFocus = document.activeElement;
    successModal.hidden = false;
    successModal.classList.add('is-active');
    document.body.style.overflow = 'hidden';
    modalAccept.focus();
  }

  /** Cierra el modal, limpia el formulario y scrollea al inicio */
  function closeSuccessModal() {
    successModal.classList.remove('is-active');
    successModal.hidden = true;
    document.body.style.overflow = '';

    resetContactForm();
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (previousFocus && typeof previousFocus.focus === 'function') {
      previousFocus.focus();
    }
  }

  /** Mantiene el foco dentro del modal al tabular */
  function trapModalFocus(e) {
    if (e.key !== 'Tab' || !successModal.classList.contains('is-active')) return;

    const focusable = getModalFocusableElements();
    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  modalAccept.addEventListener('click', closeSuccessModal);

  /* =============================================
     TECLADO — ESCAPE GLOBAL
     ============================================= */
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;

    if (successModal.classList.contains('is-active')) {
      closeSuccessModal();
    } else if (mobilePanel.classList.contains('is-active')) {
      closeMobileMenu();
    }
  });

  document.addEventListener('keydown', trapModalFocus);

  /* =============================================
     NAVEGACIÓN SUAVE
     ============================================= */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  /* =============================================
     INTERSECTION OBSERVER — REVEAL
     ============================================= */
  function initRevealAnimations() {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      document.querySelectorAll('.reveal').forEach(function (el) {
        el.classList.add('is-visible');
      });
      return;
    }

    const revealElements = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const parent = entry.target.parentElement;
            const siblings = parent
              ? Array.from(parent.querySelectorAll(':scope > .reveal'))
              : [entry.target];
            const index = siblings.indexOf(entry.target);
            const delay = index >= 0 ? index * 100 : 0;

            entry.target.style.transitionDelay = delay + 'ms';
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    revealElements.forEach(function (el) {
      observer.observe(el);
    });
  }

  initRevealAnimations();

  /* =============================================
     VALIDACIÓN DEL FORMULARIO
     ============================================= */

  /** Valida nombre: mínimo 2 caracteres */
  function validateNombre(value) {
    const trimmed = value.trim();
    if (!trimmed) return 'El nombre es obligatorio.';
    if (trimmed.length < 2) return 'El nombre debe tener al menos 2 caracteres.';
    return '';
  }

  /** Valida teléfono: formato numérico básico */
  function validateTelefono(value) {
    const trimmed = value.trim();
    if (!trimmed) return 'El teléfono es obligatorio.';
    const phoneRegex = /^[\d\s+\-()]{7,20}$/;
    if (!phoneRegex.test(trimmed)) return 'Ingresá un teléfono válido (7 a 20 dígitos).';
    return '';
  }

  /** Valida correo electrónico */
  function validateCorreo(value) {
    const trimmed = value.trim();
    if (!trimmed) return 'El correo electrónico es obligatorio.';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) return 'Ingresá un correo electrónico válido.';
    return '';
  }

  /** Valida mensaje: mínimo 10 caracteres */
  function validateMensaje(value) {
    const trimmed = value.trim();
    if (!trimmed) return 'El mensaje es obligatorio.';
    if (trimmed.length < 10) return 'El mensaje debe tener al menos 10 caracteres.';
    return '';
  }

  /** Actualiza estado visual y mensaje de error de un campo */
  function setFieldState(field, errorMsg) {
    const input = field.input;
    const errorEl = field.error;

    if (errorMsg) {
      input.classList.add('is-invalid');
      input.classList.remove('is-valid');
      errorEl.textContent = errorMsg;
    } else if (input.value.trim()) {
      input.classList.remove('is-invalid');
      input.classList.add('is-valid');
      errorEl.textContent = '';
    } else {
      input.classList.remove('is-invalid', 'is-valid');
      errorEl.textContent = '';
    }
  }

  /** Valida un campo individual en tiempo real */
  function validateField(key) {
    const field = formFields[key];
    const errorMsg = field.validate(field.input.value);
    setFieldState(field, errorMsg);
    return !errorMsg;
  }

  /** Registra listeners de validación en tiempo real */
  Object.keys(formFields).forEach(function (key) {
    const field = formFields[key];
    field.input.addEventListener('input', function () {
      if (field.input.classList.contains('is-invalid') || field.input.value.trim()) {
        validateField(key);
      }
    });
    field.input.addEventListener('blur', function () {
      validateField(key);
    });
  });

  /** Valida todos los campos del formulario */
  function validateForm() {
    let isValid = true;
    Object.keys(formFields).forEach(function (key) {
      if (!validateField(key)) {
        isValid = false;
      }
    });
    return isValid;
  }

  /* =============================================
     ENVÍO DEL FORMULARIO
     ============================================= */
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    if (!validateForm()) {
      const firstInvalid = contactForm.querySelector('.is-invalid');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    formSubmit.disabled = true;
    formSubmit.textContent = 'Enviando...';

    setTimeout(function () {
      formSubmit.disabled = false;
      formSubmit.textContent = 'Enviar consulta';
      openSuccessModal();
    }, 1500);
  });

})();
