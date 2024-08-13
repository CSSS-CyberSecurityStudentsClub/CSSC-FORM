// document.getElementById('signup-form').addEventListener('submit', function(event) {
//     event.preventDefault();
//     alert('Thank you for your interest! We will get back to you soon.');
// });

const scriptURL = 'https://script.google.com/macros/s/AKfycbw0sAQ0AP-Z7hfu1HyGBsoTXEcLRCaPFEf4IsaTDhSjEwBdlpXT9HO9PTJLLZwc4T_F/exec'

const form = document.forms['contact-form']

form.addEventListener('submit', e => {
  e.preventDefault()
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
  .then(response => alert("Thank you! your form is submitted successfully." ))
  .then(() => { window.location.reload(); })
  .catch(error => console.error('Error!', error.message))
})