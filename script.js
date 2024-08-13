// document.getElementById('signup-form').addEventListener('submit', function(event) {
//     event.preventDefault();
//     alert('Thank you for your interest! We will get back to you soon.');
// });

const scriptURL = 'https://script.google.com/macros/s/AKfycbw0sAQ0AP-Z7hfu1HyGBsoTXEcLRCaPFEf4IsaTDhSjEwBdlpXT9HO9PTJLLZwc4T_F/exec'
const form = document.forms['contact-form']

form.addEventListener('submit', e => {
  e.preventDefault()
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => {
      alert("Thank you! Your form is submitted successfully.");
      form.reset(); // Optionally clear the form fields
    })
    .catch(error => {
      console.error('Error!', error.message);
      alert("Sorry, there was an error. Please try again.");
    });
});
