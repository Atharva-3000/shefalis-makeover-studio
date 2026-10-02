// Shefali's Makeover Studio — Interactive Scripts
const STUDIO_PHONE_FORMATTED = '+91 91795 45146';
const STUDIO_PHONE_DIGITS = '919179545146';

// Footer copyright year
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Smooth scrolling for internal anchor links (#experience, #services, etc.)
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (!href || href === '#' || href.startsWith('#!')) return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Toast notification helper
let toastTimeout;
function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

// Clipboard copy helper
function copyStudioPhone() {
  const textToCopy = STUDIO_PHONE_FORMATTED;
  showToast('✓ Copied ' + STUDIO_PHONE_FORMATTED + ' to clipboard!');
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(textToCopy).catch(() => {});
  } else {
    try {
      const textArea = document.createElement('textarea');
      textArea.value = textToCopy;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    } catch (_) {}
  }
}

// Contact modal controls
function openContactModal() {
  const modal = document.getElementById('contact-modal');
  if (modal) {
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
}

function closeContactModal() {
  const modal = document.getElementById('contact-modal');
  if (modal) {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
}

// Close modal handlers
const modalBackdrop = document.getElementById('modal-backdrop');
const modalClose = document.getElementById('modal-close');
if (modalBackdrop) modalBackdrop.addEventListener('click', closeContactModal);
if (modalClose) modalClose.addEventListener('click', closeContactModal);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeContactModal();
});

// Modal copy button
const modalCopyBtn = document.getElementById('modal-copy-btn');
const copyBtnText = document.getElementById('copy-btn-text');
if (modalCopyBtn) {
  modalCopyBtn.addEventListener('click', () => {
    copyStudioPhone();
    if (copyBtnText) {
      const orig = copyBtnText.textContent;
      copyBtnText.textContent = '✓ Copied!';
      setTimeout(() => { copyBtnText.textContent = orig; }, 2000);
    }
  });
}

// Smart Call handler:
// Instead of letting tel: links fail silently on desktop browsers without FaceTime/dialers,
// we automatically copy the phone number, show a toast, and present the contact options!
document.querySelectorAll('a[href^="tel:"]').forEach(callLink => {
  if (callLink.id === 'modal-call-btn') return;

  callLink.addEventListener('click', (e) => {
    // Check if on touch/phone screen with native cellular dialer
    const isPhone = /iPhone|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (!isPhone) {
      e.preventDefault();
      copyStudioPhone();
      openContactModal();
    } else {
      // On mobile phones, let the native dialer open
      showToast('Calling ' + STUDIO_PHONE_FORMATTED + '...');
    }
  });
});

// WhatsApp link click feedback
document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp.com"]').forEach(waLink => {
  waLink.addEventListener('click', () => {
    showToast('Opening WhatsApp...');
  });
});
