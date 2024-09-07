document.getElementById('signup-form').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent default form submission

    // Get the form element and its action URL
    const form = document.getElementById('signup-form');
    const formAction = form.action; // Get the form's action URL from the HTML

    // Get form data
    const formData = new FormData(form); // Automatically collects all form inputs

    // Disable submit button and show loading spinner
    toggleLoading(true);

    try {
        const response = await fetch(formAction, {
            method: 'POST',
            body: formData,
        });

        const result = await response.text(); // Expecting text response from Google Apps Script

        // Enable submit button and hide loading spinner
        toggleLoading(false);

        if (result === 'Success') {
            showModal();
            clearForm(); // Manually clear form inputs
        } else {
            alert('Submission failed. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);

        // Enable submit button and hide loading spinner
        toggleLoading(false);

        alert('There was an error submitting the form. Please try again later.');
    }
});

// Helper function to toggle loading state
function toggleLoading(isLoading) {
    const submitButton = document.getElementById('submitButton');
    const loadingSpinner = document.getElementById('loadingSpinner');

    submitButton.disabled = isLoading;
    loadingSpinner.style.display = isLoading ? 'inline-block' : 'none';
}

// Function to clear the form after submission
function clearForm() {
    document.getElementById('signup-form').reset();
}

// Function to show the modal after successful submission
function showModal() {
    const modal = document.getElementById('successModal');
    modal.style.display = 'block';
    document.getElementById('okButton').addEventListener('click', function () {
        modal.style.display = 'none';
    });
}
