const supabaseUrl = 'https://edtlzmjyshstofnskogy.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkdGx6bWp5c2hzdG9mbnNrb2d5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU2Mzg2MTUsImV4cCI6MjA0MTIxNDYxNX0.wkrNp4MP5Yhgv3S1kNyav9nTU5eFI4_mT_UxD0UOrbA';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

document.getElementById('signup-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const year = document.getElementById('Year').value;
    const department = document.getElementById('department').value;
    const resumeFile = document.getElementById('Resume').files[0];

    // Upload file to Supabase Storage
    const { data, error } = await supabase.storage.from('resumes').upload(`resume_${name}.pdf`, resumeFile);

    if (error) {
        alert('Error uploading file');
        return;
    }

    // Save form data along with the file URL
    const resumeUrl = `${supabase.storage.from('resumes').getPublicUrl(`resume_${name}.pdf`).publicURL}`;

    const { data: insertData, error: insertError } = await supabase
        .from('resumes')
        .insert([{ name, year, department, resume_url: resumeUrl }]);

    if (insertError) {
        alert('Error submitting form');
    } else {
        alert('Form submitted successfully');
    }
});
