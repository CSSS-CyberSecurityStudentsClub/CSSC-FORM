document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signup-form');
    const submitButton = document.getElementById('submitButton');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const successModal = document.getElementById('successModal');
    const okButton = document.getElementById('okButton');

    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        toggleLoading(true);

        const formData = new FormData(signupForm);

        // Trim whitespace and validate inputs
        let isValid = true;
        formData.forEach((value, key) => {
            value = value.trim(); // Trim spaces from the input
            if (value === '') {
                isValid = false; // If any field is empty, set isValid to false
            }
            formData.set(key, value); // Update the FormData object with trimmed value
        });

        if (!isValid) {
            toggleLoading(false);
            alert('Please fill out all required fields.');
            return;
        }

        const formAction = signupForm.action;

        fetch(formAction, {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            toggleLoading(false);
            if (data.result === 'success') {
                showModal();
                clearForm(); // Manually clears the form inputs
            } else {
                alert('Submission failed. Please try again.');
            }
        })
        .catch(error => {
            toggleLoading(false);
            alert('There was an error submitting the form. Please try again later.');
        });
    });

    okButton.addEventListener('click', () => {
        hideModal();
        window.location.href = "https://chat.whatsapp.com/K8YsAPh67G98PdubGo2TnI";
    });

    function toggleLoading(isLoading) {
        if (isLoading) {
            loadingSpinner.style.display = 'inline-block';
            submitButton.disabled = true;
        } else {
            loadingSpinner.style.display = 'none';
            submitButton.disabled = false;
        }
    }

    function showModal() {
        successModal.style.display = 'block';
    }

    function hideModal() {
        successModal.style.display = 'none';
    }

    function clearForm() {
        // Get all form elements
        const elements = signupForm.elements;

        // Iterate over form elements and clear their values
        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA' || element.tagName === 'SELECT') {
                element.value = '';
            }
        }
    }
});
