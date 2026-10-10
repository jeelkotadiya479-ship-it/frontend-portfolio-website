// 1. Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (menuToggle && navMenu) {
      menuToggle.addEventListener('click', () => {
        const isOpen = navMenu.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', String(isOpen));
      });

      // Close menu on link click
      navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          navMenu.classList.remove('active');
          menuToggle.setAttribute('aria-expanded', 'false');
        });
      });
    }

    // 2. Active Link on Scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
      let current = '';
      const scrollPosition = window.pageYOffset + 120;

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          current = section.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    });

    // 3. Back to Top Button
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
      backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }

    // 4. Contact Form Validation
    const contactForm = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');
    const formStatus = document.getElementById('formStatus');

    function validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(String(email).toLowerCase());
    }

    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        // Reset states
        nameError.classList.remove('visible');
        nameInput.classList.remove('is-invalid');
        emailError.classList.remove('visible');
        emailInput.classList.remove('is-invalid');
        messageError.classList.remove('visible');
        messageInput.classList.remove('is-invalid');
        formStatus.className = 'form-status';
        formStatus.textContent = '';

        // Validate Name
        if (!nameInput.value.trim()) {
          nameError.classList.add('visible');
          nameInput.classList.add('is-invalid');
          isValid = false;
        }

        // Validate Email
        if (!emailInput.value.trim() || !validateEmail(emailInput.value.trim())) {
          emailError.classList.add('visible');
          emailInput.classList.add('is-invalid');
          isValid = false;
        }

        // Validate Message
        if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
          messageError.classList.add('visible');
          messageInput.classList.add('is-invalid');
          isValid = false;
        }

        if (isValid) {
          formStatus.className = 'form-status info';
          formStatus.textContent = "Thank you, " + nameInput.value.trim() + "! Basic form validation passed. Note: Connecting to an active backend or email service (like Formspree or EmailJS) is required for automated email delivery.";
          contactForm.reset();
        }
      });
    }
