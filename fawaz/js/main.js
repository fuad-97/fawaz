/* ===================================================
   العماري لتأجير السيارات - Main JavaScript
   =================================================== */

const WA_NUMBER = '96877074459';
const WA_DEFAULT_MESSAGE = 'مرحبا، أريد الاستفسار عن تأجير سيارة من العماري';

const CAR_IMAGES = {
  'Toyota Yaris': 'https://commons.wikimedia.org/wiki/Special:FilePath/2020%20Toyota%20Yaris%20LE%20Hatchback.jpg?width=900',
  'Toyota Corolla': 'https://commons.wikimedia.org/wiki/Special:FilePath/Toyota%20Corolla%20Limousine%20Hybrid%20Genf%202019%201Y7A5576.jpg?width=900',
  'Nissan Sunny': 'https://commons.wikimedia.org/wiki/Special:FilePath/Nissan%20Sunny%20XL%20sedan,%20front%20view.jpg?width=900',
  'Hyundai Accent': 'https://commons.wikimedia.org/wiki/Special:FilePath/2018%20Hyundai%20Accent%20(United%20States).jpg?width=900',
  'Kia Sportage': 'https://commons.wikimedia.org/wiki/Special:FilePath/2009%20Kia%20Sportage%20LX.jpg?width=900',
  'Mitsubishi Pajero': 'https://commons.wikimedia.org/wiki/Special:FilePath/Pajero%20front.jpg?width=900',
  'Toyota Land Cruiser': 'https://commons.wikimedia.org/wiki/Special:FilePath/Toyota%20Landcruiser%20(38030428366).jpg?width=900',
  'Lexus SUV': 'https://commons.wikimedia.org/wiki/Special:FilePath/2016%20Lexus%20RX%20200t%20front%20view.jpg?width=900'
};

/* ===================== Navigation ===================== */
const navbar      = document.querySelector('.navbar');
const hamburger   = document.getElementById('hamburger');
const navMenu     = document.getElementById('navMenu');
const menuOverlay = document.getElementById('menuOverlay');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) navbar?.classList.add('scrolled');
  else navbar?.classList.remove('scrolled');
});

function toggleMenu() {
  hamburger?.classList.toggle('active');
  navMenu?.classList.toggle('open');
  menuOverlay?.classList.toggle('active');
  document.body.style.overflow = navMenu?.classList.contains('open') ? 'hidden' : '';
}

function closeMenu() {
  hamburger?.classList.remove('active');
  navMenu?.classList.remove('open');
  menuOverlay?.classList.remove('active');
  document.body.style.overflow = '';
}

hamburger?.addEventListener('click', toggleMenu);
menuOverlay?.addEventListener('click', closeMenu);
document.querySelectorAll('.nav-link').forEach(l => l.addEventListener('click', closeMenu));

/* Mark active nav link */
(function setActiveNav() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) link.classList.add('active');
  });
})();

/* ===================== Scroll Animations ===================== */
const animObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.08 });

document.querySelectorAll('.fade-up, .fade-left').forEach(el => animObserver.observe(el));

/* ===================== WhatsApp Helpers ===================== */
function buildWhatsAppLink(phone, message) {
  const cleanPhone = String(phone || '').replace(/\D/g, '');
  const encodedMessage = encodeURIComponent(message || '');
  return `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodedMessage}`;
}

function openWhatsApp(message = WA_DEFAULT_MESSAGE, phone = WA_NUMBER) {
  const url = buildWhatsAppLink(phone, message);
  const waWindow = window.open(url, '_blank', 'noopener,noreferrer');
  if (waWindow) waWindow.opener = null;
}

window.bookCar = function(carName) {
  openWhatsApp(`مرحبا، أريد الاستفسار عن حجز سيارة ${carName} من العماري لتأجير السيارات.`);
};

window.generalInquiry = function() {
  openWhatsApp('مرحبا، أريد الاستفسار عن خدمات تأجير السيارات من العماري.');
};

window.buildWhatsAppLink = buildWhatsAppLink;

document.querySelectorAll('a[data-whatsapp-link]').forEach(link => {
  const phone = link.dataset.whatsappPhone || WA_NUMBER;
  const message = link.dataset.whatsappMessage || WA_DEFAULT_MESSAGE;
  link.href = buildWhatsAppLink(phone, message);
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
});

/* ===================== Booking Form ===================== */
const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
  bookingForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const g = id => document.getElementById(id)?.value || '';
    const delivery = document.querySelector('input[name="delivery"]:checked')?.value || 'لا';
    const msg = `مرحبا شركة العماري لتأجير السيارات،
أرغب في حجز سيارة.

الاسم: ${g('b-name')}
رقم الهاتف: ${g('b-phone')}
نوع السيارة: ${g('b-car')}
مدة التأجير: ${g('b-duration')}
تاريخ الاستلام: ${g('b-pickup-date')}
تاريخ التسليم: ${g('b-return-date')}
مكان الاستلام: ${g('b-pickup-location')}
مكان التسليم: ${g('b-return-location')}
هل أحتاج توصيل: ${delivery}
ملاحظات: ${g('b-notes') || 'لا توجد'}

يرجى تأكيد التوفر والسعر.`;
    openWhatsApp(msg);
  });
}

/* ===================== Contact Form ===================== */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const g = id => document.getElementById(id)?.value || '';
    const msg = `مرحبا، أنا ${g('c-name')}\nرقم التواصل: ${g('c-phone')}\nالموضوع: ${g('c-subject')}\nالرسالة: ${g('c-message')}`;
    openWhatsApp(msg);
  });
}

/* ===================== Corporate Form ===================== */
const corporateForm = document.getElementById('corporateForm');
if (corporateForm) {
  corporateForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const g = id => document.getElementById(id)?.value || '';
    const msg = `مرحبا شركة العماري لتأجير السيارات،
أود الاستفسار عن خدمات تأجير السيارات للشركات.

اسم الشركة: ${g('co-company')}
اسم المسؤول: ${g('co-person')}
رقم الهاتف: ${g('co-phone')}
عدد السيارات المطلوبة: ${g('co-count')}
مدة العقد: ${g('co-period')}
نوع السيارات: ${g('co-cartype')}
ملاحظات: ${g('co-notes') || 'لا توجد'}

يرجى التواصل معنا لمناقشة التفاصيل.`;
    openWhatsApp(msg);
  });
}

/* ===================== Car Filter ===================== */
(function initCarFilter() {
  const btns  = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.car-card');
  if (!btns.length) return;

  btns.forEach(btn => {
    btn.addEventListener('click', function() {
      btns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      const filter = this.dataset.filter;
      cards.forEach(card => {
        if (filter === 'all') { card.style.display = ''; return; }
        const tags = (card.dataset.tags || '').split(',');
        card.style.display = tags.includes(filter) ? '' : 'none';
      });
    });
  });
})();

/* ===================== FAQ Accordion ===================== */
(function initFAQ() {
  const items = document.querySelectorAll('.faq-item');
  items.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer   = item.querySelector('.faq-answer');
    if (!question || !answer) return;

    question.addEventListener('click', () => {
      const wasActive = item.classList.contains('active');
      items.forEach(fi => { fi.classList.remove('active'); fi.querySelector('.faq-answer').style.maxHeight = '0'; });
      if (!wasActive) { item.classList.add('active'); answer.style.maxHeight = answer.scrollHeight + 'px'; }
    });
  });
})();

/* ===================== Car Modal ===================== */
const modalOverlay = document.getElementById('carModal');

window.openCarModal = function(carData) {
  if (!modalOverlay) return;
  document.getElementById('modal-car-name').textContent        = carData.name;
  document.getElementById('modal-car-type').textContent        = carData.type;
  document.getElementById('modal-car-passengers').textContent  = carData.passengers;
  document.getElementById('modal-car-transmission').textContent = carData.transmission;
  document.getElementById('modal-car-category').textContent    = carData.category;
  document.getElementById('modal-car-desc').textContent        = carData.desc;
  const img = document.getElementById('modal-car-emoji');
  const imageUrl = carData.image || CAR_IMAGES[carData.name];
  if (img && imageUrl) {
    const carImage = document.createElement('img');
    carImage.className = 'modal-car-img';
    carImage.src = imageUrl;
    carImage.alt = carData.name;
    carImage.loading = 'lazy';
    carImage.decoding = 'async';
    img.replaceChildren(carImage);
  } else if (img) {
    img.textContent = carData.emoji || '🚗';
  }
  document.getElementById('modal-book-btn').onclick = () => window.bookCar(carData.name);
  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
};

window.closeCarModal = function() {
  modalOverlay?.classList.remove('active');
  document.body.style.overflow = '';
};

modalOverlay?.addEventListener('click', function(e) { if (e.target === this) window.closeCarModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') window.closeCarModal(); });

/* ===================== Smooth anchor scroll ===================== */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});
