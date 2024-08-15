const scriptURL = 'https://script.google.com/macros/s/AKfycbw0sAQ0AP-Z7hfu1HyGBsoTXEcLRCaPFEf4IsaTDhSjEwBdlpXT9HO9PTJLLZwc4T_F/exec';
const form = document.forms['signup-form'];

const modal = document.getElementById('successModal');
const okButton = document.getElementById('okButton');
const submitButton = document.getElementById('submitButton');
const loadingSpinner = document.getElementById('loadingSpinner');
const originalButtonText = submitButton.innerHTML;

// Scroll to top functionality
document.getElementById('scrollToTop').addEventListener('click', function (event) {
    event.preventDefault(); // Prevent the default link behavior
    window.scrollTo({
        top: 0, // Scroll to the top of the page
        behavior: 'smooth' // Smooth scrolling
    });
});

// Show loading animation and handle form submission
form.addEventListener('submit', async e => {
    e.preventDefault();

    // Show loading spinner and disable the submit button
    submitButton.innerHTML = 'Submitting... <span class="loading-spinner"></span>';
    loadingSpinner.style.display = 'inline-block';
    submitButton.disabled = true;

    try {
        const response = await fetch(scriptURL, { method: 'POST', body: new FormData(form) });

        if (response.ok) {
            // Show the modal
            modal.style.display = 'block';
            
            // Re-enable the submit button and reset its text
            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonText;

            // Handle OK button click to redirect to WhatsApp group
            okButton.onclick = function () {
                modal.style.display = 'none';
                window.location.href = 'https://chat.whatsapp.com/K8YsAPh67G98PdubGo2TnI';
            };
        } else {
            throw new Error('Network response was not ok.');
        }
    } catch (error) {
        console.error('Error!', error.message);
        alert("Sorry, there was an error. Please try again.");

        // Re-enable the submit button and reset its text
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonText;
    }
});

// Prevent closing the modal when clicking outside of it
window.onclick = function (event) {
    if (event.target === modal) {
        // Uncomment the next line if you want to close the modal when clicking outside of it
        // modal.style.display = 'none';
    }
};
