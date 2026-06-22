// ==========================================
// PORTFOLIO INTERACTIVE LOGIC & ENHANCEMENTS
// ==========================================

// 1. Scroll Progress Bar
const scrollProgress = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
  const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
  if (totalHeight > 0) {
    const progress = (window.pageYOffset / totalHeight) * 100;
    if (scrollProgress) {
      scrollProgress.style.width = progress + '%';
    }
  }
});

// 2. Navbar Scroll Style
const nb = document.getElementById('navbar');
if (nb) {
  window.addEventListener('scroll', () => nb.classList.toggle('scrolled', window.scrollY > 40));
}

// 3. Hamburger Mobile Menu
function toggleMenu() {
  const navMenu = document.getElementById('navMenu');
  if (navMenu) navMenu.classList.toggle('open');
}
// Attach events to close menu on link clicks
document.querySelectorAll('.nav-menu a').forEach(a => {
  a.addEventListener('click', () => {
    const navMenu = document.getElementById('navMenu');
    if (navMenu) navMenu.classList.remove('open');
  });
});

// 4. Typewriter Effect in Hero Section
const typewriterSpan = document.getElementById('typewriter');
if (typewriterSpan) {
  const roles = ["Power BI Expert", "SQL Developer", "Python Programmer", "Excel Dashboard Builder"];
  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let delay = 150;

  function type() {
    const currentRole = roles[roleIdx];
    if (isDeleting) {
      typewriterSpan.textContent = currentRole.substring(0, charIdx - 1);
      charIdx--;
      delay = 50;
    } else {
      typewriterSpan.textContent = currentRole.substring(0, charIdx + 1);
      charIdx++;
      delay = 150;
    }

    if (!isDeleting && charIdx === currentRole.length) {
      isDeleting = true;
      delay = 2000; // Hold role display
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      delay = 500; // Pause before starting typing next role
    }

    setTimeout(type, delay);
  }
  // Start the typing loop
  setTimeout(type, 1000);
}

// 5. Scroll Reveal Animation using IntersectionObserver
const revs = document.querySelectorAll('.reveal');
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      obs.unobserve(e.target);
    }
  }); 
}, { threshold: 0.1 });
revs.forEach(el => obs.observe(el));

// 6. Interactive Education Dashboard Switcher
function switchEdu(el, key) {
  const eduImg = document.getElementById('eduImg');
  if (eduImg && typeof EDU !== 'undefined' && EDU[key]) {
    eduImg.src = EDU[key];
    document.querySelectorAll('.thumb-strip img').forEach(i => i.classList.remove('active'));
    el.classList.add('active');
  }
}

// 7. Project Filtering Logic
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.proj-grid .pc');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filterValue = btn.getAttribute('data-filter');

    projectCards.forEach(card => {
      // Fade out transition
      card.style.opacity = '0';
      card.style.transform = 'scale(0.95)';
      card.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
      
      setTimeout(() => {
        const cardTech = card.getAttribute('data-tech') || '';
        if (filterValue === 'all' || cardTech.split(' ').includes(filterValue)) {
          card.style.display = '';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.display = 'none';
        }
      }, 250);
    });
  });
});

// 8. Scroll to Top Button Behaviour
const scrollToTopBtn = document.getElementById('scroll-to-top');
if (scrollToTopBtn) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollToTopBtn.classList.add('visible');
    } else {
      scrollToTopBtn.classList.remove('visible');
    }
  });

  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// 9. Contact Form submission via Formspree (AJAX Fetch)
function handleForm(e) {
  e.preventDefault();
  const form = e.target;
  const btn = document.getElementById('formBtn');
  if (!btn) return;
  
  btn.innerHTML = 'Sending...';
  btn.disabled = true;

  const data = new FormData(form);
  
  fetch(form.action, {
    method: form.method || 'POST',
    body: data,
    headers: {
      'Accept': 'application/json'
    }
  })
  .then(response => {
    if (response.ok) {
      btn.innerHTML = '\u2713 Message Sent!'; // Shows green checkmark
      btn.style.background = '#22c55e';
      form.reset();
      
      setTimeout(() => {
        btn.innerHTML = 'Send Message &nbsp;<i class="fa-solid fa-paper-plane"></i>';
        btn.style.background = '';
        btn.disabled = false;
      }, 3000);
    } else {
      response.json().then(data => {
        if (Object.hasOwn(data, 'errors')) {
          alert(data["errors"].map(error => error["message"]).join(", "));
        } else {
          alert("Oops! There was a problem submitting your form.");
        }
        btn.innerHTML = 'Send Message &nbsp;<i class="fa-solid fa-paper-plane"></i>';
        btn.style.background = '';
        btn.disabled = false;
      });
    }
  })
  .catch(error => {
    alert("Oops! There was a problem submitting your form. Please try again.");
    btn.innerHTML = 'Send Message &nbsp;<i class="fa-solid fa-paper-plane"></i>';
    btn.style.background = '';
    btn.disabled = false;
  });
}