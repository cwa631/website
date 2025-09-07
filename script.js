/*========== MENU SHOW Y HIDDEN ==========*/
const navMenu = document.getElementById('nav-menu'),
navToggle = document.getElementById('nav-toggle'),
navClose = document.getElementById('nav-close');

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.add('show-menu');
  });
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if (navClose) {
  navClose.addEventListener('click', () => {
    navMenu.classList.remove('show-menu');
  });
}

/*===== REMOVE MENU MOBILE =====*/
const navLink = document.querySelectorAll('.nav__link');

function linkAction() {
  const navMenu = document.getElementById('nav-menu');
  // When we click on each nav__link, we remove the show-menu class
  navMenu.classList.remove('show-menu');
}
navLink.forEach(n => n.addEventListener('click', linkAction));

/* ===== ACCORDION SKILLS ===== */
 const skillsContent = document.getElementsByClassName('skills__content');
const skillsHeader = document.querySelectorAll('.skills__header');

function toggleSkills() {
  let itemClass = this.parentNode.className;

  // Close all skills
  for (let i = 0; i < skillsContent.length; i++) {
    skillsContent[i].className = 'skills__content skills__close';
  }

  // Open the clicked skill if it was closed
  if (itemClass === 'skills__content skills__close') {
    this.parentNode.className = 'skills__content skills__open';
  }
}

// Add click event to each header
skillsHeader.forEach((el) => {
  el.addEventListener('click', toggleSkills);
});

/*==================== QUALIFICATION TABS ====================*/
const tabs = document.querySelectorAll('[data-target]');
const tabContents = document.querySelectorAll('[data-content]');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = document.querySelector(tab.dataset.target);

    // Remove active class from all tab contents
    tabContents.forEach(content => {
      content.classList.remove('qualification__active');
    });

    // Show the targeted content
    target.classList.add('qualification__active');

    // Remove active class from all tabs
    tabs.forEach(t => {
      t.classList.remove('qualification__active');
    });

    // Activate the clicked tab
    tab.classList.add('qualification__active');
  });
});

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50; // adjust offset if needed
    const sectionId = current.getAttribute('id');

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link');
    } else {
      document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link');
    }
  });
}
// Attach the function to scroll event
window.addEventListener('scroll', scrollActive);


/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader() {
  const nav = document.getElementById('header');
  // When the scroll is greater than 200px, add the scroll-header class to the header tag
  if (this.scrollY >= 80)
    nav.classList.add('scroll-header');
   else 
    nav.classList.remove('scroll-header');
  
}
window.addEventListener('scroll', scrollHeader);


/*==================== SHOW SCROLL TOP ==================*/
function scrollUp() {
  const scrollUp = document.getElementById('scroll-up');
  // When the scroll is higher than 560 viewport height, add the show-scroll class to the <a> tag
  if (window.scrollY >= 560) {
    scrollUp.classList.add('show-scroll');
  } else {
    scrollUp.classList.remove('show-scroll');
  }
}
window.addEventListener('scroll', scrollUp);


/*==================== DARK/LIGHT THEME ====================*/
const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme';
const iconTheme = 'uil-sun';

// Previously selected theme (if user selected)
const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

// We obtain the current theme that the interface has
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light';
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun';

// Apply the previously selected theme
if (selectedTheme) {
  if (selectedTheme === 'dark') {
    document.body.classList.add(darkTheme);
  } else {
    document.body.classList.remove(darkTheme);
  }

  if (selectedIcon === 'uil-moon') {
    themeButton.classList.add(iconTheme);
  } else {
    themeButton.classList.remove(iconTheme);
  }
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
  // Add or remove the dark / icon theme
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);

  // Save the current theme and icon to localStorage
  localStorage.setItem('selected-theme', getCurrentTheme());
  localStorage.setItem('selected-icon', getCurrentIcon());
});






/*==================== CONTACT ME RESPONSIVE ==================*/
const form = document.querySelector('.contact__form');

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if(!name || !email || !message){
        alert("Please fill all fields!");
        return;
    }

    // WhatsApp link
    const phone = "+917384215381"; // your WhatsApp number
    const waMessage = `Name: ${name}%0AEmail: ${email}%0AMessage: ${message}`;
    const waLink = `https://wa.me/${phone}?text=${waMessage}`;
    
    // Email link
    const mailTo = `mailto:aadi402153@gmail.com?subject=Contact Form Message from ${name}&body=Name: ${name}%0AEmail: ${email}%0AMessage: ${message}`;

    // Open WhatsApp in new tab
    window.open(waLink, '_blank');

    // Open email client in new tab
    window.open(mailTo, '_blank');

    // Optional: Reset form
    form.reset();
});




/*==================== NO ONE INSPECT OUR CODE ==================*/

// Run on your server — client never sees this source.
const express = require('express');
const app = express();
app.use(express.json());

// Example: secret pricing algorithm
function secretPriceCalc(data) {
  // complex logic here — keep on the server
  const base = 100;
  const factor = data.complexity || 1;
  return Math.round(base * factor * (1 + (Math.random()*0.05)));
}

app.post('/api/quote', (req, res) => {
  // authenticate user / rate-limit requests in production
  const result = { price: secretPriceCalc(req.body) };
  res.json(result);
});

app.listen(3000, ()=>console.log('API listening on :3000'));




async function requestQuote(payload) {
  const resp = await fetch('/api/quote', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(payload)
  });
  const data = await resp.json();
  return data.price; // client sees only the result, not the algorithm
}
