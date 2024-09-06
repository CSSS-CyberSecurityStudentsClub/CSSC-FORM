import { createClient } from 'jsr:@supabase/supabase-js'
const supabaseUrl = 'https://edtlzmjyshstofnskogy.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkdGx6bWp5c2hzdG9mbnNrb2d5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU2Mzg2MTUsImV4cCI6MjA0MTIxNDYxNX0.wkrNp4MP5Yhgv3S1kNyav9nTU5eFI4_mT_UxD0UOrbA'
let supabase;
supabase = createClient(supabaseUrl, supabaseKey)



// Event listener for form submission
document.getElementById('signup-form').addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Get form input values
    const name = document.getElementById('name').value;
    const year = document.getElementById('Year').value;
    const department = document.getElementById('department').value;
    const resumeFile = document.getElementById('Resume').files[0]; // Get the uploaded file

    // Show loading spinner
    document.getElementById('loadingSpinner').style.display = 'inline-block';

    // Upload file to Supabase Storage
    const { data: fileData, error: fileError } = await supabase
        .storage
        .from('resumes') // Supabase storage bucket
        .upload(`resume_${name}_${Date.now()}`, resumeFile);

    // Check for upload errors
    if (fileError) {
        alert('Error uploading resume: ' + fileError.message);
        return;
    }

    // Get public URL for the uploaded resume
    const resumeUrl = supabase
        .storage
        .from('resumes')
        .getPublicUrl(fileData.path).publicURL;

    // Insert form data and resume URL into Supabase Database
    const { data: formData, error: formError } = await supabase
        .from('resumes') // Your table in Supabase Database
        .insert([
            {
                name: name,
                year: year,
                department: department,
                resume_url: resumeUrl
            }
        ]);

    // Check for form submission errors
    if (formError) {
        alert('Error submitting form: ' + formError.message);
    } else {
        alert('Form submitted successfully!');
    }

    // Hide the loading spinner after submission
    document.getElementById('loadingSpinner').style.display = 'none';
});
