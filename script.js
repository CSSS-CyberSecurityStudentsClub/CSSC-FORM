document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signup-form');
    const submitButton = document.getElementById('submitButton');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const successModal = document.getElementById('successModal');
    const okButton = document.getElementById('okButton');

    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        toggleLoading(true);

        // Collect form data, including the file
        const formData = new FormData(signupForm);
        const resumeFile = signupForm.querySelector('input[type="file"]').files[0];

        // Append the file to FormData if it exists
        if (resumeFile) {
            formData.append('resumeFile', resumeFile);
        }

        const formAction = signupForm.action;

        fetch(formAction, {
            method: 'POST',
            body: formData, // Send the FormData which includes the file
        })
        .then(response => response.json())
        .then(data => {
            toggleLoading(false);
            if (data.result === 'success') {
                showModal();
                clearForm();
            } else {
                alert('Submission failed. Please try again.');
            }
        })
        .catch(error => {
            toggleLoading(false);
            console.error('Error:', error);
            alert('There was an error submitting the form. Please try again later.');
        });
    });

    okButton.addEventListener('click', () => {
        hideModal();
    });

    function toggleLoading(isLoading) {
        loadingSpinner.style.display = isLoading ? 'inline-block' : 'none';
        submitButton.disabled = isLoading;
    }

    function showModal() {
        successModal.style.display = 'block';
    }

    function hideModal() {
        successModal.style.display = 'none';
    }

    function clearForm() {
        signupForm.reset();
    }
});
