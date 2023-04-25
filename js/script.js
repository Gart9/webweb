/* JavaScript for showing/hiding the mobile navigation */
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelectorAll('.nav__link');

navToggle.addEventListener('click', () => {
  document.body.classList.toggle('nav-open');
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    document.body.classList.remove('nav-open');
  });
});

/* JavaScript for displaying the current date */
const dateElement = document.querySelector('.current-date');
const currentDate = new Date();
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
dateElement.textContent = currentDate.toLocaleDateString('en-US', options);

/* JavaScript for submitting the contact form */
const contactForm = document.querySelector('#contact-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const messageInput = document.querySelector('#message');
const formMessage = document.querySelector('.form-message');

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const nameValue = nameInput.value.trim();
  const emailValue = emailInput.value.trim();
  const messageValue = messageInput.value.trim();

  if (nameValue === '' || emailValue === '' || messageValue === '') {
    formMessage.textContent = 'Please fill out all fields.';
    formMessage.style.color = 'red';
    return;
  }

  const formData = new FormData();
  formData.append('name', nameValue);
  formData.append('email', emailValue);
  formData.append('message', messageValue);

  fetch('https://example.com/contact', {
    method: 'POST',
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        formMessage.textContent = 'Thank you for your message!';
        formMessage.style.color = 'green';
        nameInput.value = '';
        emailInput.value = '';
        messageInput.value = '';
      } else {
        formMessage.textContent = 'Something went wrong. Please try again later.';
        formMessage.style.color = 'red';
      }
    })
    .catch(error => {
      formMessage.textContent = 'Something went wrong. Please try again later.';
      formMessage.style.color = 'red';
    });
});
